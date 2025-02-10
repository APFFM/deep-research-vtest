import { NextResponse } from "next/server"
import { deepResearch, writeFinalReport } from "@/lib/deep-research"

export async function POST(request: Request) {
  const encoder = new TextEncoder()
  const { query, depth, breadth } = await request.json()

  const stream = new TransformStream()
  const writer = stream.writable.getWriter()

  // Start the research process
  deepResearch({
    query,
    depth,
    breadth,
    onProgress: async (progress) => {
      // Send progress updates
      await writer.write(
        encoder.encode(
          JSON.stringify({
            type: "progress",
            progress,
          }) + "\n"
        )
      )
    },
  })
    .then(async ({ learnings, visitedUrls }) => {
      // Generate and send the final report
      const report = await writeFinalReport({
        prompt: query,
        learnings,
        visitedUrls,
      })

      await writer.write(
        encoder.encode(
          JSON.stringify({
            type: "report",
            report,
          }) + "\n"
        )
      )
    })
    .catch(async (error) => {
      console.error("Research failed:", error)
      await writer.write(
        encoder.encode(
          JSON.stringify({
            type: "error",
            error: error.message,
          }) + "\n"
        )
      )
    })
    .finally(async () => {
      await writer.close()
    })

  return new NextResponse(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  })
} 