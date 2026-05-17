# Agentic AI Start-Up: Engineer Your AI-Native Business

> The world's first andragogically-designed, agentic-cohort-powered, VC-optimized AI startup engineering program.

## What This Is

This is not a bootcamp. It is not a university. It is a **founder's command center** — a 17-week program that produces entrepreneurs with launch-ready, market-fit AI-native companies, guided by 6 specialized AI agents as their peer cohort.

**First student:** Dayn Kirksey (the designer himself — built from his own learner avatar outward)

## Theoretical Foundation

### Andragogy (Malcolm Knowles, *The Adult Learner*, 10th ed.)
Every module is designed around Knowles' six principles:
1. **Need to Know** — learners understand WHY before HOW
2. **Self-Concept** — learners are self-directed, not passive recipients
3. **Prior Experience** — existing knowledge is a resource, not a blank slate
4. **Readiness to Learn** — modules unlock when the learner is ready
5. **Orientation to Learning** — problem-centered, not subject-centered
6. **Motivation to Learn** — internal motivation over external compliance

### Geopolitical Frame (Dan Wang, *Breakneck*)
Students are not learning to get jobs. They are choosing to engineer the future — to be the builders that tip civilizational competition toward democratic, autonomous, agentic superpowers.

### YC Startup School
Every module maps to YC Startup School content. The agentic cohort replaces the YC group partner — available 24/7, infinitely patient, ruthlessly honest.

## Program Structure

| Phase | Weeks | Theme |
|-------|-------|-------|
| Pre-Program | Week 0 | Founder Onboarding |
| Phase 1 | Weeks 1–4 | Foundation Stack |
| Phase 2 | Weeks 5–10 | AI Engineering Core |
| Phase 3 | Weeks 11–14 | Scale Architecture |
| Phase 4 | Weeks 15–17 | Go-To-Market & Fundraise |

## The Agentic Peer Cohort

| Agent | Role | Knowles Principle | Core Challenge |
|-------|------|-------------------|----------------|
| 🏗️ **Arch** | Systems Architect | Need to Know | "Why did you design it this way? What breaks at scale?" |
| 🔭 **Scout** | Customer Discovery | Readiness to Learn | "Who is this for? Have you talked to them?" |
| 🦆 **Reed** | Debug Partner | Prior Experience | "Walk me through your reasoning." |
| 💎 **Vera** | VC Investor | Motivation to Learn | "What's your moat? Why can't Google build this?" |
| ⚙️ **Mo** | MLOps Engineer | Orientation to Learning | "Is this production-ready at 3am?" |
| 🌿 **Sage** | Andragogical Facilitator | Self-Concept | "What would you decide if I weren't here?" |

## App Architecture

Built on **Base44** (native platform):
- 6 entities: Student, Product, Module, AgentInteraction, Milestone, MiniProduct
- 2 backend functions: `agentChat` (GPT-4o, all 6 agents), `enrichInvestor` (Apify/PitchBook)
- 8 pages: Dashboard, Agent Hub, Build Track, Curriculum, Milestone Board, VC Room, Cohort Feed, Sage's Journal

## Repository Structure

```
/
├── README.md                          # This file
├── PROGRAM_PHILOSOPHY.md              # Full andragogical + geopolitical framing
├── curriculum/
│   ├── ARCHITECTURE.md                # Full 17-week curriculum architecture
│   ├── modules/                       # Per-module specs (module_00 through module_14)
│   └── yc_mapping.md                  # YC Startup School content mapping
├── agents/
│   ├── AGENT_DESIGN.md                # Agent design philosophy + Knowles mapping
│   ├── arch.md                        # Arch system prompt + design notes
│   ├── scout.md                       # Scout system prompt + design notes
│   ├── reed.md                        # Reed system prompt + design notes
│   ├── vera.md                        # Vera system prompt + design notes
│   ├── mo.md                          # Mo system prompt + design notes
│   └── sage.md                        # Sage system prompt + design notes
├── entities/
│   ├── Student.json                   # Entity schema
│   ├── Product.json                   # Entity schema
│   ├── Module.json                    # Entity schema
│   ├── AgentInteraction.json          # Entity schema
│   ├── Milestone.json                 # Entity schema
│   └── MiniProduct.json               # Entity schema
├── functions/
│   ├── agentChat.ts                   # Deployed backend function — all 6 agents
│   └── enrichInvestor.ts              # Deployed backend function — Apify/PitchBook
├── pages/
│   ├── 01_dashboard.md                # Dashboard page spec
│   ├── 02_agent_hub.md                # Agent Hub page spec
│   ├── 03_build_track.md              # Build Track page spec
│   ├── 04_curriculum.md               # Curriculum page spec
│   ├── 05_milestone_board.md          # Milestone Board page spec
│   ├── 06_vc_room.md                  # VC Room page spec (OpenVC + Apify + Vera)
│   ├── 07_cohort_feed.md              # Cohort Feed page spec
│   └── 08_sages_journal.md            # Sage's Journal page spec
└── design/
    └── DESIGN_SYSTEM.md               # Colors, typography, component patterns
```

## Price Point
$10,000–$15,000 per student. Justified by outcome: a deployed, VC-ready AI-native company.
