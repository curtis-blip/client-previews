# Jonathan Sweat & The Legacy Team — Project CLAUDE.md

## Client snapshot

| | |
|---|---|
| Name | Jonathan Sweat |
| Brand | The Legacy Team @ Integrity Home Mortgage Corporation |
| Domain | jonathansweat.com (owned, GoDaddy) |
| Office | 2840 Electric Rd SW Ste 102-A, Roanoke, VA 24018 |
| Office phone | 540.588.6104 |
| Cell | 540.314.8843 |
| Email | jsweat@ihmcloans.com |
| Markets | Roanoke Valley VA · Lakeland & Tampa FL |
| NMLS | #308553 (individual) · #2644421 (branch) |
| Licenses | VA #MLO-5807VA · FL #LO110533 |
| Years | 21 as LO · 30+ industry |

## Type

**Mortgage Loan Officer + Sales Coach hybrid.** Not a real estate agent. Standard agent-site references (preview-studio's page-spines, lp-boutique style profile) do NOT apply. See style and page recipe below.

## Brand DNA

**Through-line: Legacy + Compass / Navigation.** Pulls across both businesses:
- "The Legacy Team" (mortgage)
- "Compass Sales Coaching" (coaching arm at compasssalescoaching.com)
- "Latitude Podcast"
- "PinMarkers Blog"
- "Charting Your Future · Changing Your Legacy" (coaching tagline)
- "Learn to Live Freely and Lightly"

**Stated differentiator:** "We only do pre-approvals. Not pre-qualifications." Realtors trust the letter because the file is fully underwritten before offer. This is the #1 brand asset and gets headline real estate on the site.

**Faith mention:** Compass Sales Coaching opens with "serving God." Decision: keep mortgage site neutral, faith only on coaching brand unless Curtis directs otherwise.

## Awards / proof

- **Best of Roanoke 2023** — Silver Award (loan officer, while at ALCOVA)
- #1 loan originator in market (claimed)
- 5★ on Zillow + Google + Facebook

## Brand colors (committed)

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0a2540` | Primary navy, hero, footer, dark sections |
| `--ink-2` | `#142e4f` | Hero gradient end, deep dark blocks |
| `--ink-3` | `#1d3a5f` | Dark surface variant |
| `--gold` | `#c9a352` | Primary accent — CTAs, dividers, italic accents |
| `--gold-soft` | `#e6cf91` | Hover states |
| `--burgundy` | `#6e2229` | Secondary accent — testimonial markers, eyebrow alt |
| `--cream` | `#f8f3eb` | Alt section background |
| `--cream-2` | `#efe8db` | Equity strip background |

Logo is white on dark by design. Burgundy palette pulled from Jonathan's blazer in the headshot.

## Typography

- Heading: **Fraunces** (modern serif, italic accents on key phrases only)
- Body: **Inter**
- H1 weight 400, italic gold accents on differentiator words ("legacy", "Not pre-qualifications", "Let's talk")

## Page recipe (8 pages)

| # | Page | Purpose |
|---|------|---------|
| 1 | Home | Trust + programs grid + pre-approval differentiator + For Realtors strip |
| 2 | About (folds in The Legacy Team) | Story + Dixie Lowe + Ellyson Spickard if confirmed |
| 3 | Loan Programs | 8-card program detail (Conventional, VA, FHA, USDA, Jumbo, Construction-to-Perm, Bridge, Refi) |
| 4 | The Pre-Approval Difference | The brand asset. Process + proof + Realtor-facing FAQ |
| 5 | Apply / Get Started | Pre-frames application before linking out to ihmcloans.com/jonathan-sweat |
| 6 | Testimonials | Full reviews page, 5-7 testimonials |
| 7 | **For Realtors** (was Coaching, swapped per Compass option B) | B2B trust page. Why Realtors refer, what they get, NMLS-verified pre-approval, partner CTA |
| 8 | FAQ + Contact | Combined. Mortgage process FAQ, calculators sidebar, contact form |

**Compass Sales Coaching:** lives in footer-only ("Founder of Compass Sales Coaching →") + contextual mention in About bio prose. Page slot 07 freed for For Realtors B2B page. Decision basis: mortgage and coaching audiences are different. Cross-sell on the conversion-focused mortgage site adds drag without enough payoff.

**CS form contradictions:**
- Team Size = 0, but IHM lists Dixie Lowe (MLO) + Ellyson Spickard (LOA). Default: include both on About strip. Confirm with Curtis or Jonathan.
- "Home Value Widget CTA" picked as home block — repurposed as **refi lead-gen** (he's a lender, not an agent — can't do CMAs)
- "Add Mortgage Calculator Widget" = No, but mortgage calculators are high-engagement / SEO essentials. Will sidebar them on FAQ+Contact page.

## Real assets in hand

- `assets/logo.png` — Legacy Team + Integrity Home Mortgage lockup, white-on-transparent
- `assets/jonathan-headshot.jpg` — burgundy blazer, autumn Roanoke street backdrop

## Testimonials in hand

| Name | Location | Stars | Status |
|---|---|---|---|
| J. O'Neill | Roanoke, VA | 5 | Full review text — usable |
| Alana Best | Roanoke, VA | 5 | Full review text — usable |
| Jason Tolbert | Roanoke, VA | 5 | **Review body blank in CS** — marked `[PLACEHOLDER]` per no-fabrication rule |

Need 4 more for testimonials page.

## Decisions log

| Date | Decision | Rationale |
|---|---|---|
| 2026-04-24 | Skip preview-studio `/compose-pages` | All references real-estate-shaped, would force-fit |
| 2026-04-24 | Manual page builds anchored to home page | Speed + correctness for mortgage register |
| 2026-04-24 | Faith neutral on mortgage site | Lives on Compass Sales Coaching brand only |
| 2026-04-24 | Meet The Team folded into About | CS said Team Size = 0, simpler |
| 2026-04-24 | Home Value Widget = refi lead-gen, not CMA | He's a lender, can't do CMAs |
| 2026-04-24 | Add calculator section despite his "No" pick | High engagement / SEO essential for mortgage |
| 2026-04-27 | Unified hero pattern across all pages (image bg, H1 + subtext, no portrait, no bio) | Curtis: "all heroes consistent" |
| 2026-04-27 | About bio moved to dedicated `.bio-block` section (portrait split + bio prose), removed from hero | Curtis: "move his bio to a different block" |
| 2026-04-27 | Ran `/research-keywords` (Keywords Everywhere API) | 93 keywords looked up, real volume data, focus keywords confirmed per page |
| 2026-04-27 | H1 includes focus keyword "mortgage lender near me" | Rank Math on-page SEO requires focus kw in H1 |
| 2026-04-27 | Compass Sales Coaching reduced to footer-only mention (option B) | Mortgage and coaching audiences differ; cross-sell adds drag. Page 07 slot now For Realtors. |

## Downstream

After preview approval: **wp-claude-builder** runs end-to-end automated. It's not a Jeff/Kane handoff. The plugin consumes mockups + content-brief + design tokens + seo-strategy and builds the WordPress site itself (Astra + UAGB stack per standard, Rank Math SEO synced via REST).

## Active references

- `~/Documents/Claude/preview-studio/` — setup skills (`/create-project`, `/generate-brief`, `/seo-strategy`) usable; composer skills not used (real-estate-agent-locked references)
- `~/Documents/Claude/marketplace/plugins/wp-claude-builder/` — automated WP production builder (no human handoff)
- `~/Documents/Claude/marketplace/plugins/claude-wp-prebuilder/` — deprecated, absorbed into preview-studio

## Mortgage references to author back into preview-studio (after build)

After Jonathan ships, write into `preview-studio/references/`:
- `page-patterns-mortgage-lo-home.md`
- `page-patterns-loan-programs.md`
- `page-patterns-pre-approval-difference.md`
- `page-patterns-mortgage-apply.md`
- New style profile: `mortgage-legacy` in `style-profiles.md`
- Mortgage block-catalog additions: program card, pre-approval callout, refi data viz strip, compliance footer
