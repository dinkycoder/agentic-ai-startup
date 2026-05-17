# Agentic AI Start-Up: Engineer Your AI-Native Business
## App Builder Page Specifications v1.0
**Date:** 2026-05-17

---

## GLOBAL DESIGN SYSTEM

**Color palette:**
- Background: #0a0a0f (near black)
- Surface: #13131a (dark card)
- Accent primary: #6c63ff (electric violet — AI/agentic feel)
- Accent secondary: #00d4aa (teal — growth/money)
- Warning: #f59e0b (amber)
- Danger: #ef4444 (red)
- Text primary: #f1f5f9
- Text muted: #64748b

**Typography:** Inter or similar sans-serif. Headers bold. Body regular.

**Vibe:** Dark, premium, serious. Not a bootcamp. Not a university. A founder's command center.

---

## PAGE 1: DASHBOARD
**Route:** `/dashboard` (home/default page)
**Purpose:** The student's mission control. At a glance: where am I, what's next, how is my product doing.

### Layout: 3-column grid on desktop, stacked on mobile

**Top bar (full width):**
- Program name: "Agentic AI Start-Up: Engineer Your AI-Native Business"
- Student name (from Student entity, created_by match)
- Phase badge (color-coded pill: pre-program=gray, phase-1=blue, phase-2=violet, phase-3=teal, phase-4=gold, graduated=green)
- VC Readiness Score (large number, top right, color: red <30, amber 30-69, green 70+)

**Left column (30%):**

*Product Snapshot Card*
- Product name (from Product entity, linked to student)
- One-line description
- MRR: $X (green if >0, gray if 0)
- Users: X
- Deployed URL (clickable link, or "Not deployed yet" grayed)
- GitHub URL (clickable, or "No repo yet")
- "Update Product" button → opens inline edit form

*Phase Progress Bar*
- Visual stepper: Pre-Program → Phase 1 → Phase 2 → Phase 3 → Phase 4 → Graduated
- Current phase highlighted
- Completed phases checked

**Center column (40%):**

*Current Module Card (large, prominent)*
- Module number + title (from Module entity where status=active)
- Phase label
- Description (2-3 lines)
- YC Integration note (italic, smaller)
- Technical Output tag
- Business Output tag
- Primary agents (agent avatar chips — Arch, Scout, etc.)
- Gate criteria (checklist, greyed out until submitted)
- "Mark Complete → Request Gate Review" button (triggers milestone check)

*Next Module Preview (smaller card below)*
- Grayed out, locked icon
- Module number + title
- "Unlocks after gate review"

**Right column (30%):**

*Agent Notifications Panel*
- List of pending agent interactions (from AgentInteraction where follow_up_required=true)
- Each item: agent avatar + name, short summary, time since last interaction
- Click → goes to Agent Hub, opens that agent
- Empty state: "All agents are watching. Start a conversation."

*Weekly Pulse (Sage)*
- If today is Sunday OR no Sage interaction this week: prominent card "Sage is waiting for your weekly reflection →"
- Otherwise: last reflection summary (truncated)

*Milestone Gate Status*
- Current phase milestone card
- Agent sign-off grid (6 agent icons, checkmark or pending)
- Status badge: pending / in-review / passed / failed
- "Request Review" button if all criteria marked

---

## PAGE 2: AGENT HUB
**Route:** `/agents`
**Purpose:** The heart of the agentic peer cohort. Six agents, each with their own chat interface, history, and context.

### Layout: Left sidebar (agent roster) + Main chat area

**Left sidebar:**

*Agent Roster (6 cards, vertically stacked)*
Each card shows:
- Agent avatar (unique icon/emoji per agent)
- Agent name + role subtitle
- Last interaction timestamp
- Unread/pending indicator (orange dot if follow_up_required=true)
- Active state highlighted

Agent visual identities:
- **Arch** 🏗️ — "Systems Architect" — violet accent
- **Scout** 🔭 — "Customer Discovery" — teal accent  
- **Reed** 🦆 — "Debug Partner" — blue accent
- **Vera** 💎 — "VC Investor" — gold accent
- **Mo** ⚙️ — "MLOps Engineer" — red accent
- **Sage** 🌿 — "Learning Facilitator" — green accent

*Context Panel (below agent list)*
- Student's current context (mini snapshot):
  - Product name
  - Phase + Module
  - Last updated

**Main chat area:**

*Agent header (when agent selected)*
- Agent avatar + name + role
- Personality tagline (e.g. Arch: "I don't accept 'it works.' I accept 'here's why it works and what breaks at scale.'")
- Trigger type badge (student-initiated / module-gate / scheduled / escalation)

*Chat interface*
- Message history (from AgentInteraction.messages for this student + agent)
- User messages: right-aligned, accent color bubble
- Agent messages: left-aligned, dark surface bubble with agent avatar
- Timestamps on hover

*Input area*
- Text input: "Talk to [Agent Name]..."
- Send button
- On send:
  1. Creates/updates AgentInteraction record (trigger: student-initiated)
  2. POSTs to `/functions/agentChat` with: agent_id, messages array, student_context (pulled from Student + Product entities)
  3. Displays streaming response
  4. Saves response to AgentInteraction.messages

*Interaction history tab*
- Toggle to see all past sessions with this agent
- Each session: date, trigger type, summary (first 200 chars), outcome

**Empty state (no agent selected):**
- "Your cohort is ready. Who do you want to talk to?"
- 6 agent cards in a grid with their personality taglines
- Suggested first conversations based on current module

---

## PAGE 3: BUILD TRACK
**Route:** `/build`
**Purpose:** Track the thread-the-needle product — the student's startup — across the entire program.

### Layout: Full-width, tabbed

**Top section: Product Hero**
- Product name (large, editable inline)
- One-line description (editable)
- Status chips: MRR | Users | Version | Phase
- Action buttons: "Update Product" | "Log a Pivot" | "Add Mini-Product"

**Tab 1: Product Status**

*Two-column layout:*

Left — Product Details Form (editable)
- Product name
- Description
- ICP (text area)
- Problem Statement (text area)
- Market Hypothesis (text area)
- Moat Statement (text area — Vera will challenge this)
- Tech Stack (multi-tag input)
- GitHub URL
- Deployed URL
- Pitch Deck URL

Right — Traction Metrics
- MRR (number input with $ prefix, large display)
- User Count (number input)
- Version (auto-incremented)
- VC Readiness Score (display only, calculated: 0-100 based on completeness + traction)

VC Readiness Score formula (display logic):
- Problem statement filled: +10
- ICP specific (>50 chars): +10
- Moat statement filled: +15
- GitHub URL present: +10
- Deployed URL present: +15
- User count > 0: +10
- User count > 10: +5
- MRR > 0: +15
- Pitch deck URL present: +10
Total: 100 points

**Tab 2: Pivot History**
- Timeline view of pivot_history array
- Each pivot: date, what changed, why (from pivot log entries)
- "Log New Pivot" button → modal with fields: what changed, why, what you learned
- Appends to Product.pivot_history array

**Tab 3: Mini-Products (Greedy Token Gallery)**
- Grid of MiniProduct records for this student
- Each card: name, description, module number, shipped date, deployed URL chip, market hypothesis
- "Add Mini-Product" button → modal form (name, description, module, deployed URL, market hypothesis, tech stack, user feedback)
- Empty state: "No mini-products yet. Module 1 starts next week. Ship something small."

---

## PAGE 4: CURRICULUM
**Route:** `/curriculum`
**Purpose:** Full program map. 15 modules (Week 0 + 14). Lock/unlock state. YC content integration. Dual outputs.

### Layout: Phase sections with module cards

**Phase header bands (color-coded):**
- Pre-Program: gray — "Founder Onboarding"
- Phase 1: blue — "Foundation Stack" — Weeks 1-4
- Phase 2: violet — "AI Engineering Core" — Weeks 5-10
- Phase 3: teal — "Scale Architecture" — Weeks 11-14
- Phase 4: gold — "Go-To-Market & Fundraise" — Weeks 15-17

**Module card (per module):**
- Module number badge (large)
- Title (large)
- Status indicator: 🔒 locked | ▶ active | ✅ complete
- Phase label
- Description (2 lines)
- Two output tags:
  - 🔧 Technical: [technical_output]
  - 💼 Business: [business_output]
- YC Integration chip (orange YC logo + yc_integration text on hover/expand)
- Knowles Principle chip (green)
- Primary agent avatars (small chips)
- Gate criteria (collapsible accordion)
- "View Module" button → expands full detail panel

**Full detail panel (expanded):**
- Full description
- YC content links (curated — relevant YC essays and videos mapped to module)
- Technical output checklist
- Business output checklist
- Gate criteria checklist (student can self-check)
- Agent assignments with "Start Conversation" shortcut links
- "Request Gate Review" button (active modules only)

**Progress summary bar (top):**
- X/14 modules complete
- Current phase
- Time in program (days since created_date)
- Estimated completion date

---

## PAGE 5: MILESTONE BOARD
**Route:** `/milestones`
**Purpose:** The four phase gates. Agent sign-off status. Criteria tracking. The graduation pathway.

### Layout: 4 milestone columns (horizontal on desktop, stacked on mobile)

**Milestone card (per phase gate):**
- Phase number + title (e.g. "Phase 1 Gate — First Users")
- Status badge: pending / in-review / passed / failed (color-coded)
- Date passed (if applicable)

*Criteria checklist:*
- Each criterion as a checkbox
- Student can self-mark criteria
- Grayed checkboxes until gate review requested

*Agent Sign-Off Grid (6 agents):*
- 2x3 grid of agent icons
- Each: agent name, checkmark (green) or clock (pending) or X (failed)
- Only show agents required for this phase gate
- Tooltip on each: agent's specific sign-off condition

*Action buttons:*
- "Request Gate Review" → sets status to in-review, triggers all required agents
- "View Feedback" → shows feedback field (if status=failed, shows what to fix)

*Phase gate requirements (displayed per milestone):*
- Phase 1: Arch ✓, Scout ✓, Vera ✓ required
- Phase 2: Arch ✓, Scout ✓, Mo ✓, Vera ✓ required
- Phase 3: Arch ✓, Mo ✓, Vera ✓ required
- Phase 4: ALL 6 agents required

**Graduation panel (bottom, full width):**
- Locked until Phase 4 gate passed
- "You've graduated. You built a company." 🎓
- Summary: modules completed, mini-products shipped, total agent interactions, MRR at graduation
- Unlocks: shareable graduation certificate page

---

## PAGE 6: VC ROOM
**Route:** `/vc-room`
**Purpose:** The fundraising command center. Investor discovery, pitch preparation, Vera simulation, materials tracker.

### Layout: Tabbed, full-width

**Tab 1: Investor Discovery (OpenVC Integration)**

*Search + Filter panel (left, 30%):*
- Search bar: "Search investors by name, firm, or thesis..."
- Filters:
  - Stage: Pre-seed / Seed / Series A / Series B+
  - Thesis keywords (text input)
  - Geography (dropdown: US, EU, Global, etc.)
  - Check size range (slider)
- "Search OpenVC" button → calls OpenVC API / database
- "Import to Target List" button on results

*Results panel (right, 70%):*
- Investor cards: name, firm, stage focus, thesis summary, portfolio highlights
- "Add to Target List" button per card
- "Prep with Vera" button → opens Vera chat pre-loaded with investor context

**Tab 2: Target List**

*Table of saved investors:*
- Columns: Investor Name | Firm | Stage | Status | Last Contact | Vera Prep Score | Actions
- Status options: Researching / Outreach Sent / In Conversation / Passed / Committed
- "Vera Prep Score" (0-100): how well the student's pitch matches this investor's thesis (Vera-calculated)
- Actions: "Prep Pitch" (opens Vera) | "Enrich with PitchBook" (triggers Apify scraper) | "Remove"

*Enrichment via Apify PitchBook Scraper:*
- "Enrich" button on each investor
- Calls Apify PitchBook scraper endpoint for that investor name
- Pulls: portfolio companies, check sizes, geographic focus, investment stage history
- Displays enriched data in expanded investor card
- Cached to avoid repeat scraper costs

**Tab 3: Pitch Preparation (Vera Simulation)**

*Vera Chat Interface (full width):*
- Same chat interface as Agent Hub but specifically Vera
- Pre-loaded context: current investor target (if coming from Target List)
- Vera knows: student's product, ICP, MRR, users, moat, current investor target's thesis
- Vera's opening line when investor is selected: "You're pitching [Investor] at [Firm]. Their thesis is [X]. Their recent investments were [Y]. Why does your product fit their pattern?"

*Simulation Modes (toggle):*
- "Casual Review" — Vera gives feedback, asks questions
- "Full Partner Simulation" — Vera plays skeptical partner, interrupts, challenges, scores at the end
- "Pitch Score" — after simulation, Vera gives 1-10 scores on: Problem clarity / Market size / Moat / Traction / Team / Ask

*Pitch Score Card (after simulation):*
- 6 scored dimensions with brief Vera commentary on each
- Overall readiness score
- Top 3 things to fix before the next simulation
- Saves to AgentInteraction with outcome=pitch_score

**Tab 4: Fundraising Materials**

*Document tracker (checklist + upload):*
- [ ] Investor Deck (pitch_deck_url field)
- [ ] Financial Model (upload → file URL)
- [ ] One-Pager / Exec Summary
- [ ] Demo Video URL
- [ ] Product Demo / Live URL
- [ ] YC Application Draft
- [ ] Data Room link

Each item: status chip (not started / draft / ready) + URL/upload field + "Review with Vera" shortcut

*Fundraising timeline:*
- Target raise amount
- Target close date
- Investor meetings scheduled
- Soft commits tracker

---

## PAGE 7: COHORT FEED
**Route:** `/cohort`
**Purpose:** Anonymized peer activity. What are other students shipping? Social proof, accountability, inspiration.

### Layout: Feed + Leaderboard sidebar

**Left (70%) — Activity Feed:**
- Cards showing recent activity from ALL students (anonymized by default, show name if student opts in)
- Activity types with icons:
  - 🚀 "Student in Phase 2 shipped a new mini-product: [product name]"
  - ✅ "Student passed Phase 1 Gate"
  - 💰 "Student in Phase 3 hit their first $100 MRR"
  - 🔄 "Student logged a pivot: [what changed]"
  - 💬 "Student completed [X] agent interactions this week"
- Filterable by: phase, activity type, timeframe
- "React" with: 🔥 🙌 💡 (no comments — keep it async and non-distracting)

**Right (30%) — Leaderboard:**
- "This Week's Builders" — ranked by: agent interactions + mini-products shipped + MRR progress
- Metric pills per student: interactions | products | MRR
- Not competitive — framed as "most active builders" not "winners"

*My Activity Summary (bottom of sidebar):*
- My stats this week: agent interactions, modules progressed, mini-products shipped
- Streak: X weeks active

---

## PAGE 8: SAGE'S JOURNAL
**Route:** `/journal`
**Purpose:** Weekly reflections, andragogical learner analysis, founder growth arc. The most personal page in the app.

### Layout: Left nav (entries) + Main content

**Left nav — Journal entries:**
- Chronological list of reflection entries
- Each: week number, date, brief title (first line of reflection)
- "New Reflection" button (appears prominently on Sundays)
- Filter: All / Weekly Reflections / Module Reflections / Milestone Reflections

**Main content area:**

*Reflection entry view:*
- Date + week number
- Reflection text (Sage's question + student's written response)
- Sage's response/synthesis (from AgentInteraction — Sage's reply)
- Tags: module, phase, Knowles principle activated
- Mood indicator (optional): 😤 struggling / 😐 okay / 🔥 in flow

*New Reflection modal (triggered weekly by Sage):*
Sage's Sunday prompt (rotates weekly):
- Week 1-4: "What did you build this week — and what did building it teach you about your customer?"
- Week 5-10: "Where did your AI system behave in a way that surprised you? What did that reveal?"
- Week 11-14: "What technical decision are you most uncertain about right now? What would it take to be certain?"
- Week 15-17: "What kind of founder are you becoming? How has that changed since week one?"

*Andragogical Learner Analysis (pinned top, collapsible):*
- Completed during Week 0 onboarding
- Displays student's self-assessed: learning style, prior experience, motivation, self-direction level
- Updated by Sage at each phase transition
- Shows growth arc: "Phase 1 Sage noted: X. Phase 2 Sage noted: Y."

*Growth Arc Timeline (bottom):*
- Visual timeline of Sage interactions across the whole program
- Highlights: breakthroughs, pivots, phase transitions, struggles
- Generated from AgentInteraction records where agent_id=sage
- Framing: "Your founder story — from pre-program to graduation"

---

## APP BUILDER PROMPT (copy-paste to App Builder)

Use this prompt when creating/editing pages in the App Builder:

---

**APP NAME:** Agentic AI Start-Up: Engineer Your AI-Native Business

**DESIGN BRIEF:**
Dark premium founder command center. Background #0a0a0f, surface cards #13131a, primary accent electric violet #6c63ff, secondary teal #00d4aa. Inter font. Mobile responsive. No corporate SaaS feel — this is a war room for builders.

**ENTITIES AVAILABLE:**
- Student: full_name, email, phase, current_module, product_name, product_description, icp, problem_hypothesis, github_url, deployed_url, vc_readiness_score, agent_interaction_count, tech_stack
- Product: student_id, name, description, icp, problem_statement, market_hypothesis, current_mrr, user_count, tech_stack, github_url, deployed_url, pitch_deck_url, moat_statement, version, pivot_history
- Module: module_number, title, phase, description, yc_integration, technical_output, business_output, primary_agents, gate_criteria, knowles_principle, status
- AgentInteraction: student_id, agent_id, module_number, phase, trigger, messages, outcome, follow_up_required, knowles_principle_activated, summary
- Milestone: student_id, phase, title, criteria, arch_signoff, scout_signoff, reed_signoff, vera_signoff, mo_signoff, sage_signoff, status, feedback, date_passed
- MiniProduct: student_id, module_number, name, description, deployed_url, github_url, market_hypothesis, user_feedback, tech_stack, shipped_date

**BACKEND FUNCTION:**
- agentChat: POST with {agent_id, messages, student_context, interaction_id} → returns {reply, agent_id}
- Agent IDs: arch, scout, reed, vera, mo, sage

**AGENT VISUAL IDENTITIES:**
- Arch 🏗️ violet #6c63ff — Systems Architect
- Scout 🔭 teal #00d4aa — Customer Discovery
- Reed 🦆 blue #3b82f6 — Debug Partner
- Vera 💎 gold #f59e0b — VC Investor
- Mo ⚙️ red #ef4444 — MLOps Engineer
- Sage 🌿 green #10b981 — Learning Facilitator

**NAVIGATION (left sidebar):**
- 🏠 Dashboard
- 🤖 Agent Hub
- 🔨 Build Track
- 📚 Curriculum
- 🎯 Milestone Board
- 💼 VC Room
- 👥 Cohort Feed
- 📓 Sage's Journal

**DATA SCOPING:**
Always filter entity queries by current logged-in user (created_by = current user). Students only see their own data. The exception is Cohort Feed — show all students' activity, anonymized.

**VC READINESS SCORE logic (compute on frontend, display on Dashboard and Build Track):**
+10 problem_statement filled
+10 icp length > 50 chars
+15 moat_statement filled
+10 github_url filled
+15 deployed_url filled
+10 user_count > 0
+5 user_count > 10
+15 current_mrr > 0
+10 pitch_deck_url filled
= max 100

