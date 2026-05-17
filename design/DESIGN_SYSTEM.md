# Design System
## Agentic AI Start-Up: Engineer Your AI-Native Business

---

## Vibe
Dark, premium, serious. This is a **founder's command center** — not a bootcamp dashboard, not a university portal, not a corporate SaaS tool. The closest reference point is a Bloomberg terminal crossed with a dark-mode IDE crossed with a war room.

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#0a0a0f` | Page background (near black) |
| `surface` | `#13131a` | Cards, panels, modals |
| `surface-raised` | `#1a1a24` | Hover states, elevated cards |
| `border` | `#2a2a3a` | Card borders, dividers |
| `accent-primary` | `#6c63ff` | Electric violet — AI/agentic, CTAs, active states |
| `accent-secondary` | `#00d4aa` | Teal — growth, money, traction |
| `warning` | `#f59e0b` | Amber — pending, in-review, moderate |
| `danger` | `#ef4444` | Red — failed, destructive, low VC score |
| `success` | `#10b981` | Green — passed, active, high score |
| `text-primary` | `#f1f5f9` | Main readable text |
| `text-muted` | `#64748b` | Secondary text, timestamps, labels |
| `text-disabled` | `#374151` | Locked/disabled states |

## Agent Accent Colors

| Agent | Emoji | Color | Hex |
|-------|-------|-------|-----|
| Arch | 🏗️ | Violet | `#6c63ff` |
| Scout | 🔭 | Teal | `#00d4aa` |
| Reed | 🦆 | Blue | `#3b82f6` |
| Vera | 💎 | Gold | `#f59e0b` |
| Mo | ⚙️ | Red | `#ef4444` |
| Sage | 🌿 | Green | `#10b981` |

## Phase Colors

| Phase | Color | Hex |
|-------|-------|-----|
| Pre-Program | Gray | `#64748b` |
| Phase 1 — Foundation Stack | Blue | `#3b82f6` |
| Phase 2 — AI Engineering Core | Violet | `#6c63ff` |
| Phase 3 — Scale Architecture | Teal | `#00d4aa` |
| Phase 4 — GTM & Fundraise | Gold | `#f59e0b` |
| Graduated | Green | `#10b981` |

## VC Readiness Score Colors
- 0–29: `#ef4444` (red — not ready)
- 30–69: `#f59e0b` (amber — in progress)
- 70–100: `#10b981` (green — investor-ready)

## Typography
- Font: Inter (system fallback: -apple-system, sans-serif)
- Headers: Bold, tight tracking
- Body: Regular, relaxed line-height
- Code/technical: JetBrains Mono or similar monospace

## Component Patterns

### Cards
- Background: `surface` (#13131a)
- Border: 1px `border` (#2a2a3a)
- Border-radius: 12px
- Padding: 20px
- Hover: `surface-raised` background + slight border glow in relevant accent color

### Phase badges / status pills
- Rounded pill (border-radius: 999px)
- Small padding: 4px 12px
- Font: 12px bold uppercase
- Background: 15% opacity of phase/status color
- Text: full phase/status color

### Agent avatar chips
- Circle, 32px diameter
- Background: 20% opacity of agent color
- Emoji or initials centered
- Border: 1px agent color at 40% opacity

### VC Readiness Score display
- Large number (48px+), bold
- Color based on score range (see above)
- Label "VC Readiness" in muted text below
- Optional: thin circular progress ring around number

### Chat bubbles
- User messages: right-aligned, `accent-primary` background, white text
- Agent messages: left-aligned, `surface-raised` background, `text-primary`, agent avatar left of bubble
- Timestamps: `text-muted`, 11px, visible on hover

### Navigation sidebar
- Background: `#0d0d14` (slightly darker than page bg)
- Active item: `accent-primary` left border (3px) + `surface` background
- Inactive: `text-muted` icon + label
- Hover: `surface` background

### Buttons
- Primary: `accent-primary` background, white text, 8px radius
- Secondary: transparent, `accent-primary` border and text
- Destructive: `danger` background
- Ghost: no border, `text-muted` text, hover shows `surface`

### Module status indicators
- 🔒 Locked: `text-disabled` color, lock icon, `surface` background
- ▶ Active: `accent-primary` glow, pulsing dot
- ✅ Complete: `success` color, checkmark

## Layout
- Max content width: 1400px, centered
- Sidebar: 240px fixed on desktop, collapsible on mobile
- Grid: 12-column, 24px gap
- Mobile breakpoint: 768px (sidebar collapses, columns stack)
