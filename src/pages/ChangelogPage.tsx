import React from 'react';
import { brandColors } from '../tokens/colors/brand';

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  type: 'major' | 'minor' | 'patch';
  changes: {
    category: 'added' | 'changed' | 'fixed' | 'removed';
    items: string[];
  }[];
}

const CHANGELOG: ChangelogEntry[] = [
  {
    version: '1.1.0',
    date: '2026-01-27',
    title: 'Modal Components & Navigation',
    type: 'minor',
    changes: [
      {
        category: 'added',
        items: [
          'ConfirmDialog component - confirmation dialog pattern based on DialogueAlert',
          'WizardModal component - multi-step wizard with progress bar',
          'FormModal component - form-optimized modal with validation',
          'FilterDialog component - filter selection with checkboxes',
          'Select component - dropdown selection with search',
          'Popover component - floating overlay with multiple placements',
          'LoadingIndicator component - spinner and loading overlay',
          'Component Status page - track all radiant-code components',
          'Changelog page - version history of project changes',
          'Example Prototypes section in navigation',
          'Settings Panel demo page',
          'Data Dashboard demo page',
        ],
      },
      {
        category: 'changed',
        items: [
          'Navigation structure updated with new sections',
          'Component count updated to 17 components',
          'Sidebar reorganized with Modal Patterns and Overlay sections',
        ],
      },
      {
        category: 'fixed',
        items: [
          'React Router integration for URL-based navigation',
          'TypeScript build errors for unused variables',
        ],
      },
    ],
  },
  {
    version: '1.0.0',
    date: '2026-01-20',
    title: 'Initial Release',
    type: 'major',
    changes: [
      {
        category: 'added',
        items: [
          'Design token system: Colors, Typography, Spacing, Radius, Shadows, Borders',
          'Button component - Primary, Secondary, Tertiary variants with icons',
          'Checkbox component - Checked, Unchecked, Indeterminate states',
          'Radio component - Radio button groups',
          'Toggle component - Switch with label positioning',
          'TextInput component - Text input with labels and validation',
          'SearchInput component - Search with icon',
          'Chip component - Attribute, Measure, Filter, Skeleton types',
          'Alert component - Info, Success, Warning, Failure, Muted statuses',
          'Modal component - Base modal dialog',
          'Tabs component - Tab navigation',
          'Sidebar component - Navigation sidebar',
          'Icon system with 46+ icons',
          'Interactive Playground with Inspect mode',
          'Token Architecture documentation',
          'Component documentation pages with live examples',
        ],
      },
    ],
  },
  {
    version: '0.1.0',
    date: '2026-01-15',
    title: 'Project Setup',
    type: 'minor',
    changes: [
      {
        category: 'added',
        items: [
          'React + TypeScript + Vite project setup',
          'CSS Modules for component styling',
          'Design token infrastructure',
          'Project structure and conventions',
        ],
      },
    ],
  },
];

const categoryColors = {
  added: { bg: '#E8F5E9', text: '#2E7D32', label: 'Added' },
  changed: { bg: '#FFF3E0', text: '#E65100', label: 'Changed' },
  fixed: { bg: '#E3F2FD', text: '#1565C0', label: 'Fixed' },
  removed: { bg: '#FFEBEE', text: '#C62828', label: 'Removed' },
};

const typeColors = {
  major: brandColors.red[60],
  minor: brandColors.blue[60],
  patch: brandColors.gray[50],
};

export const ChangelogPage: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Changelog</h1>
        <p style={styles.description}>
          A detailed log of all changes, updates, and improvements to the Radiant Design System.
        </p>
      </div>

      {/* Timeline */}
      <div style={styles.timeline}>
        {CHANGELOG.map((entry, index) => (
          <div key={entry.version} style={styles.entry}>
            {/* Version Header */}
            <div style={styles.entryHeader}>
              <div style={styles.versionInfo}>
                <span
                  style={{
                    ...styles.versionBadge,
                    backgroundColor: typeColors[entry.type],
                  }}
                >
                  v{entry.version}
                </span>
                <span style={styles.entryTitle}>{entry.title}</span>
              </div>
              <span style={styles.entryDate}>{entry.date}</span>
            </div>

            {/* Changes */}
            <div style={styles.changesContainer}>
              {entry.changes.map((change, changeIndex) => (
                <div key={changeIndex} style={styles.changeSection}>
                  <span
                    style={{
                      ...styles.categoryBadge,
                      backgroundColor: categoryColors[change.category].bg,
                      color: categoryColors[change.category].text,
                    }}
                  >
                    {categoryColors[change.category].label}
                  </span>
                  <ul style={styles.changesList}>
                    {change.items.map((item, itemIndex) => (
                      <li key={itemIndex} style={styles.changeItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Connector line (except for last item) */}
            {index < CHANGELOG.length - 1 && <div style={styles.connector} />}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '800px',
  },
  header: {
    marginBottom: '40px',
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
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  entry: {
    position: 'relative',
    backgroundColor: brandColors.white,
    borderRadius: '12px',
    border: `1px solid ${brandColors.gray[20]}`,
    padding: '24px',
  },
  entryHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  versionInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  versionBadge: {
    padding: '6px 12px',
    borderRadius: '6px',
    fontFamily: '"SF Mono", Monaco, monospace',
    fontSize: '13px',
    fontWeight: 600,
    color: brandColors.white,
  },
  entryTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '18px',
    fontWeight: 600,
    color: brandColors.gray[90],
  },
  entryDate: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    color: brandColors.gray[50],
  },
  changesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  changeSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    padding: '4px 10px',
    borderRadius: '4px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  changesList: {
    margin: 0,
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  changeItem: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    color: brandColors.gray[70],
    lineHeight: '22px',
  },
  connector: {
    position: 'absolute',
    bottom: '-32px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '2px',
    height: '32px',
    backgroundColor: brandColors.gray[20],
  },
};

export default ChangelogPage;
