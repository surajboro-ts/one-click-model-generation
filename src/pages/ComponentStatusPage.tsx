import React, { useState, useMemo } from 'react';
import { brandColors } from '../tokens/colors/brand';
import { SearchInput } from '../components/SearchInput';

interface ComponentStatus {
  name: string;
  source: 'figma' | 'radiant-code' | 'custom';
  status: 'created' | 'partial' | 'planned' | 'not-started';
  category: string;
  notes?: string;
}

const COMPONENTS: ComponentStatus[] = [
  // Design Tokens (from Figma)
  { name: 'Colors', source: 'figma', status: 'created', category: 'Tokens', notes: 'Brand, semantic, alias colors' },
  { name: 'Typography', source: 'figma', status: 'created', category: 'Tokens', notes: 'Font families, sizes, weights' },
  { name: 'Spacing', source: 'figma', status: 'created', category: 'Tokens', notes: 'Spacing scale (4px base)' },
  { name: 'Radius', source: 'figma', status: 'created', category: 'Tokens', notes: 'Border radius scale' },
  { name: 'Shadows', source: 'figma', status: 'created', category: 'Tokens', notes: 'Elevation shadows' },
  { name: 'Borders', source: 'figma', status: 'created', category: 'Tokens', notes: 'Border styles' },
  
  // Core Components (created)
  { name: 'Button', source: 'radiant-code', status: 'created', category: 'Core', notes: 'Primary, secondary, tertiary variants' },
  { name: 'Checkbox', source: 'radiant-code', status: 'created', category: 'Core', notes: 'Checked, indeterminate, disabled states' },
  { name: 'Radio', source: 'radiant-code', status: 'created', category: 'Core', notes: 'Radio button groups' },
  { name: 'Toggle', source: 'radiant-code', status: 'created', category: 'Core', notes: 'Switch component' },
  
  // Input Components (created)
  { name: 'TextInput', source: 'radiant-code', status: 'created', category: 'Inputs', notes: 'Text input with label, error states' },
  { name: 'SearchInput', source: 'radiant-code', status: 'created', category: 'Inputs', notes: 'Search input with icon' },
  { name: 'Select', source: 'radiant-code', status: 'created', category: 'Inputs', notes: 'Dropdown select with search' },
  
  // Feedback Components (created)
  { name: 'Alert', source: 'radiant-code', status: 'created', category: 'Feedback', notes: 'Info, success, warning, error variants' },
  { name: 'Modal', source: 'radiant-code', status: 'created', category: 'Feedback', notes: 'Base modal dialog' },
  { name: 'ConfirmDialog', source: 'radiant-code', status: 'created', category: 'Feedback', notes: 'Confirmation dialog pattern' },
  
  // Modal Patterns (created)
  { name: 'WizardModal', source: 'radiant-code', status: 'created', category: 'Modal Patterns', notes: 'Multi-step wizard' },
  { name: 'FormModal', source: 'radiant-code', status: 'created', category: 'Modal Patterns', notes: 'Form in modal pattern' },
  { name: 'FilterDialog', source: 'radiant-code', status: 'created', category: 'Modal Patterns', notes: 'Filter selection dialog' },
  
  // Overlay Components (created)
  { name: 'Popover', source: 'radiant-code', status: 'created', category: 'Overlay', notes: 'Floating overlay component' },
  { name: 'LoadingIndicator', source: 'radiant-code', status: 'created', category: 'Overlay', notes: 'Spinner and overlay' },
  
  // Navigation (created)
  { name: 'Tabs', source: 'radiant-code', status: 'created', category: 'Navigation', notes: 'Tab navigation' },
  { name: 'Chip', source: 'radiant-code', status: 'created', category: 'Navigation', notes: 'Attribute, measure, filter chips' },
  { name: 'Sidebar', source: 'custom', status: 'created', category: 'Navigation', notes: 'Navigation sidebar' },
  
  // Not yet created (from radiant-code)
  { name: 'Accordion', source: 'radiant-code', status: 'not-started', category: 'Layout' },
  { name: 'ActionMenu', source: 'radiant-code', status: 'not-started', category: 'Menu' },
  { name: 'Avatar', source: 'radiant-code', status: 'not-started', category: 'Data Display' },
  { name: 'Card', source: 'radiant-code', status: 'not-started', category: 'Layout' },
  { name: 'ColorPicker', source: 'radiant-code', status: 'not-started', category: 'Inputs' },
  { name: 'DatePicker', source: 'radiant-code', status: 'not-started', category: 'Inputs' },
  { name: 'Divider', source: 'radiant-code', status: 'not-started', category: 'Layout' },
  { name: 'DragDrop', source: 'radiant-code', status: 'not-started', category: 'Utility' },
  { name: 'DynamicForm', source: 'radiant-code', status: 'not-started', category: 'Forms' },
  { name: 'Grid', source: 'radiant-code', status: 'not-started', category: 'Layout' },
  { name: 'Illustration', source: 'radiant-code', status: 'not-started', category: 'Data Display' },
  { name: 'Link', source: 'radiant-code', status: 'not-started', category: 'Navigation' },
  { name: 'List', source: 'radiant-code', status: 'not-started', category: 'Data Display' },
  { name: 'Menu', source: 'radiant-code', status: 'not-started', category: 'Menu' },
  { name: 'NoData', source: 'radiant-code', status: 'not-started', category: 'Feedback' },
  { name: 'Pagination', source: 'radiant-code', status: 'not-started', category: 'Navigation' },
  { name: 'ProgressBar', source: 'radiant-code', status: 'not-started', category: 'Feedback' },
  { name: 'SegmentControl', source: 'radiant-code', status: 'not-started', category: 'Navigation' },
  { name: 'Stepper', source: 'radiant-code', status: 'not-started', category: 'Navigation' },
  { name: 'Table', source: 'radiant-code', status: 'not-started', category: 'Data Display' },
  { name: 'TextArea', source: 'radiant-code', status: 'not-started', category: 'Inputs' },
  { name: 'Tooltip', source: 'radiant-code', status: 'not-started', category: 'Overlay' },
  { name: 'Tour', source: 'radiant-code', status: 'not-started', category: 'Overlay' },
  { name: 'VerticalStepper', source: 'radiant-code', status: 'not-started', category: 'Navigation' },
  { name: 'Video', source: 'radiant-code', status: 'not-started', category: 'Media' },
  { name: 'Wizard', source: 'radiant-code', status: 'not-started', category: 'Navigation' },
];

const statusColors = {
  'created': { bg: '#E8F5E9', text: '#2E7D32', label: 'Created' },
  'partial': { bg: '#FFF3E0', text: '#E65100', label: 'Partial' },
  'planned': { bg: '#E3F2FD', text: '#1565C0', label: 'Planned' },
  'not-started': { bg: '#F5F5F5', text: '#757575', label: 'Not Started' },
};

const sourceLabels = {
  'figma': 'Figma Reference',
  'radiant-code': 'Radiant Code',
  'custom': 'Custom',
};

export const ComponentStatusPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = [...new Set(COMPONENTS.map(c => c.category))];
    return cats.sort();
  }, []);

  const filteredComponents = useMemo(() => {
    return COMPONENTS.filter(comp => {
      const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (comp.notes?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesStatus = filterStatus === 'all' || comp.status === filterStatus;
      const matchesCategory = filterCategory === 'all' || comp.category === filterCategory;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, filterStatus, filterCategory]);

  const stats = useMemo(() => {
    const created = COMPONENTS.filter(c => c.status === 'created').length;
    const total = COMPONENTS.length;
    return { created, total, percentage: Math.round((created / total) * 100) };
  }, []);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Component Status</h1>
        <p style={styles.description}>
          Track the implementation progress of all components from the radiant-code design system.
        </p>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <span style={styles.statValue}>{stats.created}</span>
          <span style={styles.statLabel}>Created</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statValue}>{stats.total}</span>
          <span style={styles.statLabel}>Total Components</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statValue}>{stats.percentage}%</span>
          <span style={styles.statLabel}>Complete</span>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <div style={styles.searchWrapper}>
          <SearchInput
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          style={styles.select}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="created">Created</option>
          <option value="partial">Partial</option>
          <option value="planned">Planned</option>
          <option value="not-started">Not Started</option>
        </select>
        <select
          style={styles.select}
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div style={styles.tableContainer}>
        <div style={styles.tableHeader}>
          <div style={styles.colName}>Component</div>
          <div style={styles.colCategory}>Category</div>
          <div style={styles.colSource}>Source</div>
          <div style={styles.colStatus}>Status</div>
          <div style={styles.colNotes}>Notes</div>
        </div>
        {filteredComponents.map((comp) => (
          <div key={comp.name} style={styles.tableRow}>
            <div style={styles.colName}>
              <span style={styles.componentName}>{comp.name}</span>
            </div>
            <div style={styles.colCategory}>
              <span style={styles.categoryBadge}>{comp.category}</span>
            </div>
            <div style={styles.colSource}>
              <span style={styles.sourceText}>{sourceLabels[comp.source]}</span>
            </div>
            <div style={styles.colStatus}>
              <span
                style={{
                  ...styles.statusBadge,
                  backgroundColor: statusColors[comp.status].bg,
                  color: statusColors[comp.status].text,
                }}
              >
                {statusColors[comp.status].label}
              </span>
            </div>
            <div style={styles.colNotes}>
              <span style={styles.notesText}>{comp.notes || '—'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '1200px',
  },
  header: {
    marginBottom: '32px',
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
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '32px',
  },
  statCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
    backgroundColor: brandColors.white,
    borderRadius: '12px',
    border: `1px solid ${brandColors.gray[20]}`,
  },
  statValue: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '32px',
    fontWeight: 700,
    color: brandColors.blue[60],
    marginBottom: '4px',
  },
  statLabel: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[50],
  },
  filters: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  searchWrapper: {
    flex: '1',
    minWidth: '200px',
    maxWidth: '320px',
  },
  select: {
    padding: '10px 16px',
    fontSize: '14px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    border: `1px solid ${brandColors.gray[30]}`,
    borderRadius: '8px',
    backgroundColor: brandColors.white,
    color: brandColors.gray[90],
    cursor: 'pointer',
    outline: 'none',
  },
  tableContainer: {
    backgroundColor: brandColors.white,
    borderRadius: '12px',
    border: `1px solid ${brandColors.gray[20]}`,
    overflow: 'hidden',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '180px 120px 140px 120px 1fr',
    padding: '14px 20px',
    backgroundColor: brandColors.gray[10],
    borderBottom: `1px solid ${brandColors.gray[20]}`,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '11px',
    fontWeight: 600,
    color: brandColors.gray[50],
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '180px 120px 140px 120px 1fr',
    padding: '14px 20px',
    borderBottom: `1px solid ${brandColors.gray[10]}`,
    alignItems: 'center',
  },
  colName: {},
  colCategory: {},
  colSource: {},
  colStatus: {},
  colNotes: {},
  componentName: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    color: brandColors.gray[90],
  },
  categoryBadge: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    color: brandColors.gray[60],
  },
  sourceText: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    color: brandColors.gray[50],
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '12px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '11px',
    fontWeight: 600,
  },
  notesText: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    color: brandColors.gray[50],
  },
};

export default ComponentStatusPage;
