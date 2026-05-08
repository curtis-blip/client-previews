# Dodee Hill — Project Brief

**Generated:** 2026-05-08
**Source:** Content Snare intake (94% complete) + dodeehillrealestate.com discovery (redirects to aare.com/agent/dodee-hill)

---

## Client Identity

| Field | Value |
|-------|-------|
| Agent name | Dodee Hill |
| Brokerage | AARE — Andrew Arroyo Real Estate Inc |
| Brokerage HQ | 7500 Rialto Blvd, Ste 250, Austin, TX 78735 |
| Brokerage phone | (888) 322-4368 |
| Brokerage email | info@aare.com |
| Agent direct phone | (605) 431-1515 |
| Agent direct email | dodeehill@gmail.com |
| Domain | dodeehillrealestate.com (currently 301s to aare.com) |
| Tagline (existing) | "Find your Corpus Christi dream home" |
| Specialty / niche | **Southside Specialist** — Corpus Christi Southside, Kings Crossing, military relocation (NAS-CC), coastal lifestyle |
| Social handle | `@SouthsideSpecialist` (FB + IG) |
| Zillow | https://www.zillow.com/profile/dodeehill |
| LinkedIn | https://www.linkedin.com/in/dodee-hill-0698ab149/ |

## Bio (intake, condensed)

Wyoming-raised, Black Hills South Dakota by way of, Texas in 2012. Family of campers and beach lovers. Volunteers in the local community. Full-service REALTOR® who leads with listening, plain-spoken communication, and steady negotiation.

## Market

- **Primary:** Corpus Christi, TX (Coastal Bend / Gulf of America)
- **Specialty:** Southside Corpus Christi — Kings Crossing master-planned, Cimmaron / S Staples corridor, larger lots, custom homes, mature trees
- **Service areas (10, in priority):** Corpus Christi · Portland · Aransas Pass · Rockport · Flour Bluff · N Padre Island · Port A (Port Aransas) · Odem · Kingsville · Kings Crossing

## Pages (10 — 8 requested + Contact + Blog)

| # | Page | Type | Notes |
|---|------|------|-------|
| 01 | Home | Hub | Hero · stats credibility · 3 featured communities · about teaser · testimonials · CTA |
| 02 | About | Bio | Personal story (Wyoming → SD → Corpus 2012), Southside Specialist, full-service REALTOR® positioning |
| 03 | Communities | Card grid + modals | 10 service areas, click-to-modal with descriptions |
| 04 | Buyer's Guide | Educational | FTHB process, financing, Coastal Bend specifics, NAS-CC military buyers |
| 05 | Seller's Guide | Educational | Pricing, prep, marketing, Coastal Bend timing |
| 06 | Services | Service hub | Buyer rep · Listing · Relocation · Investment · Coastal/Island · Military |
| 07 | Featured Listings | IDX | Hero + Showcase IDX shortcode placeholder ONLY (per `feedback_idx_page_pattern`) |
| 08 | Testimonials | Social proof | 8 real reviews from existing site + 3 home-block names from intake |
| 09 | Contact | Form | Universal contact form per `reference_universal_contact_form` |
| 10 | Blog | Index | Per `feedback_blog_always_included` — Corpus Christi market posts placeholder |

## IDX

- **Provider:** Showcase IDX
- Featured Listings page = hero + shortcode placeholder zone only
- No hand-built listing UI

## Featured Communities (Home block)

1. **Kings Crossing** — Southside, master-planned, larger lots, mature trees (real photo by Roman Suarez Photography supplied)
2. **Flour Bluff** — #1 ranked schools, near NAS-CC
3. **North Padre Island** — Beach + fishing lifestyle

## Testimonials (real, scraped from aare.com/agent/dodee-hill)

1. **Danielle Kalas** — "Dodee is the consummate professional. She is very well-versed in all aspects of the home-buying process and always had our best interest at heart."
2. **Tim** — "Dodee did a great job working through the entire process with us. She has great experience, knowledge, and intuition."
3. **Patrick** — "If I could give her six stars, I would! She will take care of you and make you feel like family."
4. **Matt** — "Dodee is one in a million! She genuinely cares. She is incredibly organized."
5. **Michelle Buford** (Broken Arrow, OK) — "Dodee was recommended by 5 different people! She was very knowledgeable and made it so easy." *(matches Zachary & Michelle Buford from intake)*
6. **Greg Graf** — "She is professional, responsive, efficient, available, empathetic, smart, experienced, savvy."
7. **Leigh G.** — "She pays close attention to every detail and is incredibly thorough and prompt."
8. **Tabitha** — "She truly looks out for your needs and wants!"

Plus from intake (no quote text — flag as `[PLACEHOLDER quote pending]` if used):
- Jorge & Gilmarie Pagan-Vazquez (Corpus Christi, TX)
- Dave Cook (Corpus Christi, TX)

## Brand color decision

- Intake picker: `#7647f3` (purple)
- Designer note: *"Coastal colors, palm trees, water. We live and work on the Gulf of America."*

**Decision:** designer note overrides picker. Coastal Gulf palette per Millie+Michael canon (sans-only, Raleway 200 + Montserrat, black-button-inverts), per-client accent swap.

## Style canon

**Reference build:** Michael Sapp (validated Millie+Michael LP canon, 2026-05-01).
**Pattern:** Copy Michael Sapp `styles.css` verbatim, swap accent hex only — per `feedback_style_reference_accent_swap`.

## Hard rules in play

- No em dashes, no emojis (SVG icons only)
- No fabricated content (testimonials = real or `[PLACEHOLDER]`)
- IDX page = hero + shortcode only
- Blog included
- Universal contact form schema
- LP canon baseline, then make it better
- Char-limit gate before deploy
