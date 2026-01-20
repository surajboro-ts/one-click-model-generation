import React, { useState } from 'react';
import { Chip } from '../components/Chip';
import { brandColors } from '../tokens/colors/brand';

export const ChipsShowcase: React.FC = () => {
  const [deletedChips, setDeletedChips] = useState<string[]>([]);
  const [clickedChip, setClickedChip] = useState<string | null>(null);

  const handleDelete = (chipId: string) => {
    setDeletedChips(prev => [...prev, chipId]);
  };

  const handleClick = (chipId: string) => {
    setClickedChip(chipId);
    setTimeout(() => setClickedChip(null), 1000);
  };

  const isDeleted = (chipId: string) => deletedChips.includes(chipId);

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Chip / Trigger Component</h2>
      <p style={styles.sectionDescription}>
        Pill-shaped components for displaying attributes, measures, and filters. 
        Commonly used in data visualization and analytics contexts.
      </p>

      {/* Type Variants */}
      <div style={styles.subsection}>
        <h3 style={styles.subsectionTitle}>Types</h3>
        <div style={styles.row}>
          <div style={styles.chipGroup}>
            <span style={styles.label}>Attribute</span>
            <Chip type="attribute" label="Attribute" />
          </div>
          <div style={styles.chipGroup}>
            <span style={styles.label}>Measure</span>
            <Chip type="measure" label="Measure" />
          </div>
          <div style={styles.chipGroup}>
            <span style={styles.label}>Filter</span>
            <Chip type="filter" label="Filter" filterValue="Value" />
          </div>
          <div style={styles.chipGroup}>
            <span style={styles.label}>Skeleton</span>
            <Chip type="skeleton" label="Drag a column" showChevron={false} />
          </div>
        </div>
      </div>

      {/* States Comparison Grid */}
      <div style={styles.subsection}>
        <h3 style={styles.subsectionTitle}>States Matrix</h3>
        <div style={styles.stateGrid}>
          {/* Header Row */}
          <div style={styles.gridHeader}></div>
          <div style={styles.gridHeader}>Default</div>
          <div style={styles.gridHeader}>Hover (interact)</div>
          <div style={styles.gridHeader}>Disabled</div>

          {/* Attribute Row */}
          <div style={styles.gridLabel}>Attribute</div>
          <div style={styles.gridCell}>
            <Chip type="attribute" label="Attribute" />
          </div>
          <div style={styles.gridCell}>
            <Chip 
              type="attribute" 
              label="Attribute" 
              deletable 
              onDelete={() => alert('Delete clicked!')}
            />
          </div>
          <div style={styles.gridCell}>
            <Chip type="attribute" label="Attribute" disabled />
          </div>

          {/* Measure Row */}
          <div style={styles.gridLabel}>Measure</div>
          <div style={styles.gridCell}>
            <Chip type="measure" label="Measure" />
          </div>
          <div style={styles.gridCell}>
            <Chip 
              type="measure" 
              label="Measure" 
              deletable 
              onDelete={() => alert('Delete clicked!')}
            />
          </div>
          <div style={styles.gridCell}>
            <Chip type="measure" label="Measure" disabled />
          </div>

          {/* Filter Row */}
          <div style={styles.gridLabel}>Filter</div>
          <div style={styles.gridCell}>
            <Chip type="filter" label="Filter" filterValue="Value" />
          </div>
          <div style={styles.gridCell}>
            <Chip 
              type="filter" 
              label="Filter" 
              filterValue="Value"
              deletable 
              onDelete={() => alert('Delete clicked!')}
            />
          </div>
          <div style={styles.gridCell}>
            <Chip type="filter" label="Filter" filterValue="Value" disabled />
          </div>
        </div>
      </div>

      {/* Interactive Examples */}
      <div style={styles.subsection}>
        <h3 style={styles.subsectionTitle}>Interactive Examples</h3>
        
        {clickedChip && (
          <div style={styles.notification}>
            Clicked: <strong>{clickedChip}</strong>
          </div>
        )}

        <div style={styles.row}>
          {!isDeleted('chip1') && (
            <Chip 
              type="attribute" 
              label="Country" 
              deletable 
              onClick={() => handleClick('Country')}
              onDelete={() => handleDelete('chip1')}
            />
          )}
          {!isDeleted('chip2') && (
            <Chip 
              type="attribute" 
              label="Product Category" 
              deletable 
              onClick={() => handleClick('Product Category')}
              onDelete={() => handleDelete('chip2')}
            />
          )}
          {!isDeleted('chip3') && (
            <Chip 
              type="measure" 
              label="Revenue" 
              deletable 
              onClick={() => handleClick('Revenue')}
              onDelete={() => handleDelete('chip3')}
            />
          )}
          {!isDeleted('chip4') && (
            <Chip 
              type="measure" 
              label="Units Sold" 
              deletable 
              onClick={() => handleClick('Units Sold')}
              onDelete={() => handleDelete('chip4')}
            />
          )}
          {!isDeleted('chip5') && (
            <Chip 
              type="filter" 
              label="Year" 
              filterValue="2024"
              deletable 
              onClick={() => handleClick('Year: 2024')}
              onDelete={() => handleDelete('chip5')}
            />
          )}
        </div>

        {deletedChips.length > 0 && (
          <button 
            style={styles.resetButton}
            onClick={() => setDeletedChips([])}
          >
            Reset Deleted Chips
          </button>
        )}
      </div>

      {/* Without Chevron */}
      <div style={styles.subsection}>
        <h3 style={styles.subsectionTitle}>Without Trailing Icon</h3>
        <div style={styles.row}>
          <Chip type="attribute" label="Country" showChevron={false} />
          <Chip type="measure" label="Revenue" showChevron={false} />
          <Chip type="filter" label="Status" filterValue="Active" showChevron={false} />
        </div>
      </div>

      {/* Long Text Truncation */}
      <div style={styles.subsection}>
        <h3 style={styles.subsectionTitle}>Text Truncation</h3>
        <div style={styles.row}>
          <Chip 
            type="attribute" 
            label="Very Long Attribute Name That Should Be Truncated" 
            maxWidth={200}
          />
          <Chip 
            type="filter" 
            label="Category" 
            filterValue="This is a very long filter value that exceeds the container"
            maxWidth={250}
          />
        </div>
      </div>

      {/* Real World Example */}
      <div style={styles.subsection}>
        <h3 style={styles.subsectionTitle}>Real World Usage</h3>
        <div style={styles.exampleCard}>
          <div style={styles.exampleHeader}>
            <span style={styles.exampleTitle}>Pivot Table Configuration</span>
          </div>
          <div style={styles.exampleContent}>
            <div style={styles.exampleSection}>
              <span style={styles.exampleSectionLabel}>Rows</span>
              <div style={styles.row}>
                <Chip type="attribute" label="Region" deletable />
                <Chip type="attribute" label="Country" deletable />
                <Chip type="skeleton" label="Drag a column" showChevron={false} />
              </div>
            </div>
            <div style={styles.exampleSection}>
              <span style={styles.exampleSectionLabel}>Values</span>
              <div style={styles.row}>
                <Chip type="measure" label="Revenue" deletable />
                <Chip type="measure" label="Cost" deletable />
                <Chip type="measure" label="Profit" deletable />
                <Chip type="skeleton" label="Drag a column" showChevron={false} />
              </div>
            </div>
            <div style={styles.exampleSection}>
              <span style={styles.exampleSectionLabel}>Filters</span>
              <div style={styles.row}>
                <Chip type="filter" label="Year" filterValue="2024" deletable />
                <Chip type="filter" label="Quarter" filterValue="Q4" deletable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
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
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    alignItems: 'center',
  },
  chipGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'flex-start',
  },
  label: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    color: brandColors.gray[60],
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  stateGrid: {
    display: 'grid',
    gridTemplateColumns: '120px repeat(3, 1fr)',
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
    padding: '8px',
    backgroundColor: brandColors.gray[10],
    borderRadius: '8px',
  },
  notification: {
    backgroundColor: brandColors.blue[10],
    color: brandColors.blue[70],
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
  },
  resetButton: {
    marginTop: '16px',
    padding: '8px 16px',
    backgroundColor: brandColors.blue[60],
    color: brandColors.white,
    border: 'none',
    borderRadius: '6px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  exampleCard: {
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: '8px',
    overflow: 'hidden',
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
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  exampleSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  exampleSectionLabel: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    color: brandColors.gray[60],
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
};

export default ChipsShowcase;

