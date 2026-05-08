# Dodee Hill — Design System

**Canon:** Millie + Michael (validated 2026-05-01).
**Pattern:** Copy Michael Sapp `styles.css` verbatim, swap accent hex only.

## Type

| Role | Family | Weight | Notes |
|------|--------|--------|-------|
| Headings | Raleway | **200** | Uppercase, letterspaced 2px, sans-only |
| Body | Montserrat | 300/400/500/600/700 + 400i | |

H1: `clamp(34px, 5vw, 56px)` · H2: `clamp(26px, 3.5vw, 40px)` · H3: `clamp(20px, 2.5vw, 30px)` · body 16/1.7

**Hard rule:** zero italic-serif accents (no Fraunces, no Playfair italic). Sans-only is the canon.

## Color (coastal Gulf palette — per-client accent swap from Michael Sapp's oxblood)

| Token | Old (Michael, oxblood) | New (Dodee, Gulf) | Use |
|-------|------------------------|-------------------|-----|
| `--purple` / `--color-primary` | `#5C1A1A` | **`#0E5C6E`** | Primary accent — links, hovers, key headings, primary buttons (white→fill) |
| `--purple-light` / `--color-primary-dark` | `#7A2828` | **`#1A7A8E`** | Hover variant |
| `--gold` / `--color-accent` | `#A8956E` | **`#C9B886`** | Warm Gulf-sand secondary accent (icons, dividers) |
| `--gray-bg` / `--color-surface-alt` | `#F2F1F1` | `#F2F1F1` | unchanged |
| `--white` | `#FFFFFF` | `#FFFFFF` | unchanged |
| `--black` | `#0D0D0D` | `#0D0D0D` | unchanged — black-button-inverts canon |
| `--text-dark` | `#1A1A1A` | `#1A1A1A` | unchanged |
| `--text-muted` | `#666666` | `#666666` | unchanged |

**Why these greens:** `#0E5C6E` is deep Gulf-water teal — distinct from Michelle Seymour's blue, Kathy Huang's gold, Cindy Quinn's Gulf-coast Florida tones. Reads coastal without reading "tropical resort." Pairs cleanly with warm sand `#C9B886` for SVG icons on dark hero.

## Buttons

Black-button-inverts canon (Millie/Michael):
- Primary: black fill, white text → hover: white fill, black text + black border
- Secondary: transparent + white border on dark bg → hover: white fill
- Accent CTA: `--color-primary` `#0E5C6E` fill on light surfaces (used sparingly)

## Layout

- Max-width 1200px
- Section padding `96px 0` desktop, `64px 0` mobile
- Communities = card grid + JS modals (in-page, not separate files)
- Process blocks = alternating image+text rows (per `feedback_process_block_pattern`)
- IDX page = hero + shortcode placeholder only

## Iconography

Inline SVG only. No emoji. Sand-warm `#C9B886` strokes/fills on dark; `#0E5C6E` on light.

## Imagery

- Hero: coastal Gulf horizon (Padre Island, Port A jetty, sunset over bay)
- Communities: real Corpus shots from Unsplash (provided Roman Suarez photo for Kings Crossing)
- Headshot: provided `dodee-headshot.jpg`
- Logo: provided AARE logo `aare-logo.jpg`
- Avoid: stock skylines, generic suburban tract homes

## Don't

- Em dashes anywhere in copy
- Emoji icons (SVG only)
- Italic-serif accent type
- 3-card mini-process (use alternating image+text rows)
- Hand-built IDX UI (shortcode placeholder zone only)
- Fabricated testimonials (real or `[PLACEHOLDER]`)
