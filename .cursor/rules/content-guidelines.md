---
description: ThoughtSpot content design rules for all UI text in components
globs: ["src/components/**/*.tsx", "src/pages/**/*.tsx"]
---

# ThoughtSpot Content Design Rules

Apply these rules to ALL user-facing text in UI components.

**Full reference:** [docs/content-guidelines-detailed.md](docs/content-guidelines-detailed.md)

## Core Principles

1. **Sentence case** - Always (except ThoughtSpot features)
2. **Active voice** - User is the actor
3. **Imperative verbs** - Start with action words
4. **Present tense** - Describe results in present

## Quick Rules by Component

### Buttons

| Rule | Example |
|------|---------|
| 1-2 words max | **Save**, **Export data** |
| Use imperative verbs | **Delete**, **Add filter** |
| No periods | **Save changes** not **Save changes.** |
| No generic words | **Delete** not **Yes** or **OK** |

**Approved verbs:** Create, Add, Delete, Remove, Save, Cancel, Edit, Export, Import, Search, Filter, Pin, View, Open, Close

**Avoid:** Submit, Proceed, Check, Modify, Refresh, Done, Confirm

### Labels

| Rule | Example |
|------|---------|
| 3 words max | **Pin to Liveboard** |
| No articles | **Add filter** not **Add a filter** |
| No punctuation | **Search results** not **Search results:** |

### Titles (Page & Modal)

| Rule | Example |
|------|---------|
| 4 words max | **Delete this Answer?** |
| Modal: Start with verb | **Save your changes?** |
| Match primary button | Title: **Delete Answer?** / Button: **Delete** |

### Errors & Alerts

**Pattern:** Issue + Remedy + CTA

```tsx
// System alert
message="Could not reach Snowflake"
buttonText="Reconnect"

// Input error - remedy only, 3-5 words
helperText="Enter email address"

// Toast - 4-6 words
message="Changes saved successfully"
```

### Descriptive Text

| Rule | Example |
|------|---------|
| Action before outcome | **Turn on subtotals to enable expand/collapse** |
| No "You can..." | **Schedule alerts** not **You can schedule alerts** |
| Max 4 lines | Break longer text |

## Capitalized Terms (ThoughtSpot Features)

Always capitalize these when referring to the product feature:

- **Answer** (the saved query result)
- **Liveboard** (never "Pinboard")
- **SpotIQ** (AI feature)
- **SpotApp** (application)
- **Worksheet** / **Data Model**
- **Connection** (data connection)
- **Monitor** (alert feature)
- **Explore mode**
- **Group** (user group)

## Numbers & Formatting

| Type | Format | Example |
|------|--------|---------|
| Numbers | Always digits | **3 items** not **three items** |
| Time | 12-hour, lowercase | **2:30 pm** |
| Date | DD/MM/YYYY | **28/04/2023** |
| Percentage | Symbol | **5%** not **5 percent** |

## Common Rewrites

| Bad | Good |
|-----|------|
| Are you sure you want to delete? | **Delete this Answer?** |
| Your changes have been saved | **Changes saved** |
| Click here to learn more | **Learn more** |
| Expand/Collapse is unavailable when subtotals are off | **Turn on subtotals to enable expand/collapse** |
| You can schedule alerts to receive updates | **Schedule alerts to get updates** |
| Proceed to export | **Export** |
| Submit your request | **Send request** |

## Punctuation Quick Reference

- **No periods** in buttons, labels, titles
- **Use periods** in body text and descriptions
- **Use contractions** (don't, can't, we'll) - conversational tone
- **Use &** in headers/menus, avoid in sentences
