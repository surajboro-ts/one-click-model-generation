import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { Radio } from '../components/Radio';
import { Toggle } from '../components/Toggle';
import { TextInput } from '../components/TextInput';
import { TextArea } from '../components/TextArea';
import { SearchInput } from '../components/SearchInput';
import { Chip } from '../components/Chip';
import { Alert } from '../components/Alert';
import { Toast } from '../components/Toast';
import { Modal } from '../components/Modal';
import { Tabs } from '../components/Tabs';
import { Select } from '../components/Select';
import { Table } from '../components/Table';
import { Tooltip } from '../components/Tooltip';
import { Popover } from '../components/Popover';
// New Phase 2-4 components
import { LoadingIndicator } from '../components/LoadingIndicator';
import { Avatar, AvatarGroup } from '../components/Avatar';
import { Card } from '../components/Card';
import { Typography } from '../components/Typography';
import { Divider } from '../components/Divider';
import { Link } from '../components/Link';
import { Accordion } from '../components/Accordion';
import { Menu } from '../components/Menu';
import { Pagination } from '../components/Pagination';
import { ProgressBar } from '../components/ProgressBar';
import { Stepper } from '../components/Stepper';
import { DatePicker } from '../components/DatePicker';
import { IconGallery } from '../components/IconGallery';
import { SegmentedControl } from '../components/SegmentedControl';
import { GlobalHeader } from '../components/GlobalHeader';
import { AppSidebar } from '../components/AppSidebar';
import { AppShell } from '../components/AppShell';
import { systemColors, referenceColors } from '../tokens/colors';

interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface ComponentDocPageProps {
  componentId: string;
}

const componentDocs: Record<string, {
  name: string;
  description: string;
  props: PropDefinition[];
}> = {
  button: {
    name: 'Button',
    description: 'A comprehensive button component supporting multiple variants, sizes, colorways, and states. The most used component in the Radiant design system.',
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'tertiary'", default: "'primary'", description: 'The visual style variant' },
      { name: 'size', type: "'small' | 'basic' | 'large'", default: "'basic'", description: 'The size of the button' },
      { name: 'colorway', type: "'standard' | 'white'", default: "'standard'", description: 'Color scheme for light/dark backgrounds' },
      { name: 'icon', type: 'ReactNode', description: 'Optional icon element' },
      { name: 'iconPosition', type: "'leading' | 'trailing' | 'none'", default: "'none'", description: 'Position of the icon' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Whether the button is in loading state' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the button is disabled' },
      { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Whether the button spans full width' },
    ],
  },
  checkbox: {
    name: 'Checkbox',
    description: 'A form control for boolean or indeterminate selections. Supports checked, unchecked, and indeterminate states.',
    props: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'The checked state of the checkbox' },
      { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Whether the checkbox is in indeterminate state' },
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'showLabel', type: 'boolean', default: 'true', description: 'Whether to show the label' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the checkbox is disabled' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Whether the checkbox has an error' },
      { name: 'onChange', type: '(checked: boolean) => void', description: 'Change handler' },
    ],
  },
  radio: {
    name: 'Radio',
    description: 'A form control for single selection from a group of options. Use the name prop to group radios together.',
    props: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'Whether the radio is selected' },
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'showLabel', type: 'boolean', default: 'true', description: 'Whether to show the label' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the radio is disabled' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Whether the radio has an error' },
      { name: 'name', type: 'string', description: 'Name attribute for form submission' },
      { name: 'value', type: 'string', description: 'Value attribute for form submission' },
      { name: 'onChange', type: '(value: string) => void', description: 'Change handler' },
    ],
  },
  toggle: {
    name: 'Toggle',
    description: 'A switch control for boolean on/off states. Commonly used for settings and preferences.',
    props: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'Whether the toggle is on' },
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'showLabel', type: 'boolean', default: 'true', description: 'Whether to show the label' },
      { name: 'labelPosition', type: "'left' | 'right'", default: "'left'", description: 'Position of the label' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the toggle is disabled' },
      { name: 'onChange', type: '(checked: boolean) => void', description: 'Change handler' },
    ],
  },
  textinput: {
    name: 'TextInput',
    description: 'A text input field with optional label and error states. Built for accessibility and form validation.',
    props: [
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'showLabel', type: 'boolean', default: 'true', description: 'Whether to show the label' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'value', type: 'string', description: 'Current value' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the input is disabled' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Whether the input has an error' },
      { name: 'errorMessage', type: 'string', description: 'Error message to display' },
      { name: 'onChange', type: '(e: ChangeEvent) => void', description: 'Change handler' },
    ],
  },
  textarea: {
    name: 'TextArea',
    description: 'A multi-line text input field with optional label, helper text, character counter, and error states.',
    props: [
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'showLabel', type: 'boolean', default: 'true', description: 'Whether to show the label' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'value', type: 'string', description: 'Current value' },
      { name: 'rows', type: 'number', default: '4', description: 'Number of visible text rows' },
      { name: 'resize', type: "'none' | 'vertical' | 'horizontal' | 'both'", default: "'vertical'", description: 'Whether to allow resizing' },
      { name: 'maxLength', type: 'number', description: 'Maximum character count (shows counter when set)' },
      { name: 'helperText', type: 'string', description: 'Helper text below the input' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the textarea is disabled' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Whether the textarea has an error' },
      { name: 'errorMessage', type: 'string', description: 'Error message to display' },
      { name: 'onChange', type: '(e: ChangeEvent) => void', description: 'Change handler' },
    ],
  },
  searchinput: {
    name: 'SearchInput',
    description: 'A search input with icon and clear functionality. Perfect for filtering and search features.',
    props: [
      { name: 'placeholder', type: 'string', default: "'Search'", description: 'Placeholder text' },
      { name: 'value', type: 'string', description: 'Current value' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the input is disabled' },
      { name: 'onChange', type: '(e: ChangeEvent) => void', description: 'Change handler' },
      { name: 'onClear', type: '() => void', description: 'Handler when clear button is clicked' },
    ],
  },
  chip: {
    name: 'Chip',
    description: 'A pill-shaped component for displaying attributes, measures, filters, or placeholder skeleton states.',
    props: [
      { name: 'type', type: "'attribute' | 'measure' | 'filter' | 'skeleton'", default: "'attribute'", description: 'The type/variant of chip' },
      { name: 'label', type: 'string', description: 'The label text to display' },
      { name: 'filterValue', type: 'string', description: 'For filter type: the filter value' },
      { name: 'showChevron', type: 'boolean', default: 'true', description: 'Whether to show the trailing chevron' },
      { name: 'deletable', type: 'boolean', default: 'false', description: 'Whether to show delete button on hover' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the chip is disabled' },
      { name: 'onClick', type: '() => void', description: 'Click handler for the chip' },
      { name: 'onDelete', type: '() => void', description: 'Handler when delete button is clicked' },
    ],
  },
  alert: {
    name: 'Alert',
    description: 'A notification component for displaying important messages. Supports different statuses and variants.',
    props: [
      { name: 'status', type: "'info' | 'success' | 'warning' | 'failure' | 'muted'", default: "'info'", description: 'The status/type of alert' },
      { name: 'variant', type: "'page' | 'section' | 'section-multiline'", default: "'section'", description: 'The variant/layout of the alert' },
      { name: 'message', type: 'string', description: 'The main message text' },
      { name: 'linkText', type: 'string', description: 'Optional link text' },
      { name: 'buttonText', type: 'string', description: 'Optional button text (page variant only)' },
      { name: 'dismissible', type: 'boolean', default: 'true', description: 'Whether the alert can be dismissed' },
      { name: 'showIcon', type: 'boolean', default: 'true', description: 'Whether to show the status icon' },
    ],
  },
  toast: {
    name: 'Toast',
    description: 'A temporary notification that appears to provide feedback about an action. Auto-dismisses after a configurable duration.',
    props: [
      { name: 'message', type: 'string', description: 'Toast message' },
      { name: 'type', type: "'success' | 'info' | 'warning' | 'error'", default: "'info'", description: 'Toast type' },
      { name: 'duration', type: 'number', default: '5000', description: 'Auto-dismiss duration in milliseconds (0 to disable)' },
      { name: 'isVisible', type: 'boolean', default: 'true', description: 'Whether the toast is visible' },
      { name: 'onDismiss', type: '() => void', description: 'Called when toast is dismissed' },
      { name: 'actionText', type: 'string', description: 'Action button text' },
      { name: 'onAction', type: '() => void', description: 'Action button click handler' },
      { name: 'position', type: "'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right'", default: "'bottom'", description: 'Position of the toast' },
    ],
  },
  modal: {
    name: 'Modal',
    description: 'An overlay modal dialog for displaying content on top of the page. Supports keyboard navigation and focus trapping.',
    props: [
      { name: 'isOpen', type: 'boolean', description: 'Whether the modal is open' },
      { name: 'onClose', type: '() => void', description: 'Handler to close the modal' },
      { name: 'title', type: 'string', description: 'Modal title' },
      { name: 'children', type: 'ReactNode', description: 'Modal content' },
      { name: 'footer', type: 'ReactNode', description: 'Footer content (typically buttons)' },
      { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: 'Modal size' },
      { name: 'closeOnOverlayClick', type: 'boolean', default: 'true', description: 'Whether to close on overlay click' },
      { name: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Whether to close on Escape key' },
    ],
  },
  tabs: {
    name: 'Tabs',
    description: 'Navigation tabs for content organization. Supports keyboard navigation and active state management.',
    props: [
      { name: 'tabs', type: 'Array<{ id: string, label: string }>', description: 'Array of tab items' },
      { name: 'activeTab', type: 'string', description: 'Currently active tab ID' },
      { name: 'onTabChange', type: '(id: string) => void', description: 'Handler when a tab is selected' },
    ],
  },
  select: {
    name: 'Select',
    description: 'A dropdown selection component with search functionality, keyboard navigation, and customizable options.',
    props: [
      { name: 'options', type: 'Array<{ id: string, label: string, value?: string }>', description: 'Array of options to display' },
      { name: 'value', type: 'string', description: 'Currently selected value' },
      { name: 'onChange', type: '(value: string, option: SelectOption) => void', description: 'Handler when selection changes' },
      { name: 'placeholder', type: 'string', default: "'Select an option'", description: 'Placeholder text when no selection' },
      { name: 'label', type: 'string', description: 'Label text above the select' },
      { name: 'helperText', type: 'string', description: 'Helper text below the select' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Error state' },
      { name: 'errorMessage', type: 'string', description: 'Error message to display' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
      { name: 'searchable', type: 'boolean', default: 'false', description: 'Show search input in dropdown' },
      { name: 'size', type: "'small' | 'basic' | 'large'", default: "'basic'", description: 'Size variant' },
    ],
  },
  segmentedcontrol: {
    name: 'SegmentedControl',
    description: 'A group of mutually exclusive options displayed as connected segments. Supports text and icon variants.',
    props: [
      { name: 'options', type: 'Array<{ id: string, label?: string, icon?: ReactNode, disabled?: boolean, ariaLabel?: string }>', description: 'Array of segment options' },
      { name: 'value', type: 'string', description: 'Currently selected segment ID' },
      { name: 'onChange', type: '(value: string) => void', description: 'Change handler' },
      { name: 'size', type: "'small' | 'default' | 'large'", default: "'default'", description: 'Size variant' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the entire control is disabled' },
      { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Fill available width' },
    ],
  },
  table: {
    name: 'Table',
    description: 'A flexible data table component for displaying tabular data with sorting, selection, and custom cell rendering.',
    props: [
      { name: 'columns', type: 'Array<TableColumn>', description: 'Column definitions with key, label, width, and render function' },
      { name: 'data', type: 'Array<T>', description: 'Table data rows' },
      { name: 'rowKey', type: 'string | ((row, index) => string)', default: "'id'", description: 'Key extractor for rows' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Loading state' },
      { name: 'emptyMessage', type: 'string', default: "'No data available'", description: 'Empty state message' },
      { name: 'selectable', type: 'boolean', default: 'false', description: 'Whether rows are selectable' },
      { name: 'selectedKeys', type: 'string[]', description: 'Selected row keys' },
      { name: 'onSelectionChange', type: '(selectedKeys: string[]) => void', description: 'Selection change handler' },
      { name: 'hoverable', type: 'boolean', default: 'true', description: 'Show hover state on rows' },
      { name: 'bordered', type: 'boolean', default: 'false', description: 'Show table borders' },
      { name: 'striped', type: 'boolean', default: 'false', description: 'Striped rows' },
    ],
  },
  tooltip: {
    name: 'Tooltip',
    description: 'A lightweight tooltip component for displaying contextual information on hover or focus.',
    props: [
      { name: 'content', type: 'ReactNode', description: 'Tooltip content' },
      { name: 'children', type: 'ReactElement', description: 'Element that triggers the tooltip' },
      { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Placement of the tooltip' },
      { name: 'showDelay', type: 'number', default: '200', description: 'Delay before showing (ms)' },
      { name: 'hideDelay', type: 'number', default: '0', description: 'Delay before hiding (ms)' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether tooltip is disabled' },
      { name: 'maxWidth', type: 'number', default: '250', description: 'Maximum width of tooltip' },
    ],
  },
  popover: {
    name: 'Popover',
    description: 'An interactive overlay component for displaying content in a floating container with click or hover triggers.',
    props: [
      { name: 'content', type: 'ReactNode', description: 'Popover content' },
      { name: 'children', type: 'ReactElement', description: 'Element that triggers the popover' },
      { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right' | ...", default: "'bottom'", description: 'Placement of the popover' },
      { name: 'trigger', type: "'click' | 'hover'", default: "'click'", description: 'How to trigger the popover' },
      { name: 'isOpen', type: 'boolean', description: 'Controlled open state' },
      { name: 'onOpenChange', type: '(isOpen: boolean) => void', description: 'Open state change handler' },
      { name: 'closeOnClickOutside', type: 'boolean', default: 'true', description: 'Close on click outside' },
      { name: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Close on escape key' },
      { name: 'offset', type: 'number', default: '8', description: 'Offset from trigger element (px)' },
    ],
  },
  // Phase 2: Core Components
  loadingindicator: {
    name: 'LoadingIndicator',
    description: 'A compound component providing both contextual (inline) and global (fullscreen) loading indicators.',
    props: [
      { name: 'Contextual.size', type: "'xs' | 's' | 'm' | 'l' | 'xl'", default: "'m'", description: 'Size of the spinner (12-48px)' },
      { name: 'Global.dark', type: 'boolean', default: 'false', description: 'Use dark theme overlay' },
      { name: 'Global.message', type: 'string', description: 'Optional loading message' },
    ],
  },
  avatar: {
    name: 'Avatar',
    description: 'Displays a user avatar with automatic initials fallback, image loading, and optional badge support.',
    props: [
      { name: 'name', type: 'string', description: 'User name (used for initials and alt text)' },
      { name: 'src', type: 'string', description: 'Image source URL' },
      { name: 'size', type: "'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'", default: "'m'", description: 'Avatar size (20-64px)' },
      { name: 'showName', type: 'boolean', default: 'false', description: 'Display name alongside avatar' },
      { name: 'namePosition', type: "'right' | 'bottom'", default: "'right'", description: 'Position of name relative to avatar' },
      { name: 'badgeValue', type: 'number', description: 'Numbered badge value (max 99)' },
      { name: 'showBadge', type: 'boolean', default: 'false', description: 'Show dot badge' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
    ],
  },
  card: {
    name: 'Card',
    description: 'A flexible container component for grouping related content with header, body, and footer sections.',
    props: [
      { name: 'interactive', type: 'boolean', default: 'false', description: 'Whether the card is clickable' },
      { name: 'isSelected', type: 'boolean', default: 'false', description: 'Selected state' },
      { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Disabled state' },
      { name: 'noBorder', type: 'boolean', default: 'false', description: 'Remove border' },
      { name: 'onClick', type: '(data: string) => void', description: 'Click handler' },
      { name: 'Header.title', type: 'string', description: 'Header title text' },
      { name: 'Header.subtitle', type: 'string', description: 'Header subtitle' },
      { name: 'Footer.align', type: "'left' | 'center' | 'right' | 'space-between'", default: "'right'", description: 'Footer alignment' },
    ],
  },
  typography: {
    name: 'Typography',
    description: 'A flexible text component supporting Radiant V2 typography system with 20+ variants and semantic colors.',
    props: [
      { name: 'variant', type: 'TypographyVariant', description: 'Typography variant (headline-large, page-title, body-normal, etc.)' },
      { name: 'color', type: "'base' | 'gray' | 'accent' | 'success' | 'warning' | 'failure' | 'white'", default: "'base'", description: 'Text color' },
      { name: 'as', type: 'ElementType', description: 'Override HTML tag' },
      { name: 'noMargin', type: 'boolean', default: 'false', description: 'Remove bottom margin' },
      { name: 'ellipsis', type: '{ rows: number }', description: 'Truncate after N lines with ellipsis' },
      { name: 'wrapContent', type: 'boolean', default: 'false', description: 'Enable word wrapping' },
    ],
  },
  divider: {
    name: 'Divider',
    description: 'A simple line separator for dividing content sections, supporting horizontal and vertical orientations.',
    props: [
      { name: 'vertical', type: 'boolean', default: 'false', description: 'Vertical orientation' },
      { name: 'spacing', type: "'none' | 's' | 'm' | 'l'", default: "'none'", description: 'Margin around divider' },
      { name: 'section', type: 'boolean', default: 'false', description: 'Include section-level spacing' },
      { name: 'onDarkBg', type: 'boolean', default: 'false', description: 'For use on dark backgrounds' },
    ],
  },
  link: {
    name: 'Link',
    description: 'A styled anchor element for navigation with color variants and external link support.',
    props: [
      { name: 'color', type: "'blue' | 'black' | 'white' | 'gray'", default: "'blue'", description: 'Link color' },
      { name: 'size', type: "'small' | 'default' | 'large'", default: "'default'", description: 'Link size' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
      { name: 'noUnderline', type: 'boolean', default: 'false', description: 'Disable underline on hover' },
      { name: 'external', type: 'boolean', default: 'false', description: 'Show external link icon' },
      { name: 'href', type: 'string', description: 'Link destination' },
    ],
  },
  // Phase 3: Interactive Components
  accordion: {
    name: 'Accordion',
    description: 'A collapsible content component for showing/hiding sections with smooth animations.',
    props: [
      { name: 'allowMultiple', type: 'boolean', default: 'false', description: 'Allow multiple items expanded' },
      { name: 'defaultExpanded', type: 'number | number[]', description: 'Initially expanded item(s)' },
      { name: 'expanded', type: 'number | number[]', description: 'Controlled expanded state' },
      { name: 'onExpandedChange', type: '(expanded: number[]) => void', description: 'Expansion change handler' },
      { name: 'variant', type: "'default' | 'minimal' | 'bordered'", default: "'default'", description: 'Visual variant' },
      { name: 'Item.title', type: 'ReactNode', description: 'Item title' },
      { name: 'Item.subtitle', type: 'string', description: 'Item subtitle' },
      { name: 'Item.disabled', type: 'boolean', default: 'false', description: 'Disable item' },
    ],
  },
  menu: {
    name: 'Menu',
    description: 'A dropdown menu for displaying a list of actions with keyboard navigation support.',
    props: [
      { name: 'show', type: 'boolean', default: 'true', description: 'Menu visibility' },
      { name: 'variant', type: "'default' | 'compact'", default: "'default'", description: 'Visual variant' },
      { name: 'theme', type: "'light' | 'dark'", default: "'light'", description: 'Color theme' },
      { name: 'onClose', type: '() => void', description: 'Close handler' },
      { name: 'Item.active', type: 'boolean', default: 'false', description: 'Selected state' },
      { name: 'Item.disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
      { name: 'Item.danger', type: 'boolean', default: 'false', description: 'Destructive action style' },
      { name: 'Item.shortcut', type: 'string', description: 'Keyboard shortcut display' },
    ],
  },
  pagination: {
    name: 'Pagination',
    description: 'A compound component for page navigation with three variants: Numbers, Dots, and Range.',
    props: [
      { name: 'Numbers.currentPage', type: 'number', description: 'Current page (1-indexed)' },
      { name: 'Numbers.totalPages', type: 'number', description: 'Total number of pages' },
      { name: 'Numbers.onPageChange', type: '(page: number) => void', description: 'Page change handler' },
      { name: 'Numbers.siblingCount', type: 'number', default: '1', description: 'Pages to show on each side' },
      { name: 'Dots.currentPage', type: 'number', description: 'Current page for dot indicators' },
      { name: 'Range.itemsPerPage', type: 'number', description: 'Items per page for range display' },
      { name: 'Range.totalItems', type: 'number', description: 'Total items for range calculation' },
    ],
  },
  progressbar: {
    name: 'ProgressBar',
    description: 'A horizontal bar that shows progress toward a goal with color and size variants.',
    props: [
      { name: 'value', type: 'number', description: 'Progress value (0-100)' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
      { name: 'color', type: "'green' | 'blue' | 'yellow' | 'red'", default: "'green'", description: 'Bar color' },
      { name: 'size', type: "'small' | 'default' | 'large'", default: "'default'", description: 'Bar size (4-8px)' },
      { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Show loading animation' },
      { name: 'label', type: 'string', description: 'Label text above bar' },
      { name: 'showValue', type: 'boolean', default: 'false', description: 'Show percentage value' },
    ],
  },
  stepper: {
    name: 'Stepper',
    description: 'A progress indicator for multi-step processes with horizontal and vertical orientations.',
    props: [
      { name: 'steps', type: 'Array<{ title: string, description?: string }>', description: 'Step items' },
      { name: 'currentStep', type: 'number', default: '0', description: 'Current active step (0-indexed)' },
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Stepper orientation' },
      { name: 'sequential', type: 'boolean', default: 'true', description: 'Steps must be completed in order' },
      { name: 'allCompleted', type: 'boolean', default: 'false', description: 'Mark all steps as completed' },
      { name: 'onStepClick', type: '(stepIndex: number) => void', description: 'Step click handler' },
    ],
  },
  // Phase 4: Advanced Components
  datepicker: {
    name: 'DatePicker',
    description: 'A date selection input with calendar dropdown, supporting multiple date formats.',
    props: [
      { name: 'value', type: 'Date | null', description: 'Selected date' },
      { name: 'onChange', type: '(date: Date | null) => void', description: 'Date change handler' },
      { name: 'format', type: "'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD'", default: "'MM/DD/YYYY'", description: 'Date format' },
      { name: 'label', type: 'string', description: 'Input label' },
      { name: 'placeholder', type: 'string', default: "'Select date'", description: 'Placeholder text' },
      { name: 'hasError', type: 'boolean', default: 'false', description: 'Error state' },
      { name: 'helperText', type: 'string', description: 'Helper or error text' },
      { name: 'minDate', type: 'Date', description: 'Minimum selectable date' },
      { name: 'maxDate', type: 'Date', description: 'Maximum selectable date' },
    ],
  },
  icongallery: {
    name: 'IconGallery',
    description: 'A searchable, browsable gallery of all available icons in the design system.',
    props: [
      { name: 'size', type: "'compact' | 'default' | 'large'", default: "'default'", description: 'Gallery density' },
      { name: 'iconSize', type: "'xs' | 's' | 'm' | 'l' | 'xl'", default: "'m'", description: 'Icon display size' },
      { name: 'theme', type: "'light' | 'dark'", default: "'light'", description: 'Color theme' },
      { name: 'searchable', type: 'boolean', default: 'true', description: 'Enable search filtering' },
      { name: 'selectable', type: 'boolean', default: 'false', description: 'Enable icon selection' },
      { name: 'selectedIcon', type: 'IconName', description: 'Currently selected icon' },
      { name: 'onSelectIcon', type: '(iconName: IconName) => void', description: 'Selection handler' },
    ],
  },
  // Widgets
  globalheader: {
    name: 'GlobalHeader',
    description: 'A reusable global application header bar with ThoughtSpot logo, search trigger/input, help, notifications, and profile actions. Designed for use inside AppShell or standalone.',
    props: [
      { name: 'logo', type: 'ReactNode', description: 'Custom logo element (defaults to ThoughtSpot logo)' },
      { name: 'onLogoClick', type: '() => void', description: 'Handler when logo is clicked' },
      { name: 'searchPlaceholder', type: 'string', default: "'Search in ThoughtSpot'", description: 'Placeholder text for the search bar' },
      { name: 'searchMode', type: "'trigger' | 'input'", default: "'trigger'", description: 'Search bar mode: click-to-open trigger or live text input' },
      { name: 'onSearchClick', type: '() => void', description: 'Handler when search trigger is clicked (trigger mode)' },
      { name: 'onSearchChange', type: '(query: string) => void', description: 'Handler when search text changes (input mode)' },
      { name: 'searchValue', type: 'string', default: "''", description: 'Controlled search value (input mode)' },
      { name: 'showKeyboardHint', type: 'boolean', default: 'true', description: 'Show Cmd+K keyboard shortcut badge' },
      { name: 'userName', type: 'string', default: "'Workspace'", description: 'Name displayed in the profile button' },
      { name: 'userAvatar', type: 'string', description: 'Avatar image URL for the profile button' },
      { name: 'notificationCount', type: 'number', default: '0', description: 'Notification badge count (hidden when 0)' },
      { name: 'showHamburger', type: 'boolean', default: 'false', description: 'Show hamburger menu button (for fullscreen modes)' },
      { name: 'onHamburgerClick', type: '() => void', description: 'Handler when hamburger is clicked' },
      { name: 'showDefaultActions', type: 'boolean', default: 'true', description: 'Show help, notification, and profile actions' },
      { name: 'rightSlot', type: 'ReactNode', description: 'Custom content rendered after default actions' },
    ],
  },
  appsidebar: {
    name: 'AppSidebar',
    description: 'A multi-tab application sidebar with icon tab switcher, categorized navigation items, scope toggle, and overlay mode. Data-driven via props for maximum reusability.',
    props: [
      { name: 'tabs', type: 'SidebarTab[]', description: 'Array of tab definitions with id, label, headerTitle, icon, and optional add button' },
      { name: 'activeTab', type: 'string', description: 'Currently active tab ID' },
      { name: 'onTabChange', type: '(tabId: string) => void', description: 'Handler when a tab is selected' },
      { name: 'categories', type: 'Record<string, SidebarCategory[]>', description: 'Navigation categories keyed by tab ID. Each category has a title and array of nav items' },
      { name: 'selectedNav', type: 'string', description: 'Currently selected navigation item ID' },
      { name: 'onNavSelect', type: '(navId: string) => void', description: 'Handler when a navigation item is selected' },
      { name: 'scopeToggle', type: 'ScopeToggle', description: 'Optional scope/org toggle with options array, activeId, and onChange' },
      { name: 'highlightedItem', type: 'string | null', default: 'null', description: 'Item ID to flash-highlight (e.g., after command palette navigation)' },
      { name: 'headerSlot', type: 'ReactNode', description: 'Custom content rendered below the tab title (e.g., search input)' },
      { name: 'isOverlay', type: 'boolean', default: 'false', description: 'Render in overlay mode with shadow (for fullscreen views)' },
      { name: 'onClose', type: '() => void', description: 'Close handler for overlay mode' },
      { name: 'width', type: 'number', default: '261', description: 'Sidebar width in pixels' },
    ],
  },
  appshell: {
    name: 'AppShell',
    description: 'A complete application shell layout that composes GlobalHeader and AppSidebar with a content area. Handles sidebar visibility, overlay mode, and an overlay slot for modals and command palettes.',
    props: [
      { name: 'headerProps', type: 'GlobalHeaderProps', description: 'Props passed to the GlobalHeader component' },
      { name: 'sidebarProps', type: 'AppSidebarProps', description: 'Props passed to the AppSidebar component' },
      { name: 'hideSidebar', type: 'boolean', default: 'false', description: 'Hide sidebar for fullscreen content mode (enables hamburger toggle)' },
      { name: 'overlaySlot', type: 'ReactNode', description: 'Content rendered above everything (command palette, modals, etc.)' },
      { name: 'contentBackground', type: 'string', default: "brandColors.gray[10]", description: 'Background color of the main content area' },
      { name: 'children', type: 'ReactNode', description: 'Main content rendered in the content area' },
    ],
  },
};

export const ComponentDocPage: React.FC<ComponentDocPageProps> = ({ componentId }) => {
  const doc = componentDocs[componentId];
  
  // State for interactive examples
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [toggleChecked, setToggleChecked] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [selectValue, setSelectValue] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  // New component states
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [paginationPage, setPaginationPage] = useState(1);
  const [stepperStep, setStepperStep] = useState(1);
  const [progressValue, setProgressValue] = useState(45);
  const [segmentedValue, setSegmentedValue] = useState('day');

  if (!doc) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Component not found</h1>
      </div>
    );
  }

  const renderExample = () => {
    switch (componentId) {
      case 'button':
        return (
          <div style={styles.exampleContent}>
            <div style={styles.exampleRow}>
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="tertiary">Tertiary Button</Button>
            </div>
            <div style={styles.exampleRow}>
              <Button variant="primary" size="small">Small</Button>
              <Button variant="primary" size="basic">Basic</Button>
              <Button variant="primary" size="large">Large</Button>
            </div>
            <div style={styles.exampleRow}>
              <Button variant="primary" disabled>Disabled</Button>
              <Button variant="primary" loading>Loading</Button>
            </div>
          </div>
        );
      
      case 'checkbox':
        return (
          <div style={styles.exampleContent}>
            <div style={styles.exampleColumn}>
              <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
              <Checkbox label="Checked" checked={true} onChange={() => {}} />
              <Checkbox label="Indeterminate" indeterminate onChange={() => {}} />
              <Checkbox label="Disabled" disabled />
              <Checkbox label="Error state" error />
            </div>
            <div style={styles.interactiveBox}>
              <h4 style={styles.interactiveLabel}>Try it:</h4>
              <Checkbox 
                label="Interactive checkbox" 
                checked={checkboxChecked} 
                onChange={setCheckboxChecked} 
              />
            </div>
          </div>
        );
      
      case 'radio':
        return (
          <div style={styles.exampleContent}>
            <div style={styles.exampleColumn}>
              <Radio name="demo" value="option1" label="Option 1" checked={radioValue === 'option1'} onChange={setRadioValue} />
              <Radio name="demo" value="option2" label="Option 2" checked={radioValue === 'option2'} onChange={setRadioValue} />
              <Radio name="demo" value="option3" label="Option 3" checked={radioValue === 'option3'} onChange={setRadioValue} />
            </div>
            <div style={styles.exampleColumn}>
              <Radio label="Disabled" disabled />
              <Radio label="Error state" error />
            </div>
          </div>
        );
      
      case 'toggle':
        return (
          <div style={styles.exampleContent}>
            <div style={styles.exampleColumn}>
              <Toggle label="Off state" checked={false} onChange={() => {}} />
              <Toggle label="On state" checked={true} onChange={() => {}} />
              <Toggle label="Disabled" disabled />
              <Toggle label="Label on right" labelPosition="right" checked={toggleChecked} onChange={setToggleChecked} />
            </div>
          </div>
        );
      
      case 'textinput':
        return (
          <div style={styles.exampleContent}>
            <div style={styles.exampleColumn}>
              <TextInput label="Default" placeholder="Enter text..." value={textValue} onChange={(e) => setTextValue(e.target.value)} />
              <TextInput label="Disabled" placeholder="Disabled input" disabled />
              <TextInput label="Error" error errorMessage="This field is required" value="Invalid value" />
            </div>
          </div>
        );
      
      case 'textarea':
        return (
          <div style={styles.exampleContent}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
              <TextArea 
                label="Description" 
                placeholder="Enter a description..." 
                rows={4}
              />
              <TextArea 
                label="Bio" 
                placeholder="Tell us about yourself..." 
                maxLength={200}
                helperText="Max 200 characters"
              />
              <TextArea 
                label="Comment" 
                error 
                errorMessage="This field is required"
                rows={3}
              />
              <TextArea 
                label="Disabled" 
                placeholder="This textarea is disabled" 
                disabled
              />
            </div>
          </div>
        );
      
      case 'searchinput':
        return (
          <div style={styles.exampleContent}>
            <div style={{ maxWidth: '320px' }}>
              <SearchInput 
                placeholder="Search..." 
                value={searchValue} 
                onChange={(e) => setSearchValue(e.target.value)} 
              />
            </div>
          </div>
        );
      
      case 'chip':
        return (
          <div style={styles.exampleContent}>
            <div style={styles.exampleRow}>
              <Chip type="attribute" label="Country" />
              <Chip type="measure" label="Revenue" />
              <Chip type="filter" label="Status" filterValue="Active" />
              <Chip type="skeleton" label="Drag a column" />
            </div>
            <div style={styles.exampleRow}>
              <Chip type="attribute" label="Deletable chip" deletable onDelete={() => alert('Deleted!')} />
              <Chip type="attribute" label="Disabled" disabled />
            </div>
          </div>
        );
      
      case 'alert':
        return (
          <div style={styles.exampleContent}>
            <div style={styles.exampleColumn}>
              <Alert status="info" message="This is an informational message." dismissible={false} />
              <Alert status="success" message="Operation completed successfully!" dismissible={false} />
              <Alert status="warning" message="Please review before proceeding." dismissible={false} />
              <Alert status="failure" message="An error occurred. Please try again." dismissible={false} />
              <Alert status="muted" message="This is a muted notification." dismissible={false} />
            </div>
          </div>
        );
      
      case 'toast':
        return (
          <div style={styles.exampleContent}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Toast type="success" message="Changes saved successfully" duration={0} />
              <Toast type="info" message="New updates available" duration={0} />
              <Toast type="warning" message="Your session will expire soon" duration={0} />
              <Toast type="error" message="Failed to save changes" duration={0} />
              <Toast 
                type="info" 
                message="Item deleted" 
                actionText="Undo"
                onAction={() => console.log('Undo clicked')}
                duration={0} 
              />
            </div>
          </div>
        );
      
      case 'modal':
        return (
          <div style={styles.exampleContent}>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Example Modal"
              size="small"
              footer={
                <>
                  <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button variant="primary" onClick={() => setIsModalOpen(false)}>Confirm</Button>
                </>
              }
            >
              <p style={{ margin: 0, color: referenceColors.gray['70'] }}>
                This is the modal content. You can put any content here.
              </p>
            </Modal>
          </div>
        );
      
      case 'tabs':
        return (
          <div style={styles.exampleContent}>
            <Tabs
              tabs={[
                { id: 'tab1', label: 'First Tab' },
                { id: 'tab2', label: 'Second Tab' },
                { id: 'tab3', label: 'Third Tab' },
              ]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <div style={{ marginTop: '16px', padding: '16px', background: systemColors.light['background-sunken'], borderRadius: '8px' }}>
              Content for {activeTab}
            </div>
          </div>
        );

      case 'select':
        return (
          <div style={styles.exampleContent}>
            <div style={{ maxWidth: '320px' }}>
              <Select
                label="Country"
                placeholder="Select a country"
                options={[
                  { id: 'us', label: 'United States' },
                  { id: 'ca', label: 'Canada' },
                  { id: 'uk', label: 'United Kingdom' },
                  { id: 'de', label: 'Germany' },
                  { id: 'fr', label: 'France' },
                ]}
                value={selectValue}
                onChange={(value) => setSelectValue(value)}
              />
            </div>
            <div style={{ maxWidth: '320px' }}>
              <Select
                label="Searchable select"
                placeholder="Search and select..."
                searchable
                options={[
                  { id: 'opt1', label: 'Option 1' },
                  { id: 'opt2', label: 'Option 2' },
                  { id: 'opt3', label: 'Option 3' },
                  { id: 'opt4', label: 'Option 4' },
                  { id: 'opt5', label: 'Option 5' },
                ]}
                value=""
                onChange={() => {}}
              />
            </div>
            <div style={styles.exampleRow}>
              <Select
                placeholder="Disabled"
                disabled
                options={[{ id: '1', label: 'Option' }]}
              />
              <Select
                placeholder="Error state"
                error
                errorMessage="Please select an option"
                options={[{ id: '1', label: 'Option' }]}
              />
            </div>
          </div>
        );

      case 'segmentedcontrol':
        return (
          <div style={styles.exampleContent}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <Typography variant="overline" style={{ marginBottom: '8px', display: 'block' }}>Text Variant</Typography>
                <SegmentedControl
                  options={[
                    { id: 'day', label: 'Day' },
                    { id: 'week', label: 'Week' },
                    { id: 'month', label: 'Month' },
                    { id: 'year', label: 'Year' },
                  ]}
                  value={segmentedValue}
                  onChange={setSegmentedValue}
                />
              </div>
              <div>
                <Typography variant="overline" style={{ marginBottom: '8px', display: 'block' }}>Size Variants</Typography>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                  <SegmentedControl
                    size="small"
                    options={[
                      { id: 'a', label: 'Small' },
                      { id: 'b', label: 'Option' },
                    ]}
                    value="a"
                    onChange={() => {}}
                  />
                  <SegmentedControl
                    size="default"
                    options={[
                      { id: 'a', label: 'Default' },
                      { id: 'b', label: 'Option' },
                    ]}
                    value="a"
                    onChange={() => {}}
                  />
                  <SegmentedControl
                    size="large"
                    options={[
                      { id: 'a', label: 'Large' },
                      { id: 'b', label: 'Option' },
                    ]}
                    value="a"
                    onChange={() => {}}
                  />
                </div>
              </div>
              <div>
                <Typography variant="overline" style={{ marginBottom: '8px', display: 'block' }}>Full Width</Typography>
                <SegmentedControl
                  fullWidth
                  options={[
                    { id: 'opt1', label: 'Option 1' },
                    { id: 'opt2', label: 'Option 2' },
                    { id: 'opt3', label: 'Option 3' },
                  ]}
                  value="opt1"
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        );

      case 'table':
        return (
          <div style={styles.exampleContent}>
            <Table
              columns={[
                { key: 'name', label: 'Name', sortable: true },
                { key: 'email', label: 'Email' },
                { key: 'role', label: 'Role' },
                { key: 'status', label: 'Status', render: (value) => (
                  <Chip 
                    label={value as string} 
                    type="attribute"
                  />
                )},
              ]}
              data={[
                { id: '1', name: 'Alex Johnson', email: 'alex@example.com', role: 'Admin', status: 'Active' },
                { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', role: 'User', status: 'Active' },
                { id: '3', name: 'Mike Roberts', email: 'mike@example.com', role: 'User', status: 'Pending' },
              ]}
              rowKey="id"
              hoverable
            />
          </div>
        );

      case 'tooltip':
        return (
          <div style={styles.exampleContent}>
            <div style={styles.exampleRow}>
              <Tooltip content="This is a tooltip" placement="top">
                <Button variant="secondary">Hover me (top)</Button>
              </Tooltip>
              <Tooltip content="Bottom tooltip" placement="bottom">
                <Button variant="secondary">Hover me (bottom)</Button>
              </Tooltip>
              <Tooltip content="Left tooltip" placement="left">
                <Button variant="secondary">Hover me (left)</Button>
              </Tooltip>
              <Tooltip content="Right tooltip" placement="right">
                <Button variant="secondary">Hover me (right)</Button>
              </Tooltip>
            </div>
            <div style={styles.exampleRow}>
              <Tooltip 
                content="This tooltip has a longer content that wraps to multiple lines to show how it handles text."
                placement="top"
                maxWidth={200}
              >
                <Button variant="tertiary">Long content tooltip</Button>
              </Tooltip>
            </div>
          </div>
        );

      case 'popover':
        return (
          <div style={styles.exampleContent}>
            <div style={styles.exampleRow}>
              <Popover
                content={
                  <div style={{ padding: '8px', minWidth: '150px' }}>
                    <Button variant="tertiary" fullWidth style={{ justifyContent: 'flex-start' }}>Edit</Button>
                    <Button variant="tertiary" fullWidth style={{ justifyContent: 'flex-start' }}>Duplicate</Button>
                    <Button variant="tertiary" fullWidth style={{ justifyContent: 'flex-start', color: systemColors.light['content-failure'] }}>Delete</Button>
                  </div>
                }
                placement="bottom-start"
              >
                <Button variant="secondary">Click for menu</Button>
              </Popover>
              
              <Popover
                content={
                  <div style={{ padding: '12px' }}>
                    <p style={{ margin: 0, fontSize: '14px', color: referenceColors.gray['70'] }}>
                      This popover appears on hover
                    </p>
                  </div>
                }
                trigger="hover"
                placement="bottom"
              >
                <Button variant="secondary">Hover for info</Button>
              </Popover>
            </div>
            <div style={styles.interactiveBox}>
              <h4 style={styles.interactiveLabel}>Controlled popover:</h4>
              <Popover
                content={
                  <div style={{ padding: '12px' }}>
                    <p style={{ margin: '0 0 12px 0', fontSize: '14px' }}>Controlled popover content</p>
                    <Button variant="primary" size="small" onClick={() => setIsPopoverOpen(false)}>
                      Close
                    </Button>
                  </div>
                }
                isOpen={isPopoverOpen}
                onOpenChange={setIsPopoverOpen}
              >
                <Button variant="primary" onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                  {isPopoverOpen ? 'Close popover' : 'Open popover'}
                </Button>
              </Popover>
            </div>
          </div>
        );

      // Phase 2: Core Components
      case 'loadingindicator':
        return (
          <div style={styles.exampleContent}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <Typography variant="overline" style={{ marginBottom: '8px', display: 'block' }}>Contextual Spinner</Typography>
                <div style={styles.exampleRow}>
                  <LoadingIndicator.Contextual size="xs" />
                  <LoadingIndicator.Contextual size="s" />
                  <LoadingIndicator.Contextual size="m" />
                  <LoadingIndicator.Contextual size="l" />
                  <LoadingIndicator.Contextual size="xl" />
                </div>
                <div style={{ ...styles.exampleRow, marginTop: '8px' }}>
                  <span style={{ fontSize: '12px', color: systemColors.light['content-secondary'] }}>xs (12px)</span>
                  <span style={{ fontSize: '12px', color: systemColors.light['content-secondary'] }}>s (16px)</span>
                  <span style={{ fontSize: '12px', color: systemColors.light['content-secondary'] }}>m (24px)</span>
                  <span style={{ fontSize: '12px', color: systemColors.light['content-secondary'] }}>l (32px)</span>
                  <span style={{ fontSize: '12px', color: systemColors.light['content-secondary'] }}>xl (48px)</span>
                </div>
              </div>
              <div>
                <Typography variant="overline" style={{ marginBottom: '8px', display: 'block' }}>Skeleton / Shimmer</Typography>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '320px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <LoadingIndicator.Skeleton variant="circular" width={40} height={40} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                      <LoadingIndicator.Skeleton variant="text" width="60%" />
                      <LoadingIndicator.Skeleton variant="text" width="80%" />
                    </div>
                  </div>
                  <LoadingIndicator.Skeleton variant="rounded" width="100%" height={120} />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <LoadingIndicator.Skeleton variant="rectangular" width={80} height={24} />
                    <LoadingIndicator.Skeleton variant="rectangular" width={80} height={24} />
                    <LoadingIndicator.Skeleton variant="rectangular" width={80} height={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'avatar':
        return (
          <div style={styles.exampleContent}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <Typography variant="overline" style={{ marginBottom: '8px', display: 'block' }}>Size Variants</Typography>
                <div style={styles.exampleRow}>
                  <Avatar name="Alice Brown" size="xs" />
                  <Avatar name="Bob Chen" size="s" />
                  <Avatar name="Carol Davis" size="m" />
                  <Avatar name="Dan Evans" size="l" />
                  <Avatar name="Eve Foster" size="xl" />
                  <Avatar name="Frank Green" size="xxl" />
                </div>
              </div>
              <div>
                <Typography variant="overline" style={{ marginBottom: '8px', display: 'block' }}>With Name and Badge</Typography>
                <div style={styles.exampleRow}>
                  <Avatar name="Grace Hill" showName />
                  <Avatar name="Henry Irwin" showName badgeValue={5} />
                  <Avatar name="Iris James" showName showBadge />
                </div>
              </div>
              <div>
                <Typography variant="overline" style={{ marginBottom: '8px', display: 'block' }}>Avatar Group (Stacked)</Typography>
                <AvatarGroup
                  avatars={[
                    { name: 'John Doe' },
                    { name: 'Jane Smith' },
                    { name: 'Bob Wilson' },
                    { name: 'Alice Brown' },
                    { name: 'Charlie Davis' },
                    { name: 'Eve Foster' },
                  ]}
                  max={4}
                  size="m"
                />
              </div>
              <div>
                <Typography variant="overline" style={{ marginBottom: '8px', display: 'block' }}>Avatar Group Sizes</Typography>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <AvatarGroup
                    avatars={[
                      { name: 'User A' },
                      { name: 'User B' },
                      { name: 'User C' },
                    ]}
                    max={3}
                    size="s"
                  />
                  <AvatarGroup
                    avatars={[
                      { name: 'User A' },
                      { name: 'User B' },
                      { name: 'User C' },
                      { name: 'User D' },
                      { name: 'User E' },
                    ]}
                    max={3}
                    size="m"
                  />
                  <AvatarGroup
                    avatars={[
                      { name: 'User A' },
                      { name: 'User B' },
                      { name: 'User C' },
                    ]}
                    max={3}
                    size="l"
                  />
                </div>
              </div>
              <div>
                <Typography variant="overline" style={{ marginBottom: '8px', display: 'block' }}>Disabled</Typography>
                <div style={styles.exampleRow}>
                  <Avatar name="Kevin Lee" disabled />
                </div>
              </div>
            </div>
          </div>
        );

      case 'card':
        return (
          <div style={styles.exampleContent}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <Card>
                <Card.Header title="Basic Card" subtitle="With header and body" />
                <Card.Body>
                  <p style={{ margin: 0, color: referenceColors.gray['70'] }}>Card content goes here.</p>
                </Card.Body>
              </Card>
              <Card interactive onClick={() => alert('Card clicked!')}>
                <Card.Header title="Interactive Card" />
                <Card.Body>
                  <p style={{ margin: 0, color: referenceColors.gray['70'] }}>Click me!</p>
                </Card.Body>
              </Card>
              <Card isSelected>
                <Card.Header title="Selected Card" />
                <Card.Body>
                  <p style={{ margin: 0, color: referenceColors.gray['70'] }}>This card is selected.</p>
                </Card.Body>
                <Card.Footer>
                  <Button variant="secondary" size="small">Cancel</Button>
                  <Button variant="primary" size="small">Save</Button>
                </Card.Footer>
              </Card>
              <Card isDisabled>
                <Card.Header title="Disabled Card" />
                <Card.Body>
                  <p style={{ margin: 0, color: referenceColors.gray['70'] }}>This card is disabled.</p>
                </Card.Body>
              </Card>
            </div>
          </div>
        );

      case 'typography':
        return (
          <div style={styles.exampleContent}>
            <div style={styles.exampleColumn}>
              <Typography variant="headline-large">Headline Large (32px)</Typography>
              <Typography variant="page-title">Page Title (24px)</Typography>
              <Typography variant="modal-title">Modal Title (20px)</Typography>
              <Typography variant="section-label">Section Label (18px)</Typography>
              <Typography variant="content-label">Content Label (16px)</Typography>
              <Typography variant="body-large">Body Large (16px)</Typography>
              <Typography variant="body-normal">Body Normal (14px)</Typography>
              <Typography variant="footnote" color="gray">Footnote (12px)</Typography>
              <Typography variant="overline" color="gray-light">OVERLINE (12px)</Typography>
            </div>
            <div style={styles.exampleRow}>
              <Typography variant="body-normal" color="accent">Accent color</Typography>
              <Typography variant="body-normal" color="success">Success color</Typography>
              <Typography variant="body-normal" color="warning">Warning color</Typography>
              <Typography variant="body-normal" color="failure">Failure color</Typography>
            </div>
          </div>
        );

      case 'divider':
        return (
          <div style={styles.exampleContent}>
            <div style={styles.exampleColumn}>
              <p style={{ margin: 0, color: referenceColors.gray['70'] }}>Content above divider</p>
              <Divider />
              <p style={{ margin: 0, color: referenceColors.gray['70'] }}>Content below divider</p>
            </div>
            <div style={styles.exampleColumn}>
              <p style={{ margin: 0, color: referenceColors.gray['70'] }}>With spacing="m"</p>
              <Divider spacing="m" />
              <p style={{ margin: 0, color: referenceColors.gray['70'] }}>More space around</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '40px' }}>
              <span>Item 1</span>
              <Divider vertical />
              <span>Item 2</span>
              <Divider vertical />
              <span>Item 3</span>
            </div>
          </div>
        );

      case 'link':
        return (
          <div style={styles.exampleContent}>
            <div style={styles.exampleRow}>
              <Link href="#">Default Link</Link>
              <Link href="#" color="black">Black Link</Link>
              <Link href="#" color="gray">Gray Link</Link>
            </div>
            <div style={styles.exampleRow}>
              <Link href="#" size="small">Small Link</Link>
              <Link href="#">Default Size</Link>
              <Link href="#" size="large">Large Link</Link>
            </div>
            <div style={styles.exampleRow}>
              <Link href="https://example.com" target="_blank" external>External Link</Link>
              <Link href="#" disabled>Disabled Link</Link>
              <Link href="#" noUnderline>No underline on hover</Link>
            </div>
          </div>
        );

      // Phase 3: Interactive Components
      case 'accordion':
        return (
          <div style={styles.exampleContent}>
            <Accordion defaultExpanded={0}>
              <Accordion.Item title="What is Radiant?">
                Radiant is ThoughtSpot's design system providing reusable components and design tokens.
              </Accordion.Item>
              <Accordion.Item title="How do I get started?">
                Import components from the component library and use design tokens for consistent styling.
              </Accordion.Item>
              <Accordion.Item title="Is it customizable?" disabled>
                This item is disabled.
              </Accordion.Item>
            </Accordion>
            <div style={{ marginTop: '24px' }}>
              <h4 style={styles.interactiveLabel}>Bordered variant:</h4>
              <Accordion variant="bordered" allowMultiple>
                <Accordion.Item title="Section 1">Content for section 1</Accordion.Item>
                <Accordion.Item title="Section 2">Content for section 2</Accordion.Item>
              </Accordion>
            </div>
          </div>
        );

      case 'menu':
        return (
          <div style={styles.exampleContent}>
            <div style={{ display: 'flex', gap: '24px' }}>
              <div>
                <h4 style={styles.interactiveLabel}>Basic Menu:</h4>
                <Menu>
                  <Menu.Item onClick={() => alert('Edit')}>Edit</Menu.Item>
                  <Menu.Item onClick={() => alert('Duplicate')}>Duplicate</Menu.Item>
                  <Menu.Item shortcut="Cmd+S">Save</Menu.Item>
                  <Menu.Divider />
                  <Menu.Item danger onClick={() => alert('Delete')}>Delete</Menu.Item>
                </Menu>
              </div>
              <div>
                <h4 style={styles.interactiveLabel}>With Groups:</h4>
                <Menu>
                  <Menu.Group label="Actions">
                    <Menu.Item active>Copy</Menu.Item>
                    <Menu.Item>Paste</Menu.Item>
                  </Menu.Group>
                  <Menu.Divider />
                  <Menu.Group label="Other">
                    <Menu.Item disabled>Disabled item</Menu.Item>
                    <Menu.Item>Settings</Menu.Item>
                  </Menu.Group>
                </Menu>
              </div>
            </div>
          </div>
        );

      case 'pagination':
        return (
          <div style={styles.exampleContent}>
            <div style={styles.exampleColumn}>
              <h4 style={styles.interactiveLabel}>Numbers:</h4>
              <Pagination.Numbers
                currentPage={paginationPage}
                totalPages={10}
                onPageChange={setPaginationPage}
              />
            </div>
            <div style={styles.exampleColumn}>
              <h4 style={styles.interactiveLabel}>Dots (for carousels):</h4>
              <Pagination.Dots
                currentPage={paginationPage}
                totalPages={5}
                onPageChange={setPaginationPage}
              />
            </div>
            <div style={styles.exampleColumn}>
              <h4 style={styles.interactiveLabel}>Range:</h4>
              <Pagination.Range
                currentPage={paginationPage}
                totalPages={10}
                itemsPerPage={20}
                totalItems={195}
                onPageChange={setPaginationPage}
              />
            </div>
          </div>
        );

      case 'progressbar':
        return (
          <div style={styles.exampleContent}>
            <div style={styles.exampleColumn}>
              <ProgressBar value={progressValue} label="Upload Progress" showValue />
              <ProgressBar value={75} color="blue" />
              <ProgressBar value={40} color="yellow" size="small" />
              <ProgressBar value={90} color="red" size="large" />
            </div>
            <div style={styles.exampleColumn}>
              <h4 style={styles.interactiveLabel}>Indeterminate:</h4>
              <ProgressBar value={0} indeterminate color="blue" />
            </div>
            <div style={styles.interactiveBox}>
              <h4 style={styles.interactiveLabel}>Interactive: {progressValue}%</h4>
              <input
                type="range"
                min="0"
                max="100"
                value={progressValue}
                onChange={(e) => setProgressValue(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        );

      case 'stepper':
        return (
          <div style={styles.exampleContent}>
            <div style={styles.exampleColumn}>
              <h4 style={styles.interactiveLabel}>Horizontal:</h4>
              <Stepper
                steps={[
                  { title: 'Account' },
                  { title: 'Profile' },
                  { title: 'Review' },
                  { title: 'Complete' },
                ]}
                currentStep={stepperStep}
                onStepClick={setStepperStep}
              />
            </div>
            <div style={{ marginTop: '32px' }}>
              <h4 style={styles.interactiveLabel}>Vertical with descriptions:</h4>
              <Stepper
                orientation="vertical"
                steps={[
                  { title: 'Create account', description: 'Enter your email and password' },
                  { title: 'Setup profile', description: 'Add your personal details' },
                  { title: 'Complete', description: 'Review and finish' },
                ]}
                currentStep={stepperStep}
                onStepClick={setStepperStep}
              />
            </div>
            <div style={styles.interactiveBox}>
              <h4 style={styles.interactiveLabel}>Current Step: {stepperStep + 1}</h4>
              <div style={styles.exampleRow}>
                <Button size="small" variant="secondary" onClick={() => setStepperStep(Math.max(0, stepperStep - 1))} disabled={stepperStep === 0}>
                  Previous
                </Button>
                <Button size="small" variant="primary" onClick={() => setStepperStep(Math.min(3, stepperStep + 1))} disabled={stepperStep === 3}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        );

      // Phase 4: Advanced Components
      case 'datepicker':
        return (
          <div style={styles.exampleContent}>
            <div style={{ maxWidth: '280px' }}>
              <DatePicker
                value={selectedDate}
                onChange={setSelectedDate}
                label="Select a date"
                placeholder="MM/DD/YYYY"
              />
            </div>
            <div style={{ maxWidth: '280px' }}>
              <DatePicker
                value={null}
                onChange={() => {}}
                label="With error"
                hasError
                helperText="Please select a valid date"
              />
            </div>
            <div style={styles.interactiveBox}>
              <h4 style={styles.interactiveLabel}>Selected date:</h4>
              <p style={{ margin: 0, color: referenceColors.gray['70'] }}>
                {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
              </p>
            </div>
          </div>
        );

      case 'icongallery':
        return (
          <div style={styles.exampleContent}>
            <IconGallery size="compact" iconSize="m" />
          </div>
        );

      case 'globalheader':
        return (
          <div style={styles.exampleContent}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <Typography variant="overline" style={{ marginBottom: '8px', display: 'block' }}>Trigger mode (default)</Typography>
                <div style={{ borderRadius: '8px', overflow: 'hidden', border: `1px solid ${referenceColors.gray['20']}` }}>
                  <GlobalHeader
                    userName="Royal Enfield"
                    notificationCount={3}
                    onSearchClick={() => alert('Search clicked — open command palette')}
                    onLogoClick={() => alert('Logo clicked — navigate home')}
                  />
                </div>
              </div>
              <div>
                <Typography variant="overline" style={{ marginBottom: '8px', display: 'block' }}>Input mode</Typography>
                <div style={{ borderRadius: '8px', overflow: 'hidden', border: `1px solid ${referenceColors.gray['20']}` }}>
                  <GlobalHeader
                    searchMode="input"
                    searchPlaceholder="Search library"
                    userName="Acme Corp"
                    showKeyboardHint={false}
                  />
                </div>
              </div>
              <div>
                <Typography variant="overline" style={{ marginBottom: '8px', display: 'block' }}>With hamburger (fullscreen mode)</Typography>
                <div style={{ borderRadius: '8px', overflow: 'hidden', border: `1px solid ${referenceColors.gray['20']}` }}>
                  <GlobalHeader
                    showHamburger
                    onHamburgerClick={() => alert('Hamburger clicked — toggle sidebar overlay')}
                    userName="Demo User"
                    notificationCount={0}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'appsidebar':
        return (
          <div style={styles.exampleContent}>
            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ height: '480px', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${referenceColors.gray['20']}` }}>
                <AppSidebar
                  tabs={[
                    { id: 'insights', label: 'Insights', headerTitle: 'Insights', showAddButton: true },
                    { id: 'data', label: 'Data', headerTitle: 'Data workspace', showAddButton: true },
                    { id: 'develop', label: 'Develop', headerTitle: 'Develop' },
                    { id: 'admin', label: 'Admin', headerTitle: 'Admin' },
                  ]}
                  activeTab="insights"
                  onTabChange={() => {}}
                  categories={{
                    insights: [
                      { title: 'Main', items: [
                        { id: 'Home', label: 'Home' },
                        { id: 'Spotter', label: 'Spotter' },
                        { id: 'Search data', label: 'Search data' },
                      ]},
                      { title: 'Library', items: [
                        { id: 'Liveboards', label: 'Liveboards' },
                        { id: 'Answers', label: 'Answers' },
                        { id: 'Collections', label: 'Collections' },
                      ]},
                      { title: 'Analysis & Alerts', items: [
                        { id: 'Liveboard schedules', label: 'Liveboard schedules' },
                        { id: 'Monitor subscriptions', label: 'Monitor subscriptions' },
                      ]},
                    ],
                    data: [
                      { title: 'Main', items: [
                        { id: 'Data objects', label: 'Data objects' },
                        { id: 'Connections', label: 'Connections' },
                      ]},
                    ],
                    develop: [
                      { title: 'Main', items: [
                        { id: 'Dev Home', label: 'Home' },
                      ]},
                    ],
                    admin: [
                      { title: 'Overview', items: [
                        { id: 'Resource control centre', label: 'Resource control centre' },
                      ]},
                    ],
                  }}
                  selectedNav="Home"
                  onNavSelect={() => {}}
                />
              </div>
            </div>
          </div>
        );

      case 'appshell':
        return (
          <div style={styles.exampleContent}>
            <div style={{ height: '500px', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${referenceColors.gray['20']}`, position: 'relative' }}>
              <AppShell
                headerProps={{
                  userName: 'Demo User',
                  notificationCount: 2,
                  onSearchClick: () => {},
                  onLogoClick: () => {},
                }}
                sidebarProps={{
                  tabs: [
                    { id: 'insights', label: 'Insights', headerTitle: 'Insights', showAddButton: true },
                    { id: 'data', label: 'Data', headerTitle: 'Data workspace' },
                    { id: 'admin', label: 'Admin', headerTitle: 'Admin' },
                  ],
                  activeTab: 'insights',
                  onTabChange: () => {},
                  categories: {
                    insights: [
                      { title: 'Main', items: [
                        { id: 'Home', label: 'Home' },
                        { id: 'Spotter', label: 'Spotter' },
                      ]},
                      { title: 'Library', items: [
                        { id: 'Liveboards', label: 'Liveboards' },
                        { id: 'Answers', label: 'Answers' },
                      ]},
                    ],
                    data: [
                      { title: 'Main', items: [{ id: 'Data objects', label: 'Data objects' }] },
                    ],
                    admin: [
                      { title: 'Overview', items: [{ id: 'Resource control centre', label: 'Resource control centre' }] },
                    ],
                  },
                  selectedNav: 'Home',
                  onNavSelect: () => {},
                }}
              >
                <div style={{ padding: '32px' }}>
                  <Typography variant="page-title">Home</Typography>
                  <Typography variant="body-normal" color="gray" style={{ marginTop: '8px' }}>
                    This is the main content area rendered inside the AppShell. The header and sidebar are composed automatically.
                  </Typography>
                </div>
              </AppShell>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.breadcrumb}>
          <span style={styles.breadcrumbItem}>Components</span>
          <span style={styles.breadcrumbSeparator}>/</span>
          <span style={styles.breadcrumbCurrent}>{doc.name}</span>
        </div>
        <h1 style={styles.title}>{doc.name}</h1>
        <p style={styles.description}>{doc.description}</p>
      </div>

      {/* Live Example */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Live Example</h2>
        <div style={styles.exampleBox}>
          {renderExample()}
        </div>
      </section>

      {/* Props Table */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Props</h2>
        <div style={styles.propsTable}>
          <div style={styles.propsHeader}>
            <div style={styles.propName}>Prop</div>
            <div style={styles.propType}>Type</div>
            <div style={styles.propDefault}>Default</div>
            <div style={styles.propDescription}>Description</div>
          </div>
          {doc.props.map((prop) => (
            <div key={prop.name} style={styles.propsRow}>
              <div style={styles.propName}>
                <code style={styles.propCode}>{prop.name}</code>
              </div>
              <div style={styles.propType}>
                <code style={styles.typeCode}>{prop.type}</code>
              </div>
              <div style={styles.propDefault}>
                {prop.default ? <code style={styles.defaultCode}>{prop.default}</code> : '—'}
              </div>
              <div style={styles.propDescription}>{prop.description}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '1000px',
  },
  header: {
    marginBottom: '40px',
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  breadcrumbItem: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    color: systemColors.light['content-tertiary'],
  },
  breadcrumbSeparator: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    color: referenceColors.gray['30'],
  },
  breadcrumbCurrent: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    color: systemColors.light['content-primary'],
    fontWeight: 500,
  },
  title: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '36px',
    fontWeight: 700,
    color: systemColors.light['content-primary'],
    marginBottom: '12px',
  },
  description: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: '26px',
    maxWidth: '700px',
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '20px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: '16px',
  },
  exampleBox: {
    padding: '32px',
    background: systemColors.light['background-base'],
    border: `1px solid ${systemColors.light['background-subtle']}`,
    borderRadius: '12px',
  },
  exampleContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  exampleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  exampleColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  interactiveBox: {
    padding: '20px',
    background: systemColors.light['background-sunken'],
    borderRadius: '8px',
    marginTop: '8px',
  },
  interactiveLabel: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 600,
    color: systemColors.light['content-tertiary'],
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '12px',
  },
  propsTable: {
    background: systemColors.light['background-base'],
    border: `1px solid ${systemColors.light['background-subtle']}`,
    borderRadius: '12px',
    overflow: 'hidden',
  },
  propsHeader: {
    display: 'grid',
    gridTemplateColumns: '140px 200px 100px 1fr',
    padding: '14px 20px',
    background: systemColors.light['background-sunken'],
    borderBottom: `1px solid ${systemColors.light['background-subtle']}`,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '11px',
    fontWeight: 600,
    color: systemColors.light['content-tertiary'],
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  propsRow: {
    display: 'grid',
    gridTemplateColumns: '140px 200px 100px 1fr',
    padding: '14px 20px',
    borderBottom: `1px solid ${systemColors.light['background-sunken']}`,
    alignItems: 'flex-start',
  },
  propName: {},
  propType: {},
  propDefault: {},
  propDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    color: systemColors.light['content-secondary'],
    lineHeight: '20px',
  },
  propCode: {
    fontFamily: '"SF Mono", Monaco, Inconsolata, monospace',
    fontSize: '13px',
    fontWeight: 500,
    color: systemColors.light['content-brand'],
  },
  typeCode: {
    fontFamily: '"SF Mono", Monaco, Inconsolata, monospace',
    fontSize: '12px',
    color: referenceColors.gray['70'],
    background: systemColors.light['background-sunken'],
    padding: '2px 6px',
    borderRadius: '4px',
  },
  defaultCode: {
    fontFamily: '"SF Mono", Monaco, Inconsolata, monospace',
    fontSize: '12px',
    color: systemColors.light['content-success'],
  },
};

export default ComponentDocPage;
