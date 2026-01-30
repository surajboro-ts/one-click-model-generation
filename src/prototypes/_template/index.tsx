import React from 'react';

/**
 * Prototype Template
 * 
 * This is your starting point for creating a new prototype.
 * 
 * ## How to Use
 * 
 * 1. Copy this folder to a new location: `src/prototypes/YourPrototypeName/`
 * 2. Rename this file or create new files as needed
 * 3. Describe your UI to Cursor AI or paste a screenshot
 * 4. The AI will generate components using the Radiant design system
 * 
 * ## Available Components
 * 
 * Import from '../components':
 * - Button (primary, secondary, tertiary variants)
 * - Alert (info, success, warning, failure, muted)
 * - Modal (dialog overlays)
 * - TextInput, SearchInput
 * - Checkbox, Radio, Toggle
 * - Tabs, Chip, Sidebar
 * - Icon (46 icons available)
 * 
 * ## Available Mock Data
 * 
 * Import from '../mocks':
 * - users (sample user profiles)
 * - analytics (chart and table data)
 * - navigation (menu structures)
 * - forms (dropdown options, filter values)
 * 
 * @example
 * ```tsx
 * import { Button, Modal, Alert } from '../../components';
 * import { users, analytics } from '../../mocks';
 * ```
 */

// Delete this placeholder and start building your prototype!
export const PrototypeTemplate: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Your Prototype</h1>
        <p style={styles.description}>
          Start building your prototype here. Describe what you want to create
          or paste a screenshot, and the AI will help generate the UI.
        </p>
        <div style={styles.placeholder}>
          <span style={styles.placeholderIcon}>🎨</span>
          <p style={styles.placeholderText}>
            Replace this with your prototype content
          </p>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F6F8FA',
    padding: '48px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '32px',
    fontWeight: 600,
    color: '#1D232F',
    marginBottom: '16px',
  },
  description: {
    fontSize: '16px',
    color: '#6B7280',
    lineHeight: '24px',
    marginBottom: '32px',
  },
  placeholder: {
    backgroundColor: '#FFFFFF',
    border: '2px dashed #DBDFE7',
    borderRadius: '12px',
    padding: '64px',
    textAlign: 'center',
  },
  placeholderIcon: {
    fontSize: '48px',
    display: 'block',
    marginBottom: '16px',
  },
  placeholderText: {
    fontSize: '14px',
    color: '#A5ACB9',
    margin: 0,
  },
};

export default PrototypeTemplate;
