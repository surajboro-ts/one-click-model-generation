# Radiant Component API Reference

Quick reference for all Radiant component props. For detailed documentation, see the JSDoc comments in each component file.

---

## Buttons & Actions

### Button

```tsx
import { Button } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | Visual style |
| `size` | `'small' \| 'basic' \| 'large'` | `'basic'` | Size variant |
| `colorway` | `'standard' \| 'white'` | `'standard'` | Color scheme (white for dark bg) |
| `icon` | `IconName \| ReactNode` | - | Leading or trailing icon |
| `iconPosition` | `'leading' \| 'trailing' \| 'none'` | `'leading'` | Icon placement |
| `loading` | `boolean` | `false` | Show loading state |
| `active` | `boolean` | `false` | Active/pressed state |
| `fullWidth` | `boolean` | `false` | Span full container width |
| `disabled` | `boolean` | `false` | Disable interaction |
| `htmlType` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `children` | `ReactNode` | **required** | Button text |

```tsx
<Button variant="primary" size="basic" icon="plus">Add item</Button>
<Button variant="secondary" onClick={handleCancel}>Cancel</Button>
<Button variant="tertiary" icon="pencil">Edit</Button>
```

### Link

```tsx
import { Link } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | **required** | Link destination |
| `variant` | `'default' \| 'subtle'` | `'default'` | Visual style |
| `external` | `boolean` | `false` | Open in new tab |
| `children` | `ReactNode` | **required** | Link text |

---

## Selection Controls

### Checkbox

```tsx
import { Checkbox } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Checked state |
| `indeterminate` | `boolean` | `false` | Indeterminate state |
| `label` | `string` | - | Label text |
| `showLabel` | `boolean` | `true` | Show/hide label |
| `disabled` | `boolean` | `false` | Disable interaction |
| `error` | `boolean` | `false` | Error state |
| `name` | `string` | - | Form field name |
| `value` | `string` | - | Form field value |
| `onChange` | `(checked: boolean) => void` | - | Change handler |

```tsx
<Checkbox label="Accept terms" checked={accepted} onChange={setAccepted} />
<Checkbox label="Select all" indeterminate={someSelected} />
```

### Radio

```tsx
import { Radio } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Selected state |
| `label` | `string` | - | Label text |
| `showLabel` | `boolean` | `true` | Show/hide label |
| `disabled` | `boolean` | `false` | Disable interaction |
| `error` | `boolean` | `false` | Error state |
| `name` | `string` | - | Radio group name |
| `value` | `string` | - | Radio value |
| `onChange` | `(checked: boolean) => void` | - | Change handler |

```tsx
<Radio label="Option A" name="choice" checked={choice === 'a'} onChange={() => setChoice('a')} />
<Radio label="Option B" name="choice" checked={choice === 'b'} onChange={() => setChoice('b')} />
```

### Toggle

```tsx
import { Toggle } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | On/off state |
| `label` | `string` | - | Label text |
| `showLabel` | `boolean` | `true` | Show/hide label |
| `labelPosition` | `'left' \| 'right'` | `'left'` | Label placement |
| `disabled` | `boolean` | `false` | Disable interaction |
| `name` | `string` | - | Form field name |
| `onChange` | `(checked: boolean) => void` | - | Change handler |

```tsx
<Toggle label="Dark mode" checked={darkMode} onChange={setDarkMode} />
<Toggle label="Notifications" labelPosition="right" />
```

### SegmentedControl

```tsx
import { SegmentedControl } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `{ value: string, label: string }[]` | **required** | Available options |
| `value` | `string` | - | Selected value |
| `onChange` | `(value: string) => void` | - | Change handler |
| `disabled` | `boolean` | `false` | Disable interaction |

```tsx
<SegmentedControl
  options={[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }]}
  value={view}
  onChange={setView}
/>
```

---

## Form Inputs

### TextInput

```tsx
import { TextInput } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text |
| `showLabel` | `boolean` | `true` | Show/hide label |
| `placeholder` | `string` | - | Placeholder text |
| `value` | `string` | - | Input value |
| `onChange` | `ChangeEventHandler` | - | Change handler |
| `disabled` | `boolean` | `false` | Disable input |
| `error` | `boolean` | `false` | Error state |
| `errorMessage` | `string` | - | Error message text |

```tsx
<TextInput label="Email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
<TextInput label="Password" type="password" error errorMessage="Required field" />
```

### TextArea

```tsx
import { TextArea } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text |
| `placeholder` | `string` | - | Placeholder text |
| `value` | `string` | - | Input value |
| `onChange` | `ChangeEventHandler` | - | Change handler |
| `rows` | `number` | `4` | Visible rows |
| `resize` | `'none' \| 'vertical' \| 'horizontal'` | `'vertical'` | Resize behavior |
| `disabled` | `boolean` | `false` | Disable input |
| `error` | `boolean` | `false` | Error state |

```tsx
<TextArea label="Description" placeholder="Enter description" rows={4} />
```

### SearchInput

```tsx
import { SearchInput } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `'Search...'` | Placeholder text |
| `value` | `string` | - | Search value |
| `onChange` | `(value: string) => void` | - | Change handler |
| `onClear` | `() => void` | - | Clear button handler |
| `disabled` | `boolean` | `false` | Disable input |

```tsx
<SearchInput placeholder="Search users..." value={query} onChange={setQuery} />
```

### Select

```tsx
import { Select } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `{ value: string, label: string }[]` | **required** | Dropdown options |
| `value` | `string` | - | Selected value |
| `onChange` | `(value: string) => void` | - | Change handler |
| `placeholder` | `string` | `'Select...'` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable select |
| `error` | `boolean` | `false` | Error state |

```tsx
<Select
  options={[{ value: 'us', label: 'United States' }, { value: 'uk', label: 'United Kingdom' }]}
  value={country}
  onChange={setCountry}
  placeholder="Select country"
/>
```

### DatePicker

```tsx
import { DatePicker } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date` | - | Selected date |
| `onChange` | `(date: Date) => void` | - | Change handler |
| `format` | `string` | `'DD/MM/YYYY'` | Date format |
| `disabled` | `boolean` | `false` | Disable picker |

---

## Feedback & Status

### Alert

```tsx
import { Alert } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `'info' \| 'success' \| 'warning' \| 'failure' \| 'muted'` | `'info'` | Alert type |
| `variant` | `'page' \| 'section' \| 'section-multiline'` | `'section'` | Layout variant |
| `message` | `string` | **required** | Message text |
| `linkText` | `string` | - | Optional link text |
| `onLinkClick` | `() => void` | - | Link click handler |
| `buttonText` | `string` | - | Optional button text |
| `onButtonClick` | `() => void` | - | Button click handler |
| `dismissible` | `boolean` | `true` | Show dismiss button |
| `onDismiss` | `() => void` | - | Dismiss handler |
| `showIcon` | `boolean` | `true` | Show status icon |

```tsx
<Alert status="success" message="Changes saved successfully" />
<Alert status="warning" message="Connection unstable" buttonText="Retry" onButtonClick={retry} />
<Alert status="failure" message="Failed to save" dismissible />
```

### Toast

```tsx
import { Toast } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | **required** | Toast message |
| `status` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Toast type |
| `duration` | `number` | `5000` | Auto-dismiss time (ms) |
| `onClose` | `() => void` | - | Close handler |

### Tooltip

```tsx
import { Tooltip } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | **required** | Tooltip content |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position |
| `children` | `ReactNode` | **required** | Trigger element |

```tsx
<Tooltip content="Copy to clipboard">
  <Button icon="copy" variant="tertiary" />
</Tooltip>
```

### LoadingIndicator

```tsx
import { LoadingIndicator } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'s' \| 'm' \| 'l'` | `'m'` | Spinner size |

**Compound Components:**
- `LoadingIndicator.Contextual` - Inline spinner
- `LoadingIndicator.Skeleton` - Placeholder shimmer

```tsx
<LoadingIndicator size="m" />
<LoadingIndicator.Contextual size="s" />
<LoadingIndicator.Skeleton variant="text" width={200} />
```

### ProgressBar

```tsx
import { ProgressBar } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | **required** | Current value (0-100) |
| `max` | `number` | `100` | Maximum value |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | Color variant |

---

## Navigation

### Tabs

```tsx
import { Tabs } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `{ id: string, label: string, icon?: ReactNode }[]` | **required** | Tab items |
| `activeTab` | `string` | - | Active tab ID |
| `onTabChange` | `(tabId: string) => void` | - | Tab change handler |

```tsx
<Tabs
  tabs={[{ id: 'overview', label: 'Overview' }, { id: 'details', label: 'Details' }]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

### Sidebar

```tsx
import { Sidebar } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `SidebarItem[]` | **required** | Navigation items |
| `activeItem` | `string` | - | Active item ID |
| `onItemClick` | `(itemId: string) => void` | - | Item click handler |

### Stepper

```tsx
import { Stepper } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `{ title: string, description?: string }[]` | **required** | Step definitions |
| `currentStep` | `number` | `0` | Current step index |
| `onStepChange` | `(step: number) => void` | - | Step change handler |

```tsx
<Stepper
  steps={[{ title: 'Details' }, { title: 'Review' }, { title: 'Confirm' }]}
  currentStep={currentStep}
/>
```

### Pagination

```tsx
import { Pagination } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `page` | `number` | **required** | Current page |
| `totalPages` | `number` | **required** | Total pages |
| `onPageChange` | `(page: number) => void` | - | Page change handler |

---

## Data Display

### Table

```tsx
import { Table } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `Column[]` | **required** | Column definitions |
| `data` | `any[]` | **required** | Row data |
| `rowKey` | `string` | **required** | Unique key field |
| `sortable` | `boolean` | `false` | Enable sorting |
| `hoverable` | `boolean` | `true` | Row hover effect |
| `onRowClick` | `(row: any) => void` | - | Row click handler |

**Column definition:**
```tsx
{ key: string, label: string, sortable?: boolean, render?: (value, row) => ReactNode }
```

```tsx
<Table
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status', render: (v) => <Chip label={v} /> },
  ]}
  data={users}
  rowKey="id"
/>
```

### Chip

```tsx
import { Chip } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | Chip text |
| `type` | `'attribute' \| 'measure' \| 'filter' \| 'skeleton'` | `'attribute'` | Chip type |
| `filterValue` | `string` | - | Filter value (for filter type) |
| `icon` | `IconName \| ReactNode` | - | Leading icon |
| `showChevron` | `boolean` | `false` | Show chevron icon |
| `deletable` | `boolean` | `false` | Show delete on hover |
| `disabled` | `boolean` | `false` | Disable interaction |
| `onClick` | `() => void` | - | Click handler |
| `onDelete` | `() => void` | - | Delete handler |
| `maxWidth` | `number` | - | Maximum width (truncate) |

```tsx
<Chip label="Active" type="attribute" />
<Chip label="Revenue" type="measure" icon="chart" />
<Chip label="Status" filterValue="Active" type="filter" deletable onDelete={removeFilter} />
```

### Avatar

```tsx
import { Avatar } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | **required** | User name (for initials) |
| `src` | `string` | - | Image URL |
| `size` | `'xs' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'` | Avatar size |
| `variant` | `'circle' \| 'square'` | `'circle'` | Shape variant |

```tsx
<Avatar name="Maya Chen" size="m" />
<Avatar name="John Doe" src="/avatars/john.jpg" />
```

### Card

```tsx
import { Card } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'elevated' \| 'outlined'` | `'elevated'` | Visual style |
| `padding` | `'none' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Internal padding |
| `children` | `ReactNode` | **required** | Card content |

---

## Overlays & Modals

### Modal

```tsx
import { Modal } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | **required** | Open state |
| `onClose` | `() => void` | **required** | Close handler |
| `title` | `string` | - | Modal title |
| `children` | `ReactNode` | **required** | Modal content |
| `footer` | `ReactNode` | - | Footer content |
| `closeOnOverlayClick` | `boolean` | `true` | Close on backdrop click |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Modal width |

```tsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Edit User">
  <TextInput label="Name" />
  <Button variant="primary">Save</Button>
</Modal>
```

### ConfirmDialog

```tsx
import { ConfirmDialog } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | **required** | Open state |
| `onConfirm` | `() => void` | **required** | Confirm handler |
| `onCancel` | `() => void` | **required** | Cancel handler |
| `title` | `string` | **required** | Dialog title |
| `message` | `string` | - | Confirmation message |
| `confirmLabel` | `string` | `'Confirm'` | Confirm button text |
| `cancelLabel` | `string` | `'Cancel'` | Cancel button text |
| `variant` | `'default' \| 'danger'` | `'default'` | Visual style |

```tsx
<ConfirmDialog
  isOpen={isOpen}
  title="Delete this Answer?"
  message="This action cannot be undone."
  confirmLabel="Delete"
  variant="danger"
  onConfirm={handleDelete}
  onCancel={() => setIsOpen(false)}
/>
```

### Popover

```tsx
import { Popover } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Controlled open state |
| `content` | `ReactNode` | **required** | Popover content |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Position |
| `trigger` | `'click' \| 'hover'` | `'click'` | Trigger behavior |
| `children` | `ReactNode` | **required** | Trigger element |

### Menu

```tsx
import { Menu } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `MenuItem[]` | **required** | Menu items |
| `onSelect` | `(itemId: string) => void` | - | Selection handler |
| `trigger` | `ReactNode` | **required** | Trigger element |

---

## Icons

### Icon

```tsx
import { Icon } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `IconName` | **required** | Icon name |
| `size` | `'xs' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'` | Icon size |
| `color` | `string` | `currentColor` | Icon color |

**Available Icons (46):**

```
arrow-up, arrow-down, arrow-left, arrow-right,
chevron-up, chevron-down, chevron-left, chevron-right,
plus, minus, cross, checkmark, checkmark-circle, cross-circle,
exclamation-point-circle, info-circle, question-mark,
copy, download, upload, save, refresh, pencil, trash-can,
share, pin, filter, funnel, play, pause, eye, eye-undo,
clock, cog, folder, lock, magnifying-glass, profile,
sort, star, tag, expand, fullscreen, hamburger, more, information
```

```tsx
<Icon name="plus" size="m" />
<Icon name="checkmark-circle" size="l" color="#06BF7F" />
```

---

## Layout

### Accordion

```tsx
import { Accordion } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `{ id: string, title: string, content: ReactNode }[]` | **required** | Accordion items |
| `allowMultiple` | `boolean` | `false` | Allow multiple open |
| `defaultOpen` | `string[]` | `[]` | Initially open items |

### Divider

```tsx
import { Divider } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction |
| `variant` | `'solid' \| 'dashed'` | `'solid'` | Line style |

---

## Typography

### Typography

```tsx
import { Typography } from '../components';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'h1' \| 'h2' \| 'h3' \| 'body' \| 'caption' \| ...` | `'body'` | Text style |
| `color` | `'default' \| 'muted' \| 'primary' \| 'error'` | `'default'` | Text color |
| `children` | `ReactNode` | **required** | Text content |

```tsx
<Typography variant="h1">Page Title</Typography>
<Typography variant="body" color="muted">Secondary text</Typography>
```
