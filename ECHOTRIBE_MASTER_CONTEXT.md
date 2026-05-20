# ECHOTRIBE_MASTER_CONTEXT.md

> **Master context file for the EchoTribe website project.**
> This document is the source of truth for what EchoTribe is, who it serves, what it does, and how it talks about itself. Every agent (Engineer, Content, Design) reads this alongside `CLAUDE.md`. When the two conflict, `CLAUDE.md` governs workflow and scope; this document governs product, positioning, and voice.

---

## 1. Document Purpose & Usage

This file exists so any agent — or any human onboarding to the project — can understand EchoTribe in full without needing to assemble context from scattered chats, decks, or repos. It is the single referenced context source for the website build.

Read order for agents:
1. `CLAUDE.md` (workflow, scope, agent roles)
2. This file (product, audiences, voice, guardrails)
3. The output artifact of the prior agent in the milestone chain

This file is updated when product reality changes. The website is built against this file.

---

## 2. Company Identity

**Product:** EchoTribe
**Legal entity:** M31 Synergy LLC
**Domain:** echotribe.ai
**Storefront (public-facing demo):** shop.mommyandmecollective.com
**Repo:** github.com/EchoTribe-AI/echotribe
**Replit:** replit.com/@EchoTribe/echotribe
**Internal contact:** kelly@echotribe.ai *(not for public display)*

### Tagline
**Commerce powered by Authentic Influence.**

### The "Authentic Influence" Reframe — Non-Negotiable

EchoTribe never uses "AI" or "artificial intelligence" in creator-facing or brand-facing marketing copy. "AI" stands for **Authentic Influence** — a deliberate reframe that emphasizes real creator-audience trust over algorithmic automation.

- **Creator-facing and brand-facing copy:** Never "AI-powered." Use "intelligent recommendations," "signal-driven," or describe what it does.
- **Partner-facing technical pages:** May describe the actual technology stack (LLM use, ML models, etc.) because integration buyers need to understand what they're plugging into. Still never lead with "AI-powered" as the value proposition.
- **The phrase "AI" in EchoTribe materials always resolves to "Authentic Influence."** This is the brand line.
- **Routing language is restricted until EchoRoute is built.** Do not use "smart routing," "intelligent routing," "auto-routing," or "the routing layer" in public copy. Use "recommendations," "linking," "affiliate paths," or "deep linking" instead. Once EchoRoute ships, this restriction is removed.

### Brand Voice Rules

- Lead with verbs and proof, not abstractions
- Every claim backed by a number — no "massive," "huge," or "transformative" without a stat
- Honest about stage: "working prototype," "founding creator partnership," "launching soon" — never overpromise
- Mobile reads short — every paragraph under 3 lines on mobile
- Direct, fast-moving, unsentimental — same as founder voice
- Casual but credible — short sentences, dash-punctuated, no jargon-as-drama
- Always offer a next step — every response should suggest the form, demo, or path to learn more

### Banned Words (SaaS Clichés)

`seamless` · `robust` · `leverage` · `harness` · `unleash` · `empower` · `transformative` · `intelligence stack` · `high-velocity` · `unlock` · `amplify` *(except when literally describing EchoBoost)* · `world-class` · `next-generation` · `revolutionize` · `reimagine` · `cutting-edge`

**Approved exception — "the loop" / "the closed loop":** The flywheel thesis (Section 3) treats the EchoTribe signal-creation-amplification cycle as "the loop" or "the closed loop." This is the brand's core differentiator phrase, not a SaaS cliché. Use freely when describing the flywheel architecture. Do not use "closed loop" as a generic buzzword applied to anything else (e.g., "closed-loop reporting"). Reserved for the flywheel thesis only.

---

## 3. The Thesis — The Flywheel

Most affiliate platforms measure influence after the fact. Most creator platforms publish content and hope it lands. Neither closes the loop between what's working right now and what gets amplified next.

**EchoTribe is that closed loop.**

```
       ┌─────────────────────────────────────────┐
       │                                         │
       ▼                                         │
  EchoSignal                                     │
  (detection)                                    │
       │                                         │
       ▼                                         │
  EchoShop + EchoAgent                           │
  (creation)                                     │
       │                                         │
       ▼                                         │
  [threshold hit]                                │
       │                                         │
       ▼                                         │
  EchoBoost                                      │
  (amplification)                                │
       │                                         │
       ▼                                         │
  conversion data sharpens next cycle ───────────┘
```

**EchoSignal** detects product momentum in real time — surfacing what creators, brands, and audiences are responding to before the rest of the market sees it.

**EchoShop (with EchoAgent built in)** turns those signals into action. Creators build shoppable collections against trending products. Brands curate their own collections from creator demand. The shopping agent recommends what to feature, when, and to whom.

**EchoBoost** closes the loop. When a signal hits a threshold, the system amplifies the creator's original post with paid spend — turning organic momentum into measurable conversion, with the creator's content always as the flagship creative.

**The moat isn't any single product. It's the loop itself.** Detection feeds creation, creation generates more signal, signal triggers amplification, amplification produces conversion data that sharpens the next detection cycle. Every cycle compounds.

### Proof Point Anchor
$170K in creator earnings on $37K ad spend = **4.6× ROAS**. Achieved through EchoBoost amplification of the creator's organic content over a campaign window. Proven on Mommy & Me Collective as featured client. *(EchoShop storefront is launching soon — this proof point is about boost amplification specifically.)*

**This proof point must always carry the EchoBoost-specific framing wherever it appears** — homepage, brand pitch, partner outreach. It is not end-to-end platform proof; it is specifically EchoBoost amplification proof.

---

## 4. The Product Stack

### EchoSignal — Detection
**Status:** Live with active upgrades in progress.
**Primary audience:** All audiences (the foundation of the flywheel).

Daily performance ingestion across Walmart and Amazon. Walmart automated via Impact API; Amazon via CSV from Associates dashboard (Creators API has no clicks/orders endpoint, so this is the current ingestion method). Recency-weighted Hot Score with 3.5-day half-life decay. Price polling every 6 hours on Hot 20 ASINs via Amazon Creators API GetItems. Price-drop detection with tiered boosting (10%/20%/35% thresholds). Signal confirmation logic: Day 0 click spike → Day 1 sales confirmation → 24-hour validation window.

### EchoShop — Creation
**Status:** Live. Public-facing demo at shop.mommyandmecollective.com.
**Primary audience:** Creators, Brands.

A creator-branded storefront with trending collections, a custom shopping agent (EchoAgent), and routing into Walmart, Amazon, and direct retailers. Built around the creator's voice, not EchoTribe's. Includes a Custom Collections Builder that lets creators search across all products in the database (by keyword, tag, title, price, category, affiliate link) and build collections from any retailer.

### EchoAgent — Shopping Assistant (feature of EchoShop)
**Status:** Live with improvements queued.
**Primary audience:** Creators and their audiences.

Trained on the creator's full affiliate catalog and conversion data. Answers audience product questions, routes recommendations through highest-converting affiliate links, and is being upgraded to also link to matching collections (not just individual products). Conversation logs stored per team member for attribution.

**Public-facing language:** EchoAgent is part of EchoShop. We don't market it as a separately purchasable product. It's a built-in capability that makes EchoShop work.

### EchoBoost — Amplification
**Status:** EchoBoost amplification is operational as a managed service today — meaning EchoTribe runs the boost on behalf of brand partners using the documented signal triggers. The self-serve dashboard / approval UI is mockup-ready for IPX brand meetings; production build is post-conference. When discussing with brands: **capability is live, interface is in preview.**
**Primary audience:** Creators, Brands.

When organic content crosses the conversion threshold, EchoBoost amplifies the creator's original post with paid spend. Creator's content is always the flagship creative — EchoBoost doesn't generate new ads, it pours fuel on what's already working.

**Locked product language (the one clean message):**
> Creator configures preferences (own ad spend balance + brand sponsored). Signals trigger boosts automatically within those rules.

The brand-funded path is always available. Creator can layer their own ad spend on top if they choose. It's additive, not either/or.

### Insights Dashboard
**Status:** Being rebuilt for client.
**Primary audience:** Creators (in-platform), Brands (in-platform).

Replacing the original internal insights dashboard with a client-focused analytics view. Will surface earnings lift tracking, category performance, conversion data, and predictable income forecasting from affiliate + brand partnerships.

### EchoRoute — OUT of Public Messaging
**Status:** Not built yet — 3–6 months out. **Do not reference publicly.**

Currently all links are wrapped through URLGenius with affiliate parameters; smart routing logic is future work. Until built, EchoTribe does not message a routing layer.

---

## 5. The Featured Client — Mommy & Me Collective

### Who She Is
- **Public-facing:** Everyday Steph (@EverydaywithSteph) and her team & community Mommy & Me Collective
- **Behind the scenes:** Steph, with her husband Dan and assistant Laine handling daily operations
- **Relationship to EchoTribe:** **Featured client and use case**, not employee or co-founder. 30% revenue share arrangement (not an investor). 18-month working partnership.

### What She Runs
- Multiple Facebook groups (largest "Mommy & Me Deals 2.0" with 316K members; second group "Mommy & Me Deals" with 156K members)
- Multiple Facebook pages
- Instagram presence
- Newsletter via Beacons
- Link-in-bio at mommyandmecollective.com
- Curated shop at shop.mommyandmecollective.com (powered by EchoTribe — launching soon)

### Stats Permission Tiers

EchoTribe stats fall into three permission categories. Use the right tier for the right context.

#### Tier 1 — Public (Homepage, marketing pages, public collateral)

| Metric | Value | Use Where |
|---|---|---|
| Community members | 500K+ | Homepage hero, brand pitch, partner outreach |
| Content views/year | 40M+ | Homepage proof band |
| Top product categories | 25+ active | Brand pitch (category fit), partner outreach |
| EchoBoost showcase result | $170K / $37K / 4.6× ROAS | Homepage hero, brand pitch (always with the EchoBoost framing from Section 3) |

#### Tier 2 — Sales-call only (Not in public marketing, but shareable in 1:1 conversations with qualified brands, partners, investors)

| Metric | Value | Source |
|---|---|---|
| Walmart purchase CVR | 12–17% | Impact platform 2025 + 2026 YTD |
| Avg Meta ad CTR | 16.7% | Q4 2025 boosted campaigns |
| Amazon CVR | 11%+ | Amazon Associates 2025–2026 YTD |
| Top categories by buyer activity | Toys & Games · Home · Baby · Beauty · Outdoor · Clothing · Kitchen · Health & Household | Detailed list, Tier 2 context only |

#### Tier 3 — Internal only (Never in any external context)

- Exact dollar revenue figures beyond the pre-approved EchoBoost showcase
- Specific monthly earnings or commission breakdowns
- Organic affiliate performance numbers (separate from the pre-approved boost campaign)
- Personal/family details beyond Steph's public name and brand
- Internal rev-share tier percentages (Section 10)

---

## 6. The Four Audiences

EchoTribe serves four distinct audiences. Each has its own path through the site, its own pitch, and its own CTA. Every visitor lands on the same animated flywheel home page; from there, personalization routes them to the right audience pitch.

### 6a. Creators

**Who they are:** Individual creators with engaged audiences who currently monetize through affiliate links, brand deals, or their own content. They have audiences they trust; they're underpaid for the conversion they drive.

**Flywheel cut:**
> Discover what's trending in your niche (EchoSignal) → Build collections that convert (EchoShop) → Watch your best posts get amplified — brand-funded, on your terms (EchoBoost).

**What we offer them:**
- EchoShop branded storefront under their own domain
- Trend feed and signal-based collection suggestions
- Shopping assistant trained on their catalog
- Signal-based boosting (own ad spend + brand sponsored, configurable)
- Earnings lift tracking to demonstrate platform value over time
- Stabilized income forecasting from combined affiliate + brand revenue

**Status:** Waitlist only. Creator onboarding is gated. Mommy & Me Collective is the live proof.

**CTA:** Join waitlist. Full pitch is shown — the creator story is the proof point, so it's not hidden.

### 6b. Brands

**Who they are:** Direct-to-consumer brands, Amazon/Walmart sellers, and product-led companies who currently run affiliate or creator campaigns and want better attribution + better creator activation.

**Flywheel cut:**
> See which of your products creators are already moving (EchoSignal) → Curate branded collections from real demand (EchoShop) → Amplify the creator content that's already converting (EchoBoost).

**What we offer them:**
- **Sponsored Collections** — brand-funded curated collections featured in creator storefronts, category-matched and seasonally timed
- **Signal-Based Boosting (EchoBoost)** — paid amplification of organic content that's already converting, backed by real conversion data
- **Category & Trend Visibility** — real-time access to category trends and conversion data before pitching collections
- **Newsletter Inclusion (Sponsored)** — match sponsored collections to existing newsletter themes via approval-based inclusion
- **Brand-Side Dashboard** — full visibility into organic + paid performance (demo mockup for IPX conference; production build post-conference)

**Status:** Open for business now. Brand partnerships available.

**CTA:** Contact form / partner inquiry.

### 6c. Partners

EchoTribe is the closed loop between creator signal, branded commerce, and paid amplification. Partners plug in to either **distribute the loop** or **bring supply to the loop**.

#### Distribute the Loop (Platforms)

**Who self-identifies here:**
- Creator Tool Platforms (LTK, Beacons, Linktree, ShopMy, Stan, etc.) — give your creator base intelligence they don't have
- Affiliate Networks (Impact, CJ, Partnerize, Rakuten) — add the creator-side activation layer you don't have
- Creator Agencies (talent management, MCNs) — give your roster access to the platform

**What EchoTribe does for them:** Plugs the EchoTribe intelligence layer into their existing platform/network. Their creators get EchoSignal trend data, EchoShop collection tools, and EchoBoost amplification through the platform they already use.

**What they bring:** Distribution. Existing creator bases, brand relationships, tracking infrastructure, scale.

**Sales motion:** API integration + revenue share. White-label or co-branded options possible. Long-term partnership / embedded venture for major networks.

**CTA:** Talk to us about integration / request integration spec.

#### Bring Supply to the Loop (Agencies & Networks)

**Who self-identifies here:**
- Brand Agencies (performance agencies, affiliate agencies, creator campaign agencies like 456Growth) — run client campaigns through EchoTribe
- Amazon & Walmart Seller Networks (Archer, Levanta, brand aggregators) — connect catalog to creator activation
- Brand Aggregators — bring brand inventory to creator audiences

**What EchoTribe does for them:** Surfaces which of their brand catalog is already being moved by creator audiences (signal), and gives them creator-side activation (collections + amplification). Becomes a capability they resell or layer into client campaigns.

**What they bring:** Brand demand, brand inventory, brand budget, existing brand relationships.

**Sales motion:** Revenue share on attributed conversions. Flat fee + commission on managed spend for agencies. White-label or co-branded available.

**CTA:** Talk to us about partnership / case study request.

#### Partner Page Structure (for Design + Engineering reference)
One overview page at `/partners`. Opens with the flywheel and the unifying line. Splits visually into the two paths. Each path has: what EchoTribe does for them, what they bring, who self-identifies, CTA. **No deep sub-pages on launch.** Add them only when sales conversations prove they're needed.

### 6d. Investors

**Who they are:** Angel and seed-stage investors with thesis fit for creator economy, commerce intelligence, or affiliate infrastructure.

**Pitch framing:** A self-reinforcing data flywheel where every cycle compounds — more creators feeding signal, more signal sharpening recommendations, more recommendations producing conversion data, more data widening the gap competitors can't close.

**Proof points:** $170K / 4.6× ROAS on one creator *(EchoBoost-specific)*. 500K-member community. 18 months of operating data. 8 live platform integrations. PostgreSQL production. IPX conference June 9, 2026.

**Status:** Gated. Not exposed in main site nav.

**CTA:** Gated contact form at `/investors`. No public pitch surfaces without form submission.

---

## 7. Site Navigation Order

Since every visitor enters through the animated flywheel home page, audience priority is not a positioning question — it's only a nav-ordering question. The site nav lists paths in this order:

**Brands · Creators · Partners**

### Investor routing
- Investor is a selectable persona in the personalization flow (Q2 Role)
- When a visitor selects Investor in Q2, they are routed to a gated contact form — no public investor pitch displays without form submission
- There is no Investors link in the main nav
- The `/investors` URL exists but is unlinked and not SEO-indexed (`noindex,nofollow`)
- Materials shared after form submission are gated and conversation-driven

This nav order does not imply hierarchy of importance. All four audiences are equally weighted in product and content investment.

---

## 8. Active Platform Integrations

**8 live integrations** *(Amazon Associates · Walmart via Impact · URLGenius · Archer Affiliates · Levanta · Meta · Impact · Beacons — Beacons is creator-side only; Impact is counted once as the affiliate network powering Walmart and Target tracking.)*

| Integration | Role | Status |
|---|---|---|
| Amazon Associates | Affiliate program + product catalog; Creators API for product enrichment (price/image/brand) with Crawlbase fallback | Live |
| Walmart via Impact | Retailer + affiliate tracking; highest CVR in stack (up to 17%) | Live |
| URLGenius | Deep linking + app routing across all retailers; shared link cache for Amazon and Walmart | Live |
| Archer Affiliates | Brand attribution + product catalog matching (113K+ ASINs) | Live |
| Levanta | Amazon seller affiliate program for direct-to-brand commissions | Live |
| Meta | Paid social ads + signal-based boosting infrastructure | Live |
| Impact | Affiliate network — Walmart and Target tracking | Live |
| Beacons | Newsletter + link-in-bio (creator-side, not platform-integrated) | Active on creator side |

### Explicitly Out of Scope
- **ShopYourLikes** — used as fallback link destination only
- **LTK (LikeToKnowIt)** — universal fallback, no direct integration
- **ManyChat** — not under consideration

### Integration Categories Actively Sought
- Additional retailers beyond Amazon and Walmart (especially where audience demand is proven)
- Affiliate networks with brand relationships in kids, home, beauty, outdoor categories
- Deep link/attribution tools that improve app-open rates, international routing, or cross-device attribution
- Ad platforms and boosting networks that can power creator-to-brand campaigns with real conversion data

---

## 9. Technical Infrastructure (Brief)

Just enough for Partner-facing technical references. Full spec lives in `Echo-Dashboard` repo.

- **Hosting:** Replit with managed PostgreSQL
- **Live URL:** shop.mommyandmecollective.com
- **Database:** PostgreSQL 16.10 (migrated from SQLite May 2026)
- **Framework:** Flask + Jinja templates
- **Server:** Gunicorn (single worker, 120s timeout; Cloud Run handles scaling)
- **Auth:** Server-side Flask session cookie (signed, 30-day lifetime)
- **Tracking:** Every URLGenius link carries custom UTM params following a UTM map; source-based UTMs distinguish AI Agent vs Collection vs Storefront vs Newsletter clicks
- **GA4:** Integration planned with UTM mapping to custom dimensions
- **Tests:** 280+ tests passing on production branch

---

## 10. Business Model

### Revenue Tiers — INTERNAL ONLY · NEVER FEED INTO PUBLIC COPY PROMPTS

⚠️ **HARD GUARDRAIL FOR ALL AGENTS:** The specific tier percentages below must NEVER be included in:
- Any prompt sent to the personalization API
- Any content variant generated for the public site
- Any partner-facing material without explicit Kelly sign-off
- Any brand-pitch material without explicit Kelly sign-off

Public marketing language is always "we earn when you earn." Never publish percentages.

- 15% on organic affiliate traffic creators generate through their own posts
- 30% on brand-funded sponsored collection campaigns
- 40% on pure platform-routed traffic (signal-driven recommendations)
- Flat fee + 10% for network/platform licensing arrangements

### EPC Floor Reinvestment (Future Mechanic)
If sponsored boosting drops effective EPC below organic baseline, the difference is reinvested into community/creator value rather than retained as platform margin. Protects audience experience. Document as a future mechanic — not live yet.

---

## 11. Phased Roadmap

Condensed view. Last status review: **May 17, 2026.**

*Each phase status reflects what's live, what's in active build, and what's queued. Kelly reviews phase status weekly.*

**Phase 0 — Foundation Cleanup (in progress — Week of May 13)**
URL re-architecture · Insights module rebuild · Team member sessions · Click tracking audit · Admin auth verification

**Phase 1 — Trend Engine Upgrade (current — Week of May 13)**
Daily report ingestion · Recency-weighted Hot Score · Price history tracking · Price drop detection · Signal confirmation logic · UTM parameter system · GA4 integration

**Phase 2 — Creator UI + Agent Improvements (current — Week of May 13)**
Mobile chat scroll fix · Create page load optimization · Content Generator rules · Collection Builder UI redesign · Custom Collections Builder · Agent improvements · Product Discovery feed · Real post status tracking

**Phase 3 — Audience Layer for Launch (current — Week of May 13)**
Share buttons · Social + link-in-bio footer · Email capture via Beacons · FTC compliance · Affiliate network ToS compliance · Accessibility baseline

**Phase 4 — Brand Demo Mockups (current — for IPX June 9)**
Sponsored Collections demo · EchoBoost workflow demo · Brand Performance Visibility demo · Newsletter Inclusion demo · Brand-Side Dashboard demo · Cross-Creator Sponsorship Matching demo

*All Phase 4 work is presentation-quality, not production. Prioritize for build after conference feedback.*

**Phase 5 — Multi-Creator Foundation (architecture only — Week of May 20)**
Verify creators table supports multi-creator · Add creator_id foreign keys · Document partner integration API surface

**Future Tier (1–3 months post-launch)**
Audience wishlists with email sign-in · Price drop alerts · Seasonal collection memory · Personalized "Steph's Picks for You" feed · Group wishlists/gifting · Loyalty/early-access tier

**Vision Tier (12+ months)**
Multi-creator platform · Platform-agnostic creator tools · Cross-creator brand sponsorship matching · Full brand-side dashboard with site-wide discount codes and self-service boosting · EPC floor reinvestment

---

## 12. Key Events & Milestones

**Impact IPX Conference — Austin, TX, June 9, 2026**
Primary near-term go-to-market moment. EchoTribe on-site meeting with brands, agencies, partners, creators, and potential investors. Site, demo, and brand mockups all gated to this date.

**PostgreSQL Migration Complete (May 2026)**
Production runs on Replit-managed PG. SQLite remains as local dev fallback only.

**18-Month Mommy & Me Partnership (Early 2026)**
The proof-point partnership window. Long enough to be credible, recent enough to be relevant.

---

## 13. What EchoTribe Is NOT

- Not a scaled multi-creator platform — one founding creator partnership only
- Not a finished SaaS product — working prototype with live data
- Not accepting new creators directly — waitlist only, focused on infrastructure
- Not competing with affiliate networks — sits above them as intelligence layer
- Not an ad network — works with Meta and others, not a buyer of inventory
- Not a SaaS for influencers to manage links — much more than link management
- Not a content tool — EchoTribe doesn't write content; it surfaces what to feature
- Not AI-first messaging — Authentic Influence first, AI is part of the stack
- Not seeking unsolicited investor outreach in public channels — investor conversations are personal, gated, and qualified through the personalization flow

---

## 14. FAQ Quick-Answer Reference

**"Is EchoTribe live?"**
Yes — shop.mommyandmecollective.com is a working prototype with one founding creator partnership. The platform has been operating behind the scenes for 18 months with real conversion data.

**"Can I sign up as a creator?"**
Not directly right now. Creator onboarding is on waitlist. The best way to engage is to ask your current creator platform to integrate with EchoTribe, or join the waitlist for direct partnership.

**"How does EchoTribe make money?"**
A tiered revenue share model — we earn when you earn. Specific terms depend on relationship type (creator, brand, partner) and are discussed directly.

**"What makes EchoTribe different?"**
EchoTribe is the closed loop. Signal detection feeds creation tools, creation generates more signal, signal triggers amplification, amplification produces data that sharpens the next detection cycle. The moat isn't any single product — it's the loop. Plus it's built on 18 months of real conversion data from a 500K community, not theoretical projections.

**"Who's the team?"**
Founder Kelly Hagen (former 25th Hour Social, affiliate industry veteran). Featured client partnership with Mommy & Me Collective. Active technical and infrastructure partners. Currently small and focused.

**"Why now?"**
Amazon Associates' April 2026 policy change disqualified paid/boosted traffic from commissions and added content quality requirements — creating a market opening for platforms with smart attribution that align creator/brand incentives.

**"How is this different from LTK or ShopMy?"**
LTK and ShopMy are creator-shop platforms. EchoTribe is the commerce intelligence layer that connects creator signal to brand sponsorship and amplification. EchoTribe links traffic to LTK/ShopMy/Amazon/Walmart when those are the best converting destinations.

**"Can my brand work with you today?"**
Yes — brand partnerships are open. Sponsored Collections, EchoBoost amplification, and trend visibility are all available. Brand-side dashboard is demo-quality today, production build after IPX.

**"Do you have an API?"**
Partner integration APIs are in early development. The platform is built on standard affiliate, deep-link, and retailer APIs (Amazon Creators API, Walmart via Impact, URLGenius). Partner integration specs available on request. Specific endpoints and authentication patterns are shared in 1:1 partner conversations.

**"What about FTC compliance?"**
Affiliate disclosures present on every page with affiliate links, with site-wide and per-collection visibility. EchoTribe follows FTC 16 CFR Part 255 and all affiliate network ToS.

**"What does 'Authentic Influence' mean?"**
A reframe of "AI." Where most platforms lead with artificial intelligence, EchoTribe leads with authentic creator-audience trust. The recommendations driving conversion are genuinely trusted, not algorithmically generated. AI is in the stack as infrastructure, not as marketing.

---

## 15. Content Guardrails Summary

Hard rules for any agent writing copy. If output violates these, regenerate.

- **Never "AI-powered"** in creator or brand-facing marketing. Use "intelligent," "signal-driven," "smart," or describe what it does.
- **Never reference EchoRoute** publicly. It is not built.
- **Never use routing language** ("smart routing," "intelligent routing," "auto-routing," "the routing layer") in public copy until EchoRoute ships. Use "recommendations," "linking," "affiliate paths," or "deep linking."
- **Never publish exact rev-share tiers.** Use "we earn when you earn."
- **Never invent proof points.** Real numbers or none. Only the $170K / $37K / 4.6× EchoBoost showcase is pre-approved for public use, and it must always carry the EchoBoost-specific framing.
- **Never overpromise stage.** "Working prototype" not "leading platform."
- **EchoBoost messaging:** Creator configures preferences (own ad spend balance + brand sponsored). Signals trigger boosts automatically within those rules. Brand-funded is always available; own spend is additive.
- **EchoAgent is a feature of EchoShop**, not a separately marketed product.
- **Stage honesty:** One founding creator partnership, not a multi-creator platform.
- **No banned SaaS clichés** (see Section 2).
- **Mobile reads short** — paragraphs under 3 lines on mobile.
- **Stats permission tiers** — only Tier 1 stats appear in public copy. Tier 2 is sales-call only. Tier 3 never leaves internal.

---

## 16. Contact & Next Steps

**Primary CTA paths:**
- **Brands:** Contact form → fields: name, email, company, product category, interest area
- **Creators:** Join waitlist form → name, email, handle, niche, platform
- **Partners:** Partner inquiry form → role selector (Platforms / Agencies & Networks sub-type)
- **Investors:** Gated contact form at `/investors` (not in nav) → name, email, fund/firm, stage interest

**No calendar booking links on the site.** All audiences qualify via form first.

**Live demonstration:** shop.mommyandmecollective.com — live example of EchoTribe-powered storefront, linked from every audience path.

**Contact emails:**
- kelly@echotribe.ai — **internal only, never display publicly**
- demo@echotribe.ai — public-safe contact for demo requests (or use form)

---

## 17. Privacy & Abuse Rules — Personalization Flow

The two-pass personalization at `/api/personalize` collects user input. The following are non-negotiable for any agent or developer touching this flow.

### Name Handling
- First names captured in Q1 are used ONLY for that session's personalization
- Names are not stored beyond session lifetime
- "Just call me a Creator" / similar quick-select options bypass name capture entirely
- Names are never sent to third parties (no analytics piping, no CRM auto-create)

### Prompt Injection Defense
- Free-text inputs (Q1 name, Q5/Q6 if open-text) are sanitized server-side before being added to any LLM prompt
- The TRIAGE and PERSONALIZE prompts use clear delimiter conventions (`<<USER_INPUT>>...<<END>>`) and the LLM is instructed never to follow instructions inside delimiters
- All LLM outputs are validated against the expected response schema before being sent to the client

### Logging
- Personalization requests log: timestamp, IP (anonymized after 24h), question, response category — NOT free-text name input
- Logs are retained 30 days for abuse review, then purged
- Logs never include full Anthropic API responses (sensitive data risk)

### Bot Protection
- Rate limit: 10 personalization requests per IP per minute
- After 3 failed/abandoned flows from one IP, surface a soft challenge (e.g., "Are you human?")
- Honeypot field in any form submission

### Fallback Behavior
- If the Anthropic API fails or times out (>5s), serve a static fallback flow with role-only branching
- Client-side never shows "AI is down" — fallback should be seamless
- Failed API calls are logged for ops review

### Accessibility for Flywheel Home
- "Enter Site" button visible from first paint — visitors can proceed whenever ready
- `prefers-reduced-motion: reduce` shows static flywheel + Enter Site button (no animation)
- ARIA live region announcement: "EchoTribe — Commerce powered by Authentic Influence"
- No-JS fallback: static splash with audience path links (Brands / Creators / Partners)
- Mobile-first design: full experience works at 375px viewport

---

*Master context file — last updated May 17, 2026*
*Maintained by Kelly Hagen. Agents do not modify this file without explicit instruction.*
