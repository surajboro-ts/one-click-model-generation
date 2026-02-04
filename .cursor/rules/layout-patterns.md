---
description: Standard layout patterns for Radiant prototypes
globs: ["src/prototypes/**/*.tsx"]
---

# Radiant Layout Patterns

Standard layouts for building prototypes. Use these patterns as starting points.

---

## Full Page Layout (Admin/Settings)

```
┌─────────────────────────────────────────────────────┐
│  Header (56px)                                      │
├──────────────┬──────────────────────────────────────┤
│              │                                      │
│   Sidebar    │         Main Content                 │
│   (240px)    │                                      │
│              │                                      │
│              │                                      │
│              │                                      │
│              │                                      │
└──────────────┴──────────────────────────────────────┘
```

```tsx
import { brandColors } from '../../tokens/colors/brand';
import { spacing } from '../../tokens/spacing';

const FullPageLayout: React.FC = () => {
  return (
    <div style={styles.layout}>
      {/* Header */}
      <header style={styles.header}>
        <AppHeader />
      </header>

      {/* Body */}
      <div style={styles.body}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <Sidebar items={navItems} activeItem={active} />
        </aside>

        {/* Main Content */}
        <main style={styles.main}>
          <div style={styles.content}>
            {/* Page content here */}
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: brandColors.gray[10],
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  header: {
    flexShrink: 0,
    zIndex: 100,
  },
  body: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  sidebar: {
    width: '240px',
    flexShrink: 0,
    backgroundColor: brandColors.white,
    borderRight: `1px solid ${brandColors.gray[20]}`,
    overflowY: 'auto',
  },
  main: {
    flex: 1,
    overflowY: 'auto',
    padding: `${spacing.F}px ${spacing.H}px`,  // 24px 32px
    backgroundColor: brandColors.white,
  },
  content: {
    maxWidth: '1200px',
  },
};
```

---

## Dashboard Layout

```
┌─────────────────────────────────────────────────────┐
│  Header                                             │
├─────────────────────────────────────────────────────┤
│  Tabs: [Tab 1] [Tab 2] [Tab 3]                     │
├─────────────────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Metric  │ │ Metric  │ │ Metric  │ │ Metric  │   │
│  │ Card    │ │ Card    │ │ Card    │ │ Card    │   │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
├─────────────────────────────────────────────────────┤
│  ┌────────────────────┐  ┌────────────────────┐    │
│  │                    │  │                    │    │
│  │   Chart/Graph      │  │   Chart/Graph      │    │
│  │                    │  │                    │    │
│  └────────────────────┘  └────────────────────┘    │
├─────────────────────────────────────────────────────┤
│  Data Table                                         │
└─────────────────────────────────────────────────────┘
```

```tsx
const DashboardLayout: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Header */}
      <PageHeader title="Dashboard" />

      {/* Tabs */}
      <Tabs tabs={tabItems} activeTab={active} onTabChange={setActive} />

      {/* Metrics Grid */}
      <div style={styles.metricsGrid}>
        {metrics.map(metric => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </div>

      {/* Charts Row */}
      <div style={styles.chartsRow}>
        <div style={styles.chartCard}>
          <Chart data={chartData1} />
        </div>
        <div style={styles.chartCard}>
          <Chart data={chartData2} />
        </div>
      </div>

      {/* Data Table */}
      <div style={styles.tableSection}>
        <Table columns={columns} data={tableData} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: `${spacing.F}px`,
    backgroundColor: brandColors.gray[10],
    minHeight: '100vh',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: `${spacing.D}px`,  // 16px
    marginBottom: `${spacing.F}px`,  // 24px
  },
  chartsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: `${spacing.D}px`,
    marginBottom: `${spacing.F}px`,
  },
  chartCard: {
    backgroundColor: brandColors.white,
    borderRadius: '8px',
    padding: `${spacing.F}px`,
    border: `1px solid ${brandColors.gray[20]}`,
  },
  tableSection: {
    backgroundColor: brandColors.white,
    borderRadius: '8px',
    border: `1px solid ${brandColors.gray[20]}`,
    overflow: 'hidden',
  },
};
```

---

## Form Page Layout

```
┌──────────────┬──────────────────────────────────────┐
│              │  Section Title                       │
│   Section    │  ┌────────────────────────────────┐  │
│   Sidebar    │  │ Text Input                     │  │
│              │  └────────────────────────────────┘  │
│  [Section 1] │  ┌────────────────────────────────┐  │
│   Section 2  │  │ Text Input                     │  │
│   Section 3  │  └────────────────────────────────┘  │
│              │  ┌────────────────────────────────┐  │
│              │  │ Toggle                         │  │
│              │  └────────────────────────────────┘  │
│              ├──────────────────────────────────────┤
│              │  [Cancel]              [Save]        │
└──────────────┴──────────────────────────────────────┘
```

```tsx
const FormPageLayout: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <nav style={styles.sidebar}>
        {sections.map(section => (
          <div
            key={section.id}
            style={{
              ...styles.sectionItem,
              ...(active === section.id ? styles.sectionItemActive : {}),
            }}
            onClick={() => setActive(section.id)}
          >
            {section.label}
          </div>
        ))}
      </nav>

      {/* Form Content */}
      <div style={styles.formContainer}>
        <h2 style={styles.sectionTitle}>{currentSection.label}</h2>

        <div style={styles.formFields}>
          <TextInput label="Name" value={name} onChange={setName} />
          <TextInput label="Email" value={email} onChange={setEmail} />
          <Toggle label="Enable notifications" checked={enabled} onChange={setEnabled} />
        </div>

        {/* Footer Actions */}
        <div style={styles.footer}>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save</Button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: brandColors.gray[10],
  },
  sidebar: {
    width: '200px',
    backgroundColor: brandColors.white,
    borderRight: `1px solid ${brandColors.gray[20]}`,
    padding: `${spacing.D}px 0`,
  },
  sectionItem: {
    padding: `${spacing.B}px ${spacing.D}px`,
    cursor: 'pointer',
    fontSize: '14px',
    color: brandColors.gray[70],
    borderLeft: '3px solid transparent',
  },
  sectionItemActive: {
    color: brandColors.blue[60],
    backgroundColor: `${brandColors.blue[60]}08`,
    borderLeftColor: brandColors.blue[60],
    fontWeight: 500,
  },
  formContainer: {
    flex: 1,
    padding: `${spacing.F}px`,
    backgroundColor: brandColors.white,
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: `${spacing.F}px`,
  },
  formFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.E}px`,  // 20px between fields
    maxWidth: '600px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: `${spacing.D}px`,
    marginTop: `${spacing.H}px`,  // 32px
    paddingTop: `${spacing.D}px`,
    borderTop: `1px solid ${brandColors.gray[20]}`,
  },
};
```

---

## Modal/Wizard Layout

```
┌────────────────────────────────────────────┐
│  Context Label (small, gray)               │
│  Step Title (large, bold)                  │
├────────────────────────────────────────────┤
│                                            │
│  Content Area                              │
│  (Scrollable if needed)                    │
│                                            │
│                                            │
├────────────────────────────────────────────┤
│  [====][====][    ][    ]  Progress Bar    │
├────────────────────────────────────────────┤
│  Cancel              [Back]  [Next/Submit] │
└────────────────────────────────────────────┘
```

```tsx
const WizardModalLayout: React.FC = () => {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.contextLabel}>Add new group</div>
          <h2 style={styles.stepTitle}>{steps[currentStep].title}</h2>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {renderStepContent()}
        </div>

        {/* Progress */}
        <div style={styles.progress}>
          {steps.map((_, index) => (
            <div
              key={index}
              style={{
                ...styles.progressSegment,
                ...(index <= currentStep ? styles.progressActive : {}),
              }}
            />
          ))}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <button style={styles.cancelButton} onClick={onClose}>Cancel</button>
          <div style={styles.buttonGroup}>
            {currentStep > 0 && (
              <Button variant="secondary" onClick={handleBack}>Back</Button>
            )}
            <Button variant="primary" onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Create' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(29, 35, 47, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    width: '600px',
    maxHeight: '90vh',
    backgroundColor: brandColors.white,
    borderRadius: '6px',
    boxShadow: '0px 24px 32px rgba(25, 35, 49, 0.16)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    padding: `${spacing.E}px ${spacing.F}px`,  // 20px 24px
    borderBottom: `1px solid ${brandColors.gray[20]}`,
  },
  contextLabel: {
    fontSize: '14px',
    color: brandColors.gray[50],
    marginBottom: `${spacing.A}px`,
  },
  stepTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: brandColors.gray[90],
    margin: 0,
  },
  content: {
    flex: 1,
    padding: `${spacing.F}px`,  // 24px
    overflowY: 'auto',
    minHeight: '300px',
  },
  progress: {
    display: 'flex',
    gap: '6px',
    height: '4px',
  },
  progressSegment: {
    flex: 1,
    height: '4px',
    borderRadius: '2px',
    backgroundColor: brandColors.gray[20],
  },
  progressActive: {
    backgroundColor: brandColors.blue[60],
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.E}px ${spacing.F}px`,  // 20px 24px
    backgroundColor: brandColors.gray[10],
  },
  cancelButton: {
    background: 'none',
    border: 'none',
    color: brandColors.blue[60],
    fontSize: '14px',
    cursor: 'pointer',
    padding: `6px ${spacing.A}px`,
  },
  buttonGroup: {
    display: 'flex',
    gap: `${spacing.D}px`,
  },
};
```

---

## Data Table Page Layout

```
┌─────────────────────────────────────────────────────┐
│  Breadcrumb: Home > Section > Page                  │
│  Page Title                                         │
│  [Tab 1] [Tab 2]                                   │
├─────────────────────────────────────────────────────┤
│  [Search...]                      [Filter] [+ Add]  │
├─────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐│
│  │ Name        │ Status   │ Created  │ Actions    ││
│  ├─────────────────────────────────────────────────┤│
│  │ Item 1      │ Active   │ 2 days   │ ...        ││
│  │ Item 2      │ Pending  │ 1 week   │ ...        ││
│  │ Item 3      │ Active   │ 3 months │ ...        ││
│  └─────────────────────────────────────────────────┘│
│                              < 1 2 3 4 5 >          │
└─────────────────────────────────────────────────────┘
```

```tsx
const DataTablePageLayout: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Page Header */}
      <div style={styles.pageHeader}>
        {/* Breadcrumb */}
        <div style={styles.breadcrumb}>
          <span>Home</span>
          <Icon name="chevron-right" size="xs" />
          <span>Section</span>
          <Icon name="chevron-right" size="xs" />
          <span style={{ color: brandColors.gray[90] }}>Page</span>
        </div>

        <h1 style={styles.title}>Page Title</h1>

        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.searchWrapper}>
          <SearchInput
            placeholder="Search..."
            value={search}
            onChange={setSearch}
          />
        </div>
        <div style={styles.actions}>
          <Button variant="secondary" icon="filter">Filter</Button>
          <Button variant="primary" icon="plus">Add item</Button>
        </div>
      </div>

      {/* Table */}
      <div style={styles.tableContainer}>
        <Table
          columns={columns}
          data={filteredData}
          rowKey="id"
          hoverable
        />
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: `${spacing.F}px ${spacing.H}px`,
    backgroundColor: brandColors.white,
  },
  pageHeader: {
    marginBottom: `${spacing.D}px`,
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`,
    fontSize: '13px',
    color: brandColors.gray[50],
    marginBottom: `${spacing.B}px`,
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    color: brandColors.gray[90],
    margin: 0,
    marginBottom: `${spacing.D}px`,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: `${spacing.D}px`,
  },
  searchWrapper: {
    width: '260px',
  },
  actions: {
    display: 'flex',
    gap: `${spacing.C}px`,
  },
  tableContainer: {
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: '8px',
    overflow: 'hidden',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: `${spacing.D}px`,
  },
};
```

---

## Responsive Breakpoints

| Breakpoint | Width | Use Case |
|------------|-------|----------|
| Mobile | < 768px | Stack layouts, hide sidebar |
| Tablet | 768px - 1024px | Collapsible sidebar |
| Desktop | > 1024px | Full layout |

```typescript
// In responsive scenarios:
const isMobile = window.innerWidth < 768;
const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
const isDesktop = window.innerWidth >= 1024;
```

---

## Common Layout Constants

```typescript
// Header heights
const HEADER_HEIGHT = 56;

// Sidebar widths
const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED = 64;

// Content max widths
const CONTENT_MAX_WIDTH = 1200;
const FORM_MAX_WIDTH = 600;
const MODAL_WIDTH = 600;

// Z-index layers
const Z_INDEX = {
  sidebar: 50,
  header: 100,
  dropdown: 200,
  modal: 1000,
  toast: 1100,
};
```
