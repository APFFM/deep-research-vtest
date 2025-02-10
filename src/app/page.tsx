"use client"

import { useState } from "react"
import { ResearchProgress } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  const [query, setQuery] = useState("")
  const [depth, setDepth] = useState(2)
  const [breadth, setBreadth] = useState(4)
  const [isResearching, setIsResearching] = useState(false)
  const [progress, setProgress] = useState<ResearchProgress | null>(null)
  const [report, setReport] = useState<string | null>(null)

  const startResearch = async () => {
    setIsResearching(true)
    setReport(null)
    try {
      const response = await fetch("/api/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          depth,
          breadth,
        }),
      })
      const reader = response.body?.getReader()
      if (!reader) return

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const text = new TextDecoder().decode(value)
        const data = JSON.parse(text)
        
        if (data.type === "progress") {
          setProgress(data.progress)
        } else if (data.type === "report") {
          setReport(data.report)
        }
      }
    } catch (error) {
      console.error("Research failed:", error)
    } finally {
      setIsResearching(false)
    }
  }

  return (
    <main className="container mx-auto p-4">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Deep Research Assistant</CardTitle>
          <CardDescription>
            Enter your research topic and configure the depth and breadth of the research
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="query">Research Topic</Label>
              <Input
                id="query"
                placeholder="Enter your research topic..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="depth">Research Depth</Label>
                <Input
                  id="depth"
                  type="number"
                  min={1}
                  max={5}
                  value={depth}
                  onChange={(e) => setDepth(parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="breadth">Research Breadth</Label>
                <Input
                  id="breadth"
                  type="number"
                  min={2}
                  max={10}
                  value={breadth}
                  onChange={(e) => setBreadth(parseInt(e.target.value))}
                />
              </div>
            </div>

            <Button
              className="w-full"
              onClick={startResearch}
              disabled={isResearching || !query}
            >
              {isResearching ? "Researching..." : "Start Research"}
            </Button>

            {progress && (
              <div className="space-y-2">
                <Progress value={(progress.completedQueries / progress.totalQueries) * 100} />
                <p className="text-sm text-muted-foreground">
                  Depth: {progress.currentDepth}/{progress.totalDepth},
                  Breadth: {progress.currentBreadth}/{progress.totalBreadth},
                  Queries: {progress.completedQueries}/{progress.totalQueries}
                </p>
                {progress.currentQuery && (
                  <p className="text-sm text-muted-foreground">
                    Current Query: {progress.currentQuery}
                  </p>
                )}
              </div>
            )}

            {report && (
              <Card>
                <CardHeader>
                  <CardTitle>Research Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: report }} />
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  )
} 