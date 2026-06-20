# Plan: QA Engineer Portfolio — Cyber-Dark IDE Dashboard

## Context

Building a high-fidelity personal portfolio landing page for a Senior QA & Automation Engineer. The brief specifies a precise visual identity — IDE/terminal aesthetic, deep charcoal dark mode, terminal green/cyber blue/orange accent palette — so the theme tool suggestions (brutalist, warm, swiss) are overridden by the explicit brief. This is a full-page multi-section layout with interactive behaviors (animated CTA drawer, hover glows, status indicators).

---

## Aesthetic Stance

**Committed direction:** Cyber-Dark Terminal Dashboard  
The brief names this explicitly — honor it over tool suggestions.

**Typography:**
- `JetBrains Mono` — primary display and body font (monospace throughout for total IDE immersion)
- `Inter` — fallback for prose-heavy blocks where mono would reduce readability

**Palette (exact from brief):**
- Background base: `#121214`
- Container surfaces: `#1E1E24`
- Terminal Green (success/passed): `#4AF626`
- Cyber Blue (interactive highlights): `#00E5FF`
- Warning Orange (retried): `#FF9100`
- Muted text: `#6C7086`
- Border hairlines: `rgba(255,255,255,0.08)`

---

## Files to Modify

### `src/styles/fonts.css`
Add Google Fonts import for JetBrains Mono (weights 400, 500, 700) and Inter.

### `src/styles/theme.css`
Update `:root` tokens only (keep `.dark` block and `@theme inline` intact):
- `--background: #121214`
- `--foreground: #E8E8F0`
- `--card: #1E1E24`
- `--card-foreground: #E8E8F0`
- `--primary: #4AF626` (terminal green)
- `--primary-foreground: #121214`
- `--secondary: #1A1A20`
- `--muted: #2A2A32`
- `--muted-foreground: #6C7086`
- `--accent: #00E5FF` (cyber blue)
- `--accent-foreground: #121214`
- `--border: rgba(255,255,255,0.08)`
- `--ring: #00E5FF`
- `--radius: 0.25rem` (sharp corners for tech aesthetic)

### `src/app/App.tsx`
Full replacement — all sections implemented as one self-contained file with React state.

---

## Component Architecture (inside App.tsx)

### State
- `consoleOpen: boolean` — toggles the Test Log Console drawer
- `activeSection: string` — tracks scroll position for nav highlighting
- `runningTest: boolean` — brief animation state when CTA is clicked

### Sections

**1. `<NavBar />`**
- Fixed top, `z-50`, backdrop-blur with `#121214/90` background
- Left: monogram logo `[ QA ]` in terminal green
- Center: links — `Home`, `Test Suite`, `Bug Log`, `Tech Stack`
- Right: blinking green pill `● System Status: STABLE` (CSS `animate-pulse` on the dot)

**2. `<HeroSection />`**
- Two-column grid (55/45 split), full viewport height
- Left: IDE mock-up window
  - Fake title bar with red/yellow/green traffic lights and filename `test_suite.java`
  - Line-numbered pseudo-code block (TestNG `@Test` annotation style) with syntax-colored spans
  - Fake terminal prompt at bottom
- Right: 
  - Eyebrow label `// QA PORTFOLIO`
  - H1: "Ensuring Code Flawlessness" in 4xl–5xl JetBrains Mono
  - Subheading prose
  - CTA button: `▶ Run Test Suite` — terminal green bg, onClick sets `consoleOpen=true` + `runningTest=true`
  - Three micro-metric cards row: `24,847 Tests Run`, `99.3% Bug Detection`, `99.98% Uptime`

**3. `<TestCaseSection />` ("The Test Cases")**
- Section heading styled as a comment `/* RECENT PROJECTS */`
- 3-column card grid
- Each card styled as JIRA ticket:
  - Top bar with ticket ID `QA-4821` and status badge
  - Project name + one-line summary
  - Framework tags as code-styled chips: `Selenium`, `Postman`, `Appium`, `Cypress`
  - Status badge: `✓ PASSED` (green) or `↺ RETRIED` (orange)
  - QA impact metric line
  - Hover: `translateY(-4px)` + `box-shadow: 0 0 20px rgba(0,229,255,0.3)` + border color → cyber blue

**4. `<TechStackMatrix />` ("Skill Matrix")**
- Section heading comment style
- 2×2 grid of category cards: Frontend Testing, Backend/API, Databases, DevOps/CI-CD
- Each card:
  - Category icon (lucide icon) + title
  - Skill rows with label + progress bar styled as system resource monitor bar
  - Progress bar fill: terminal green, with subtle scanline texture via repeating-linear-gradient
  - Tools listed as small tags

**5. `<ConsoleDrawer />`**
- Fixed bottom drawer, slides up on `consoleOpen=true` via CSS transition `transform translateY`
- Terminal-style header bar: `TEST LOG CONSOLE` with close button `[×]`
- Scrollable log output area with timestamped fake test run output:
  - Green lines for PASS, orange for RETRY, white for INFO
  - Animated typing/append effect using `useEffect` + `setInterval` when opened

---

## Interactions & Animations

| Trigger | Behavior |
|---|---|
| Click `▶ Run Test Suite` | `consoleOpen → true`, `runningTest → true` for 300ms (button flashes), scroll-lock on body |
| Click `[×]` in console | `consoleOpen → false` |
| Hover JIRA card | `translateY(-4px)` + cyber blue border glow via Tailwind `group-hover` |
| Nav link click | Smooth scroll to section anchor |
| `●` in status pill | CSS `animate-pulse` continuous |
| Scroll | `activeSection` updates for nav highlight |

---

## Verification

1. All 4 sections render without console errors
2. `▶ Run Test Suite` button opens the bottom console drawer with animated log output
3. JIRA cards show hover glow effect
4. Status pill blinks green continuously
5. Responsive: at `<1024px` hero stacks vertically, card grid goes 1-column
6. Fonts load (JetBrains Mono visible in browser DevTools Network tab)
7. Theme tokens apply: background is `#121214`, not white
