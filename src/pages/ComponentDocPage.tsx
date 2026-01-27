import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { Radio } from '../components/Radio';
import { Toggle } from '../components/Toggle';
import { TextInput } from '../components/TextInput';
import { SearchInput } from '../components/SearchInput';
import { Chip } from '../components/Chip';
import { Alert } from '../components/Alert';
import { Modal } from '../components/Modal';
import { Tabs } from '../components/Tabs';
import { Select } from '../components/Select';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { WizardModal } from '../components/WizardModal';
import { FormModal } from '../components/FormModal';
import { FilterDialog } from '../components/FilterDialog';
import { Popover, PopoverMenu, PopoverMenuItem } from '../components/Popover';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { brandColors } from '../tokens/colors/brand';

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
    description: 'A dropdown selection component with optional search functionality. Supports single selection with keyboard navigation.',
    props: [
      { name: 'options', type: 'Array<{ id: string, label: string, value?: string }>', description: 'Array of options to display' },
      { name: 'value', type: 'string', description: 'Currently selected value' },
      { name: 'onChange', type: '(value: string, option: SelectOption) => void', description: 'Handler when selection changes' },
      { name: 'placeholder', type: 'string', default: "'Select an option'", description: 'Placeholder text when no selection' },
      { name: 'label', type: 'string', description: 'Label text above the select' },
      { name: 'searchable', type: 'boolean', default: 'false', description: 'Whether to show search input in dropdown' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the select is disabled' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Whether the select has an error' },
      { name: 'errorMessage', type: 'string', description: 'Error message to display' },
    ],
  },
  confirmdialog: {
    name: 'ConfirmDialog',
    description: 'A confirmation dialog for user actions that require explicit confirmation. Supports status variants for different action types.',
    props: [
      { name: 'isOpen', type: 'boolean', description: 'Whether the dialog is open' },
      { name: 'title', type: 'string', description: 'Dialog title' },
      { name: 'message', type: 'string | ReactNode', description: 'Dialog message/description' },
      { name: 'confirmText', type: 'string', default: "'Confirm'", description: 'Text for the confirm button' },
      { name: 'cancelText', type: 'string', default: "'Cancel'", description: 'Text for the cancel button' },
      { name: 'onConfirm', type: '() => void', description: 'Handler for confirm action' },
      { name: 'onCancel', type: '() => void', description: 'Handler for cancel action' },
      { name: 'status', type: "'info' | 'warning' | 'danger' | 'success'", default: "'info'", description: 'Status type affecting icon and styling' },
      { name: 'isLoading', type: 'boolean', default: 'false', description: 'Whether confirm button shows loading state' },
    ],
  },
  wizardmodal: {
    name: 'WizardModal',
    description: 'A multi-step wizard modal for complex workflows. Supports step navigation, validation, and progress indication.',
    props: [
      { name: 'isOpen', type: 'boolean', description: 'Whether the wizard is open' },
      { name: 'onClose', type: '() => void', description: 'Handler to close the wizard' },
      { name: 'title', type: 'string', description: 'Wizard title' },
      { name: 'steps', type: 'WizardStep[]', description: 'Array of wizard steps with id, title, and content' },
      { name: 'onComplete', type: '() => void', description: 'Handler called when wizard is completed' },
      { name: 'showProgress', type: 'boolean', default: 'true', description: 'Whether to show progress bar' },
      { name: 'isLoading', type: 'boolean', default: 'false', description: 'Whether content is loading' },
      { name: 'error', type: 'string', description: 'Error message to display' },
    ],
  },
  formmodal: {
    name: 'FormModal',
    description: 'A modal optimized for form content with validation and submission handling.',
    props: [
      { name: 'isOpen', type: 'boolean', description: 'Whether the modal is open' },
      { name: 'onClose', type: '() => void', description: 'Handler to close the modal' },
      { name: 'title', type: 'string', description: 'Modal title' },
      { name: 'children', type: 'ReactNode', description: 'Form content' },
      { name: 'onSubmit', type: '() => void', description: 'Handler called when form is submitted' },
      { name: 'submitText', type: 'string', default: "'Save'", description: 'Submit button text' },
      { name: 'isSubmitting', type: 'boolean', default: 'false', description: 'Whether the form is submitting' },
      { name: 'isSubmitDisabled', type: 'boolean', default: 'false', description: 'Whether submit is disabled' },
      { name: 'error', type: 'string', description: 'Error message to display' },
    ],
  },
  filterdialog: {
    name: 'FilterDialog',
    description: 'A modal dialog for filter selection with checkboxes, search, and quick actions.',
    props: [
      { name: 'isOpen', type: 'boolean', description: 'Whether the dialog is open' },
      { name: 'onClose', type: '() => void', description: 'Handler to close the dialog' },
      { name: 'title', type: 'string', description: 'Dialog title' },
      { name: 'options', type: 'FilterOption[]', description: 'Array of filter options with id and label' },
      { name: 'selectedIds', type: 'string[]', description: 'Currently selected option IDs' },
      { name: 'onApply', type: '(selectedIds: string[]) => void', description: 'Handler when filter is applied' },
      { name: 'showSelectAll', type: 'boolean', default: 'true', description: 'Whether to show Select All button' },
      { name: 'showSelectedCount', type: 'boolean', default: 'true', description: 'Whether to show selected count' },
    ],
  },
  popover: {
    name: 'Popover',
    description: 'A floating overlay component for contextual content like menus, tooltips, or additional information.',
    props: [
      { name: 'trigger', type: 'ReactNode', description: 'Element that triggers the popover' },
      { name: 'children', type: 'ReactNode', description: 'Content to display in the popover' },
      { name: 'placement', type: 'PopoverPlacement', default: "'bottom'", description: 'Popover placement relative to trigger' },
      { name: 'triggerType', type: "'click' | 'hover'", default: "'click'", description: 'How to trigger the popover' },
      { name: 'isOpen', type: 'boolean', description: 'Whether popover is open (controlled mode)' },
      { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback when popover opens/closes' },
      { name: 'hasArrow', type: 'boolean', default: 'false', description: 'Whether to show arrow pointer' },
      { name: 'offset', type: 'number', default: '8', description: 'Offset from trigger in pixels' },
    ],
  },
  loadingindicator: {
    name: 'LoadingIndicator',
    description: 'A spinning loader indicator for async operations. Includes LoadingOverlay for content loading states.',
    props: [
      { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: 'Size of the spinner' },
      { name: 'text', type: 'string', description: 'Loading text to display' },
      { name: 'centered', type: 'boolean', default: 'false', description: 'Whether to center in container' },
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
  // New component states
  const [selectValue, setSelectValue] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState<'info' | 'warning' | 'danger' | 'success'>('info');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['opt1']);

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
              <p style={{ margin: 0, color: brandColors.gray[70] }}>
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
            <div style={{ marginTop: '16px', padding: '16px', background: brandColors.gray[10], borderRadius: '8px' }}>
              Content for {activeTab}
            </div>
          </div>
        );
      
      case 'select':
        return (
          <div style={styles.exampleContent}>
            <div style={styles.exampleRow}>
              <Select
                label="Country"
                placeholder="Select a country"
                options={[
                  { id: 'us', label: 'United States' },
                  { id: 'uk', label: 'United Kingdom' },
                  { id: 'ca', label: 'Canada' },
                  { id: 'au', label: 'Australia' },
                ]}
                value={selectValue}
                onChange={(value) => setSelectValue(value)}
              />
              <Select
                label="Searchable"
                placeholder="Search..."
                searchable
                options={[
                  { id: 'opt1', label: 'Option 1' },
                  { id: 'opt2', label: 'Option 2' },
                  { id: 'opt3', label: 'Option 3' },
                ]}
                value=""
                onChange={() => {}}
              />
            </div>
            <div style={styles.exampleRow}>
              <Select
                label="Disabled"
                placeholder="Cannot select"
                disabled
                options={[{ id: 'opt', label: 'Option' }]}
                value=""
                onChange={() => {}}
              />
              <Select
                label="Error"
                placeholder="Select required"
                error
                errorMessage="This field is required"
                options={[{ id: 'opt', label: 'Option' }]}
                value=""
                onChange={() => {}}
              />
            </div>
          </div>
        );
      
      case 'confirmdialog':
        return (
          <div style={styles.exampleContent}>
            <div style={styles.exampleRow}>
              <Button variant="primary" onClick={() => { setConfirmStatus('info'); setIsConfirmOpen(true); }}>
                Info Dialog
              </Button>
              <Button variant="secondary" onClick={() => { setConfirmStatus('warning'); setIsConfirmOpen(true); }}>
                Warning Dialog
              </Button>
              <Button variant="secondary" onClick={() => { setConfirmStatus('danger'); setIsConfirmOpen(true); }}>
                Danger Dialog
              </Button>
              <Button variant="secondary" onClick={() => { setConfirmStatus('success'); setIsConfirmOpen(true); }}>
                Success Dialog
              </Button>
            </div>
            <ConfirmDialog
              isOpen={isConfirmOpen}
              title={`${confirmStatus.charAt(0).toUpperCase() + confirmStatus.slice(1)} Confirmation`}
              message="Are you sure you want to proceed with this action? This is a sample confirmation dialog."
              status={confirmStatus}
              onConfirm={() => setIsConfirmOpen(false)}
              onCancel={() => setIsConfirmOpen(false)}
            />
          </div>
        );
      
      case 'wizardmodal':
        return (
          <div style={styles.exampleContent}>
            <Button variant="primary" onClick={() => setIsWizardOpen(true)}>
              Open Wizard
            </Button>
            <WizardModal
              isOpen={isWizardOpen}
              onClose={() => setIsWizardOpen(false)}
              title="Setup Wizard"
              steps={[
                { id: 'step1', title: 'Step 1: Basic Info', content: <div style={{ padding: '20px' }}>Enter your basic information here.</div> },
                { id: 'step2', title: 'Step 2: Preferences', content: <div style={{ padding: '20px' }}>Configure your preferences.</div> },
                { id: 'step3', title: 'Step 3: Review', content: <div style={{ padding: '20px' }}>Review and confirm your settings.</div> },
              ]}
              onComplete={() => setIsWizardOpen(false)}
              showProgress
            />
          </div>
        );
      
      case 'formmodal':
        return (
          <div style={styles.exampleContent}>
            <Button variant="primary" onClick={() => setIsFormModalOpen(true)}>
              Open Form Modal
            </Button>
            <FormModal
              isOpen={isFormModalOpen}
              onClose={() => setIsFormModalOpen(false)}
              title="Create New Item"
              onSubmit={() => setIsFormModalOpen(false)}
              submitText="Create"
            >
              <TextInput label="Name" placeholder="Enter name..." value="" onChange={() => {}} />
              <TextInput label="Description" placeholder="Enter description..." value="" onChange={() => {}} />
            </FormModal>
          </div>
        );
      
      case 'filterdialog':
        return (
          <div style={styles.exampleContent}>
            <div style={styles.exampleRow}>
              <Button variant="primary" onClick={() => setIsFilterOpen(true)}>
                Open Filter Dialog
              </Button>
              <span style={{ color: brandColors.gray[50], fontSize: '14px' }}>
                Selected: {selectedFilters.length > 0 ? selectedFilters.join(', ') : 'None'}
              </span>
            </div>
            <FilterDialog
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              title="Filter by Category"
              options={[
                { id: 'opt1', label: 'Electronics' },
                { id: 'opt2', label: 'Clothing' },
                { id: 'opt3', label: 'Home & Garden' },
                { id: 'opt4', label: 'Sports' },
                { id: 'opt5', label: 'Books' },
              ]}
              selectedIds={selectedFilters}
              onApply={setSelectedFilters}
            />
          </div>
        );
      
      case 'popover':
        return (
          <div style={styles.exampleContent}>
            <div style={styles.exampleRow}>
              <Popover
                trigger={<Button variant="primary">Click Menu</Button>}
                placement="bottom-start"
              >
                <PopoverMenu>
                  <PopoverMenuItem onClick={() => alert('Edit')}>Edit</PopoverMenuItem>
                  <PopoverMenuItem onClick={() => alert('Duplicate')}>Duplicate</PopoverMenuItem>
                  <PopoverMenuItem onClick={() => alert('Delete')} danger>Delete</PopoverMenuItem>
                </PopoverMenu>
              </Popover>
              <Popover
                trigger={<Button variant="secondary">Hover Me</Button>}
                triggerType="hover"
                placement="top"
              >
                <div style={{ padding: '12px 16px', maxWidth: '200px' }}>
                  <p style={{ margin: 0, fontSize: '14px', color: brandColors.gray[70] }}>
                    This is a hover popover with some helpful information.
                  </p>
                </div>
              </Popover>
            </div>
          </div>
        );
      
      case 'loadingindicator':
        return (
          <div style={styles.exampleContent}>
            <div style={styles.exampleRow}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <LoadingIndicator size="small" />
                <LoadingIndicator size="medium" />
                <LoadingIndicator size="large" />
              </div>
            </div>
            <div style={styles.exampleRow}>
              <LoadingIndicator size="medium" text="Loading data..." />
            </div>
            <div style={{ marginTop: '16px', padding: '24px', background: brandColors.gray[10], borderRadius: '8px' }}>
              <LoadingIndicator size="large" text="Fetching results..." centered />
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
    color: brandColors.gray[50],
  },
  breadcrumbSeparator: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    color: brandColors.gray[30],
  },
  breadcrumbCurrent: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    color: brandColors.gray[90],
    fontWeight: 500,
  },
  title: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '36px',
    fontWeight: 700,
    color: brandColors.gray[90],
    marginBottom: '12px',
  },
  description: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    color: brandColors.gray[60],
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
    color: brandColors.gray[90],
    marginBottom: '16px',
  },
  exampleBox: {
    padding: '32px',
    background: brandColors.white,
    border: `1px solid ${brandColors.gray[20]}`,
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
    background: brandColors.gray[10],
    borderRadius: '8px',
    marginTop: '8px',
  },
  interactiveLabel: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 600,
    color: brandColors.gray[50],
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '12px',
  },
  propsTable: {
    background: brandColors.white,
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: '12px',
    overflow: 'hidden',
  },
  propsHeader: {
    display: 'grid',
    gridTemplateColumns: '140px 200px 100px 1fr',
    padding: '14px 20px',
    background: brandColors.gray[10],
    borderBottom: `1px solid ${brandColors.gray[20]}`,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '11px',
    fontWeight: 600,
    color: brandColors.gray[50],
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  propsRow: {
    display: 'grid',
    gridTemplateColumns: '140px 200px 100px 1fr',
    padding: '14px 20px',
    borderBottom: `1px solid ${brandColors.gray[10]}`,
    alignItems: 'flex-start',
  },
  propName: {},
  propType: {},
  propDefault: {},
  propDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    color: brandColors.gray[60],
    lineHeight: '20px',
  },
  propCode: {
    fontFamily: '"SF Mono", Monaco, Inconsolata, monospace',
    fontSize: '13px',
    fontWeight: 500,
    color: brandColors.blue[60],
  },
  typeCode: {
    fontFamily: '"SF Mono", Monaco, Inconsolata, monospace',
    fontSize: '12px',
    color: brandColors.gray[70],
    background: brandColors.gray[10],
    padding: '2px 6px',
    borderRadius: '4px',
  },
  defaultCode: {
    fontFamily: '"SF Mono", Monaco, Inconsolata, monospace',
    fontSize: '12px',
    color: brandColors.green[60],
  },
};

export default ComponentDocPage;
