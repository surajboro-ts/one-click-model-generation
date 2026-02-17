import React, { useState, useMemo } from 'react';
import { Button } from '../../components/Button';
import { Checkbox } from '../../components/Checkbox';
import { Toggle } from '../../components/Toggle';
import { SearchInput } from '../../components/SearchInput';
import { systemColors, referenceColors } from '../../tokens/colors';

/**
 * Filter Dialog Example
 * 
 * A common ThoughtSpot pattern: a modal dialog for filtering data.
 * Demonstrates: Button, Checkbox, Toggle, SearchInput composition.
 * 
 * Use this as a reference for building filter/selection interfaces.
 */

// Sample data - in real prototypes, import from mocks
const COUNTRIES = [
  'Algeria', 'Belgium', 'Canada', 'Denmark', 'Egypt',
  'France', 'Germany', 'Hungary', 'India', 'Japan',
  'Kenya', 'Luxembourg',
];

export const FilterDialogExample: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>(['Algeria']);
  const [showSelected, setShowSelected] = useState(false);

  const filteredItems = useMemo(() => {
    let items = COUNTRIES;
    if (searchQuery) {
      items = items.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (showSelected) {
      items = items.filter(item => selectedItems.includes(item));
    }
    return items;
  }, [searchQuery, showSelected, selectedItems]);

  const handleToggle = (item: string) => {
    setSelectedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const handleSelectAll = () => setSelectedItems(filteredItems);
  const handleClear = () => setSelectedItems([]);

  return (
    <div style={styles.container}>
      <div style={styles.backdrop}>
        {/* Mock app background */}
        <div style={styles.mockSidebar} />
        <div style={styles.mockContent}>
          <div style={styles.mockHeader} />
          <div style={styles.mockTable}>
            {[1, 2, 3, 4].map(i => <div key={i} style={styles.mockRow} />)}
          </div>
        </div>
      </div>

      {/* Filter Dialog */}
      <div style={styles.overlay}>
        <div style={styles.dialog}>
          <div style={styles.header}>
            <h2 style={styles.title}>Add filter</h2>
          </div>

          <div style={styles.body}>
            <SearchInput
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div style={styles.listHeader}>
              <span style={styles.listTitle}>
                Country {selectedItems.length > 0 && `(${selectedItems.length})`}
              </span>
              <div style={styles.listActions}>
                <Button variant="tertiary" size="small" onClick={handleSelectAll}>
                  Select all
                </Button>
                <Button variant="tertiary" size="small" onClick={handleClear}>
                  Clear
                </Button>
              </div>
            </div>

            <div style={styles.list}>
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <div key={item} style={styles.listItem}>
                    <Checkbox
                      label={item}
                      checked={selectedItems.includes(item)}
                      onChange={() => handleToggle(item)}
                    />
                  </div>
                ))
              ) : (
                <div style={styles.empty}>No items found</div>
              )}
            </div>

            <div style={styles.toggleRow}>
              <Toggle
                label="Show selected"
                checked={showSelected}
                onChange={setShowSelected}
                labelPosition="right"
              />
            </div>
          </div>

          <div style={styles.footer}>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Add</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'relative',
    height: '600px',
    backgroundColor: referenceColors.gray['30'],
    borderRadius: '12px',
    overflow: 'hidden',
  },
  backdrop: {
    display: 'flex',
    height: '100%',
    opacity: 0.5,
  },
  mockSidebar: {
    width: '200px',
    backgroundColor: systemColors.light['content-primary'],
  },
  mockContent: {
    flex: 1,
    padding: '16px',
  },
  mockHeader: {
    height: '48px',
    backgroundColor: systemColors.light['background-subtle'],
    borderRadius: '4px',
    marginBottom: '12px',
  },
  mockTable: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  mockRow: {
    height: '40px',
    backgroundColor: systemColors.light['background-subtle'],
    borderRadius: '4px',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(29, 35, 47, 0.4)',
  },
  dialog: {
    width: '394px',
    backgroundColor: systemColors.light['background-base'],
    borderRadius: '6px',
    boxShadow: '0px 24px 32px rgba(25, 35, 49, 0.16)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '20px 24px',
    borderBottom: `1px solid ${systemColors.light['background-subtle']}`,
  },
  title: {
    fontFamily: '"Plain", sans-serif',
    fontSize: '20px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    margin: 0,
  },
  body: {
    padding: '16px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  listHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listTitle: {
    fontFamily: '"Plain", sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: systemColors.light['content-primary'],
  },
  listActions: {
    display: 'flex',
    gap: '4px',
  },
  list: {
    height: '200px',
    overflowY: 'auto',
    border: `1px solid ${systemColors.light['background-subtle']}`,
    borderRadius: '6px',
    padding: '8px 0',
  },
  listItem: {
    padding: '6px 16px',
  },
  empty: {
    padding: '24px',
    textAlign: 'center',
    color: systemColors.light['content-tertiary'],
    fontSize: '14px',
  },
  toggleRow: {
    paddingTop: '12px',
    borderTop: `1px solid ${systemColors.light['background-subtle']}`,
  },
  footer: {
    padding: '20px 24px',
    backgroundColor: systemColors.light['background-sunken'],
    borderBottomLeftRadius: '6px',
    borderBottomRightRadius: '6px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px',
  },
};

export default FilterDialogExample;
