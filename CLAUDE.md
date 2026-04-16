# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

An interactive 3D semantic map of AI tools, visualising how they relate across multiple capability dimensions. This is a classic **Semantic Mapping / Embedding Visualization** problem rendered in the browser via WebGL.

## Data Source

`AI Tool Ranking and Analysis - AI Tool Ranking and Analysis.csv` — scores (1–10) for 10 AI tools across five dimensions:

| Dimension | Meaning |
|---|---|
| Ease of Setup | How easy the tool is to get started with |
| Possible Connections | Breadth of integrations/APIs |
| Cost (Value) | Value for money |
| Agent Capability | Ability to perform autonomous agentic tasks |
| Reliability | Consistency and uptime |

Tools: Claude (Code/Agents), Gemini (Google), Perplexity Computer, ChatGPT (OpenAI), Cursor 3, n8n, MindStudio, Replit, Microsoft Power Apps, IBM Bob.

## Chosen Tech Stack

### Frontend
- **React + React Three Fiber (R3F)** — React renderer for Three.js; manages the interactive 3D scene as components
- **Drei** — R3F helper library; provides `<Html>` for pinning 2D labels to 3D points, orbit controls, etc.
- **3d-force-graph** (by Vasturiano) — optional; good underlying engine for force-directed 3D layouts

### Dimensionality Reduction
- The five CSV scores are already a 5D vector per tool
- **UMAP** (`umap-js`) reduces them to $(x, y, z)$ coordinates; can run in-browser for small datasets like this one
- Alternative: pre-process in Python with `umap-learn` and ship a static JSON of coordinates

### Deployment
- Vercel or Netlify (static build); runs on any modern mobile browser with WebGL

## Architecture: How the Map Works

1. Parse the CSV into per-tool score vectors `[ease, connections, cost, agent, reliability]`
2. Run UMAP on those vectors to get `[x, y, z]` for each tool
3. Render each tool as a 3D point with R3F; use Drei `<Html>` for labels
4. Optionally add "anchor" points for Problem Pillars (e.g. "Cost Efficiency") as fixed stars that tools cluster near

## Reference Projects

| Project | Relevance |
|---|---|
| [Cosmograph](https://cosmograph.app/) | High-performance graph/embedding visualizer; good for prototyping the layout |
| [TensorFlow Projector](https://projector.tensorflow.org/) | Classic embedding visualizer; load custom vectors to validate clustering |
| [Nomic Atlas](https://atlas.nomic.ai/) | Gold-standard semantic map tool; useful reference for UX patterns |
| [3d-force-graph](https://github.com/vasturiano/3d-force-graph) | Underlying engine used by many interactive 3D maps |

## Operating Constraints

- Only modify files within this repository
- Do not install global packages
- Do not access external services or APIs
- Run dev server with: `npm run dev`
- Verify builds with: `npm run build`

## Key Decisions Still Open

- Whether to run UMAP client-side (simpler, fine for 10 tools) or pre-compute coordinates and bake them into a JSON file
- Which two of the five dimensions to encode as point size and colour (the other three map to x/y/z axes)
- Whether to show raw score axes (interpretable) vs. UMAP layout (clusters by similarity)
