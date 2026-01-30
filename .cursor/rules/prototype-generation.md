---
description: Rules for AI-assisted prototype generation from screenshots or descriptions
globs: ["src/prototypes/**/*.tsx", "src/prototypes/**/*.ts"]
---

# Prototype Generation Rules

You are helping designers create interactive prototypes using the **Radiant Design System**. When a designer provides a screenshot, description, or Figma reference, generate production-quality React code using the available components.

## Workflow

1. **Analyze the input** (screenshot/description)
2. **Identify UI patterns** and map to Radiant components
3. **Generate structured code** with proper imports and styling
4. **Use mock data** for realistic content

## Available Components

### Buttons & Actions

```tsx
import { Button } from '../../components';

<Button variant="primary" size="basic">Save</Button>
<Button variant="secondary" size="basic">Cancel</Button>
<Button variant="tertiary" size="small" icon="plus">Add filter</Button>
```

| Variant | Use Case |
|---------|----------|
| `primary` | Main action (1 per screen) |
| `secondary` | Secondary actions |
| `tertiary` | Inline/text actions |

### Feedback & Alerts

```tsx
import { Alert, Modal } from '../../components';

<Alert status="success" message="Changes saved" />
<Modal isOpen={isOpen} onClose={() => {}} title="Confirm">Content</Modal>
```

| Status | Use Case |
|--------|----------|
| `info` | General information |
| `success` | Completed actions |
| `warning` | Caution needed |
| `failure` | Errors |
| `muted` | Low-priority info |

### Form Controls

```tsx
import { TextInput, SearchInput, Checkbox, Radio, Toggle } from '../../components';

<TextInput label="Email" value={email} onChange={setEmail} />
<SearchInput placeholder="Search..." value={query} onChange={setQuery} />
<Checkbox label="Remember me" checked={checked} onChange={setChecked} />
<Radio label="Option A" checked={selected === 'a'} onChange={() => setSelected('a')} />
<Toggle label="Enable" checked={enabled} onChange={setEnabled} />
```

### Navigation & Layout

```tsx
import { Tabs, Sidebar, Chip } from '../../components';

<Tabs tabs={[{id: 'a', label: 'Tab A'}]} activeTab={active} onTabChange={setActive} />
<Sidebar items={[{id: 'home', label: 'Home', icon: 'folder'}]} activeItem={active} />
<Chip label="Active" variant="success" />
```

### Icons

```tsx
import { Icon } from '../../components';

<Icon name="plus" size="m" />
<Icon name="checkmark-circle" size="l" color="#06BF7F" />
```

**Available icons:** arrow-up, arrow-down, arrow-left, arrow-right, chevron-up, chevron-down, chevron-left, chevron-right, plus, minus, cross, checkmark, checkmark-circle, cross-circle, exclamation-point-circle, info-circle, copy, download, upload, save, refresh, pencil, trash-can, share, pin, filter, play, pause, eye, eye-undo, clock, cog, folder, funnel, lock, magnifying-glass, profile, question-mark, sort, star, tag, expand, fullscreen, hamburger, more, information

## Pattern Recognition

### When you see a filter/selection UI:
```tsx
// Use: Modal + SearchInput + Checkbox + Button
<Modal title="Add filter">
  <SearchInput placeholder="Search..." />
  {items.map(item => <Checkbox label={item} />)}
  <Button variant="primary">Apply</Button>
</Modal>
```

### When you see a data table:
```tsx
// Use: SearchInput + custom table with Chip for status
<SearchInput placeholder="Search..." />
<div className={styles.table}>
  {rows.map(row => (
    <div className={styles.row}>
      <span>{row.name}</span>
      <Chip label={row.status} variant={getVariant(row.status)} />
    </div>
  ))}
</div>
```

### When you see a settings/form page:
```tsx
// Use: Sidebar + TextInput + Toggle + Radio + Button
<div style={{ display: 'flex' }}>
  <Sidebar items={sections} />
  <form>
    <TextInput label="Name" />
    <Toggle label="Enable feature" />
    <Button variant="primary">Save</Button>
  </form>
</div>
```

### When you see a dashboard/metrics:
```tsx
// Use: Tabs + metric cards + data table
<Tabs tabs={[...]} />
<div className={styles.metricsGrid}>
  {metrics.map(m => <MetricCard {...m} />)}
</div>
<DataTable data={tableData} />
```

## Mock Data Usage

Always import realistic mock data:

```tsx
import { users, analytics, navigation, forms } from '../../mocks';

// Access mock data
const userList = users.profiles;
const chartData = analytics.revenue;
const menuItems = navigation.sidebar;
const countries = forms.countries;
```

## Styling Guidelines

### Use Design Tokens

```tsx
import { brandColors, spacing } from '../../tokens';

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: brandColors.white,
    padding: spacing.scale.lg, // 24px
    borderRadius: '12px',
  },
};
```

### Common Patterns

```tsx
// Card container
container: {
  backgroundColor: brandColors.white,
  borderRadius: '12px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  padding: '24px',
}

// Section with border
section: {
  borderBottom: `1px solid ${brandColors.gray[20]}`,
  paddingBottom: '24px',
  marginBottom: '24px',
}

// Flex row with gap
row: {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}

// Grid layout
grid: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '16px',
}
```

## Code Structure

Always follow this structure:

```tsx
import React, { useState } from 'react';
// 1. Import components
import { Button, Modal, TextInput } from '../../components';
// 2. Import tokens
import { brandColors } from '../../tokens/colors/brand';
// 3. Import mock data
import { users } from '../../mocks';

/**
 * PrototypeName
 * 
 * Brief description of what this prototype demonstrates.
 */
export const PrototypeName: React.FC = () => {
  // 4. State management
  const [isOpen, setIsOpen] = useState(false);

  // 5. Handlers
  const handleSubmit = () => {
    // Logic here
  };

  // 6. Render
  return (
    <div style={styles.container}>
      {/* Content */}
    </div>
  );
};

// 7. Styles object
const styles: Record<string, React.CSSProperties> = {
  container: {
    // styles
  },
};

export default PrototypeName;
```

## Content Guidelines

Follow ThoughtSpot's content rules for all text:

| Element | Rule | Example |
|---------|------|---------|
| Buttons | 1-2 words, imperative | Save, Delete, Add filter |
| Titles | 4 words max, sentence case | Delete this Answer? |
| Labels | 3 words max, no articles | Pin to Liveboard |
| Errors | Remedy-focused | Enter email address |

## Interaction Patterns

### Modal dialogs
- Open with primary/secondary button
- Close with X, Cancel, or overlay click
- Primary action on right in footer

### Form validation
- Show errors inline below fields
- Use Alert for global errors
- Disable submit until valid

### Lists/Tables
- Add search for >5 items
- Use Checkbox for multi-select
- Use Radio for single-select
- Show empty state when no results

## Examples Reference

Study these examples in `src/prototypes/_examples/`:
- **FilterDialog.tsx** - Modal with search and selection
- **DataDashboard.tsx** - Metrics, tabs, and data table
- **SettingsPanel.tsx** - Sidebar navigation with forms
