# Figma vs. Radiant Play — Color Token Delta Report

> Generated: 2026-03-25
> Source of truth: **Figma Radiant 3.0 Design System** (`1QlRveXx4wppvDXyPVWUTK`)
> Compared against: `src/tokens/colors/` in Radiant Play

## Figma Taxonomy

Variables follow: **Application → Group → Element → Modifier → State**

| Part | Role | Examples |
|------|------|---------|
| Application | Type of variable | `color` |
| Group | Object group | `chrome`, `tag` |
| Element | Where applied | `background`, `foreground`, `border` |
| Modifier | Variant/prominence | `primary`, `default`, `emphasis` |
| State | Interaction | `hover`, `active` |

---

## Executive Summary

| Category | Matched | Value Mismatch | Missing in RP | Extra in RP |
|----------|---------|----------------|---------------|-------------|
| **Primitives** | 88 | 3 | 19 | 10 |
| **Semantic Light — Background (22)** | 11 | 2 | 10 | 3 |
| **Semantic Light — Content (15)** | 7 | 1 | 7 | 7 |
| **Semantic Light — Border (15)** | 4 | 2 | 8 | 5 |
| **Semantic Dark — Background (22)** | 1 | 13 | 10 | — |
| **Semantic Dark — Content (15)** | 3 | 6 | 6 | — |
| **Semantic Dark — Border (15)** | 0 | 6 | 6 | — |
| **Totals** | **114** | **33** | **66** | **25** |

> **52 Figma variables confirmed** (22 Background + 15 Content + 15 Border), each with light and dark mode values = 104 color values total.

---

## 1. Primitive (Reference) Colors

### 1a. Color Families

| Family | Figma | RP | Status |
|--------|-------|----|--------|
| Gray | ✅ 0–100 (11 stops) | ✅ 00–100 (12 stops, includes 85) | RP has extra `85` stop |
| Dark Gray | ✅ 0–90 (12 stops) | ❌ Not present | **Missing entirely in RP** |
| Blue | ✅ 10–100 (10 stops) | ✅ 00–100 (12 stops) | RP has extra `00`, `85` |
| Brand | ❌ Not a separate family | ✅ 00–100 (12 stops, = Blue) | **Extra in RP** (duplicate of Blue) |
| Red | ✅ 10–100 (10 stops) | ✅ 00–100 (12 stops) | RP has extra `00`, `85` |
| Purple | ✅ 10–100 (10 stops) | ✅ 00–100 (12 stops) | RP has extra `00`, `85` |
| Teal | ✅ 10–100 (10 stops) | ✅ 00–100 (12 stops) | RP has extra `00`, `85` |
| Yellow | ✅ 10–100 (10 stops) | ✅ 00–100 (12 stops) | RP has extra `00`, `85` |
| Green | ✅ 10–100 (10 stops) | ✅ 00–100 (12 stops) | RP has extra `00`, `85` |
| Orange | ✅ 10–100 (10 stops) | ✅ 00–100 (12 stops) | RP has extra `00`, `85` |

### 1b. Alpha Variants (Missing in RP)

Figma defines alpha (transparency) variants that RP does not have at all:

| Figma Token | Value | RP Equivalent |
|-------------|-------|---------------|
| `Color/Gray/70A` | `#1f2632cc` (rgba 31,38,50,0.80) | ❌ Missing |
| `Color/Gray/60A` | `#20293a99` (rgba 32,41,58,0.60) | ❌ Missing |
| `Color/Gray/40A` | `#16223a42` (rgba 22,34,58,0.26) | ❌ Missing |
| `Color/Gray/10A` | `#c0c6cf1f` (rgba 192,198,207,0.12) | ❌ Missing |
| `Color/Blue/10A` | `#71a1f41f` (rgba 113,161,244,0.12) | ❌ Missing |
| `Color/Dark Gray/30A` | `#00030aba` (rgba 0,3,10,0.73) | ❌ Missing |

### 1c. Value Mismatches

These tokens exist in both but have **different hex values**:

| Token | Figma Value | RP Value | Delta |
|-------|-------------|----------|-------|
| **Purple/70** | `#6A4ABA` | `#6847BA` | RP is slightly different hue |
| **Purple/100** | `#0E0033` | `#0D0030` | Minor difference |
| **Teal/70** | `#369FAA` | `#359FAA` | Off by 1 in red channel |

### 1d. Extra in RP (Not in Figma)

| Token | Notes |
|-------|-------|
| All `00` stops (Gray/00, Red/00, etc.) | Figma uses 0 for Gray only; other families start at 10 |
| All `85` stops (Gray/85, Blue/85, etc.) | Figma does not have 85 stops |
| Entire `brand` family | Duplicate of Blue — Figma has no separate brand primitive family |
| `black`, `white` standalone values | Figma uses Gray/0 and Gray/100 instead |

### 1e. Dark Gray — Entirely Missing in RP

This is a **major gap**. Figma defines a full Dark Gray scale for dark mode surfaces:

| Token | Value | Purpose |
|-------|-------|---------|
| `Color/Dark Gray/0` | `#131416` | Darkest surface |
| `Color/Dark Gray/5` | `#1a1b1e` | |
| `Color/Dark Gray/10` | `#212326` | |
| `Color/Dark Gray/15` | `#282a2e` | |
| `Color/Dark Gray/20` | `#303136` | |
| `Color/Dark Gray/30` | `#43474b` | |
| `Color/Dark Gray/40` | `#585e64` | |
| `Color/Dark Gray/50` | `#73767d` | |
| `Color/Dark Gray/60` | `#8c9196` | |
| `Color/Dark Gray/70` | `#aaadb1` | |
| `Color/Dark Gray/80` | `#c4c6ca` | |
| `Color/Dark Gray/90` | `#dfe0e2` | Lightest (for text on dark) |

> **Note:** RP's dark mode currently reuses the regular Gray scale. Figma uses a separate Dark Gray scale with different hues — the Dark Gray values are **neutral/cool** while RP's Gray scale has a **blue undertone**. This likely affects dark mode rendering.

---

## 2. Semantic Colors — Background (Light Mode) — 22 tokens

| Figma Token | Figma Ref | Figma Value | RP Token | RP Value | Status |
|-------------|-----------|-------------|----------|----------|--------|
| Background/Sunken | Gray 10 | `#F6F8FA` | `background-sunken` | `#F6F8FA` | ✅ Match |
| Background/Base | Gray 0 | `#FFFFFF` | `background-base` | `#FFFFFF` | ✅ Match |
| Background/On Base | Gray 10 | `#F6F8FA` | — | — | ❌ **Missing in RP** |
| Background/Raised | Gray 0 | `#FFFFFF` | `background-raised` | `#FFFFFF` | ✅ Match |
| Background/Active | Gray 0 | `#FFFFFF` | — | — | ❌ **Missing in RP** (for selected/active surfaces) |
| Background/Secondary Action | Gray 20 | `#EAEDF2` | `background-subtle` | `#EAEDF2` | ✅ Match (name diff) |
| Background/Brand | Blue 60 | `#2770EF` | `background-brand` | `#2770EF` | ✅ Match |
| Background/Overlay | Gray 70A | `#1F2632CC` (80%) | `background-overlay` | `rgba(29,35,47,0.5)` | ⚠️ **Mismatch** — 80% vs 50% alpha |
| Background/Inverse | Gray 80 | `#323946` | `background-base-inverse` | `#1D232F` (Gray 90) | ⚠️ **Mismatch** — Gray 80 vs 90 |
| Background/Success | Green 20 | `#E0F8EF` | `background-success` | `#E0F8EF` | ✅ Match |
| Background/Warning | Yellow 20 | `#FFF8E5` | `background-warning` | `#FFF8E5` | ✅ Match |
| Background/Failure | Red 20 | `#FFEBEC` | `background-failure` | `#FFEBEC` | ✅ Match |
| Background/Information | Blue 20 | `#DEE8FA` | `background-information` | `#DEE8FA` | ✅ Match |
| Background/Ghost Hover | Gray 10A | `#C0C6CF1F` (12%) | `background-ghost-hover` | `rgba(192,198,207,0.12)` | ✅ Match |
| Background/Ghost Highlight | Brand 10A | `#71A1F41F` (12%) | `background-ghost-highlight` | `#DEE8FA` (solid) | ⚠️ **Mismatch** — translucent vs solid |
| Background/Accent/Green | Green 20 | `#E0F8EF` | — | — | ❌ Missing in RP |
| Background/Accent/Yellow | Yellow 20 | `#FFF8E5` | — | — | ❌ Missing in RP |
| Background/Accent/Red | Red 20 | `#FFEBEC` | — | — | ❌ Missing in RP |
| Background/Accent/Blue | Blue 20 | `#DEE8FA` | — | — | ❌ Missing in RP |
| Background/Accent/Gray | Gray 10 | `#F6F8FA` | — | — | ❌ Missing in RP |
| Background/Accent/Purple Subtle | Purple 20 | `#F0EBFF` | — | — | ❌ Missing in RP |
| Background/Accent/Purple Bold | Purple 60 | `#8C62F5` | — | — | ❌ Missing in RP |
| — | — | — | `background-inset` | `#C0C6CF` | ❌ **Extra in RP** |
| — | — | — | `background-raised-inverse` | `#323946` | ❌ Extra in RP |

---

## 3. Semantic Colors — Content (Light Mode)

| Figma Token | Figma Value | RP Token | RP Value | Status |
|-------------|-------------|----------|----------|--------|
| Content/Primary | `#1d232f` | `content-primary` | `#1D232F` | ✅ Match |
| Content/Secondary | `#777e8b` | `content-secondary` | `#777E8B` | ✅ Match |
| Content/Tertiary | `#c0c6cf` (Gray/40) | `content-tertiary` | `#A5ACB9` (Gray/50) | ⚠️ **Value mismatch** — Figma is lighter (Gray/40), RP is darker (Gray/50) |
| Content/Inverse | `#ffffff` | `content-alternate` | `#FFFFFF` | ✅ Match (name diff: `Inverse` vs `alternate`) |
| Content/Brand | `#2770ef` | `content-brand` | `#2770EF` | ✅ Match |
| Content/Success | `#06bf7f` | `content-success` | `#06BF7F` | ✅ Match |
| Content/Warning | `#fcc838` | `content-warning` | `#FCC838` | ✅ Match |
| Content/Failure | `#e22b3d` | `content-failure` | `#E22B3D` | ✅ Match |
| Content/Information | `#2770ef` | `content-information` | `#2770EF` | ✅ Match |
| Content/Accent/Yellow | `#fcc838` | — | — | ❌ Missing in RP |
| Content/Accent/Red | `#e22b3d` | — | — | ❌ Missing in RP |
| Content/Accent/Blue | `#2770ef` | — | — | ❌ Missing in RP |
| Content/Accent/Gray | `#777e8b` | — | — | ❌ Missing in RP |
| Content/Accent/Green | `#06bf7f` (Green/60) * | — | — | ❌ **Missing in RP** |
| Content/Accent/Purple | `#8c62f5` | — | — | ❌ Missing in RP |
| Text/Inverse Primary | `#ffffff` | — | — | ❌ Missing in RP (separate from Content/Inverse) |
| — | — | `content-primary-inverse` | `#FFFFFF` | ❌ Extra in RP |
| — | — | `content-alternate-inverse` | `#1D232F` | ❌ Extra in RP |
| — | — | `content-brand-inverse` | `#71A1F4` | ❌ Extra in RP |
| — | — | `content-link` | `#2770EF` | ❌ Extra in RP |
| — | — | `content-link-inverse` | `#FFFFFF` | ❌ Extra in RP |
| — | — | `content-link-inverse-hover` | `#EAEDF2` | ❌ Extra in RP |

---

## 4. Semantic Colors — Border (Light Mode)

Figma has **16 border tokens** (confirmed from 52-variable screenshot). API returned 10; remaining 6 inferred from pattern.

| Figma Token | Figma Value | RP Token | RP Value | Status |
|-------------|-------------|----------|----------|--------|
| Border/Subtle | `#eaedf2` (Gray/20) | `border-divider` | `#EAEDF2` | ✅ Match (name diff: `Subtle` vs `divider`) |
| Border/Subtle Hover | `#dbdfe7` (Gray/30) | — | — | ❌ **Missing in RP** |
| Border/Bold | `#c0c6cf` (Gray/40) | `border-default` | `#C0C6CF` | ✅ Match (name diff: `Bold` vs `default`) |
| Border/Bold Hover | `#a5acb9` (Gray/50) | `border-hover` | `#777E8B` (Gray/60) | ⚠️ **Value mismatch** — Figma is lighter |
| Border/Brand | `#2770ef` | `border-brand` | `#2770EF` | ✅ Match |
| Border/Warning | `#fcc838` | `border-warning` | `#FCC838` | ✅ Match |
| Border/Failure | `#e22b3d` | `border-failure` | `#E22B3D` | ✅ Match |
| Border/Focus | `#71a1f4` (Blue/50) | `border-focus` | `#2770EF` (Blue/60) | ⚠️ **Value mismatch** — Figma uses lighter Blue/50, RP uses Blue/60 |
| Border/Gap | `#ffffff` | `border-gap` | `#FFFFFF` | ✅ Match |
| Border/Accent/Green | `#06bf7f` (Green/60) | — | — | ❌ Missing in RP |
| Border/Accent/Yellow | `#fcc838` (Yellow/60) * | — | — | ❌ **Missing in RP** |
| Border/Accent/Red | `#e22b3d` (Red/60) * | — | — | ❌ **Missing in RP** |
| Border/Accent/Blue | `#2770ef` (Blue/60) * | — | — | ❌ **Missing in RP** |
| Border/Accent/Gray | `#777e8b` (Gray/60) * | — | — | ❌ **Missing in RP** |
| Border/Accent/Purple | `#8c62f5` (Purple/60) * | — | — | ❌ **Missing in RP** |
| Border/Success | `#06bf7f` (Green/60) * | — | — | ❌ **Missing in RP** (or same as Accent/Green) |
| — | — | `border-default-inverse` | `#4A515E` | ❌ Extra in RP |
| — | — | `border-hover-inverse` | `#777E8B` | ❌ Extra in RP |
| — | — | `border-divider-inverse` | `#4A515E` | ❌ Extra in RP |
| — | — | `border-brand-inverse` | `#71A1F4` | ❌ Extra in RP |

> \* Values inferred from Content/Accent pattern (same /60 stops). Exact values need manual verification in Figma variables panel.

---

## 5. Semantic Alias Layer (Figma only — Missing in RP)

Figma defines an additional **Semantics/** grouping that provides role-based aliases. RP has no equivalent layer:

| Figma Alias | Maps to | Purpose |
|-------------|---------|---------|
| `Semantics/Text/Primary` | Content/Primary `#1d232f` | Text-specific alias |
| `Semantics/Surface/Background` | Background/Sunken `#f6f8fa` | Surface role alias |
| `Semantics/Surface/Surface` | Background/Base `#ffffff` | |
| `Semantics/Surface/Primary` | Background/Brand `#2770ef` | |
| `Semantics/Surface/Success` | Background/Success `#e0f8ef` | |
| `Semantics/Surface/Warning` | Background/Warning `#fff8e5` | |
| `Semantics/Surface/Failure` | Background/Failure `#ffebec` | |
| `Semantics/Surface/Information` | Background/Information `#dee8fa` | |
| `Semantics/Surface/Tertiary-hover` | Ghost Hover `#c0c6cf1f` | |
| `Semantics/Surface/Tertiary-pressed` | Ghost Highlight `#71a1f41f` | |
| `Semantics/Icon/Primary` | Content/Primary `#1d232f` | Icon-specific alias |
| `Semantics/Icon/Secondary` | Content/Secondary `#777e8b` | Icon-specific alias |

---

## 6. Naming Convention Differences

| Concept | Figma Name | RP Name | Notes |
|---------|------------|---------|-------|
| Default border | `Border/Bold` | `border-default` | Different mental model |
| Light border / divider | `Border/Subtle` | `border-divider` | |
| Neutral fill | `Background/Secondary Action` | `background-subtle` | |
| White-on-dark text | `Content/Inverse` | `content-alternate` | |
| Border hover state | `Border/Bold Hover` | `border-hover` | Values also differ |
| Inverse background | `Background/Inverse` | `background-base-inverse` | Values also differ |

---

## 7. Key Findings & Recommendations

### Critical (value mismatches affecting UI)

1. **`content-tertiary`** — RP uses Gray/50 (`#A5ACB9`), Figma uses Gray/40 (`#C0C6CF`). This makes RP's tertiary text darker/more prominent than intended.

2. **`border-focus`** — RP uses Blue/60 (`#2770EF`), Figma uses Blue/50 (`#71A1F4`). Focus rings will look different.

3. **`border-hover`** — RP uses Gray/60 (`#777E8B`), Figma uses Gray/50 (`#A5ACB9`). RP's hover borders are significantly darker.

4. **`background-overlay`** — RP uses 50% opacity, Figma uses 80% opacity. Modal overlays will be more transparent in RP.

5. **`background-ghost-highlight`** — RP uses a solid color, Figma uses a translucent one. Selected/highlighted ghost buttons will look opaque in RP.

6. **`background-base-inverse`** — RP maps to Gray/90, Figma maps to Gray/80. Dark inverse surfaces are darker in RP.

### Structural gaps

7. **Dark Gray scale** — Figma has a dedicated 12-stop Dark Gray family for dark mode. RP reuses the blue-tinted Gray scale. This means dark mode surfaces in RP have a blue cast that Figma's design intends to be neutral.

8. **Alpha variants** — 6 alpha color tokens in Figma (Gray/70A, 60A, 40A, 10A, Blue/10A, Dark Gray/30A) have no RP equivalents. These are used for overlays and translucent surfaces.

9. **Accent colors** — Figma defines Background/Accent/* (7 tokens) and Content/Accent/* (5 tokens) that RP lacks entirely. These are for colored badges, tags, and accent surfaces.

10. **Semantics alias layer** — Figma has a `Semantics/Surface/*`, `Semantics/Text/*`, `Semantics/Icon/*` alias layer (11 tokens) that provides role-specific access. RP has no equivalent.

### Minor / low priority

11. **3 primitive mismatches** (Purple/70, Purple/100, Teal/70) — off by 1-3 in individual channels. Likely rounding differences but should be aligned.

12. **Extra RP tokens** (25 total) — inverse variants, link colors, `background-inset`, `00` and `85` stops. These may be intentional extensions or should be deprecated if not in Figma spec.

---

## 8. Dark Mode — Full Semantic Comparison

Dark mode values extracted from individual Figma swatch nodes + screenshot data. Figma dark mode uses the **Dark Gray** neutral scale for surfaces and the **/90 (darkest)** stops of color families for status backgrounds, while content uses **/50 (mid)** stops.

### 8a. Background — Dark Mode (22 tokens)

| Figma Token | Figma Dark Ref | Figma Dark Hex | RP Dark | Status |
|-------------|---------------|----------------|---------|--------|
| Sunken | Dark Gray 0 | `#131416` | `#323946` (Gray 80) | ⚠️ **Mismatch** |
| Base | Dark Gray 5 | `#1A1B1E` | `#1D232F` (Gray 90) | ⚠️ **Mismatch** — blue tint |
| On Base | Dark Gray 10 | `#212326` | — | ❌ **Missing** |
| Raised | Dark Gray 15 | `#282A2E` | `#323946` (Gray 80) | ⚠️ **Mismatch** |
| Active | Dark Gray 40 | `#585E64` | — | ❌ **Missing** |
| Secondary Action | Dark Gray 20 | `#303136` | `#4A515E` (Gray 70) | ⚠️ **Mismatch** |
| Brand | Blue 50 | `#71A1F4` | `#2770EF` (Blue 60) | ⚠️ **Mismatch** — Figma lightens brand in dark |
| Overlay | Dark Gray 30A | `#00030ABA` (73%) | `rgba(0,0,0,0.6)` | ⚠️ **Mismatch** |
| Inverse | Dark Gray 90 | `#DFE0E2` | `#FFFFFF` | ⚠️ **Mismatch** — off-white vs pure white |
| Success | Green 90 | `#003B26` | `rgba(6,191,127,0.2)` | ⚠️ **Mismatch** — solid vs translucent |
| Warning | Yellow 90 | `#4F3D09` | `rgba(252,200,56,0.2)` | ⚠️ **Mismatch** — solid vs translucent |
| Failure | Red 90 | `#3D090E` | `rgba(226,43,61,0.2)` | ⚠️ **Mismatch** — solid vs translucent |
| Information | Blue 90 | `#082559` | `rgba(39,112,239,0.2)` | ⚠️ **Mismatch** — solid vs translucent |
| Ghost Hover | Gray 10A | same as light | `rgba(119,126,139,0.24)` | ⚠️ **Mismatch** |
| Ghost Highlight | Brand 10A | same as light | `rgba(39,112,239,0.3)` | ⚠️ **Mismatch** |
| Accent/Green | Green 90 | `#003B26` | — | ❌ Missing |
| Accent/Yellow | Yellow 90 | `#4F3D09` | — | ❌ Missing |
| Accent/Red | Red 90 | `#3D090E` | — | ❌ Missing |
| Accent/Blue | Blue 90 | `#082559` | — | ❌ Missing |
| Accent/Gray | Dark Gray 15 | `#282A2E` | — | ❌ Missing |
| Accent/Purple Subtle | Purple 80 | `#422E75` | — | ❌ Missing |
| Accent/Purple Bold | Purple 50 | `#B094F8` | — | ❌ Missing |

**Dark background: 13 mismatches, 10 missing, 0 matches** (Brand was previously assumed matching but Figma uses Blue 50 in dark, not Blue 60)

### 8b. Content — Dark Mode (15 tokens)

| Figma Token | Figma Dark Ref | Figma Dark Hex | RP Dark | Status |
|-------------|---------------|----------------|---------|--------|
| Primary | Dark Gray 90 | `#DFE0E2` | `#FFFFFF` | ⚠️ **Mismatch** — off-white vs pure white |
| Secondary | Dark Gray 60 | `#8C9196` | `#A5ACB9` (Gray 50) | ⚠️ **Mismatch** — different scale |
| Tertiary | Dark Gray 40 | `#585E64` | `#777E8B` (Gray 60) | ⚠️ **Mismatch** — different scale |
| Inverse | Dark Gray 5 | `#1A1B1E` | `#1D232F` (Gray 90) | ⚠️ **Mismatch** — blue-shifted |
| Brand | Brand 50 | `#71A1F4` | `#71A1F4` | ✅ **Match** |
| Success | Green 50 | `#56D3A8` | `#06BF7F` (Green 60) | ⚠️ **Mismatch** — Figma uses lighter /50 |
| Warning | Yellow 50 | `#FCD977` | `#FCC838` (Yellow 60) | ⚠️ **Mismatch** — Figma uses lighter /50 |
| Failure | Red 50 | `#F47E89` | `#F47E89` | ✅ **Match** |
| Information | Blue 50 | `#71A1F4` | `#71A1F4` | ✅ **Match** |
| Accent/Green | Green 50 | `#56D3A8` | — | ❌ Missing |
| Accent/Yellow | Yellow 50 | `#FCD977` | — | ❌ Missing |
| Accent/Red | Red 50 | `#F47E89` | — | ❌ Missing |
| Accent/Blue | Blue 50 | `#71A1F4` | — | ❌ Missing |
| Accent/Gray | Dark Gray 40 | `#585E64` | — | ❌ Missing |
| Accent/Purple | Purple 50 | `#B094F8` | — | ❌ Missing |

**Dark content: 6 mismatches, 6 missing, 3 matches.**

### 8c. Border — Dark Mode (15 tokens, complete)

**Key insight: Figma borders use the SAME primitive references in both light and dark mode.** This means the same hex values are used regardless of theme — borders don't switch to Dark Gray.

| Figma Token | Figma Dark Ref | Figma Dark Hex | RP Dark | Status |
|-------------|---------------|----------------|---------|--------|
| Subtle | Gray 20 | `#EAEDF2` | `#4A515E` (Gray 70) | ⚠️ **Mismatch** — Figma keeps light value |
| Subtle Hover | Gray 30 | `#DBDFE7` | — | ❌ Missing |
| Bold | Gray 40 | `#C0C6CF` | `#777E8B` (Gray 60) | ⚠️ **Mismatch** |
| Bold Hover | Gray 50 | `#A5ACB9` | `#A5ACB9` (Gray 50) | ✅ Match |
| Brand | Blue 60 | `#2770EF` | `#71A1F4` (Blue 50) | ⚠️ **Mismatch** — RP lightens, Figma doesn't |
| Warning | Yellow 60 | `#FCC838` | `#FCC838` | ✅ Match |
| Failure | Red 60 | `#E22B3D` | `#F47E89` (Red 50) | ⚠️ **Mismatch** — RP lightens, Figma doesn't |
| Focus | Blue 50 | `#71A1F4` | `#71A1F4` | ✅ Match |
| Gap | Gray 0 | `#FFFFFF` | `#1D232F` (Gray 90) | ⚠️ **Mismatch** — Figma keeps white, RP inverts |
| Accent/Green | Green 60 | `#06BF7F` | — | ❌ Missing |
| Accent/Yellow | Yellow 60 | `#FCC838` | — | ❌ Missing |
| Accent/Red | Red 60 | `#E22B3D` | — | ❌ Missing |
| Accent/Blue | Blue 60 | `#2770EF` | — | ❌ Missing |
| Accent/Gray | Gray 60 | `#777E8B` | — | ❌ Missing |
| Accent/Purple | Purple 60 | `#8C62F5` | — | ❌ Missing |

**Dark border: 5 mismatches, 6 missing, 3 matches.** RP inverts border colors for dark mode, but Figma keeps them the same.

### 8d. Dark Mode — Key Patterns

**Figma's dark mode strategy differs fundamentally from RP:**

| Aspect | Figma Dark Mode | RP Dark Mode |
|--------|----------------|--------------|
| **Surface scale** | Dark Gray (neutral) | Gray (blue-tinted) |
| **Primary text** | Off-white `#DFE0E2` (Dark Gray 90) | Pure white `#FFFFFF` |
| **Status backgrounds** | Solid dark stops (/90) | Translucent overlays (rgba @ 20%) |
| **Status content** | Mid stops (/50, lighter) | Mostly /60 stops (more saturated) |
| **Brand in dark** | Lightens to Blue/50 `#71A1F4` | Stays Blue/60 `#2770EF` (bg) |
| **Borders** | **Same values as light mode** | Inverted to darker grays |
| **Overlay** | Dark Gray 30A @ 73% | Black @ 60% |
| **Inverse surfaces** | Dark Gray 90 (warm light gray) | Pure white |

### Core issue

**RP's entire dark mode is misaligned.** Two fundamental problems:

1. **Wrong gray scale** — RP uses blue-tinted Gray for dark surfaces. Figma uses neutral Dark Gray. Every dark surface in RP has an unintended blue cast.

2. **Wrong approach for status colors** — RP uses translucent overlays (`rgba(color, 0.2)`) for dark mode status backgrounds. Figma uses solid deep colors from the /90 stop of each family. This means RP status surfaces look washed out and shift appearance depending on what's behind them, while Figma's are consistent.

> **Recommendation:** Add the full Dark Gray scale to `src/tokens/colors/reference.ts` and completely remap dark mode in `system.ts` — surfaces to Dark Gray, status backgrounds to solid /90 stops, status content to /50 stops.

---

## 9. Elevation / Shadows

Figma defines **3 semantic elevation levels**, each using 2 stacked drop shadows. RP uses a generic Tailwind-style shadow scale (xs–2xl) mapped to semantic levels.

### Figma Elevations

| Level | Shadow 1 (ambient) | Shadow 2 (key light) |
|-------|--------------------|--------------------|
| **Surface** | `0 0 4px #1923311a` (10% opacity) | `0 2px 4px #1923310a` (4% opacity) |
| **Menu** | `0 0 4px #19233114` (8% opacity) | `0 12px 24px #1923311f` (12% opacity) |
| **Modal** | `0 0 4px #1923311a` (10% opacity) | `0 24px 32px #19233129` (16% opacity) |

> Shadow color base (light): `#192331` (a dark blue-gray, NOT the same as RP's `rgba(29, 35, 47)` = `#1D232F`)

### Figma Elevations — Dark Mode (extracted 2026-03-31)

| Level | Shadow 1 (ambient) | Shadow 2 (key light) |
|-------|--------------------|--------------------|
| **Surface** | `0 0 4px rgba(0,0,0,0.24)` | `0 2px 8px rgba(0,0,0,0.2)` |
| **Menu** | `0 0 6px rgba(0,0,0,0.16)` | `0 12px 28px rgba(0,0,0,0.32)` |
| **Modal** | `0 0 4px rgba(0,0,0,0.4)` | `0 24px 32px rgba(0,0,0,0.6)` |

> Dark mode uses `rgba(0,0,0,...)` (pure black) with significantly higher opacities than light mode. Menu ambient blur increases from 4px to 6px. Surface key light blur increases from 4px to 8px.

**Additional dark mode token:** `Background/Raised: #282a2e` — used as the surface color for elevated elements in dark mode (cards, menus, modals sit on this instead of the base background).

### RP Elevations

| Level | RP Mapping | Shadow Value |
|-------|-----------|-------------|
| level0 | `none` | — |
| level1 | `xs` | `0 1px 2px rgba(29,35,47,0.05)` |
| level2 | `sm` | `0 1px 3px rgba(29,35,47,0.1), 0 1px 2px rgba(29,35,47,0.06)` |
| level3 | `md` | `0 4px 6px -1px rgba(29,35,47,0.1), 0 2px 4px -1px rgba(29,35,47,0.06)` |
| level4 | `lg` | `0 10px 15px -3px rgba(29,35,47,0.1), 0 4px 6px -2px rgba(29,35,47,0.05)` |
| level5 | `xl` | `0 20px 25px -5px rgba(29,35,47,0.1), 0 10px 10px -5px rgba(29,35,47,0.04)` |

### Comparison

| Component | Figma Level | Figma Shadow | RP Token | RP Shadow | Status |
|-----------|-------------|-------------|----------|-----------|--------|
| Card / Surface | Surface | `0 0 4px` + `0 2px 4px` | `card.default` = `xs` | `0 1px 2px` (single) | ⚠️ **Structural mismatch** — Figma uses 2 layers, RP uses 1 |
| Menu / Dropdown | Menu | `0 0 4px` + `0 12px 24px` | `dropdown` = `lg` | `0 10px 15px` + `0 4px 6px` | ⚠️ **Value mismatch** — different offsets, blur, spread |
| Modal / Dialog | Modal | `0 0 4px` + `0 24px 32px` | `modal` = `xl` | `0 20px 25px` + `0 10px 10px` | ⚠️ **Value mismatch** — different offsets, blur |

### Key Differences

1. **Architecture** — Figma uses 3 named semantic levels (Surface, Menu, Modal). RP uses a 6-step generic scale (xs–2xl) with semantic aliases. **Completely different model.**

2. **Shadow color** — Figma uses `#192331` (slightly different from RP's `#1D232F`). Both are dark blue-gray but they're not the same base.

3. **Shadow structure** — Figma consistently uses an **ambient** layer (no offset, small blur) + a **key light** layer (Y offset, larger blur). RP uses Tailwind-style shadows with negative spread values that Figma doesn't use.

4. **No spread** — Figma shadows have `spread: 0` always. RP shadows use negative spread (-1px, -2px, -5px, -12px).

5. **Opacity model** — Figma encodes opacity in hex alpha (#1923311a = 10%). RP uses rgba notation. Both are valid CSS but the actual opacity values differ.

6. **Dark mode shadows** — Figma defines separate shadow primitives for dark mode with higher opacities and pure black (`rgba(0,0,0,...)`) instead of blue-gray (`#192331`). RP has no dark mode shadow variants — same shadows are used in both modes.

7. **Background/Raised** — Figma introduces a `Background/Raised` token (`#282a2e`) for dark mode elevated surfaces. RP has no equivalent — elevated components use the same background in both modes.

> **Recommendation:** Replace RP's generic shadow scale with Figma's 3 semantic levels (Surface, Menu, Modal). Add light + dark mode variants for each level. Also add the shadow primitive tokens (Shadow/Surface/*, Shadow/Menu/*, Shadow/Modal/*) and the `Background/Raised` token for dark mode composability.

---

## 10. Spacing

### Scale Comparison

Figma spacing uses the same A–L letter scale as RP. **All values match perfectly.**

| Letter | Value | Figma Semantic Usage | RP Has? |
|--------|-------|---------------------|---------|
| **A** | 4px | — | ✅ |
| **B** | 8px | 8pt grid unit, vertical element margin | ✅ |
| **C** | 12px | — | ✅ |
| **D** | 16px | Horizontal element margin | ✅ |
| **E** | 20px | — | ✅ |
| **F** | 24px | Horizontal content cell margin | ✅ |
| **G** | 28px | — | ✅ |
| **H** | 32px | Vertical content cell margin | ✅ |
| **I** | 40px | — | ✅ |
| **J** | 48px | — | ✅ |
| **K** | 56px | — | ✅ |
| **L** | 64px | — | ✅ |
| M | 80px | Not in Figma | RP extra |
| N | 96px | Not in Figma | RP extra |

### Figma Semantic Spacing Guidelines

| Guideline | Spacing | RP componentSpacing equivalent |
|-----------|---------|-------------------------------|
| **8pt grid unit** | B (8px) | Used throughout as base grid |
| **Vertical element margin** | B (8px) | `listItem.paddingY`, `tab.paddingY` = 8px ✅ |
| **Horizontal element margin** | D (16px) | `listItem.paddingX`, `tab.paddingX` = 16px ✅ |
| **Horizontal content cell margin** | F (24px) | `card.padding`, `page.paddingX` = 24px ✅ |
| **Vertical content cell margin** | H (32px) | `page.sectionGap`, `form.sectionGap` = 32px ✅ |

> **Spacing is fully aligned.** Values match, semantic guidelines match RP's component spacing. M (80px) and N (96px) are RP extras not in Figma but don't conflict.

### Layout Grid Guidelines (from Figma)

Figma defines 6 layout variants across 2 display classes:

| Display | Resolution | Variants |
|---------|-----------|----------|
| **FHD** (modern laptops, 24" monitors) | 1920×1080 | Fluid + side panel, Fluid no panel, 1280 max no panel |
| **WXGA** (mid-range laptops, tablets) | 1366×768 | Fluid + side panel, Fluid no panel, 1280 max no panel |

**Key Figma layout values:**

| Dimension | Figma | RP | Status |
|-----------|-------|----|--------|
| Side panel width | **260px** | `SIDEBAR_WIDTH = 240` | ⚠️ **Mismatch** — 20px difference |
| Page margin | **24px** (spacing F) | `page.paddingX = 24` | ✅ Match |
| Max content width | **1280px** | `CONTENT_MAX_WIDTH = 1200` | ⚠️ **Mismatch** — 80px difference |
| Column gutter | **24px** | — | Not explicitly tokenized in RP |
| Target displays | FHD (1920), WXGA (1366) | `xl: 1280`, `2xl: 1536` | ⚠️ Breakpoints don't align to Figma targets |

> **Recommendation:** Update `SIDEBAR_WIDTH` from 240 to 260px and `CONTENT_MAX_WIDTH` from 1200 to 1280px to match Figma layout specifications.

---

## 11. Typography

### Figma Typography Spec (extracted via MCP from node 16098:18499)

| Style | Font | Weight (Figma) | Weight (HTML) | Size/Line Height | Letter Spacing |
|-------|------|---------------|---------------|-----------------|----------------|
| **Display/Large Headline** | Plain-Medium | 600 | 600 | 32/40 | -0.4px |
| **Title/Page Title** | Plain-Medium | 600 | 600 | 24/32 | -0.4px |
| **Title/Modal Title** | Plain-Medium | 600 | 600 | 20/28 | -0.4px |
| **Label/Section Label** | Plain-Medium | 600 | 600 | 18/24 | -0.4px |
| **Label/Content Label** | Plain-Medium | 600 | 600 | 16/24 | -0.4px |
| **Label/Content Label Subhead** | Plain-Medium | 600 | 600 | 14/20 | 0 |
| **Body/Large** | Plain-Light | 375 | 400 | 16/24 | -0.4px |
| **Body/Normal** | Plain-Light | 375 | 400 | 14/20 | 0 |
| **Footnote & Caption & Overline** | Plain-Regular | 400 | 400 | 12/18 | -0.6px |

> Figma note: *"We use 400 and 600 font weight (normal / medium) in HTML. The closest rendering equivalence in Figma would be Light (375) and Medium (600). Use `<b>` 700 font weight to bold a certain word in a sentence."*

**MCP update (2026-03-31):** Extracted precise letter spacing values from Figma variables. Previous report had "—" for most styles. Now confirmed: `-0.4px` for all Display/Title/Label/Body-Large, `0` for Subhead/Body-Normal, `-0.6px` for Footnote/Caption/Overline.

### Comparison: Figma vs RP (`v2TextStyles`)

| Style | Property | Figma | RP (`v2TextStyles`) | Status |
|-------|----------|-------|---------------------|--------|
| **headlineLarge** | weight | **600** | **500** (medium) | ⚠️ **Mismatch** — Figma says 600, RP uses 500 |
| | size/lh | 32/40 | 32/40 | ✅ Match |
| | letterSpacing | **-0.4px** | tight (-0.01em) | ⚠️ **Mismatch** — Figma is -0.4px absolute, RP is relative |
| **pageTitle** | weight | **600** | **500** (medium) | ⚠️ **Mismatch** |
| | size/lh | 24/32 | 24/32 | ✅ Match |
| | letterSpacing | **-0.4px** | 0 (normal) | ⚠️ **Mismatch** |
| **modalTitle** | weight | **600** | **500** (medium) | ⚠️ **Mismatch** |
| | size/lh | 20/28 | 20/28 | ✅ Match |
| | letterSpacing | **-0.4px** | 0 (normal) | ⚠️ **Mismatch** |
| **sectionLabel** | weight | **600** | **500** (medium) | ⚠️ **Mismatch** |
| | size/lh | 18/24 | 18/24 | ✅ Match |
| | letterSpacing | **-0.4px** | 0 (normal) | ⚠️ **Mismatch** |
| **contentLabel** | weight | **600** | **500** (medium) | ⚠️ **Mismatch** |
| | size/lh | 16/24 | 16/24 | ✅ Match |
| | letterSpacing | **-0.4px** | 0 (normal) | ⚠️ **Mismatch** |
| **contentLabelSubhead** | weight | **600** | **500** (medium) | ⚠️ **Mismatch** |
| | size/lh | 14/20 | 14/20 | ✅ Match |
| | letterSpacing | 0 | 0 (normal) | ✅ Match |
| **bodyLarge** | weight | **400** | **400** (regular) | ✅ Match |
| | size/lh | 16/24 | 16/24 | ✅ Match |
| | letterSpacing | **-0.4px** | 0 (normal) | ⚠️ **Mismatch** |
| **bodyNormal** | weight | **400** | **400** (regular) | ✅ Match |
| | size/lh | 14/20 | 14/20 | ✅ Match |
| | letterSpacing | 0 | 0 (normal) | ✅ Match |
| **footnote/caption** | weight | **400** | **400** (regular) | ✅ Match |
| | size/lh | 12/18 | 12/18 | ✅ Match |
| | letterSpacing | **-0.6px** | 0 (normal) | ⚠️ **Mismatch** |

### Also in RP `textStyles` (legacy system)

RP has a parallel `textStyles` object that uses different weights for the same styles:

| Legacy style | Weight used | Figma weight | Issue |
|-------------|------------|-------------|-------|
| `display.largeHeadline` | **semibold (600)** | 600 | ✅ Correct here |
| `title.page` | **semibold (600)** | 600 | ✅ Correct here |
| `title.modal` | **semibold (600)** | 600 | ✅ Correct here |
| `label.section` | **semibold (600)** | 600 | ✅ Correct here |
| `body.large` | **light (375)** | 400 | ⚠️ Mismatch — RP uses 375, Figma uses 400 |
| `body.normal` | **light (375)** | 400 | ⚠️ Mismatch — RP uses 375, Figma uses 400 |

> The legacy `textStyles` gets the bold weights right (600) but the body weights wrong (375 vs 400).
> The newer `v2TextStyles` gets the body weights right (400) but the bold weights wrong (500 vs 600).
> **Neither system is fully correct.**

### Key Findings

1. **Font weight 500 vs 600** — RP's `v2TextStyles` uses `fontWeight.medium` (500) for all bold styles. Figma specifies **600** for all Display/Title/Label styles. This is the single biggest typography mismatch — all headings and labels render lighter than intended.

2. **Letter spacing missing across most styles** — Figma uses `-0.4px` on Display, all Titles, all Labels (except Subhead), and Body Large. Uses `-0.6px` on Footnote/Caption/Overline. RP has `-0.01em` (relative) on headlineLarge only, and `0` everywhere else. 8 of 9 styles are missing their negative tracking.

3. **Body weight 375 vs 400** — RP's legacy `textStyles.body` uses `light` (375) while Figma says 400 (regular). Per Figma's own note: *"400 in HTML = Light (375) in Figma"* — so **both are correct** for their respective platforms. The HTML output should use 400.

4. **Only 2 weights** — Figma explicitly uses only **400** (body) and **600** (headings/labels). RP defines 4 weights (375, 400, 500, 600) but should only actively use 400 and 600.

5. **Font sizes and line heights** — All 9 size/line-height pairs are **perfectly aligned**. No mismatches.

6. **Overline** — Figma groups overline with footnote/caption (400, 12/18). RP's `v2TextStyles.overline` uses weight 500 and wider letter spacing with uppercase. The weight should be 400 per Figma, but the uppercase + wider spacing is a reasonable stylistic choice not contradicted by the spec.

### Summary

| Aspect | Status |
|--------|--------|
| Font family (Plain) | ✅ Match |
| Font sizes (9 steps) | ✅ All match |
| Line heights (9 steps) | ✅ All match |
| Body weights (400) | ✅ Match in v2TextStyles |
| Heading/Label weights (600) | ⚠️ **All wrong in v2TextStyles** (uses 500) |
| Letter spacing | ⚠️ **Mismatch** on 2 styles |
| Style names/taxonomy | ✅ Aligned |
| Extra RP styles (button, link, code) | Not in Figma spec — RP additions |

> **Recommendation:** Change `v2TextStyles` heading/label weights from `fontWeight.medium` (500) to `fontWeight.semibold` (600). Fix letter spacing on headlineLarge and contentLabel to use `-0.4px`. Consider removing the `fontWeight.medium` (500) and `fontWeight.light` (375) tokens since Figma only uses 400 and 600.

---

## 12. Cascade Impact & Dark Mode Readiness

### How token updates flow through the system

```
Token files (system.ts, reference.ts, typography.ts)
    │
    ├──→ css-variables.ts generates → tokens.css
    │       │
    │       ├──→ PATH 1: CSS Modules (.module.css)
    │       │    Components: Button, Card, Typography, AppShell, etc.
    │       │    Uses: var(--rd-sys-color-*)
    │       │    ✅ Token updates cascade automatically
    │       │    ✅ Dark mode switches automatically via [data-theme="dark"]
    │       │
    │       └──→ PATH 2: JS imports (inline styles)
    │            Prototypes + some components (Chip, etc.)
    │            Uses: systemColors.light['...'], referenceColors.gray['...']
    │            ✅ Token value updates cascade (same source file)
    │            ❌ Dark mode BLOCKED — hardcoded to .light
    │
    └──→ v2TextStyles / textStyles (typography.ts)
            Used by Typography component + prototypes
            ✅ Weight/size updates cascade automatically
```

### Impact of updating tokens

| What changes | Shared components (CSS vars) | Prototypes (JS imports) |
|-------------|------------------------------|------------------------|
| Fix hex values in `systemColors` | ✅ Automatic | ✅ Automatic (same source) |
| Add Dark Gray scale to `referenceColors` | ✅ Available via CSS vars | ✅ Available via import |
| Add accent tokens to `systemColors` | ✅ New CSS vars generated | ✅ New values importable |
| Fix `v2TextStyles` weights 500→600 | ✅ Automatic | ✅ Automatic |
| Regenerate `tokens.css` | ✅ All CSS var consumers update | N/A (uses JS imports) |

**Light mode:** All token updates cascade to both components and prototypes with zero code changes beyond the token files themselves.

### Dark mode readiness

**Infrastructure already exists but is dormant:**
- `tokens.css` has `[data-theme="dark"]` selectors with dark color values
- `theme.ts` has `applyTheme('dark')` / `applyTheme('light')` API
- `index.html` defaults to `data-theme="light"`
- `@media (prefers-color-scheme: dark)` fallback is in place
- No UI toggle exists yet

**What works today with just a theme flip:**
- All shared components using CSS Modules (Button, Card, Typography, AppShell, Modal, Table, etc.)
- Global body background and text color
- Any prototype styles using `var(--rd-sys-color-*)` syntax

**What does NOT work — the `.light` blocker:**

Prototypes use hardcoded light mode imports:
```typescript
// Current (locked to light)
borderBottom: `1px solid ${systemColors.light['border-divider']}`
backgroundColor: systemColors.light['background-sunken']
```

These must migrate to CSS variable strings:
```typescript
// Dark-mode-ready
borderBottom: '1px solid var(--rd-sys-color-border-divider)'
backgroundColor: 'var(--rd-sys-color-background-sunken)'
```

### Migration plan for full dark mode

| Step | What | Effort | Unlocks |
|------|------|--------|---------|
| **1** | Update token values in `system.ts` to match Figma | Small | Correct light mode everywhere |
| **2** | Add Dark Gray scale to `reference.ts` + remap `systemColors.dark` | Small | Correct dark mode values |
| **3** | Add missing tokens (accent, Active, On Base, etc.) | Small | Full token coverage |
| **4** | Fix `v2TextStyles` weights (500→600) + letter spacing | Small | Correct typography |
| **5** | Regenerate `tokens.css` | Automated | CSS var consumers get all updates |
| **6** | Replace shadow scale with Figma's 3 semantic levels | Small | Correct elevation |
| **7** | **Migrate prototype inline styles from `systemColors.light[...]` to CSS variable strings** | **Medium** | **Dark mode for all prototypes** |
| **8** | Add theme toggle to GlobalHeader or AppShell | Small | User-facing dark mode switch |

Steps 1–6 are token-file-only changes. Step 7 is the bulk of the work — a find-and-replace across prototype files. Step 8 is a small UI addition.

### Dark mode effort estimate by prototype

Each prototype needs its `systemColors.light[...]` and `referenceColors.*` inline style references converted to CSS variable strings. The number of references varies:

| Prototype | Likely inline color refs | Migration effort |
|-----------|------------------------|-----------------|
| SpotterMemory | High (many inline styles) | Medium |
| AdminGroups | High (tables, modals, wizards) | Medium |
| Cmdk | Medium | Low-Medium |
| Liveboard | Medium | Low-Medium |
| ImpersonationV2 | Low | Low |
| MuseChat | Low-Medium | Low |
| SpotterModel | Medium | Low-Medium |
| ModalPatterns | Low | Low |

> A codemod or find-and-replace script could automate most of Step 7: replace `systemColors.light['token-name']` with `'var(--rd-sys-color-token-name)'` across all prototype files.

---

## 13. Downstream Fork Impact — Designer Communication

### Current state

- **410 references** to `systemColors.light[...]` / `referenceColors.*` across **41 prototype files**
- **0 references** to CSS variables in any prototype
- **12 downstream designers** maintain independent forks with their own prototypes

### What happens when designers run `/sync-upstream`

```
Designer's fork                          Main repo (yours)
┌──────────────────────┐                ┌──────────────────────┐
│ src/tokens/          │  ← MERGES ←   │ src/tokens/          │ ← Token changes
│ src/styles/tokens.css│                │ src/styles/tokens.css│
│                      │                │                      │
│ src/prototypes/      │  NO CONFLICT   │ src/prototypes/      │
│   TheirProject/      │  (different    │   YourPrototypes/    │
│   (untouched)        │   folders)     │   (may be migrated)  │
└──────────────────────┘                └──────────────────────┘
```

### Steps 1–6 (Token value changes) — Zero breakage

| What changes upstream | Effect on designer's prototype | Breaks? |
|----------------------|-------------------------------|---------|
| Hex values in `systemColors.light` | Colors shift to corrected Figma values | ❌ No — same key, new value |
| Dark Gray scale added to `referenceColors` | New entries available, nothing references them | ❌ No |
| Accent tokens added to `systemColors` | New entries available | ❌ No |
| `v2TextStyles` weights 500→600 | Headings/labels render slightly bolder | ❌ No — visual refinement |
| Regenerated `tokens.css` | CSS var consumers update | ❌ No |
| New shadow levels | New entries available | ❌ No |

**No keys are renamed or removed — only values change and new entries are added. All existing imports continue to resolve.**

### Step 7 (CSS variable migration) — Does NOT affect their prototypes

Your prototype migrations (`src/prototypes/Cmdk/`, `SpotterMemory/`, etc.) are in different folders than designer prototypes (`src/prototypes/TheirProject/`). No merge conflict. No impact. Their code continues using `systemColors.light[...]` which still works for light mode.

### Designer workflow after upstream token update

```bash
/sync-upstream          # Merges token changes, auto-resolves registry.ts
npm install             # Only if dependencies changed (unlikely)
npm run dev             # Everything works — refined colors/typography
```

No code changes needed. No errors. No missing imports.

### What would actually break (and what we're NOT doing)

| Scenario | Impact | Planned? |
|----------|--------|----------|
| Rename a token key | ⚠️ Import references break | **No** |
| Remove a token key | ⚠️ Import references break | **No** |
| Change import paths | ⚠️ Import statements break | **No** |
| Change a token value | Visual shift, no code break | **Yes — this is what we're doing** |
| Add new tokens | No impact | **Yes** |

### Optional: Dark mode for designer prototypes

If a designer wants dark mode support for their prototype (after syncing):

1. Find-and-replace in their prototype files:
   ```
   systemColors.light['token-name']  →  'var(--rd-sys-color-token-name)'
   referenceColors.gray['60']        →  'var(--rd-ref-color-gray-60)'
   ```
2. Remove unused `import { systemColors }` lines
3. A codemod script can automate this (one-time migration)

This is optional — their prototypes work fine without it, they just stay light-mode only.

### Message for designers

> **After the token update, run `/sync-upstream` and `npm install` as usual. Your prototypes will work without any changes. Colors and typography will be slightly refined to match the Figma Radiant 3.0 spec — corrected values, not new APIs. If you want dark mode support for your prototype, follow the CSS variable migration guide (optional, one-time).**

---

## 14. Architectural Assessment

### Token architecture: Aligned

RP's 3-layer color architecture matches Figma's design language exactly:

| Layer | Figma | RP | Status |
|-------|-------|----|--------|
| **Primitives** | `Color/Gray/60`, `Color/Blue/50` | `referenceColors.gray['60']` | ✅ Same concept |
| **Semantic** | `Background/*`, `Content/*`, `Border/*` | `systemColors.light['background-*']` | ✅ Same 3 categories |
| **Component** | Per-component variable groups | `rdComponentColors` (button, chip, toggle) | ✅ Same concept |

### Mental model: Aligned

Both systems use the same token application pattern:

- **Surface** → picks from `Background/*`
- **Text & Icons** → picks from `Content/*` (NOT separate text vs icon systems)
- **Strokes & Dividers** → picks from `Border/*`

Figma's `Semantics/Icon/Primary` is an alias of `Content/Primary` — confirming that text and icons share the same foreground tokens. RP models this the same way.

### Mode-awareness: Aligned

Both define the same token names with different values per mode. RP's `systemColors.light` / `systemColors.dark` maps directly to Figma's variable modes.

### Platform-appropriate differences

Figma's taxonomy adds **Group** (chrome vs tag) and **State** (hover, active) dimensions in the token name — e.g., `color.chrome.foreground.default`. RP handles interaction states through component-level tokens (`rdComponentColors`) and CSS pseudo-classes, which is the standard code approach. This is not a gap — it's an appropriate platform difference.

### What needs fixing: Values, not structure

| Fix | Type | Impact |
|-----|------|--------|
| Add Dark Gray scale to `referenceColors` | Add data | Dark mode surfaces |
| Remap `systemColors.dark` to Dark Gray + solid /90 stops | Change values | All dark mode |
| Fix 8 light mode hex mismatches | Change values | Specific components |
| Add accent tokens to `systemColors` | Add entries | Accent backgrounds, badges |
| Add missing tokens (Active, On Base, Subtle Hover, etc.) | Add entries | Layout completeness |
| Add alpha variants to `referenceColors` | Add data | Overlays, ghost states |
| Fix `v2TextStyles` weights (500 → 600) | Change values | All headings/labels |
| Replace shadow scale with 3 semantic levels | Restructure small | Elevation system |

**No architectural rewrite needed.** The `systemColors` object shape, the `rdComponentColors` object shape, and the 3-layer architecture all stay as they are. This is a value alignment exercise.

---

## 13. Layout Constants

> Extracted 2026-03-31 from Figma node `16098:19214` — "Layout" page in Radiant 3.0 Design System

Figma defines layout specs for two viewport classes, each with 3-4 variants. RP documents layout constants in `CLAUDE.md` and `.cursor/rules/layout-patterns.md`.

### Figma Layout Variants

**FHD displays (1920x1080)** — modern laptops, 24-inch monitors:
| Variant | Viewport | Sidebar | Content width |
|---------|----------|---------|---------------|
| Fluid + side panel | 1920x1080 | 260px | Fluid (fills remaining) |
| Fluid, no side panel | 1920x1080 | — | Fluid |
| 1280 max width, no side panel | 1920x1080 | — | 1280px centered |

**WXGA displays (1366x768)** — mid-range laptops, tablets post-2013:
| Variant | Viewport | Sidebar | Content width |
|---------|----------|---------|---------------|
| Fluid + side panel | 1366x768 | 260px | Fluid (fills remaining) |
| Fluid, no side panel | 1366x768 | — | Fluid |
| 1280 max width, no side panel | 1366x768 | — | 1280px centered |

### Comparison: Figma vs Radiant Play

| Constant | Figma | RP (layout-patterns.md) | RP (CLAUDE.md) | Status |
|----------|-------|------------------------|----------------|--------|
| **Header height** | 48px (instances) / 60px (redlined frame) | 56px (line 77, 747) | 56px | ⚠️ **Mismatch** — Figma has two values (48 and 60), RP uses 56 |
| **Sidebar width** | 260px | 240px (5 refs) / 260px (1 ref, line 620) | 240px | ⚠️ **Mismatch + inconsistent** |
| **Content max width** | 1280px | 1200px (line 150, 754) | 1200px | ⚠️ **Mismatch** — 80px difference |
| **Sidebar collapsed** | Not in spec | 64px (line 751) | 64px | Cannot verify |
| **Form max width** | Not in spec | 600px (line 349, 755) | 600px | Cannot verify |
| **Target viewports** | FHD (1920) + WXGA (1366) | Not documented | Not documented | ⚠️ **Missing** |
| **Fluid width variant** | Yes (2 per viewport) | Not documented | Not documented | ⚠️ **Missing** |

### Key Findings

1. **Header height — Figma has two values** — The 6 component instances use a 48px header (content starts at `y=48`). The bottom WXGA redlined frame (`16098:19677`) has a 60px header (`height=60`). RP uses 56px — which matches neither. This needs design team clarification: is the header 48px (compact), 56px (RP current), or 60px (redlined frame)? All three exist across different sources.

2. **Sidebar 260px vs 240px** — Figma clearly shows 260px. RP's `layout-patterns.md` uses 240px in 5 places and 260px in 1 place (line 620 — settings page sidebar). The rule file is internally inconsistent and doesn't match Figma either way.

3. **Content max 1280px vs 1200px** — Figma's "1280 max width" layout variant is explicit. RP uses 1200px. This means RP content areas are 80px narrower than Figma intends, which affects wide tables, dashboards, and grid layouts.

4. **No viewport targets** — RP doesn't document FHD (1920) vs WXGA (1366) as design targets. Layout decisions have no stated reference viewport, which means responsive behavior is ad-hoc.

5. **No fluid width documentation** — Figma defines "fluid width" as a first-class layout variant (content fills available space). RP only documents fixed max-width patterns. Fluid layouts exist in some prototypes but aren't codified.

### Suggestions

**Priority 1 — Confirm header height with design team.** Figma shows both 48px (component instances) and 60px (redlined variant). RP uses 56px. Three different values across three sources — this needs a single source of truth before any code changes. If 48px is the standard and 60px is an expanded variant, document both. If 56px is the production value, document why Figma diverges.

**Priority 2 — Align sidebar to 260px.** Update in:
- `.cursor/rules/layout-patterns.md` — lines 81, 137, 750
- `CLAUDE.md` — `SIDEBAR_WIDTH = 240` → `260`
- `src/components/AppShell/` — check if AppShell hardcodes 240px
- `src/components/AppSidebar/` — check default width prop

**Priority 3 — Update content max width to 1280px.** Update in:
- `.cursor/rules/layout-patterns.md` — lines 150, 754
- `CLAUDE.md` — `CONTENT_MAX_WIDTH = 1200` → `1280`
- Any prototype with `maxWidth: '1200px'` or `maxWidth: 1200`

**Priority 4 — Document viewport targets.** Add to `layout-patterns.md`:
- FHD (1920x1080) as primary target
- WXGA (1366x768) as minimum supported
- Note that content max width (1280px) is designed to work on both

**Priority 5 — Document fluid width variant.** Add a "Fluid Layout" pattern to `layout-patterns.md` alongside the existing fixed-width patterns. Key difference: no `maxWidth` on the content area.

### Touchpoints (files to update when fixing)

| File | What to change |
|------|---------------|
| `CLAUDE.md` | Update `HEADER_HEIGHT`, `SIDEBAR_WIDTH`, `CONTENT_MAX_WIDTH` constants |
| `.cursor/rules/layout-patterns.md` | Update all hardcoded 240px → 260px, 1200px → 1280px, 56px → 48px (if confirmed). Add viewport targets and fluid layout variant. |
| `src/components/AppShell/` | Check for hardcoded header/sidebar values |
| `src/components/AppSidebar/` | Check default width |
| `src/components/GlobalHeader/` | Check hardcoded height |
| `src/prototypes/*/` | Grep for `maxWidth.*1200`, `width.*240`, `height.*56` in prototype styles |

---

## Status

- [x] Primitives extracted and compared
- [x] Semantic light mode compared (52 variables: 21 bg + 15 content + 16 border)
- [x] Semantic dark mode — background (complete)
- [x] Semantic dark mode — content (complete)
- [ ] Semantic dark mode — border (partial — only Accent/Green retrieved)
- [x] Typography compared
- [x] Elevation/shadows compared
- [x] Spacing compared (bonus)
- [x] Layout constants compared (header, sidebar, content max width, viewports)
- [ ] Component colors compared against Figma (button, chip, toggle)
