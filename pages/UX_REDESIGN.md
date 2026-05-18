# UX Redesign: Guided Step-by-Step Experience
## Updated: 2026-05-18

## Core Principle
One thing at a time. The app always knows what the student needs to do next and shows them only that.

## Navigation (3 pages only)
- Home → "Your Next Move" (default landing)
- Progress → read-only phase/gate overview
- Agents → open chat with any agent

## Home: "Next Move" Screen
Shows only:
- Current module + phase header
- Current task title
- Assigned agent avatar + name
- One primary CTA: "Start" or "Continue"
- Secondary link: "View your progress"
- Nothing else. No stats, no charts, no multi-card layouts.

## Module 0 Guided Flow (5 steps, linear)

### Step 1 — Sage Introduction (auto-triggers on first login)
Full screen chat with Sage.
Sage opens: "Hey. I'm Sage. Before we go any further — I want to know who you actually are. Don't tell me your job title. Tell me: what's a problem you've personally experienced that you can't stop thinking about? Not a problem you read about. One you've lived. That's where we start."
Sage probes → "Next Step" appears when satisfied.

### Step 2 — Founder Profile (4 fields only)
- Your name
- Product working title
- Problem statement (1–2 sentences)
- ICP (one specific person)
Submit → "Save & Continue"

### Step 3 — Scout ICP Challenge
Full screen chat with Scout.
Scout: "Give me your ICP. One person. Not a category."
Challenges until: specific person + evidence of pain + why existing solutions fail.
Scout signs off → "Next Step" appears.

### Step 4 — Vera's Why Now
Full screen chat with Vera.
Vera: "Why now? What changed in the last 2 years?"
One exchange → "Next Step" (Vera plants seed, does not block gate).

### Step 5 — Learning Contract (3 fields)
- What do you want to have built by Week 17?
- What's the hardest thing you'll need to learn?
- What will you do when you want to quit?
Submit: "I'm committed. Start the program."
→ Confetti + Sage message + Module 1 unlocks.

## Module 1 Entry
Next Move screen updates to:
- Module 1 · Phase 1
- Task: "Set up your GitHub repository and make your first commit"
- Agent: Reed
- CTA: "Start with Reed"
Reed opens: "Alright. Have you used GitHub before? Yes or no, and how recently?"

## Design Principles
- One primary action per screen maximum
- Agent avatars large + prominent during conversation
- No infinite spinners — show next guided action if data is empty
- Mobile-friendly — chat interface works on phone
- Progress: subtle step indicator (e.g., "Step 2 of 5") — visible but not dominant
