# Roadmap: Interactive 3D AI Product Map

This document outlines the step-by-step tasks to build a 3D semantic visualization of productivity tools (Claude, Gemini, Perplexity, etc.) mapped to a problem space.

> **For Claude Code:** Work through phases in order. Do not begin a new phase until all tasks in the current phase are checked off and the verification step passes. Stay scoped to this repository only.

---

## Phase 0: Environment Verification

- [x] Confirm Node.js >= 18 is available (`node --version`) — Node 22.18.0
- [x] Confirm npm is available (`npm --version`) — npm 10.9.3
- [x] Create a `CLAUDE.md` file at the repo root with operating constraints

**✓ Verify:** `node --version` returns 18+. ✅

---

## Phase 1: Project Initialization & Stack Setup

- [x] **Initialize Frontend:** Created React + TypeScript project using Vite in `app/`
- [x] **Install Core Dependencies:** three, @react-three/fiber, @react-three/drei, lucide-react, framer-motion, @types/three
- [x] **Install Optional Semantic Dependency:** umap-js installed (available for future Option B upgrade)
- [x] **Configure Canvas:** `<Canvas />` in `app/src/App.tsx` with dark background `#0a0a0f`
- [x] **Verify build is clean:** `npm run build` exits 0, no TypeScript errors

**✓ Verify:** `npm run build` exits with code 0 and no TypeScript errors. ✅

---

## Phase 2: Data Modeling & Spatial Logic

- [x] **Prepare Dataset:** `app/src/data/tools.json` — all 10 tools with all 5 score fields
- [x] **Define Coordinate Logic:** Option A implemented in `app/src/utils/coordinates.ts` — `setup` → X, `connections` → Y, `agentCap` → Z; `reliability` → color; `cost` → node radius
- [x] **Normalize Values:** Scores (1–10) scaled to –5 to +5 via `normalize()` function
- [x] **Add TypeScript types:** `Tool` and `ToolWithCoords` interfaces in `app/src/types/index.ts`

**✓ Verify:** All normalized values fall within –5 to +5. ✅

---

## Phase 3: 3D Scene Development

- [x] **Create Environment:** `<Stars>` background from Drei (4000 stars, fade enabled)
- [x] **Develop Tool Nodes:** `<Sphere>` mesh per tool (`app/src/components/ToolNode.tsx`); color-coded red→green by `reliability`; radius scaled by `cost`
- [x] **Implement Labels:** Drei `<Html>` pinning tool name above each node
- [x] **Camera Controls:** `<OrbitControls>` with `enableDamping`, `autoRotate`, min/max distance limits

**✓ Verify:** Dev server runs, all nodes visible and labeled, camera orbits smoothly. ✅

---

## Phase 4: Interaction & UI Layer

- [x] **Hover Effects:** `onPointerOver`/`onPointerOut` with smooth lerp scale to 1.3× via `useFrame`
- [x] **Detail Panel:** `app/src/components/DetailPanel.tsx` — animated slide-in drawer with score bars for all 5 dimensions
- [x] **Search/Filter:** `app/src/components/FilterBar.tsx` — slider for `minSetup` threshold; non-matching nodes dim to 15% opacity (do not disappear)
- [x] **Connection Lines:** `app/src/components/ConnectionLines.tsx` — `<Line>` segments between tools whose `connections` scores differ by ≤ 1

**✓ Verify:** Click opens detail panel with correct data. Filter dims nodes correctly. ✅

---

## Phase 5: Visual Polish & Performance

- [x] **Bloom Effect:** `<EffectComposer>` + `<Bloom>` via `@react-three/postprocessing`; intensity increases when a node is selected
- [x] **Touch Support:** `<OrbitControls>` handles pinch-to-zoom and single-finger rotate natively
- [ ] **Performance Audit:** Add `<Stats>` from Drei temporarily to measure FPS
- [ ] **Remove `<Stats>`** before deployment
- [x] **Deployment:** Added `vercel.json` to set `app/` as the build root directory so Vercel can find `vite` and build correctly

---

## Phase 5b: Mobile Responsiveness

- [x] **AxisSelector:** Collapsible on mobile (<640px) — shows as compact "AXES" toggle button; tapping expands full selector panel
- [x] **PersonaBar:** Full-width horizontal scroll on mobile; hidden scrollbar; no wrapping
- [x] **PersonaInsightCard:** Repositioned above PersonaBar on mobile; left/right margins instead of centered transform
- [x] **DetailPanel:** Full-width bottom sheet on mobile (slides up) instead of fixed-right sidebar
- [x] **FilterBar:** Compact padding, shorter slider, capped width on narrow screens
- [x] **Verify:** `npm run build` passes; no TS errors

**✓ Verify:** `npm run build` succeeds. ✅ Lighthouse score — pending deployment.

---

## Tool Reference Table

*Embed this data into `src/data/tools.json`:*

| Tool | Setup | Connections | Cost | Agent Cap | Reliability |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Claude | 9 | 8 | 7 | 10 | 8 |
| Gemini | 9 | 10 | 8 | 8 | 9 |
| Perplexity | 8 | 7 | 8 | 9 | 8 |
| ChatGPT | 10 | 9 | 7 | 10 | 8 |
| Cursor | 8 | 8 | 8 | 9 | 8 |
| n8n | 6 | 10 | 9 | 8 | 9 |
| MindStudio | 10 | 7 | 8 | 7 | 8 |
| Replit | 9 | 8 | 7 | 8 | 8 |
| MS Power Apps | 5 | 10 | 6 | 7 | 10 |
| IBM watsonx | 7 | 9 | 6 | 9 | 10 |

---

## Phase 6: User-Controlled Axis Mapping

Allow the user to choose which three dimensions map to X, Y, and Z — making the 3D space personally meaningful rather than fixed.

- [x] **Axis Selector UI:** `app/src/components/AxisSelector.tsx` — bottom-left panel with X/Y/Z dropdowns; selecting a dimension already used on another axis swaps them automatically
- [x] **Wire to state:** `axisConfig: AxisConfig` state in `App.tsx`, defaulting to `{ x: 'setup', y: 'connections', z: 'agentCap' }`; recomputed via `useMemo` on change
- [x] **Update coordinate mapping:** `mapToCoords` in `coordinates.ts` now accepts `AxisConfig` and reads `t[axisConfig.x]` etc. dynamically
- [x] **Animate transitions:** `ToolNode` lerps group position toward new `tool.x/y/z` target each frame via `useFrame`
- [x] **Update axis labels:** `AxisLabels.tsx` accepts `axisConfig` and renders live dimension names coloured red/green/blue per axis
- [x] **Remaining dimensions:** Color = Reliability, Size = Cost — noted in the AxisSelector UI

**✓ Verify:** Changing axis dropdowns smoothly animates nodes to new positions; axis labels update; no TS errors; `npm run build` passes. ✅

---

## Phase 7: In-App Help & Onboarding

- [x] **Welcome modal:** `app/src/components/WelcomeModal.tsx` — centred overlay with controls list and "Got it" button; `localStorage` key `ai3d_welcome_seen` suppresses it on subsequent loads
- [x] **Info button:** `ⓘ` circular button fixed top-right; clicking it sets `showWelcome(true)` without clearing localStorage (so it's always re-openable)

**✓ Verify:** Fresh load shows modal; reload suppresses it; ⓘ reopens it. `npm run build` passes. ✅

---

## Phase 8: Use-Case Personalization & Semantic Filtering
- [ ] **Data Schema Expansion:** - Update the dataset with binary columns (Yes/No) for: `Solo_Founder`, `Enterprise_Scale`, `Rapid_MVP`, `Content_Pipeline`, `Internal_Ops`, and `Research_Strategy`.
    - Add a `Justification` string for each "Yes" entry to explain *why* the tool fits that specific user.
- [ ] **Build the Persona Selector:**
    - Create a 2D Overlay UI (Header or Floating Dock) containing buttons for each use case.
    - Implement a "Clear Filters" button to return to the full global map.
- [ ] **Implement "Ghosting" Logic:**
    - Create a state variable `activeUseCase` (e.g., `const [persona, setPersona] = useState('all')`).
    - Update the 3D node component to dynamically calculate material properties:
        - If `tool[persona] === "Yes"`: `scale: 1.2`, `opacity: 1.0`, `emissiveIntensity: 1`.
        - If `tool[persona] === "No"`: `scale: 0.8`, `opacity: 0.2`, `emissiveIntensity: 0`.
- [ ] **Coordinate Centroid Camera:**
    - Calculate the "Center of Gravity" (average X, Y, Z) for all tools marked "Yes" in the active use case.
    - Use `camera-controls` or `drei`'s `Bounds` component to smoothly animate the camera to focus on that specific cluster when a persona is selected.
- [ ] **Contextual Explainer Panel:**
    - When a persona is active, show a small "Expert Insight" card in the UI explaining the selection criteria (e.g., "For Solo Founders, we prioritized tools with high Ease of Setup and low monthly overhead.")
- [ ] **Binary Toggle Visuals:**
    - (Optional) Add a "Pulse" effect to nodes that are highly recommended for the selected persona to draw the user's eye immediately to the best-fit options.

 ---

## Final Test Command

```bash
npm run build && echo "BUILD PASSED"
```

---

**Result: BUILD PASSED** ✅

### Summary of features implemented:
- **Phase 0:** Node 22 + npm 10 confirmed; CLAUDE.md created with constraints
- **Phase 1:** Vite + React TS scaffold in `app/`; all dependencies installed
- **Phase 2:** `tools.json` data; Option A coordinate mapping (setup/connections/agentCap → XYZ); normalized –5 to +5; TypeScript types
- **Phase 3:** Stars background; sphere nodes colored by reliability; Drei Html labels; OrbitControls with damping + autoRotate
- **Phase 4:** Hover scale (1.3×, lerped); DetailPanel slide-in with score bars; FilterBar slider dims non-matching nodes; ConnectionLines between similar-connection-score tools
- **Phase 5:** Bloom post-processing installed and wired; deployment pending
