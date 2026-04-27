# Jonathan Sweat & The Legacy Team — SEO Strategy

> **Type:** Mortgage Loan Officer + Sales Coach hybrid site, dual-state (VA + FL)
> **Source basis:** `seo-brief.md` (API-confirmed Keywords Everywhere data, 93 keywords) + brand audit
> **Status:** Confirmed focus keywords per page. Rank Math values updated in mockup heads. Ready for `/sync-seo` once mockups complete.

---

## Target keywords (API-confirmed)

| Page | Primary keyword | Volume | CPC | Comp | Search intent |
|---|---|---|---|---|---|
| Home | `mortgage lender near me` | 27,100/mo | $8.76 | 0.22 | Local · Transactional |
| About | `jonathan sweat` | 70/mo | $0.00 | 0.00 | Branded |
| Loan Programs | `va loans` | 40,500/mo | $9.63 | 0.49 | Transactional |
| Pre-Approval Difference | `pre approval vs pre qualification` | 8,100/mo | $0.27 | 0.31 | Informational |
| Apply / Get Started | `apply for mortgage` | 5,400/mo | $17.01 | 0.63 | Transactional |
| Testimonials | `jonathan sweat reviews` | low (0/mo, brand) | — | — | Branded · Trust |
| For Realtors | `preferred lender` | 260/mo | $4.54 | 0.19 | B2B Local |
| FAQ + Contact | `first time home buyer virginia` | 2,900/mo | $1.66 | 0.68 | Local · Informational |

**Cannibalization check:** all 8 pages target unique primary keywords. Secondary keywords overlap intentionally (e.g., `va loans` is primary on Loan Programs and secondary on Home) which is normal hub-and-spoke SEO.

---

## Per-page SEO plan

### 01 — Home (`01-home.html`)

- **URL:** `/`
- **Focus keyword:** `mortgage lender near me`
- **Title (60 chars):** `Mortgage Lender Near Me | Roanoke VA + Lakeland FL | Jonathan Sweat`
- **Meta (155 chars):** `Looking for a mortgage lender near you? 21 years guiding Virginia and Florida families home. Fully underwritten pre-approvals Realtors trust. NMLS #308553.`
- **H1:** `Mortgages built for your legacy.`
- **Schema:** LocalBusiness (FinancialService) + breadcrumbs
- **Secondary kw:** `mortgage broker near me`, `mortgage near me`, `loan officer near me`, `mortgage broker roanoke va`, `integrity home mortgage`

```html
<!-- Already baked into <head> on 01-home.html -->
<title>Mortgage Lender Near Me | Roanoke VA + Lakeland FL | Jonathan Sweat</title>
<!-- SEO: rank_math_focus_keyword: mortgage lender near me -->
```

---

### 02 — About (`02-about.html`)

- **URL:** `/about/`
- **Focus keyword:** `jonathan sweat`
- **Title:** `Jonathan Sweat | Top Loan Officer Roanoke VA | The Legacy Team`
- **Meta:** `Meet Jonathan Sweat: Branch Manager at Integrity Home Mortgage, Best of Roanoke 2023, 21 years and #1 originator in market across Virginia and Florida.`
- **H1:** `Twenty-one years. One mission.`
- **Schema:** Person + Organization (sameAs LinkedIn, FB, IG, Zillow)
- **Secondary kw:** `integrity home mortgage`, `best loan officer roanoke`, `jonathan sweat loan officer`

---

### 03 — Loan Programs (`03-loan-programs.html`)

- **URL:** `/loan-programs/`
- **Focus keyword:** `va loans`
- **Title:** `VA Loans, FHA, USDA, Jumbo & More | Mortgage Programs | Jonathan Sweat`
- **Meta:** `VA loans, FHA, USDA, jumbo, conventional, construction-to-perm, bridge, and refinance. The mortgage programs we close week in, week out across Virginia and Florida.`
- **H1:** `The right loan for the life you're building.`
- **Schema:** ItemList of programs
- **Secondary kw:** `fha loan` (165K vol — content magnet), `usda loan`, `jumbo loan`, `conventional loan`, `construction loan`, `bridge loan`, `mortgage refinance`, `construction to permanent loan`

```html
<title>VA Loans, FHA, USDA, Jumbo & More | Mortgage Programs | Jonathan Sweat</title>
<meta name="description" content="VA loans, FHA, USDA, jumbo, conventional, construction-to-perm, bridge, and refinance. The mortgage programs we close week in, week out across Virginia and Florida.">
<!-- SEO: rank_math_title: VA Loans, FHA, USDA, Jumbo & More | Mortgage Programs | Jonathan Sweat -->
<!-- SEO: rank_math_description: VA loans, FHA, USDA, jumbo, conventional, construction-to-perm, bridge, and refinance. The mortgage programs we close week in, week out across Virginia and Florida. -->
<!-- SEO: rank_math_focus_keyword: va loans -->
<!-- SEO: rank_math_secondary_keywords: fha loan,usda loan,jumbo loan,conventional loan,construction loan,bridge loan,mortgage refinance,construction to permanent loan -->
<!-- SEO: rank_math_robots: index,follow -->
```

---

### 04 — The Pre-Approval Difference (`04-pre-approval-difference.html`)

- **URL:** `/pre-approval-difference/`
- **Focus keyword:** `pre approval vs pre qualification`
- **Title:** `Pre-Approval vs Pre-Qualification | What Realtors Trust | Jonathan Sweat`
- **Meta:** `Pre-approval vs pre-qualification: most lenders run a credit pull and call it a pre-qual. We fully underwrite your file before you offer. Why Realtors trust the difference.`
- **H1:** `We only do pre-approvals. Not pre-qualifications.`
- **Schema:** Article + FAQPage
- **Secondary kw:** `mortgage pre approval` (49.5K!), `underwritten pre approval`, `fully underwritten pre approval`, `get pre approved mortgage`, `mortgage pre approval letter`

```html
<title>Pre-Approval vs Pre-Qualification | What Realtors Trust | Jonathan Sweat</title>
<meta name="description" content="Pre-approval vs pre-qualification: most lenders run a credit pull and call it a pre-qual. We fully underwrite your file before you offer. Why Realtors trust the difference.">
<!-- SEO: rank_math_focus_keyword: pre approval vs pre qualification -->
<!-- SEO: rank_math_secondary_keywords: mortgage pre approval,underwritten pre approval,fully underwritten pre approval,get pre approved mortgage,mortgage pre approval letter -->
```

---

### 05 — Apply / Get Started (`05-apply.html`)

- **URL:** `/apply/`
- **Focus keyword:** `apply for mortgage`
- **Title:** `Apply for a Mortgage | Get Pre-Approved in Roanoke or Lakeland`
- **Meta:** `Apply for a mortgage in 15 minutes. Documents you'll need, what to expect, full underwrite before you offer. Roanoke VA + Lakeland FL.`
- **H1:** `Start the application that puts you in motion.`
- **Schema:** HowTo
- **Secondary kw:** `get pre approved mortgage`, `mortgage application`, `how to get pre approved for a mortgage`

---

### 06 — Testimonials (`06-testimonials.html`)

- **URL:** `/testimonials/`
- **Focus keyword:** `jonathan sweat reviews` (low search volume, brand-targeted)
- **Title:** `Reviews | Jonathan Sweat & The Legacy Team Mortgage`
- **Meta:** `Five-star reviews from Roanoke Valley homebuyers and homeowners across Virginia and Florida. Read what working with Jonathan Sweat and The Legacy Team really feels like.`
- **H1:** `Roanoke families. Real outcomes.`
- **Schema:** AggregateRating + individual Review items
- **Secondary kw:** `jonathan sweat`, `the legacy team mortgage`
- **Note:** This page targets brand searches and serves as social proof. The SEO play is review schema markup, not keyword competition.

---

### 07 — For Realtors (`07-for-realtors.html`)

> **Status:** Compass option B selected. Page slot replaces the original Coaching page. Compass Sales Coaching now lives as a footer-only mention site-wide.

- **URL:** `/for-realtors/`
- **Focus keyword:** `preferred lender` (260/mo, $4.54 CPC, 0.19 competition — low!)
- **Title:** `Preferred Lender for Realtors | Roanoke + Tampa | Jonathan Sweat`
- **Meta:** `The preferred lender Realtors in Roanoke Valley and Tampa Bay refer their buyers to. Fully underwritten pre-approvals. Direct team access. The letter that holds at closing.`
- **H1:** `Your buyer comes back with the offer that closes.`
- **Schema:** Service + Person + LocalBusiness reference
- **Secondary kw:** `trusted lender` (720/mo), `preferred mortgage lender`, `realtor partner program`
- **Note:** Realtor-specific terms (`preferred lender for realtors`, `realtor preferred lender`, etc.) all returned 0 volume in GKP. Generic `preferred lender` is the strongest searchable term; we attach Realtor-relevance via on-page content + LocalBusiness schema.

---

### 08 — FAQ + Contact (`08-faq-contact.html`)

- **URL:** `/faq-contact/`
- **Focus keyword:** `first time home buyer virginia`
- **Title:** `Mortgage FAQ + Contact | First-Time Home Buyer Virginia | Jonathan Sweat`
- **Meta:** `First-time home buyer in Virginia or Florida? Mortgage FAQ, calculators, and contact for Jonathan Sweat in Roanoke or Lakeland. NMLS #308553.`
- **H1:** `Answers, calculators, and a real human on the other end.`
- **Schema:** FAQPage + ContactPage + LocalBusiness
- **Secondary kw:** `mortgage calculator` (2.74M! content magnet), `mortgage process`, `first time home buyer`, `mortgage payment calculator`, `how long does mortgage take`

---

## Local SEO strategy

**NAP block (must appear identically site-wide):**
```
Jonathan Sweat — The Legacy Team @ Integrity Home Mortgage Corporation
2840 Electric Rd SW, Suite 102-A
Roanoke, VA 24018
540.314.8843 (cell) · 540.588.6104 (office)
jsweat@ihmcloans.com
```

**Service areas:** Roanoke VA · Salem · Blacksburg · Botetourt · Franklin Co. · Tampa FL · Lakeland · Polk Co. · Hillsborough · Winter Haven

**Google Business Profile:**
- Separate GBPs for Roanoke (primary) and Lakeland (secondary)
- Categories: Mortgage Lender (primary), Mortgage Broker, Loan Agency
- Service area: VA + FL with metro/county detail
- Posts cadence: 1/week (closings, market updates, podcast clips)

**Local schema (LocalBusiness — already baked into 01-home.html `<head>`):**
```json
{
  "@type": "FinancialService",
  "name": "Jonathan Sweat & The Legacy Team",
  "telephone": "+15403148843",
  "email": "jsweat@ihmcloans.com",
  "address": { "@type": "PostalAddress", "streetAddress": "2840 Electric Rd SW, Suite 102-A", "addressLocality": "Roanoke", "addressRegion": "VA", "postalCode": "24018", "addressCountry": "US" },
  "areaServed": ["Roanoke, VA", "Salem, VA", "Blacksburg, VA", "Tampa, FL", "Lakeland, FL"],
  "founder": { "@type": "Person", "name": "Jonathan Sweat", "jobTitle": "Branch Manager and Mortgage Loan Originator", "identifier": "NMLS #308553" },
  "award": "Best of Roanoke 2023 — Silver, Loan Officer"
}
```

**Why this works for low-volume local terms:** Most VA + FL hyperlocal mortgage queries returned 0 volume in GKP (below reporting threshold). We rank for them via local schema + NAP consistency + Google Business Profile, not on-page keyword density. The on-page focus keyword targets broader high-volume terms (`mortgage lender near me`, `va loans`) and the local schema attaches the geo-relevance.

---

## Internal linking strategy

| From | To | Anchor text | Purpose |
|---|---|---|---|
| Home hero CTA | `/apply/` | Start your pre-approval | Primary action |
| Home hero CTA secondary | `/pre-approval-difference/` | Why our pre-approval is different | Differentiator |
| Home programs grid (each card) | `/loan-programs/#[anchor]` | [Program name] | Cross-program nav |
| Home pre-approval strip CTA | `/pre-approval-difference/` | Read the full difference | Topic deepen |
| Home meet section CTA | `/about/` | Read full story | Identity deepen |
| Home process strip CTA | `/apply/` | Start your application | Conversion |
| Home testimonials CTA | `/testimonials/` | Read more reviews | Social proof |
| Home refi visualizer CTA | `/loan-programs/#refi` | See refinance options | Program drill |
| Home For Realtors strip primary | `/for-realtors/` | For Realtors overview | Internal cross-sell |
| Home For Realtors strip secondary | `/pre-approval-difference/` | Why our pre-approval is different | Differentiator |
| Footer (every page) | `compasssalescoaching.com` | Founder of Compass Sales Coaching | External brand (footer-only per option B) |
| About body | `/coaching/` | Compass Sales Coaching | Cross-business |
| About body | `/pre-approval-difference/` | the team underwrites the full file | Inline link to differentiator |
| About body | TheRoanoker article | named Best of Roanoke 2023 | E-E-A-T |
| About signature | LinkedIn | View on LinkedIn | Trust |
| Loan Programs each card | `/apply/` | Apply for a [program] loan | Conversion |
| Pre-Approval Difference body | `/apply/` | Start your underwritten pre-approval | Conversion |
| Pre-Approval Difference body | `/about/` | Meet the team behind the letter | Trust |
| Pre-Approval Difference | `consumerfinance.gov/.../prequalified-vs-preapproved` | CFPB on pre-approval | E-E-A-T gold |
| Apply page sidebar | `/loan-programs/` | Not sure which program? | Friction reducer |
| Apply page footer | `/faq-contact/` | Have questions first? | Friction reducer |
| Apply page CTA | `ihmcloans.com/jonathan-sweat` | (External application portal) | Conversion |
| Testimonials page CTA | `/apply/` | Start your application | Social proof → action |
| Coaching body | `compasssalescoaching.com` | Visit Compass Sales Coaching | External authority |
| FAQ + Contact body | `/loan-programs/` | See all loan programs | Education |
| FAQ + Contact body | `/pre-approval-difference/` | Why we don't do pre-quals | Differentiator |
| Footer (every page) | All 8 pages | Standard nav | Site-wide |

---

## Required external links per page (E-E-A-T)

| Page | External link | Purpose |
|---|---|---|
| Home | `nmlsconsumeraccess.org/.../308553` | NMLS verification (Authority) |
| Home | `theroanoker.com/.../best-of-roanoke-awards` | Best of Roanoke verification (Experience) |
| Home | `compasssalescoaching.com` | Coaching arm (Expertise) |
| About | `linkedin.com/in/c-jonathan-sweat/` | Professional profile (Trust) |
| About | `theroanoker.com/.../best-of-roanoke-awards` | Award verification |
| About | `compasssalescoaching.com` | Cross-business credibility |
| Loan Programs | `consumerfinance.gov/owning-a-home/` | CFPB consumer education |
| Loan Programs | `ihmcloans.com/jonathan-sweat` | Apply for any program |
| Pre-Approval Difference | `consumerfinance.gov/ask-cfpb/whats-the-difference-between-being-prequalified-and-preapproved-for-a-mortgage-en-127/` | CFPB pre-approval authority (E-E-A-T gold) |
| Pre-Approval Difference | `ihmcloans.com/jonathan-sweat` | Convert |
| Apply | `ihmcloans.com/jonathan-sweat` | The application itself |
| Apply | `consumerfinance.gov/owning-a-home/loan-estimate/` | CFPB loan-estimate explainer |
| Testimonials | `zillow.com/lender-profile/Jonathan%20Sweat/` | Zillow review verification |
| Testimonials | Google review collection URL | Google reviews |
| For Realtors | `nmlsconsumeraccess.org/.../308553` | Verifiable trust for Realtors checking lenders |
| For Realtors | `theroanoker.com/.../best-of-roanoke-awards` | Award verification |
| FAQ + Contact | `nmlsconsumeraccess.org/.../308553` | License verification |
| FAQ + Contact | `consumerfinance.gov/owning-a-home/` | Consumer education hub |

---

## Technical SEO

- Canonical URLs set per page (`<link rel="canonical">`)
- XML sitemap auto-generated by Rank Math
- robots.txt: `User-agent: *` `Allow: /` `Sitemap: https://jonathansweat.com/sitemap_index.xml`
- All images need descriptive alt text (audit during compose)
- Mobile-first (already responsive in mockups)
- Page speed: lazy-load images, defer non-critical CSS, host Fraunces + Inter via Google Fonts with `display=swap`
- Schema.org JSON-LD per page:
  - Home: LocalBusiness (FinancialService) ✅ already baked
  - About: Person ✅ already baked
  - Pre-Approval Difference: Article + FAQPage (TBD on build)
  - Apply: HowTo (TBD on build)
  - Testimonials: AggregateRating + Review items (TBD on build)
  - FAQ + Contact: FAQPage + ContactPage (TBD on build)

---

## Content gaps to flag

1. **No live blog yet.** Resources cards on home reference articles that don't exist. Initial cluster to write within 30 days of launch:
   - "Pre-approval vs pre-qualification: what Realtors actually look for" (`pre approval vs pre qualification` — already a focus kw on Pre-Approval Difference, so the blog post would be a content cluster supporting that page)
   - "FHA loans in Virginia: who qualifies and what changed in 2026" (targets `fha loan virginia` long-tail, supports Loan Programs)
   - "Buying a Florida second home from Virginia: cross-state mortgage playbook"
   - "USDA loans in the Roanoke Valley: who qualifies and who's missing out"
   - "When a refi makes sense, and when it really doesn't" (targets `cash out refinance`, `mortgage refinance`)
2. **`mortgage calculator`** (2.74M/mo) — too generic to win on, but worth embedding a calculator on FAQ + Contact for engagement and time-on-site signals.
3. **`fha loan`** (165K/mo) — high competition, but worth linking to as a content cluster from Loan Programs page.
4. **No realtor partner page yet.** Currently folded into Coaching cross-sell. If Curtis goes with Compass option B (footer-only coaching), this page slot becomes `/for-realtors/` which would target `realtor preferred lender` and similar B2B terms.

---

## Pipeline status

- ✅ `/research-keywords` complete — `seo-brief.md` written, 93 keywords looked up, focus keywords confirmed per page
- ✅ `/seo-strategy` complete — this file
- ✅ Rank Math comments injected on `01-home.html` and `02-about.html`
- ⏭ Inject Rank Math comments on pages 03-08 as I build them
- ⏭ Final step: `wp-claude-builder /sync-seo` reads each mockup head and pushes to Rank Math via REST (requires `rank-math-rest-api.php` mu-plugin)

After WP build, verify each page via:
```bash
curl -s "https://jonathansweat.com/wp-json/rankmath/v1/getHead?url=https://jonathansweat.com/[slug]/" | python3 -m json.tool
```
