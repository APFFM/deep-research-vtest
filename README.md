# Deep Research Web App

A modern web application interface for the Open Deep Research library. This application provides a user-friendly way to conduct deep, iterative research on any topic using AI-powered analysis.

![Deep Research Web App](./public/screenshot.png)

## Features

- 🎨 **Modern UI**: Clean, responsive interface built with Next.js 14 and Tailwind CSS
- 🌓 **Dark Mode**: Automatic and manual dark mode support
- ⚡ **Real-time Updates**: Live progress tracking of research status
- 📊 **Visual Progress**: Progress bars and detailed status updates
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🔍 **Research Configuration**: Easy-to-use controls for research depth and breadth
- 📝 **Rich Reports**: Beautifully formatted research reports with findings and sources

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: React Hooks
- **API**: Server-sent events for real-time updates
- **Research Engine**: Open Deep Research library

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Firecrawl API key (for web search functionality)
- An OpenAI API key (for AI analysis)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/deep-research-web.git
cd deep-research-web
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```env
FIRECRAWL_KEY=your_firecrawl_api_key
OPENAI_KEY=your_openai_api_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter your research topic in the main input field
2. Configure research parameters:
   - **Depth** (1-5): How deep the research should go
   - **Breadth** (2-10): How many parallel research paths to explore
3. Click "Start Research" to begin
4. Monitor progress in real-time
5. View the generated report with findings and sources

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linter
- `npm run format` - Format code

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

This web application is built on top of the [Open Deep Research](https://github.com/dzhng/open-deep-research) library.
