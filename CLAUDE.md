# CLAUDE.md — EchoTribe Website Project

> **Workflow + scope document.** Three agents work this project: **Engineer**, **Content**, **Design**.
> Every agent reads this file first, then `ECHOTRIBE_MASTER_CONTEXT.md`, then the prior agent's output artifact.
> No agent modifies another agent's artifact. No agent modifies the master context file.

---

## Project Scope

This repo is the **EchoTribe marketing website** at `echotribe.ai`. It is not the creator dashboard, not the Archer integration modules, not the ad builder — those live in `EchoTribe-AI/Echo-Dashboard`.

**Repo:** github.com/EchoTribe-AI/echotribe
**Replit:** replit.com/@EchoTribe/echotribe

The site exists to:
1. Introduce EchoTribe to potential creator partners, brand partners, agencies, networks, and investors
2. Drive qualified inbound through an interactive, personalized landing experience
3. Showcase platform capabilities (EchoSignal, EchoShop, EchoBoost) — see master context for product detail
4. Convert visitors into demo requests, waitlist signups, or partner inquiries

For everything about *what EchoTribe is* — product, audiences, voice, proof points, guardrails — read `ECHOTRIBE_MASTER_CONTEXT.md`.

---

## Tech Stack

- **Framework:** React (converted from Next.js — no SSR, no file-based routing)
- **Deployment:** Replit Reserved VM with Express server (single deploy unit)
- **API endpoint:** `/api/personalize` runs server-side via Express on the same Reserved VM
- **Styling:** CSS-in-JS or CSS modules — no Tailwind, no Bootstrap
- **AI calls:** Anthropic API via `/api/personalize` endpoint (see Interactive Flow)
- **Secrets injection:** Replit Secrets — never hardcoded, never committed

*If Engineer Agent has a stronger architectural recommendation than Reserved VM + Express, they should flag it as an open question in BUILD_PLAN.md before committing to the stack.*

---

## Site Entry Pattern — The Animated Flywheel

Every visitor lands on the same home page: an **animated graphic of the EchoTribe flywheel**. The flywheel is the brand statement — no audience-priority hero, no marketing copy above the fold.

### Flywheel Behavior

**Ongoing ambient animation. No forced wait. No timed gate.**

- The flywheel runs as a continuous, looping animation on the home page from the moment the visitor lands
- It is the visual identity of the entry experience — not a splash screen, not an intro sequence
- An **"Enter Site" button is visible alongside the animation**, available for the visitor to click whenever they're ready
- Visitors who land and want to skip ahead can click Enter Site immediately — there is no minimum dwell time, no animation completion requirement
- Visitors who want to sit with the brand for a moment can do so while the animation loops

**After Enter Site is clicked:**
- Personalization Q1 (name) surfaces
- Flywheel continues as a subtle ambient element in the background or page header throughout the session

**Repeat visitors:**
- localStorage flag tracks first-session completion
- Returning visitors see the same flywheel + Enter Site pattern, no shortcut needed (the animation is the brand, not an obstacle)
- A subtle UI affordance lets users "explore another path" so they can switch audience routes without re-doing personalization

**Why this approach:** A timed gate risks losing audience attention before they engage. The flywheel is meant to be felt, not endured. Letting visitors choose when to enter respects their time while still making the flywheel the first thing they see.

### Implementation Tech

- **Primary:** SVG + Framer Motion (or GSAP) for vector-based animation
- **Why:** Designer Agent can produce vector specs without After Effects, animation is performant on mobile, scales cleanly across viewports
- **Alternatives Engineer can propose:** Lottie if designer prefers AE workflow; Canvas/WebGL if visualization requires it. **Engineer Agent defines the final implementation choice based on Design Agent's animation spec.**

### Accessibility — Mandatory

- "Enter Site" button visible from first paint, focusable, keyboard-accessible
- `prefers-reduced-motion: reduce` shows static flywheel + Enter Site button (no animation loop)
- ARIA live region announcement: "EchoTribe — Commerce powered by Authentic Influence"
- No-JS fallback: static splash with audience path links visible

### Mobile Variant

- Mobile flywheel is simpler — fewer animated elements, lower frame complexity
- Engineer Agent + Design Agent collaborate on mobile spec separately from desktop
- Mobile variant must work at 375px viewport without horizontal scroll

---

## Mobile-First — Non-Negotiable

Every component is designed for a 375px mobile viewport first, then progressively enhanced for tablet (768px+) and desktop (1024px+). The flywheel animation has a dedicated mobile variant — never just CSS-scaled.

**Why this matters:** Steph's audience is 99% mobile. Brand decision-makers will scan EchoTribe on their phones during IPX conference. The first impression is a phone screen.

**Required:**
- Touch targets ≥ 44px on all interactive elements
- Hero typography readable at 375px without horizontal scroll
- Personalization question cards full-screen on mobile, modal on desktop
- Flywheel animation: separate motion spec for mobile (simpler, faster) vs desktop (full visualization)
- Test breakpoints: 375px, 768px, 1024px, 1440px
- Engineer Agent must include mobile breakpoint strategy in BUILD_PLAN.md

---

## Interactive Flow — Two-Pass AI Personalization

The landing page after the flywheel uses a triage-then-personalize pattern. Visitors answer 3–5 lightweight questions; answers personalize headline, emphasis, and CTA language.

```
POST /api/personalize
{
  answers: Record<string, string>,
  questionId?: string,
  inputText?: string
}

Server logic:
  1. TRIAGE prompt (cheap, fast):
     - Returns { needs_more: false } → proceed to PERSONALIZE
     - Returns { needs_more: true, question, options } → surface card
  2. PERSONALIZE prompt (full work):
     - Uses collected answers → generates headline/subhead/CTA variant

Client makes ONE request. Server decides which path. Client gets:
  - { type: 'clarify', question, options }
  - { type: 'result', headline, subhead, cta, ... }
```

See `ECHOTRIBE_MASTER_CONTEXT.md` Section 17 for privacy, abuse prevention, and fallback rules on this flow. **Section 17 rules are non-negotiable.**

---

## Master Cadence — Milestone Order

```
M1 — ENGINEER AGENT
   Produces: BUILD_PLAN.md + component map + API spec
   Locks: file structure, data flow, component contracts, env vars

M2 — CONTENT AGENT  [BLOCKED UNTIL KELLY DELIVERS — see M2 section]
   Reads: BUILD_PLAN.md
   Produces: CONTENT.md (all page copy, personalization Q&A, AI prompts)
   Locks: headline copy, voice, proof framing, prompt templates

M3 — DESIGN AGENT
   Reads: BUILD_PLAN.md + CONTENT.md
   Produces: DESIGN_SYSTEM.md + 2–3 HTML prototype options
   Locks: final palette, typography hierarchy, component styles, motion rules

M4 — BUILD
   Reads: all three artifacts
   Executes in Claude Code or Replit Agent
   No agent runs after this point — all changes are direct edits
```

### Cross-Agent Rules

1. **Read CLAUDE.md first.** Then `ECHOTRIBE_MASTER_CONTEXT.md`. Then prior artifacts.
2. **Stay in your lane.** Engineer doesn't write copy. Content doesn't pick colors. Design doesn't write API specs.
3. **Flag, don't resolve.** Conflicts go back to Kelly, not silent fixes.
4. **Never modify another agent's artifact.** Only your own.
5. **Never modify the master context file.** Kelly maintains it.

---

## ═══════════════════════════════════════════
## M1 — ENGINEER AGENT
## ═══════════════════════════════════════════

**Role:** Architect the build. Produce the skeleton that Content and Design will fill.

**Inputs:**
- This file (`CLAUDE.md`)
- `ECHOTRIBE_MASTER_CONTEXT.md`
- Kelly's verbal context on flow expectations
- Reference repo: `EchoTribe-AI/echotribe` current state

**Output artifact:** `BUILD_PLAN.md`

### Required deliverables in BUILD_PLAN.md

```
1. Component tree
   - File structure (components/, hooks/, api/, lib/)
   - Component contracts (props in, behavior out — no styling yet)
   - Which components are personalization-aware vs. static
   - Animated flywheel home page component (the entry experience)
   - The four audience paths:
     • Brands — visible in main nav, public route, full marketing page
     • Creators — visible in main nav, public route, full marketing page + waitlist
     • Partners — visible in main nav, public route, two sub-paths (Distribute the Loop / Bring Supply)
     • Investors — routable via /investors but NOT in main nav; not SEO-indexed; gated contact form before any pitch content displays
   - Investor routing: When Q2 personalization selects Investor, the flow routes server-side to the gated form. Direct URL hits on /investors show the gate form, not the pitch.

2. Data flow diagram (text or ASCII)
   - User clicks "Enter Site" on flywheel → personalization questions → audience-specific path
   - Where state lives (URL? localStorage? in-memory?)
   - How personalization persists if user refreshes
   - How localStorage flag handles repeat visitors

3. API spec for /api/personalize
   - Request shape
   - Two-pass server logic (triage → personalize)
   - Response shapes (clarify card vs. final content)
   - Error handling and fallback behavior
   - Rate limiting and abuse prevention (master context Section 17)
   - Prompt injection defense (delimiter conventions, schema validation)

4. Environment variables
   - Names, purposes, where they're set (Replit Secrets)
   - Never hardcoded, never committed

5. Build sequence
   - What order components get built
   - Dependencies between components
   - Smallest shippable slice (MVP boundary)
   - Mobile breakpoint strategy

6. Open questions for Kelly
   - Anything blocking that needs a decision before Content/Design start
```

### Engineer Agent — Rules

- **No copy.** Use `{HEADLINE_SLOT}` placeholders. Content Agent fills them.
- **No colors or fonts.** Use semantic tokens (`--color-primary`, `--font-display`). Design Agent assigns values.
- **No design decisions disguised as engineering.** If you're choosing between two visual approaches, that's Design's call — flag it.
- **Two-pass AI flow lives server-side.** Never call Anthropic API from the client.
- **No account creation, no auth.** This is a marketing site.
- **The flywheel home page is the entry experience.** Architect it as an ambient loop with an "Enter Site" CTA — no timed gate, no minimum dwell.
- **Four audience paths must be modular.** Brands, Creators, Partners, Investors — each its own route/component.
- **Mobile-first is non-negotiable.** See Mobile-First section above.

---

## ═══════════════════════════════════════════
## M2 — CONTENT AGENT
## ═══════════════════════════════════════════

**Role:** Write every word the user sees, plus every word the AI generates.

**Inputs:**
- This file (`CLAUDE.md`)
- `ECHOTRIBE_MASTER_CONTEXT.md` — **especially Sections 2, 3, 6, 13, 14, 15, 17**
- `BUILD_PLAN.md` (from Engineer)
- Kelly's question/response context (provided separately — Kelly is preparing this)
- Existing content references in repo at `docs/references/`

**Output artifact:** `CONTENT.md`

### Required deliverables in CONTENT.md

```
1. Personalization questions (final set)
   - Question text, options, skip behavior
   - Order and triage logic
   - First-name handling with quick-select aliases

2. Personalized copy variants
   - Headline + subhead + CTA per persona segment
   - Mapping from {role × monetization × pain} → copy variant
   - Fallback copy when personalization fails or user skips

3. Static page copy (per audience path)
   - Brands page: full copy
   - Creators page: full copy + waitlist CTA framing
   - Partners page: full copy with two paths (Platforms / Agencies & Networks)
   - Investors page: gated, minimal public copy
   - All button labels, microcopy, form labels, error states
   - Footer, legal, accessibility text

4. AI prompt templates
   - TRIAGE prompt (system + user template)
   - PERSONALIZE prompt (system + user template)
   - Output schemas (JSON shape the model must return)
   - Guardrails (what the model must never say — master context Section 15)

5. Voice + tone guide
   - Sample sentences in voice
   - Words to use / never use (cross-reference master context Section 2)
   - How Fraunces italic emphasis gets used in copy
```

### Personalization Questions — Working Set (Content Agent finalizes)

**Universal Questions (every visitor):**

```
Q1 — Name (CONFIRMED)
"What should we call you?"
[text input] | "Just call me a Creator" | "Just call me a Brand" | "Just call me a Partner" | "Skip"

Q2 — Role (CONFIRMED)
"What best describes you?"
Creator / Brand / Partner / Investor
```

**After Q2, the path forks based on Role. The triage prompt at `/api/personalize` handles branching server-side.**

---

**If Role = Creator**

```
Q3 — Monetization
"How are you monetizing right now?"
Amazon Associates / LTK / Brand deals / Nothing yet / Other

Q4 — Pain point
"What's your biggest frustration right now?"
I don't know what's converting / Brands don't pay enough / My links are a mess / I'm leaving money on the table
```

---

**If Role = Brand**

```
Q3 — Product category
"What category does your brand sit in?"
Beauty / Home & Organization / Toys & Games / Apparel / Food / Other

Q4 — Current creator strategy
"How are you working with creators today?"
Active programs / Some campaigns / Just starting / Not yet

Q5 — Goal
"What are you trying to do?"
Product Discovery / Site-Wide Promotions / Both
```

---

**If Role = Partner**

```
Q3 — Partner type
"How do you self-identify?"
Creator platform / Affiliate network / Seller network / Other

Q4 — Integration interest
"What pulls you to EchoTribe?"
Distribute the loop / Bring supply / Both / Just exploring

Q5 — Optional context
[Open text — describe your platform or what you're looking to build]
```

---

**If Role = Investor**

```
Q3 — Stage interest
"What's your typical investment stage?"
Angel / Seed / Series A / Earlier conversation

Q4 — End of public flow
Investor path immediately routes to gated contact form. No public pitch surfaces without form submission.
```

---

**Kelly is providing final question copy + desired AI response patterns separately. Wait for that before finalizing CONTENT.md.**

### M2 Content Agent — BLOCKED UNTIL KELLY DELIVERS

**Do not start M2 Content Agent until:**

1. Kelly has confirmed final personalization question copy
2. Kelly has confirmed desired AI response patterns and tone samples
3. M1 BUILD_PLAN.md is locked

When all three are ready, Kelly signals "M2 unblocked" and Content Agent begins.

### Content Agent — Rules

- **Read master context Section 15 (Content Guardrails) before writing anything.**
- **One question per card.** No multi-step within a single question.
- **Quick-select aliases for name field.** Don't force typing.
- **Fraunces italic is reserved** for emotional weight, not decoration.
- **Voice match:** confident, direct, slightly understated. Closer to editorial than SaaS.
- **EchoBoost message is locked:** "Creator configures preferences (own ad spend balance + brand sponsored). Signals trigger boosts automatically within those rules." Brand-funded is always available; own spend is additive.
- **$170K proof point must always carry EchoBoost-specific framing.** Wherever the stat appears, it must be clear it's amplification proof, not end-to-end platform proof.

---

## ═══════════════════════════════════════════
## M3 — DESIGN AGENT
## ═══════════════════════════════════════════

**Role:** Make it beautiful. Propose direction, then execute the chosen one.

**Inputs:**
- This file (`CLAUDE.md`)
- `ECHOTRIBE_MASTER_CONTEXT.md`
- `BUILD_PLAN.md` (from Engineer)
- `CONTENT.md` (from Content)
- Reference images and old design/content: available in repo at `docs/references/` (Kelly will provide before Design Agent starts) OR by direct request to Kelly

**Output artifact:** `DESIGN_SYSTEM.md` + 2–3 HTML prototype options

### Required deliverables

```
1. Design direction options (2–3 HTML prototypes)
   - Each prototype renders the animated flywheel home + one full audience path
   - Each commits to a clear aesthetic point of view
   - Each labeled (e.g., "Editorial Maximalist," "Refined Minimalist")

2. DESIGN_SYSTEM.md (after Kelly picks a direction)
   - Final color palette with hex + semantic role
   - Type scale (sizes, weights, line heights)
   - Spacing scale
   - Component styles (cards, buttons, inputs, question cards)
   - Motion rules (durations, easings, when to animate)
   - Iconography approach
   - Image/illustration guidance
   - Animated flywheel specification (loop behavior, Enter Site button, mobile variant)

3. Asset list
   - What needs to be sourced or created (creator photos, UI mockup screenshots, etc.)
```

### Palette — Suggestive Baseline (Design Agent proposes final)

The "Precision Editorial" palette Kelly shared:

```
Primary:    #E4366E (warm magenta-pink)
Secondary:  #1A120E (near-black, warm undertone)
Tertiary:   #FBF6F0 (warm off-white)
Neutral:    #6B5C54 (warm brown-gray)
```

The previous design system used `#EC1A8D` as primary. Design Agent should:
- Propose 2–3 palette options anchored around the warm pink direction (`#E4366E` or `#EC1A8D` as starting points)
- Show how each pairs with Fraunces (display) and Plus Jakarta Sans (body)
- Justify the chosen direction in DESIGN_SYSTEM.md

### Typography — Locked

- **Display:** Fraunces (600–800, italic for key phrases)
- **Body/UI:** Plus Jakarta Sans
- **Labels/Mono:** JetBrains Mono (eyebrows, section numbers, technical labels)

Design Agent may propose variants in weight, size, or letter-spacing but **may not swap these typefaces**.

### Hero Reference (from image Kelly shared)

Direction Kelly likes for audience-path heroes (post-flywheel):
- Oversized serif headline, left-aligned, takes 50%+ of viewport width
- Key phrase in Fraunces italic + pink (`"by Authentic Influence"`)
- Subhead in Plus Jakarta Sans, restrained size
- Right side: floating UI cards (creator testimonial, revenue stat) overlapping a creator photo
- Warm off-white background, generous whitespace

This is direction, not spec. Design Agent refines and proposes execution.

### Design Agent — Rules

- **No Inter, Roboto, Arial, system fonts.**
- **No purple gradients.** No generic SaaS gradients of any kind.
- **No dark mode default.** Light theme only unless Kelly explicitly requests otherwise.
- **No muted pastels.** Commit to the palette with confidence.
- **Bold accents over timid palettes.** Dominant colors with sharp accents.
- **Editorial > corporate.** Closer to a magazine than a B2B SaaS site.
- **Motion serves moments.** The flywheel home animation and the question cards are the signature interactions — they deserve special attention.
- **The flywheel animation is the signature interaction.** Loops continuously as ambient background after first view. Mobile variant required (simpler, faster, 375px-native).
- **Primary color is not yet locked.** Design Agent proposes 2-3 palette options anchored around the warm pink direction (`#E4366E` or `#EC1A8D` as starting points). Kelly picks the final.
- **Accessibility is in scope.** All components must meet WCAG 2.1 AA — color contrast, touch targets ≥44px, keyboard nav, `prefers-reduced-motion`.

---

## ═══════════════════════════════════════════
## M4 — BUILD
## ═══════════════════════════════════════════

After M1–M3 are locked, the build executes in either Claude Code or Replit Agent. The build phase reads all three artifacts + the master context and produces the actual codebase. No new agent runs after this point — all changes are direct edits.

**Build environment decision:** TBD by Kelly.

---

## Forms & Conversion

- **All audience CTAs use forms — no calendar booking links on the site**
- **Brands CTA:** Contact form → role pre-selected, fields: name, email, company, product category, what you're interested in
- **Creators CTA:** Waitlist form → name, email, handle, niche, platform
- **Partners CTA:** Partner inquiry form → role selector (Platforms / Agencies & Networks sub-type)
- **Investors CTA:** Gated contact form behind `/investors` route (not in nav) — name, email, fund/firm, stage interest
- **Live demonstration:** `shop.mommyandmecollective.com` — live example of EchoTribe-powered storefront, linked from every audience path
- **No account creation** on this site
- **No calendar booking links** — qualifying via form first

---

## Environment Variables (Replit Secrets)

```
ANTHROPIC_API_KEY              — Anthropic API for personalization calls
BRAND_FORM_ENDPOINT            — Webhook or email endpoint for brand inquiries (TBD)
WAITLIST_FORM_ENDPOINT         — Webhook or email endpoint for creator waitlist (TBD)
PARTNER_FORM_ENDPOINT          — Webhook or email endpoint for partner inquiries (TBD)
INVESTOR_FORM_ENDPOINT         — Webhook or email endpoint for investor gated form (TBD)
```

Never hardcode. Never commit `.env`.

---

## Universal Agent Behavior Rules

- **Make surgical edits.** Don't rebuild files that aren't broken.
- **Ask before large builds.** If a task touches more than 2 components, confirm scope first.
- **Stay in your lane.** Engineer doesn't write copy. Content doesn't pick colors. Design doesn't write API specs.
- **Flag, don't resolve.** Conflicts go back to Kelly, not silent fixes.
- **Master context governs product truth.** When in doubt, defer to `ECHOTRIBE_MASTER_CONTEXT.md`.
- **No dark mode** unless explicitly requested.
- **Two-pass AI calls stay server-side.** Never expose the API key.
- **No invented proof points.** Real numbers or none. Only the $170K / $37K / 4.6× EchoBoost showcase is pre-approved, and it must always carry the EchoBoost-specific framing.

---

## What This Site Is Not

- Not the creator dashboard (`Echo-Dashboard` repo)
- Not the Archer integration layer
- Not the Meta ad campaign builder
- Not a multi-tenant SaaS admin panel
- Not an authenticated app

If a feature request belongs in the dashboard, flag it and defer.

---

*Workflow + scope document — last updated May 17, 2026*
