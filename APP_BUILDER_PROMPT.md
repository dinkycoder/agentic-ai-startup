# App Builder Prompt
## Agentic AI Start-Up: Engineer Your AI-Native Business

Paste this prompt into the Base44 App Builder to generate the full app.
All entity schemas are pre-defined. All backend functions are deployed.
This prompt covers design system, all 8 pages, data bindings, and VC Room architecture.

---

**App Name:** Agentic AI Start-Up: Engineer Your AI-Native Business

**Description:** A dark, premium founder command center for the world's first andragogically-designed, agentic-cohort-powered, VC-optimized AI startup engineering program. Students build AI-native companies guided by 6 specialized AI agents as their peer cohort across 17 weeks and 4 phases.

---

## DESIGN SYSTEM

Dark premium founder war room. Background #0a0a0f, surface cards #13131a, primary accent electric violet #6c63ff, secondary teal #00d4aa, warning amber #f59e0b, danger red #ef4444, success green #10b981. Text primary #f1f5f9, muted #64748b. Inter font. Mobile responsive. 12-column grid. Sidebar 240px fixed.

Phase colors: Pre-Program=gray #64748b | Phase 1=blue #3b82f6 | Phase 2=violet #6c63ff | Phase 3=teal #00d4aa | Phase 4=gold #f59e0b | Graduated=green #10b981

Agent accent colors: Arch=violet #6c63ff | Scout=teal #00d4aa | Reed=blue #3b82f6 | Vera=gold #f59e0b | Mo=red #ef4444 | Sage=green #10b981

---

## NAVIGATION (left sidebar, dark #0d0d14)

🏠 Dashboard (default) | 🤖 Agent Hub | 🔨 Build Track | 📚 Curriculum | 🎯 Milestone Board | 💼 VC Room | 👥 Cohort Feed | 📓 Sage's Journal

Active item: violet left border 3px + surface background.

---

## ENTITIES

**Student:** full_name, email, cohort_id, phase (enum: pre-program/phase-1/phase-2/phase-3/phase-4/graduated), current_module (number), product_name, product_description, icp, problem_hypothesis, github_url, deployed_url, vc_readiness_score (number), agent_interaction_count (number), tech_stack (string array)

**Product:** student_id, name, description, icp, problem_statement, market_hypothesis, current_mrr (number), user_count (number), tech_stack (array), github_url, deployed_url, pitch_deck_url, moat_statement, version (number), pivot_history (object array)

**Module:** module_number (number), title, phase (number), description, yc_integration, technical_output, business_output, primary_agents (string array), gate_criteria, knowles_principle, status (enum: locked/active/complete)

**AgentInteraction:** student_id, agent_id (enum: arch/scout/reed/vera/mo/sage), module_number, phase, trigger (enum: student-initiated/module-gate/milestone/scheduled/escalation), messages (array of {role, content, timestamp}), outcome, follow_up_required (boolean), knowles_principle_activated, summary

**Milestone:** student_id, phase (number), title, criteria (string array), arch_signoff (bool), scout_signoff (bool), reed_signoff (bool), vera_signoff (bool), mo_signoff (bool), sage_signoff (bool), status (enum: pending/in-review/passed/failed), feedback, date_passed

**MiniProduct:** student_id, module_number (number), name, description, deployed_url, github_url, market_hypothesis, user_feedback, tech_stack (array), shipped_date

---

## BACKEND FUNCTIONS

- **agentChat** — POST {agent_id, messages[], student_context{}, interaction_id} → {reply, agent_id}. Agent IDs: arch, scout, reed, vera, mo, sage. Calls GPT-4o with agent-specific system prompts that include full student context.
- **enrichInvestor** — POST {investor_name, firm_name} → {found, investors[]}. Calls Apify PitchBook scraper for investor enrichment.

---

## AGENT IDENTITIES

| Agent | Emoji | Color | Role | Tagline |
|-------|-------|-------|------|---------|
| Arch | 🏗️ | #6c63ff violet | Systems Architect | "I don't accept 'it works.' I accept 'here's why it works and what breaks at scale.'" |
| Scout | 🔭 | #00d4aa teal | Customer Discovery | "Your ICP is too broad. Give me a specific name." |
| Reed | 🦆 | #3b82f6 blue | Debug Partner | "Walk me through what you're trying to do." |
| Vera | 💎 | #f59e0b gold | VC Investor | "Why can't Google build this in 6 months?" |
| Mo | ⚙️ | #ef4444 red | MLOps Engineer | "Deployed isn't production-ready." |
| Sage | 🌿 | #10b981 green | Learning Facilitator | "What would you decide if I weren't here?" |

---

## PAGE 1 — DASHBOARD (default home)

3-column layout. Always filter by current logged-in user (created_by = current user).

**Top bar (full width):** Program name left. Student name center. Phase badge (color-coded pill) + VC Readiness Score (large number, colored red/amber/green) right.

VC Readiness Score formula (compute on frontend from Product entity):
+10 problem_statement filled | +10 icp >50 chars | +15 moat_statement filled | +10 github_url filled | +15 deployed_url filled | +10 user_count>0 | +5 user_count>10 | +15 current_mrr>0 | +10 pitch_deck_url filled = 100 max

**Left (30%):** Product Snapshot Card (product name, description, MRR in green if >0, users, deployed URL clickable, GitHub URL, "Update Product" button → inline edit). Phase Progress stepper (Pre-Program → P1 → P2 → P3 → P4 → Graduated, current highlighted, complete checked).

**Center (40%):** Current Module Card — large. From Module where status=active: number badge, title, phase, description, YC integration note (italic), technical output tag 🔧, business output tag 💼, agent avatar chips, gate criteria checklist (grayed until submitted), "Mark Complete → Request Gate Review" button. Below: Next Module preview card (grayed, locked icon, "Unlocks after gate review").

**Right (30%):** Agent Notifications Panel — AgentInteraction where follow_up_required=true, each showing agent avatar + name + summary + time since. Click → Agent Hub. Empty state: "All agents are watching. Start a conversation." Weekly Sage card (prominent if Sunday or no Sage interaction this week): "Sage is waiting for your weekly reflection →". Milestone gate status card: current phase milestone, 6 agent sign-off icons (✓ green or ⏳ amber), status badge, "Request Review" button.

---

## PAGE 2 — AGENT HUB

Left sidebar (280px): 6 agent cards stacked. Each: avatar circle (agent color bg, emoji), name, role subtitle, last interaction timestamp, orange dot if follow_up_required=true. Active agent highlighted with left border in agent color. Below roster: mini context panel (product name, phase, module).

Main area — when agent selected:
- Header: large avatar + name + role + personality tagline + trigger type badge
- Chat interface: message history from AgentInteraction.messages filtered by student + agent_id. User messages right-aligned violet bubble. Agent messages left-aligned dark surface bubble with agent avatar. Timestamps on hover.
- Input bar: "Talk to [Agent Name]..." text field + Send button.
- On send: 1) Create AgentInteraction record (trigger: student-initiated) 2) POST to agentChat function with {agent_id, messages, student_context from Student+Product entities} 3) Display reply 4) Update AgentInteraction.messages
- Below chat: "Past Sessions" tab — list of all prior interactions with this agent (date, trigger, summary, outcome).

Empty state (no agent selected): "Your cohort is ready. Who do you want to talk to?" + 6 agent cards in 2x3 grid with taglines + suggested first conversation based on current module.

---

## PAGE 3 — BUILD TRACK

Tabbed full-width. Filter all data by current user.

**Hero section:** Large editable product name, one-line description, chips (MRR | Users | v{version} | Phase), buttons: "Update Product" | "Log a Pivot" | "Add Mini-Product"

**Tab 1 — Product Status:** Two columns.
Left: editable form — name, description, ICP (textarea), problem statement (textarea), market hypothesis (textarea), moat statement (textarea, label: "Vera will challenge this"), tech stack (tag input), GitHub URL, deployed URL, pitch deck URL. Save button.
Right: Traction Metrics — MRR ($X large display, green), User Count (large), Version, VC Readiness Score (large number with color + circular progress ring, computed from Product fields, display only).

**Tab 2 — Pivot History:** Timeline of Product.pivot_history array. Each entry: date, "What changed" field, "Why" field, "What I learned" field. "Log New Pivot" button → modal (what changed, why, what you learned) → appends to pivot_history. Empty state: "No pivots logged. Every pivot is a data point."

**Tab 3 — Mini-Products (Greedy Token Gallery):** Grid of MiniProduct records. Each card: name, description, module badge, shipped date, deployed URL chip (green if filled), tech stack tags. "Add Mini-Product" → modal (name, description, module number, deployed URL, GitHub URL, market hypothesis, tech stack, user feedback, shipped date). Empty state: "No mini-products yet. Ship something small this week."

---

## PAGE 4 — CURRICULUM

Progress bar top: X/14 modules complete | current phase | days in program | estimated completion.

Phase bands (color-coded headers — see phase colors above):
- Pre-Program (gray): "Founder Onboarding — Week 0"
- Phase 1 (blue): "Foundation Stack — Weeks 1–4"
- Phase 2 (violet): "AI Engineering Core — Weeks 5–10"
- Phase 3 (teal): "Scale Architecture — Weeks 11–14"
- Phase 4 (gold): "Go-To-Market & Fundraise — Weeks 15–17"

Under each band: module cards from Module entity filtered by phase. Each card:
- Module number badge (large, phase color)
- Title (large bold)
- Status icon: 🔒 locked (disabled text) | ▶ active (violet glow + pulse dot) | ✅ complete (green)
- 2-line description
- Tags: 🔧 {technical_output} | 💼 {business_output}
- YC chip (orange): hover shows yc_integration text
- Knowles chip (green): knowles_principle
- Agent avatar chips: primary_agents array
- Collapsible "Gate Criteria" accordion: gate_criteria text
- "View Module" expand button → full detail panel

Full detail panel (slide-in or expand):
- Full description
- Technical output checklist (student self-check)
- Business output checklist (student self-check)
- Gate criteria checklist
- Agent shortcuts: for each agent in primary_agents, "Talk to [Agent]" button → opens Agent Hub for that agent
- "Request Gate Review" button (active modules only) → sets Milestone status to in-review

---

## PAGE 5 — MILESTONE BOARD

4 columns horizontal (desktop), stacked (mobile). Each column = one Milestone record.

Per milestone card:
- Phase number header (large, phase color)
- Title (e.g. "Phase 1 Gate — First Users")
- Status badge: pending=gray | in-review=amber pulse | passed=green | failed=red
- Date passed (if passed)

Criteria checklist: each criterion from criteria array as checkbox. Student can self-mark. Grayed until gate review requested.

Agent sign-off grid (2x3 or 3x2 grid of agent icons):
- Phase 1: show Arch + Scout + Vera (3 agents)
- Phase 2: show Arch + Scout + Mo + Vera (4 agents)
- Phase 3: show Arch + Mo + Vera (3 agents)
- Phase 4: show all 6 agents
- Each icon: green checkmark if {agent}_signoff=true, amber clock if false
- Tooltip: agent's specific sign-off condition

Buttons: "Request Gate Review" (sets status=in-review) | "View Feedback" (shows feedback field, prominent if status=failed).

Bottom full-width: Graduation panel. Locked if Phase 4 milestone status ≠ passed. When passed: "You built a company." 🎓 + stats (modules complete, mini-products shipped, total agent interactions, final MRR, program duration in days).

---

## PAGE 6 — VC ROOM

Tabbed full-width.

**Tab 1 — Investor Discovery:**
Left (30%): Search panel. Search bar "Search investors by name, firm, or thesis..." + filters: Stage (Pre-seed/Seed/Series A/Series B+), Thesis keywords (text), Geography (dropdown), Check size (slider $50K–$10M). "Search OpenVC" button. Note: OpenVC is a free investor database at openvc.app — integrate via their public search or display curated static results filtered by the user's inputs.

Right (70%): Investor result cards. Each: investor name, firm, stage focus, thesis summary, portfolio highlights. Buttons: "Add to Target List" (creates local record) | "Prep with Vera" (navigates to Tab 3 with investor context pre-loaded).

**Tab 2 — Target List:**
Table of saved investors. Columns: Name | Firm | Stage | Status (Researching/Outreach Sent/In Conversation/Passed/Committed, editable dropdown) | Last Contact (date input) | Vera Prep Score (0–100, computed from Vera simulation) | Actions.
Actions per row: "Prep Pitch" → Tab 3 with this investor | "Enrich" → calls enrichInvestor function with investor name + firm, displays enriched PitchBook data in expanded row (portfolio, check sizes, recent investments, geography) | "Remove".

**Tab 3 — Pitch Preparation (Vera Simulation):**
Full-width Vera chat. Same chat component as Agent Hub but locked to Vera agent.
If navigated from Target List with investor context: pre-load investor data into Vera's context. Vera's opening: "You're pitching [Investor] at [Firm]. Their thesis is [thesis]. Their recent investments include [portfolio]. Why does your product fit their pattern?"

Mode toggle (top of chat): Casual Review | Full Partner Simulation | Pitch Score.

After conversation, "Generate Pitch Score" button → Vera returns structured scores:
- Problem Clarity (0–10)
- Market Size (0–10)
- Moat (0–10)
- Traction (0–10)
- Team (0–10)
- Ask (0–10)
- Top 3 things to fix (list)
- Overall readiness score

Display Pitch Score Card below chat. Save scores to AgentInteraction (outcome field).

**Tab 4 — Fundraising Materials:**
Checklist of required docs with status chips (not started / draft / ready):
□ Investor Deck | □ Financial Model | □ One-Pager / Executive Summary | □ Demo Video URL | □ Live Product URL | □ YC Application Draft | □ Data Room Link

Each item: status chip + URL/upload field + "Review with Vera" shortcut → opens Tab 3 with context "Review my [document type]".

Below checklist: Fundraising Timeline form (target raise amount, target close date, investor meetings scheduled, soft commits count).

---

## PAGE 7 — COHORT FEED

Left (70%): Activity feed. Pull from ALL students (no created_by filter — this is the exception). Show activity cards for:
🚀 New mini-product shipped (MiniProduct.created_date)
✅ Phase gate passed (Milestone.status=passed)
💰 First MRR (Product.current_mrr >0 for first time)
🔄 Pivot logged (Product.pivot_history length increase)
💬 Agent interaction milestone (AgentInteraction count thresholds: 10, 25, 50, 100)

Each card: activity icon + anonymized description ("A founder in Phase 2 shipped: [product name]") + time since. Student name shown only if student has opted in (add opt_in_cohort boolean to Student entity).

React buttons: 🔥 🙌 💡 (store as reaction counts on activity).

Filter bar: Phase (All/1/2/3/4) | Activity type | This week / This month / All time.

Right (30%): "This Week's Builders" — students ranked by (agent_interaction_count + mini_products_count×3 + mrr>0×5). Framed: "Most active builders this week" not a leaderboard. Show top 5 with metric pills.

My Activity (bottom of right sidebar): My interactions this week | my mini-products | my streak (weeks with at least one interaction).

---

## PAGE 8 — SAGE'S JOURNAL

Left nav (240px): Chronological list of AgentInteraction records where agent_id=sage, sorted by created_date desc. Each item: week number, date, first 60 chars of student's first message. "New Reflection" button prominent (especially highlighted on Sundays). Filter tabs: All | Weekly | Module | Milestone.

Main content: When entry selected:
- Date + Week N header
- Sage's prompt question (the user message that triggered the session, if trigger=scheduled)
- Student's full response
- Sage's reply (from messages array)
- Tags: module number, phase, knowles_principle_activated
- Optional mood indicator: 😤 struggling | 😐 okay | 🔥 in flow (stored in outcome field)

New Reflection flow: "New Reflection" button → opens Sage chat pre-loaded with the weekly prompt for the current week range:
- Weeks 1–4: "What did you build this week — and what did building it teach you about your customer?"
- Weeks 5–10: "Where did your AI system behave in a way that surprised you? What did that reveal?"
- Weeks 11–14: "What technical decision are you most uncertain about right now? What would it take to be certain?"
- Weeks 15–17: "What kind of founder are you becoming? How has that changed since week one?"

Pinned top section (collapsible): Andragogical Learner Analysis. From Week 0 Sage interaction. Fields: learning style, prior experience summary, motivation statement, self-direction level (1–5). Updated by Sage at each phase transition. Shows phase-by-phase evolution.

Bottom full-width: Growth Arc Timeline. Visual horizontal timeline of all Sage interactions. Milestones marked: phase transitions, pivots, breakthroughs (outcome=breakthrough), struggles (outcome=escalation). Title: "Your founder story — from pre-program to graduation."

---

## DATA SCOPING RULES

- All pages EXCEPT Cohort Feed: filter entity queries by created_by = current logged-in user
- Cohort Feed: show all students, anonymized unless opt_in_cohort=true
- Admin role (Dayn Kirksey): sees all data unfiltered
- Enable authentication. Students must log in. Role field on User entity.

---

## GITHUB REFERENCE

Full specifications, agent prompts, curriculum architecture, and design system:
https://github.com/dinkycoder/agentic-ai-startup
