# Token System Update Plan — Radiant 3.0 Alignment (Revised)

> Created: 2026-03-31
> Revised: 2026-03-31 (post-audit)
> Based on: `docs/figma-token-delta-report.md` + codebase audits
> Source of truth: Figma Radiant 3.0 Design System (`1QlRveXx4wppvDXyPVWUTK`)

## Key learnings from audit

Three findings that change the plan:

1. **`tokens.css` is hand-written, not generated.** Every token source file change needs a matching manual update to `src/styles/tokens.css`. The `generateCSSStylesheet()` function exists but isn't wired to any build step.

2. **Shadow tokens are not adopted.** ~50 components define custom inline shadow values in CSS modules. Zero components import from `shadows.ts`. Changing the token architecture alone won't cascade.

3. **7 of 12 extra RP tokens are actively used** in shared components (Toggle, Pagination, Avatar, Menu, AppSidebar, RichTextEditor, LiveboardHeader). These must stay. 5 unused tokens can be deprecated.

---

## Revised phase structure

### Phase 0: Token generation script (prerequisite)

**Problem:** Updating TypeScript token files AND `tokens.css` manually for every change is error-prone and will lead to drift.

**What:** Create a script that generates `tokens.css` from the TypeScript source files.

**File:** `scripts/generate-tokens.ts`

Uses the existing `generateCSSStylesheet()` from `src/tokens/css-variables.ts` to write to `src/styles/tokens.css`.

**Add to `package.json`:**
```json
"generate-tokens": "npx tsx scripts/generate-tokens.ts"
```

**After this phase:** Every subsequent phase only needs to update the TypeScript source files. Run `npm run generate-tokens` and `tokens.css` updates automatically.

**Files:**
| File | Change |
|------|--------|
| `scripts/generate-tokens.ts` | New — script that calls generateCSSStylesheet() and writes to tokens.css |
| `package.json` | Add `generate-tokens` script |

**Verification:**
- Run `npm run generate-tokens`
- Diff `tokens.css` against current version — should be identical (no functional change yet)
- If there are differences, it means `tokens.css` has already drifted from the TypeScript source — fix the drift first

---

### Phase 1: Primitive colors (zero risk)

**What:** Add Dark Gray scale, alpha variants, fix 3 hex values. Deprecate unused `'85'` stops.

**File:** `src/tokens/colors/reference.ts`

| Change | Detail |
|--------|--------|
| Add `darkGray` family | 12 stops: 0 (#131416), 5 (#1a1b1e), 10 (#212326), 15 (#282a2e), 20 (#303136), 30 (#43474b), 40 (#585e64), 50 (#73767d), 60 (#8c9196), 70 (#aaadb1), 80 (#c4c6ca), 90 (#dfe0e2) |
| Add alpha variants to existing families | `gray['70A']` (#1f2632cc), `gray['60A']` (#20293a99), `gray['40A']` (#16223a42), `gray['10A']` (#c0c6cf1f), `brand['10A']` (#71a1f41f), `darkGray['30A']` (#00030aba) |
| Fix Purple/70 | #6847BA → #6A4ABA |
| Fix Purple/100 | #0D0030 → #0E0033 |
| Fix Teal/70 | #359FAA → #369FAA |
| Deprecate `'85'` stops | Add `// @deprecated` comment — don't remove (forks may reference) |

**Then run:** `npm run generate-tokens`

**Impact:** Zero — no code references Dark Gray or alpha variants yet. The 3 hex fixes are imperceptible.

**Verification:**
- `npm run typecheck` — passes
- `npm run build` — passes
- No visual check needed

---

### Phase 2: Light mode semantic colors (low risk)

**What:** Fix 6 value mismatches, add ~22 missing tokens, deprecate 5 unused tokens.

**File:** `src/tokens/colors/system.ts` (light object)

**Value fixes:**

| Token | Current | Correct | Components affected |
|-------|---------|---------|-------------------|
| `content-tertiary` | #A5ACB9 (Gray/50) | #C0C6CF (Gray/40) | Placeholder text, disabled labels globally |
| `border-focus` | #2770EF (Blue/60) | #71A1F4 (Blue/50) | All focusable components (Button, TextInput, Select, Checkbox, Radio, Toggle, etc.) |
| `border-hover` | #777E8B (Gray/60) | #A5ACB9 (Gray/50) | TextInput, Select, DatePicker border on hover |
| `background-overlay` | rgba(29,35,47,0.5) | #1F2632CC (80%) | Modal, ConfirmDialog, WizardModal, FormModal overlay |
| `background-ghost-highlight` | #DEE8FA (solid) | #71A1F41F (12% translucent) | Button tertiary hover state |
| `background-base-inverse` | #1D232F (Gray/90) | #323946 (Gray/80) | Tooltip background, any inverse surface |

**New tokens to add:**

Background accents (9): `on-base`, `active`, `accent-green`, `accent-yellow`, `accent-red`, `accent-blue`, `accent-gray`, `accent-purple-subtle`, `accent-purple-bold`

Content accents (6): `accent-yellow`, `accent-red`, `accent-blue`, `accent-gray`, `accent-green`, `accent-purple`

Border accents + hover (7): `subtle-hover`, `accent-green`, `accent-yellow`, `accent-red`, `accent-blue`, `accent-gray`, `accent-purple`

**Tokens to deprecate (not remove):**

| Token | Reason |
|-------|--------|
| `content-alternate-inverse` | Zero usage |
| `content-link-inverse` | Zero usage |
| `content-link-inverse-hover` | Zero usage |
| `border-hover-inverse` | Zero usage |
| `border-brand-inverse` | Zero usage |

**Tokens to KEEP (RP extensions):**

| Token | Used by | Why it exists |
|-------|---------|---------------|
| `background-inset` | Toggle, Pagination, Divider, DirectionControl, Avatar (5 refs) | Recessed/pressed surface — Figma handles at component level |
| `background-raised-inverse` | Menu, 4 pages (6+ refs) | Maps to Figma `Background/Inverse` — same value, different name |
| `content-primary-inverse` | LiveboardHeader (1 ref) | Maps to Figma `Content/Inverse` — same value |
| `content-brand-inverse` | AppSidebar (1 ref) | RP extension — brand color on inverse backgrounds |
| `content-link` | RichTextEditor (1 ref) | Maps to Figma `Content/Brand` — same value |
| `border-default-inverse` | Menu (1 ref) | RP extension — border for dark context menus |
| `border-divider-inverse` | LiveboardHeader (1 ref) | RP extension — divider on dark headers |

**Then run:** `npm run generate-tokens`

**Verification:**
- `npm run typecheck` + `npm run build` — passes
- Visual checks:
  - Open a TextInput → focus it → focus ring should be lighter blue (#71A1F4 vs #2770EF)
  - Open a Modal → overlay should be noticeably darker (80% vs 50%)
  - Hover over Button tertiary → highlight should be translucent, not solid blue
  - Check placeholder text in any input → should be lighter

---

### Phase 3: Typography (low risk)

**What:** Fix heading weights, add letter spacing, align legacy body weights.

**File:** `src/tokens/typography.ts`

**No `tokens.css` update needed** — typography tokens are consumed via JS imports (`v2TextStyles`, `textStyles`), not CSS variables. The CSS file has base font vars (`--font-family-primary`, `--font-size-*`) but not the composite text styles.

| Change | Before | After |
|--------|--------|-------|
| `letterSpacing.tight` | `-0.01em` | `-0.4px` |
| Add `letterSpacing.tighter` | — | `-0.6px` |
| 6 v2TextStyles heading/label weights | `fontWeight.medium` (500) | `fontWeight.semibold` (600) |
| 7 v2TextStyles letter spacing values | `normal` (0) | `tight` (-0.4px) or `tighter` (-0.6px) |
| `textStyles.body.large` weight | `fontWeight.light` (375) | `fontWeight.regular` (400) |
| `textStyles.body.normal` weight | `fontWeight.light` (375) | `fontWeight.regular` (400) |

**Check for `letterSpacing.tight` usage outside v2TextStyles:**

Need to grep for direct usage of `letterSpacing.tight` — if any component uses it directly (not through v2TextStyles), changing from `-0.01em` to `-0.4px` could affect it. At 16px font size, `-0.01em` = `-0.16px` vs `-0.4px` — that's a 2.5x increase in tightness.

**Verification:**
- `npm run typecheck` + `npm run build` — passes
- Visual: open any prototype → headings should be bolder (weight 600 vs 500)
- Visual: compare a page title before/after — letter spacing should tighten

---

### Phase 4: Elevation / Shadows (REVISED — two sub-phases)

The audit revealed that shadow tokens aren't adopted — ~50 components use hardcoded inline shadows. Doing this in one shot is too risky. Split into:

#### Phase 4a: Update shadow token values + CSS variables (small)

Update the token definitions and CSS variables to match Figma's 3-level system. Keep the old scale names as aliases for backward compatibility.

**File:** `src/tokens/shadows.ts`

```typescript
// New Figma-aligned primitives
export const shadowPrimitives = {
  light: {
    surface: '0 0 4px #1923311a, 0 2px 4px #1923310a',
    menu: '0 0 4px #19233114, 0 12px 24px #1923311f',
    modal: '0 0 4px #1923311a, 0 24px 32px #19233129',
  },
  dark: {
    surface: '0 0 4px rgba(0,0,0,0.24), 0 2px 8px rgba(0,0,0,0.2)',
    menu: '0 0 6px rgba(0,0,0,0.16), 0 12px 28px rgba(0,0,0,0.32)',
    modal: '0 0 4px rgba(0,0,0,0.4), 0 24px 32px rgba(0,0,0,0.6)',
  },
};

// Updated component mapping
export const componentShadows = {
  card: { default: shadowPrimitives.light.surface, hover: shadowPrimitives.light.surface },
  dropdown: shadowPrimitives.light.menu,
  popover: shadowPrimitives.light.menu,
  tooltip: shadowPrimitives.light.surface,
  modal: shadowPrimitives.light.modal,
  nav: { header: shadowPrimitives.light.surface, sidebar: shadowPrimitives.light.surface },
  // ...
};

// BACKWARD COMPAT — old scale names still resolve
export const shadows = {
  none: 'none',
  xs: shadowPrimitives.light.surface,
  sm: shadowPrimitives.light.surface,
  md: shadowPrimitives.light.surface,
  lg: shadowPrimitives.light.menu,
  xl: shadowPrimitives.light.modal,
  '2xl': shadowPrimitives.light.modal,
  // ...
};
```

**Then run:** `npm run generate-tokens` (adds `--shadow-surface`, `--shadow-menu`, `--shadow-modal` CSS vars)

**Impact:** Only the ~15 components using `--shadow-*` CSS variables get updated automatically. The ~50 with inline values are unchanged.

**Verification:**
- Build passes
- Check Card, Menu, Modal shadows in the few components that use CSS vars

#### Phase 4b: Migrate component inline shadows to tokens (large, optional)

Go through each component CSS module and replace hardcoded `box-shadow` values with `var(--shadow-surface)`, `var(--shadow-menu)`, or `var(--shadow-modal)`.

**~50 files to update.** This is a cleanup task, not a Figma alignment task. Can be deferred or done incrementally.

| Priority | Components | Shadow level |
|----------|-----------|-------------|
| High | Modal, Menu, Popover, ActionMenu, Select (overlays) | `var(--shadow-menu)` or `var(--shadow-modal)` |
| Medium | Card, Toast, Tooltip | `var(--shadow-surface)` |
| Low | Sidebar, GlobalHeader, misc | `var(--shadow-surface)` |

**Recommendation:** Do Phase 4a now, defer Phase 4b. The token values are correct; the inline values are a technical debt issue, not a Figma alignment issue.

---

### Phase 5: Layout constants (small)

**What:** Align docs and code to actual values. Header stays at 60px per confirmation.

| File | Change |
|------|--------|
| `CLAUDE.md` | `HEADER_HEIGHT = 60`, `SIDEBAR_WIDTH = 260`, `CONTENT_MAX_WIDTH = 1280` |
| `.cursor/rules/layout-patterns.md` | All `240px` → `260px`, `1200px` → `1280px`, `56px` → `60px` |
| `src/components/AppSidebar/AppSidebar.tsx` | Default width `261` → `260` |
| `src/components/AppShell/AppShell.tsx` | Default sidebarWidth `261` → `260` |

**Verification:**
- Build passes
- Open a prototype with AppShell → sidebar should be visually identical (1px difference)

---

## Execution order

```
Phase 0 (Token script)  → Do first — enables all other phases
    ↓
Phase 1 (Primitives)  ──┐
Phase 2 (Light semantic) ├── Can do together as one commit
Phase 3 (Typography)   ──┘   or separately — no dependencies
Phase 4a (Shadow tokens)  → Independent
Phase 5 (Layout)          → Independent
    ↓
Phase 6-8 (Dark mode, CSS migration, toggle) → Deferred to separate worktree
```

**Recommended commit sequence:**
1. `Phase 0` — "chore: add token generation script"
2. `Phase 1+2` — "fix: align color tokens with Figma Radiant 3.0"
3. `Phase 3` — "fix: align typography weights and letter spacing with Figma"
4. `Phase 4a` — "fix: replace shadow scale with Figma semantic levels"
5. `Phase 5` — "fix: align layout constants with Figma (sidebar 260, content 1280, header 60)"

---

## Conflict risk matrix

| Phase | Files touched | Conflict with forks? | Conflict between phases? |
|-------|-------------|---------------------|------------------------|
| 0 | `scripts/generate-tokens.ts`, `package.json` | No — new files | No |
| 1 | `reference.ts`, `tokens.css` | No — adds data, doesn't rename | No |
| 2 | `system.ts`, `tokens.css` | No — value changes + additions | Shares `tokens.css` with Phase 1 — do together |
| 3 | `typography.ts` | No — value changes only | No |
| 4a | `shadows.ts`, `tokens.css` | No — backward compat aliases | Shares `tokens.css` — run generate-tokens after |
| 5 | `CLAUDE.md`, `layout-patterns.md`, `AppSidebar.tsx`, `AppShell.tsx` | Possible if fork modified AppSidebar | No |

**No phase conflicts with each other** as long as `tokens.css` is regenerated via script (not manually edited by two phases).

---

## Fork impact (unchanged from original)

No phase breaks forks. All changes are value updates or additions. No keys renamed or removed. The 7 actively-used RP extension tokens stay untouched. The 5 deprecated tokens get a comment but aren't removed.

---

## Test checklist (per phase)

### After every phase:
- [ ] `npm run typecheck` — zero errors
- [ ] `npm run build` — passes
- [ ] `npm run generate-tokens` — runs without error (Phase 0+)
- [ ] `git diff src/styles/tokens.css` — changes are expected and correct

### Phase 2 visual checks:
- [ ] TextInput focus ring is lighter blue
- [ ] Modal overlay is darker
- [ ] Button tertiary hover is translucent
- [ ] Placeholder text is lighter

### Phase 3 visual checks:
- [ ] Page titles are bolder (600 vs 500)
- [ ] Letter spacing is tighter on headings
- [ ] Body text weight unchanged

### Phase 4a visual checks:
- [ ] Card shadow uses 2-layer Figma style (for components using CSS vars)
- [ ] Modal shadow is deeper
- [ ] Menu shadow matches Figma spec

### Phase 5 visual checks:
- [ ] Sidebar width visually identical (261→260, 1px)
- [ ] Content area slightly wider in prototypes using maxWidth

---

## Open questions (reduced from original)

1. **`letterSpacing.tight` direct usage** — need to grep before Phase 3. If components use it directly (not via v2TextStyles), the `-0.01em` to `-0.4px` change is a 2.5x tightening at 16px.
2. **Phase 4b timing** — migrate ~50 inline shadow values to CSS vars now or defer? Recommend defer.
3. **Component colors** (button, chip, toggle states) — still not compared against Figma. Defer to after Phase 1-5 are shipped.
