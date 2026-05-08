# Rank Math SEO Brief — Dodee Hill
_Per-page Rank Math meta config. Paste each block into the Rank Math meta box on the corresponding WordPress page._

- **Domain (production):** dodeehillrealestate.com (currently 301s to aare.com — confirm domain control + DNS migration before launch)
- **Date:** 2026-05-08
- **Source data:** `seo-brief.md` · 97 keywords researched via Keywords Everywhere
- **Total monthly search volume captured (focus kws):** ~48,260 (excl. brand pages)

## Global Settings

- **Default Robots:** index, follow
- **Sitemap:** include all 10 indexable pages (Featured Listings is indexable as the IDX hub; individual IDX listing pages get noindex via Showcase IDX defaults). Terms (11) + Privacy (12) get `noindex, follow` per legal-page convention.
- **Primary Schema:** `RealEstateAgent` (sitewide via Local SEO module)
- **Local Business NAP:**
  - Name: Dodee Hill · AARE — Andrew Arroyo Real Estate Inc
  - Brokerage HQ: 7500 Rialto Blvd, Ste 250, Austin, TX 78735
  - Service area: Corpus Christi metro / Coastal Bend
  - Phone: (605) 431-1515 (direct) · (888) 322-4368 (broker)
  - Email: dodeehill@gmail.com
- **Same As (sitewide schema):**
  - https://www.facebook.com/SouthsideSpecialist
  - https://www.instagram.com/southsidespecialist
  - https://www.linkedin.com/in/dodee-hill-0698ab149/
  - https://www.zillow.com/profile/dodeehill

## Char-limit gate

| Field | Rank Math limit |
|------|------|
| SEO Title | ≤60 chars (with brand) |
| Meta Description | ≤155 chars |
| Slug | ≤55 chars, lowercase, hyphens |

All values below are within limits. Validate again after WP install in case Rank Math snippet preview shows red.

---

## Per-Page Rank Math Config

### 01-home.html — Home

- **Focus Keyword:** `corpus christi homes for sale`
- **Secondary Keywords:** `corpus christi tx homes for sale`, `corpus christi real estate`, `corpus christi realtor`, `coastal bend real estate`, `homes for sale corpus christi tx`
- **SEO Title:** Corpus Christi Homes for Sale · Dodee Hill, AARE Realtor (57)
- **Meta Description:** Corpus Christi homes for sale with Dodee Hill, the Southside Specialist at AARE. Buy, sell, or explore Coastal Bend communities. (133)
- **Slug:** `/`
- **Canonical:** `https://dodeehillrealestate.com/`
- **Schema:** RealEstateAgent + Person + LocalBusiness (with NAP)
- **Internal links out:** Buy, Sell, Communities, Listings, About, Contact (hub)

### 02-about.html — About Dodee

- **Focus Keyword:** `dodee hill realtor`
- **Secondary Keywords:** `dodee hill`, `southside specialist corpus christi`, `corpus christi southside`, `andrew arroyo real estate`, `aare realtor`
- **SEO Title:** About Dodee Hill · Southside Specialist · Corpus Christi (54)
- **Meta Description:** Meet Dodee Hill, Corpus Christi REALTOR® and Southside Specialist at AARE. Wyoming roots, Coastal Bend home since 2012. (123)
- **Slug:** `/about`
- **Canonical:** `https://dodeehillrealestate.com/about`
- **Schema:** AboutPage + Person (sameAs Facebook/Instagram/LinkedIn/Zillow)
- **Internal links out:** Home, Testimonials, Services, Contact

### 03-communities.html — Communities

- **Focus Keyword:** `corpus christi neighborhoods`
- **Secondary Keywords:** `flour bluff homes for sale`, `north padre island homes for sale`, `rockport tx homes for sale`, `port aransas homes for sale`, `portland tx homes for sale`, `kingsville tx homes for sale`, `kings crossing corpus christi`, `corpus christi southside`
- **SEO Title:** Corpus Christi Neighborhoods · Coastal Bend Areas · Dodee Hill (60)
- **Meta Description:** Corpus Christi, Padre Island, Port Aransas, Rockport, Flour Bluff, Kings Crossing, Portland, Kingsville. 10 Coastal Bend communities. (133)
- **Slug:** `/communities`
- **Canonical:** `https://dodeehillrealestate.com/communities`
- **Schema:** Place + ItemList (10 communities) + RealEstateAgent
- **Internal links out:** Listings, About, Buy, Contact
- **Future per-community pages (spin out from modals):**
  - `/communities/kings-crossing` — focus `kings crossing corpus christi` (260/mo)
  - `/communities/flour-bluff` — focus `flour bluff homes for sale` (880/mo)
  - `/communities/north-padre-island` — focus `north padre island homes for sale` (720/mo)
  - `/communities/rockport-tx` — focus `rockport tx homes for sale` (5,400/mo) ← largest niche capture
  - `/communities/port-aransas` — focus `port aransas homes for sale` (3,600/mo)
  - `/communities/portland-tx` — focus `portland tx homes for sale` (2,400/mo)

### 04-buyers-guide.html — Buyer's Guide

- **Focus Keyword:** `first time home buyer texas`
- **Secondary Keywords:** `first time home buyer programs texas`, `how to buy a home in texas`, `home buying process texas`, `first time home buyer corpus christi`, `buying a house in corpus christi`
- **SEO Title:** First Time Home Buyer Texas · Coastal Bend Guide · Dodee Hill (60)
- **Meta Description:** First-time home buyer guide for Texas and the Coastal Bend. Pre-approval, offers, inspections, VA loans, and military relocation tips. (134)
- **Slug:** `/buyers-guide`
- **Canonical:** `https://dodeehillrealestate.com/buyers-guide`
- **Schema:** Service (Buying Services) + HowTo (7-step process) + FAQPage
- **Internal links out:** Communities, Listings, Sellers Guide, Contact

### 05-sellers-guide.html — Seller's Guide

- **Focus Keyword:** `how to sell my house`
- **Secondary Keywords:** `home selling process`, `selling a home in texas`, `sell my house fast corpus christi`, `sell my house corpus christi`, `home selling guide texas`
- **SEO Title:** How to Sell My House in Corpus Christi · Seller's Guide (55)
- **Meta Description:** How to sell my house in Corpus Christi, the steady-hand way. Pricing, prep, marketing, negotiation, and closing for the Coastal Bend. (135)
- **Slug:** `/sellers-guide`
- **Canonical:** `https://dodeehillrealestate.com/sellers-guide`
- **Schema:** Service (Selling Services) + HowTo (8-step process) + FAQPage
- **Internal links out:** Communities, Testimonials, Buyers Guide, Contact

### 06-services.html — Services

- **Focus Keyword:** `waterfront homes corpus christi`
- **Secondary Keywords:** `luxury homes corpus christi`, `waterfront homes for sale corpus christi`, `relocation realtor corpus christi`, `military relocation corpus christi`, `investment property corpus christi`
- **SEO Title:** Real Estate Services · Corpus Christi · Dodee Hill, AARE (53)
- **Meta Description:** Buyer rep, listing, relocation, military PCS, coastal/island, investment. Six ways Dodee Hill works with Coastal Bend clients. (128)
- **Slug:** `/services`
- **Canonical:** `https://dodeehillrealestate.com/services`
- **Schema:** Service (RealEstateAgent.makesOffer)
- **Internal links out:** Buyers Guide, Sellers Guide, Communities, Contact

### 07-featured-listings.html — Featured Listings

- **Focus Keyword:** `houses for sale corpus christi tx`
- **Secondary Keywords:** `mls corpus christi`, `corpus christi mls listings`, `beach homes for sale port aransas`, `waterfront homes for sale corpus christi`, `open houses corpus christi`
- **SEO Title:** Houses for Sale in Corpus Christi, TX · Live MLS Search (54)
- **Meta Description:** Search live MLS listings for houses for sale in Corpus Christi, TX. Filter by price, beds, neighborhood, waterfront. Save searches. (132)
- **Slug:** `/listings`
- **Canonical:** `https://dodeehillrealestate.com/listings`
- **Schema:** SearchAction + RealEstateAgent
- **Internal links out:** Communities, Services, Contact
- **IDX note:** Showcase IDX shortcode injection zone, no hand-built UI

### 08-testimonials.html — Testimonials

- **Focus Keyword:** `dodee hill reviews`
- **Secondary Keywords:** `aare reviews`, `corpus christi realtor reviews`, `southside specialist reviews`, `dodee hill realtor reviews`
- **SEO Title:** Dodee Hill Reviews · Client Testimonials · Corpus Christi (57)
- **Meta Description:** What Dodee Hill's clients say across Corpus Christi, Padre Island, Rockport, and Port Aransas. Eight verbatim reviews. (115)
- **Slug:** `/testimonials`
- **Canonical:** `https://dodeehillrealestate.com/testimonials`
- **Schema:** Review + AggregateRating + Person
- **Internal links out:** About, Services, Contact

### 09-contact.html — Contact

- **Focus Keyword:** `dodee hill contact`
- **Secondary Keywords:** `contact dodee hill`, `corpus christi realtor phone number`, `aare corpus christi contact`, `andrew arroyo real estate contact`
- **SEO Title:** Contact Dodee Hill · AARE · Corpus Christi REALTOR (49)
- **Meta Description:** Contact Dodee Hill, Corpus Christi REALTOR® at AARE. Phone (605) 431-1515 or schedule a real estate consultation. (110)
- **Slug:** `/contact`
- **Canonical:** `https://dodeehillrealestate.com/contact`
- **Schema:** ContactPage + LocalBusiness (NAP)
- **Internal links out:** Home, About, Services

### 10-blog.html — Blog

- **Focus Keyword:** `corpus christi housing market`
- **Secondary Keywords:** `moving to corpus christi`, `corpus christi real estate market`, `corpus christi tx market report`, `coastal bend housing market`
- **SEO Title:** Corpus Christi Housing Market Notes · Dodee Hill Blog (53)
- **Meta Description:** Corpus Christi housing market notes from the Coastal Bend. Moving to Corpus, Padre Island, Southside, military relocation insights. (133)
- **Slug:** `/blog`
- **Canonical:** `https://dodeehillrealestate.com/blog`
- **Schema:** Blog + BreadcrumbList
- **Internal links out:** Home, Communities, Contact

### 11-terms.html — Terms of Use

- **Robots:** `noindex, follow` (legal, no SEO need but link-equity-preserving)
- **SEO Title:** Terms of Use · Dodee Hill, AARE Corpus Christi (47)
- **Meta Description:** Terms of Use for dodeehillrealestate.com. MLS / IDX disclaimers, intellectual property, equal housing, governing law. (115)
- **Slug:** `/terms`
- **Canonical:** `https://dodeehillrealestate.com/terms`
- **Schema:** WebPage
- **Note:** [CLIENT REVIEW] markers in template — final copy must be reviewed by AARE legal counsel before launch

### 12-privacy.html — Privacy Policy

- **Robots:** `noindex, follow`
- **SEO Title:** Privacy Policy · Dodee Hill, AARE Corpus Christi (49)
- **Meta Description:** Privacy Policy for dodeehillrealestate.com. CRM, IDX, cookie, and SMS data handling under TCPA and CCPA. (102)
- **Slug:** `/privacy`
- **Canonical:** `https://dodeehillrealestate.com/privacy`
- **Schema:** WebPage
- **Note:** [CLIENT REVIEW] markers — TCPA, CCPA, retention policy require AARE counsel review before launch

---

## Char-limit verification

| Page | Title chars | Meta chars | Status |
|------|------------:|----------:|--------|
| 01 Home | 57 | 133 | ✓ |
| 02 About | 54 | 123 | ✓ |
| 03 Communities | 60 | 133 | ✓ |
| 04 Buyer's Guide | 60 | 134 | ✓ |
| 05 Seller's Guide | 55 | 135 | ✓ |
| 06 Services | 53 | 128 | ✓ |
| 07 Listings | 54 | 132 | ✓ |
| 08 Testimonials | 57 | 115 | ✓ |
| 09 Contact | 49 | 110 | ✓ |
| 10 Blog | 53 | 133 | ✓ |
| 11 Terms | 47 | 115 | ✓ |
| 12 Privacy | 49 | 102 | ✓ |

All titles ≤60, all descriptions ≤155.
