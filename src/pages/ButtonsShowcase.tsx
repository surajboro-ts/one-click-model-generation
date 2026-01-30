import React, { useState } from 'react';
import { Button } from '../components/Button';
import { PlusIcon, ChevronDownIcon, DownloadIcon, TrashIcon, EditIcon } from '../components/icons';
import { brandColors } from '../tokens/colors/brand';

export const ButtonsShowcase: React.FC = () => {
  const [loadingButton, setLoadingButton] = useState<string | null>(null);

  const handleLoadingClick = (id: string) => {
    setLoadingButton(id);
    setTimeout(() => setLoadingButton(null), 2000);
  };

  return (
    <div style={styles.container}>
      {/* Primary Buttons */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Primary Buttons</h2>
        <p style={styles.sectionDescription}>
          Primary buttons are used for the most important actions. They draw the user's attention with a solid blue background.
        </p>

        {/* Size Variants */}
        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>Sizes</h3>
          <div style={styles.stateGrid}>
            <div style={styles.gridHeader}></div>
            <div style={styles.gridHeader}>Default</div>
            <div style={styles.gridHeader}>Hover (interact)</div>
            <div style={styles.gridHeader}>Disabled</div>

            <div style={styles.gridLabel}>Small</div>
            <div style={styles.gridCell}>
              <Button variant="primary" size="small">Button</Button>
            </div>
            <div style={styles.gridCell}>
              <Button variant="primary" size="small" active>Button</Button>
            </div>
            <div style={styles.gridCell}>
              <Button variant="primary" size="small" disabled>Button</Button>
            </div>

            <div style={styles.gridLabel}>Basic</div>
            <div style={styles.gridCell}>
              <Button variant="primary" size="basic">Button</Button>
            </div>
            <div style={styles.gridCell}>
              <Button variant="primary" size="basic" active>Button</Button>
            </div>
            <div style={styles.gridCell}>
              <Button variant="primary" size="basic" disabled>Button</Button>
            </div>

            <div style={styles.gridLabel}>Large</div>
            <div style={styles.gridCell}>
              <Button variant="primary" size="large">Button</Button>
            </div>
            <div style={styles.gridCell}>
              <Button variant="primary" size="large" active>Button</Button>
            </div>
            <div style={styles.gridCell}>
              <Button variant="primary" size="large" disabled>Button</Button>
            </div>
          </div>
        </div>

        {/* With Icons */}
        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>With Icons</h3>
          <div style={styles.row}>
            <Button variant="primary" size="small" icon={<PlusIcon />} iconPosition="leading">
              Add Item
            </Button>
            <Button variant="primary" size="basic" icon={<PlusIcon />} iconPosition="leading">
              Add Item
            </Button>
            <Button variant="primary" size="large" icon={<PlusIcon />} iconPosition="leading">
              Add Item
            </Button>
          </div>
        </div>
      </section>

      {/* Secondary Buttons */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Secondary Buttons</h2>
        <p style={styles.sectionDescription}>
          Secondary buttons are used for less prominent actions. They have a gray background that becomes blue when activated.
        </p>

        {/* Size Variants */}
        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>Sizes & States</h3>
          <div style={styles.stateGrid}>
            <div style={styles.gridHeader}></div>
            <div style={styles.gridHeader}>Default</div>
            <div style={styles.gridHeader}>Activated</div>
            <div style={styles.gridHeader}>Disabled</div>

            <div style={styles.gridLabel}>Small</div>
            <div style={styles.gridCell}>
              <Button variant="secondary" size="small">Button</Button>
            </div>
            <div style={styles.gridCell}>
              <Button variant="secondary" size="small" active>Button</Button>
            </div>
            <div style={styles.gridCell}>
              <Button variant="secondary" size="small" disabled>Button</Button>
            </div>

            <div style={styles.gridLabel}>Basic</div>
            <div style={styles.gridCell}>
              <Button variant="secondary" size="basic">Button</Button>
            </div>
            <div style={styles.gridCell}>
              <Button variant="secondary" size="basic" active>Button</Button>
            </div>
            <div style={styles.gridCell}>
              <Button variant="secondary" size="basic" disabled>Button</Button>
            </div>

            <div style={styles.gridLabel}>Large</div>
            <div style={styles.gridCell}>
              <Button variant="secondary" size="large">Button</Button>
            </div>
            <div style={styles.gridCell}>
              <Button variant="secondary" size="large" active>Button</Button>
            </div>
            <div style={styles.gridCell}>
              <Button variant="secondary" size="large" disabled>Button</Button>
            </div>
          </div>
        </div>

        {/* With Icons */}
        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>With Icons</h3>
          <div style={styles.row}>
            <Button variant="secondary" size="small" icon={<PlusIcon />} iconPosition="leading">
              Add Item
            </Button>
            <Button variant="secondary" size="basic" icon={<PlusIcon />} iconPosition="leading">
              Add Item
            </Button>
            <Button variant="secondary" size="basic" icon={<PlusIcon />} iconPosition="leading" active>
              Add Item
            </Button>
          </div>
        </div>
      </section>

      {/* Tertiary Buttons */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Tertiary Buttons</h2>
        <p style={styles.sectionDescription}>
          Tertiary buttons are used for less important or supplementary actions. They have a transparent background with blue text.
        </p>

        {/* Size Variants */}
        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>Sizes & States</h3>
          <div style={styles.stateGrid}>
            <div style={styles.gridHeader}></div>
            <div style={styles.gridHeader}>Default</div>
            <div style={styles.gridHeader}>Activated</div>
            <div style={styles.gridHeader}>Disabled</div>

            <div style={styles.gridLabel}>Small</div>
            <div style={styles.gridCell}>
              <Button variant="tertiary" size="small">Button</Button>
            </div>
            <div style={styles.gridCell}>
              <Button variant="tertiary" size="small" active>Button</Button>
            </div>
            <div style={styles.gridCell}>
              <Button variant="tertiary" size="small" disabled>Button</Button>
            </div>

            <div style={styles.gridLabel}>Basic</div>
            <div style={styles.gridCell}>
              <Button variant="tertiary" size="basic">Button</Button>
            </div>
            <div style={styles.gridCell}>
              <Button variant="tertiary" size="basic" active>Button</Button>
            </div>
            <div style={styles.gridCell}>
              <Button variant="tertiary" size="basic" disabled>Button</Button>
            </div>
          </div>
        </div>

        {/* With Icons */}
        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>With Icons (Leading & Trailing)</h3>
          <div style={styles.row}>
            <Button variant="tertiary" size="small" icon={<PlusIcon />} iconPosition="leading">
              Button
            </Button>
            <Button variant="tertiary" size="basic" icon={<PlusIcon />} iconPosition="leading">
              Button
            </Button>
            <Button variant="tertiary" size="small" icon={<ChevronDownIcon />} iconPosition="trailing">
              Button
            </Button>
            <Button variant="tertiary" size="basic" icon={<ChevronDownIcon />} iconPosition="trailing">
              Button
            </Button>
          </div>
        </div>
      </section>

      {/* White Colorway */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>White Colorway (Dark Backgrounds)</h2>
        <p style={styles.sectionDescription}>
          White colorway buttons are designed for use on dark backgrounds. They maintain readability and contrast.
        </p>

        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>Primary White</h3>
          <div style={styles.darkBackground}>
            <div style={styles.row}>
              <Button variant="primary" size="small" colorway="white">Button</Button>
              <Button variant="primary" size="small" colorway="white" active>Button</Button>
              <Button variant="primary" size="small" colorway="white" disabled>Button</Button>
            </div>
          </div>
        </div>

        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>Tertiary White</h3>
          <div style={styles.darkBackground}>
            <div style={styles.row}>
              <Button variant="tertiary" size="small" colorway="white">Button</Button>
              <Button variant="tertiary" size="small" colorway="white" active>Button</Button>
              <Button variant="tertiary" size="small" colorway="white" disabled>Button</Button>
            </div>
            <div style={{...styles.row, marginTop: 12}}>
              <Button variant="tertiary" size="small" colorway="white" icon={<PlusIcon />} iconPosition="leading">
                Button
              </Button>
              <Button variant="tertiary" size="small" colorway="white" icon={<ChevronDownIcon />} iconPosition="trailing">
                Button
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Examples */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Interactive Examples</h2>
        <p style={styles.sectionDescription}>
          Click buttons to see loading states and interactions.
        </p>

        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>Loading States</h3>
          <div style={styles.row}>
            <Button 
              variant="primary" 
              loading={loadingButton === 'primary-load'}
              onClick={() => handleLoadingClick('primary-load')}
            >
              Save Changes
            </Button>
            <Button 
              variant="secondary" 
              loading={loadingButton === 'secondary-load'}
              onClick={() => handleLoadingClick('secondary-load')}
            >
              Export
            </Button>
            <Button 
              variant="tertiary" 
              loading={loadingButton === 'tertiary-load'}
              onClick={() => handleLoadingClick('tertiary-load')}
            >
              Refresh
            </Button>
          </div>
        </div>

        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>Button Groups</h3>
          <div style={styles.exampleCard}>
            <div style={styles.exampleHeader}>
              <span style={styles.exampleTitle}>Dialog Actions</span>
            </div>
            <div style={styles.exampleContent}>
              <div style={styles.dialogPreview}>
                <h4 style={styles.dialogTitle}>Delete Item?</h4>
                <p style={styles.dialogText}>This action cannot be undone. Are you sure you want to proceed?</p>
                <div style={styles.dialogActions}>
                  <Button variant="secondary">Cancel</Button>
                  <Button variant="primary" icon={<TrashIcon />} iconPosition="leading">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real World Examples */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Real World Usage</h2>
        
        <div style={styles.subsection}>
          <div style={styles.row}>
            <div style={styles.exampleCard}>
              <div style={styles.exampleHeader}>
                <span style={styles.exampleTitle}>Toolbar</span>
              </div>
              <div style={styles.exampleContent}>
                <div style={styles.toolbar}>
                  <Button variant="primary" size="small" icon={<PlusIcon />} iconPosition="leading">
                    New
                  </Button>
                  <Button variant="secondary" size="small" icon={<EditIcon />} iconPosition="leading">
                    Edit
                  </Button>
                  <Button variant="secondary" size="small" icon={<DownloadIcon />} iconPosition="leading">
                    Export
                  </Button>
                  <div style={{flex: 1}} />
                  <Button variant="tertiary" size="small" icon={<ChevronDownIcon />} iconPosition="trailing">
                    More
                  </Button>
                </div>
              </div>
            </div>

            <div style={styles.exampleCard}>
              <div style={styles.exampleHeader}>
                <span style={styles.exampleTitle}>Filter Bar</span>
              </div>
              <div style={styles.exampleContent}>
                <div style={styles.filterBar}>
                  <Button variant="tertiary" size="small" icon={<ChevronDownIcon />} iconPosition="trailing">
                    All Types
                  </Button>
                  <Button variant="tertiary" size="small" icon={<ChevronDownIcon />} iconPosition="trailing">
                    Date Range
                  </Button>
                  <Button variant="tertiary" size="small" icon={<ChevronDownIcon />} iconPosition="trailing">
                    Status
                  </Button>
                  <Button variant="tertiary" size="small">
                    Clear All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.subsection}>
          <div style={styles.exampleCard}>
            <div style={styles.exampleHeader}>
              <span style={styles.exampleTitle}>Form Actions</span>
            </div>
            <div style={styles.exampleContent}>
              <div style={styles.formExample}>
                <div style={styles.formField}>
                  <label style={styles.formLabel}>Project Name</label>
                  <input type="text" style={styles.formInput} placeholder="Enter project name" />
                </div>
                <div style={styles.formField}>
                  <label style={styles.formLabel}>Description</label>
                  <textarea style={styles.formTextarea} placeholder="Enter description" rows={3} />
                </div>
                <div style={styles.formActions}>
                  <Button variant="tertiary">Cancel</Button>
                  <Button variant="secondary">Save as Draft</Button>
                  <Button variant="primary">Create Project</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Variants Grid */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Complete Variant Matrix</h2>
        <p style={styles.sectionDescription}>
          A comprehensive view of all button combinations across variants, sizes, and states.
        </p>

        <div style={styles.variantMatrix}>
          {/* Primary */}
          <div style={styles.variantGroup}>
            <h4 style={styles.variantGroupTitle}>Primary - Standard</h4>
            <div style={styles.variantRow}>
              <Button variant="primary" size="small">Small</Button>
              <Button variant="primary" size="small" icon={<PlusIcon />} iconPosition="leading">With Icon</Button>
              <Button variant="primary" size="small" active>Active</Button>
              <Button variant="primary" size="small" disabled>Disabled</Button>
            </div>
            <div style={styles.variantRow}>
              <Button variant="primary" size="basic">Basic</Button>
              <Button variant="primary" size="basic" icon={<PlusIcon />} iconPosition="leading">With Icon</Button>
              <Button variant="primary" size="basic" active>Active</Button>
              <Button variant="primary" size="basic" disabled>Disabled</Button>
            </div>
          </div>

          {/* Secondary */}
          <div style={styles.variantGroup}>
            <h4 style={styles.variantGroupTitle}>Secondary - Standard</h4>
            <div style={styles.variantRow}>
              <Button variant="secondary" size="small">Small</Button>
              <Button variant="secondary" size="small" icon={<PlusIcon />} iconPosition="leading">With Icon</Button>
              <Button variant="secondary" size="small" active>Active</Button>
              <Button variant="secondary" size="small" disabled>Disabled</Button>
            </div>
            <div style={styles.variantRow}>
              <Button variant="secondary" size="basic">Basic</Button>
              <Button variant="secondary" size="basic" icon={<PlusIcon />} iconPosition="leading">With Icon</Button>
              <Button variant="secondary" size="basic" active>Active</Button>
              <Button variant="secondary" size="basic" disabled>Disabled</Button>
            </div>
          </div>

          {/* Tertiary */}
          <div style={styles.variantGroup}>
            <h4 style={styles.variantGroupTitle}>Tertiary - Standard</h4>
            <div style={styles.variantRow}>
              <Button variant="tertiary" size="small">Small</Button>
              <Button variant="tertiary" size="small" icon={<PlusIcon />} iconPosition="leading">Leading</Button>
              <Button variant="tertiary" size="small" icon={<ChevronDownIcon />} iconPosition="trailing">Trailing</Button>
              <Button variant="tertiary" size="small" disabled>Disabled</Button>
            </div>
            <div style={styles.variantRow}>
              <Button variant="tertiary" size="basic">Basic</Button>
              <Button variant="tertiary" size="basic" icon={<PlusIcon />} iconPosition="leading">Leading</Button>
              <Button variant="tertiary" size="basic" icon={<ChevronDownIcon />} iconPosition="trailing">Trailing</Button>
              <Button variant="tertiary" size="basic" disabled>Disabled</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  section: {
    backgroundColor: brandColors.white,
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '24px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '8px',
  },
  sectionDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 375,
    color: brandColors.gray[60],
    marginBottom: '32px',
    lineHeight: '20px',
  },
  subsection: {
    marginBottom: '32px',
  },
  subsectionTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '16px',
  },
  stateGrid: {
    display: 'grid',
    gridTemplateColumns: '100px repeat(3, 1fr)',
    gap: '16px',
    alignItems: 'center',
  },
  gridHeader: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    color: brandColors.gray[60],
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    textAlign: 'center',
  },
  gridLabel: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[90],
  },
  gridCell: {
    display: 'flex',
    justifyContent: 'center',
    padding: '12px',
    backgroundColor: brandColors.gray[10],
    borderRadius: '8px',
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    alignItems: 'center',
  },
  darkBackground: {
    backgroundColor: brandColors.gray[90],
    padding: '24px',
    borderRadius: '8px',
  },
  exampleCard: {
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: '8px',
    overflow: 'hidden',
    flex: '1 1 300px',
    minWidth: '280px',
  },
  exampleHeader: {
    backgroundColor: brandColors.gray[10],
    padding: '12px 16px',
    borderBottom: `1px solid ${brandColors.gray[20]}`,
  },
  exampleTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[90],
  },
  exampleContent: {
    padding: '20px',
  },
  dialogPreview: {
    maxWidth: '400px',
  },
  dialogTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '18px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '8px',
  },
  dialogText: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 375,
    color: brandColors.gray[60],
    marginBottom: '20px',
    lineHeight: '20px',
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  toolbar: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    padding: '8px',
    backgroundColor: brandColors.gray[10],
    borderRadius: '8px',
  },
  filterBar: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  formExample: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  formLabel: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[90],
  },
  formInput: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: `1px solid ${brandColors.gray[30]}`,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    lineHeight: '20px',
    outline: 'none',
  },
  formTextarea: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: `1px solid ${brandColors.gray[30]}`,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    lineHeight: '20px',
    outline: 'none',
    resize: 'vertical',
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '8px',
  },
  variantMatrix: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  variantGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  variantGroupTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    color: brandColors.gray[70],
    marginBottom: '4px',
  },
  variantRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '12px',
    backgroundColor: brandColors.gray[10],
    borderRadius: '8px',
  },
};

export default ButtonsShowcase;

