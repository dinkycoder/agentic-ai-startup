# Module 0: Orientation — The Founder OS
## Full Content Specification
**Updated:** 2026-05-18

---

## LAYER 1 — LEARNING FRAME

- **Phase:** Pre-Program (Week 0)
- **Title:** Orientation: The Founder OS
- **Tagline:** "Build your operating system before you build your product."
- **Knowles Principle:** Self-Concept
- **Primary Agent:** Sage (Scout + Vera as challengers)
- **YC Integration:** "Should You Start A Startup?" (Seibel) + "How to Get and Evaluate Startup Ideas" (Friedman) + PG "Before the Startup"

**Description:**
This is not an orientation in the traditional sense. There are no welcome videos. No icebreakers. Week 0 is the first test — can you define a real problem worth solving, articulate who it's for, and set up the technical foundation to build? You don't move to Module 1 until the gate is passed.

---

## LAYER 2 — TECHNICAL CURRICULUM

### Environment Setup

**GitHub Repository**
- Create: `[your-name]-ai-startup`
- Required structure:
  - /README.md ← Problem + ICP live here from day 1
  - /docs ← Architecture decisions, research
  - /src ← All code
  - /src/prototypes ← Week-by-week build artifacts
  - .gitignore
- First commit: README with your problem statement

**Local Development**
- Install: Node.js (LTS), Python 3.11+, Git, VS Code
- VS Code extensions: GitHub Copilot, Pylance, Prettier, GitLens
- Test: clone repo → commit → push

**Cloud Account**
- GCP recommended ($300 credit, Vertex AI for Phase 2)
- Don't deploy yet — just have the account

**AI Tools**
- OpenAI API key (never commit to GitHub)
- Cursor IDE or VS Code + Copilot
- Make one API call before Week 1

### Founder Profile Fields
| Field | Guidance |
|---|---|
| Full Name | How agents address you |
| Product Name | Working title — will change |
| Product Description | 2–3 sentences: what, for whom, why |
| ICP | One specific person — not a demographic |
| Problem Hypothesis | Specific pain, no jargon |
| Tech Stack | What you've actually built with — be honest |
| GitHub URL | Your initialized repo |

### Learning Contract (3 Questions)
1. What do you want to have built by the end of Week 17?
2. What is the hardest thing you'll have to learn to get there?
3. What will you do when you want to quit?

### Curated Resources
**Watch (in order):**
1. Michael Seibel — "Should You Start A Startup?" (YC, 20 min)
2. Jared Friedman — "How to Get and Evaluate Startup Ideas" (YC, 44 min)

**Read:**
- PG — "Before the Startup" (15 min)
- Knowles — The Adult Learner, Ch. 1–3

---

## LAYER 3 — AGENT INTERACTIONS
See: agents/MODULE_0_AGENT_SCRIPTS.md

---

## GATE CRITERIA (all 6 required)
1. GitHub repo URL submitted
2. Founder Profile complete (all fields)
3. Problem statement submitted
4. ICP challenged and Scout signed off
5. Vera exchanged on "Why Now"
6. Learning contract submitted and Sage acknowledged

**On gate pass:** Module 1 status → "available", Reed greets student automatically.

---

## ENTITY UPDATES REQUIRED
Add to Student entity:
- `learning_contract` (long text)
- `why_now` (text)
- `why_you` (text)
