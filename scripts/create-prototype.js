#!/usr/bin/env node

/**
 * Create Prototype Script
 * 
 * Creates a new prototype folder with template files.
 * 
 * Usage:
 *   node scripts/create-prototype.js MyPrototype
 *   npm run new-prototype MyPrototype
 */

const fs = require('fs');
const path = require('path');

// Get prototype name from args
const prototypeName = process.argv[2];

if (!prototypeName) {
  console.error('\x1b[31mError: Please provide a prototype name\x1b[0m');
  console.log('\nUsage:');
  console.log('  npm run new-prototype MyPrototypeName');
  console.log('  node scripts/create-prototype.js MyPrototypeName\n');
  process.exit(1);
}

// Validate name (PascalCase)
if (!/^[A-Z][a-zA-Z0-9]*$/.test(prototypeName)) {
  console.error('\x1b[31mError: Prototype name should be in PascalCase (e.g., MyPrototype)\x1b[0m');
  process.exit(1);
}

// Paths
const prototypesDir = path.join(__dirname, '..', 'src', 'prototypes');
const prototypeDir = path.join(prototypesDir, prototypeName);

// Check if already exists
if (fs.existsSync(prototypeDir)) {
  console.error(`\x1b[31mError: Prototype '${prototypeName}' already exists\x1b[0m`);
  process.exit(1);
}

// Create directory
fs.mkdirSync(prototypeDir, { recursive: true });

// Component template
const componentTemplate = `import React, { useState } from 'react';
import { Button, Modal, TextInput, Alert } from '../../components';
import { brandColors } from '../../tokens/colors/brand';
import { users, analytics } from '../../mocks';

/**
 * ${prototypeName}
 * 
 * Description of your prototype.
 * 
 * Created: ${new Date().toLocaleDateString()}
 */
export const ${prototypeName}: React.FC = () => {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>${prototypeName}</h1>
        <p style={styles.subtitle}>
          Your prototype description here
        </p>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Getting Started</h2>
          <p style={styles.cardText}>
            This is your prototype template. Replace this content with your own UI.
          </p>
          
          <div style={styles.actions}>
            <Button 
              variant="primary" 
              onClick={() => setIsModalOpen(true)}
            >
              Open modal
            </Button>
            <Button variant="secondary">
              Secondary action
            </Button>
          </div>
        </div>

        <Alert
          status="info"
          variant="section"
          message="Tip: Describe your UI to Cursor AI to generate components"
        />
      </main>

      {/* Example Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Confirm
            </Button>
          </>
        }
      >
        <p style={{ margin: 0, color: brandColors.gray[60] }}>
          This is an example modal. Replace with your content.
        </p>
      </Modal>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: brandColors.gray[10],
    padding: '32px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  header: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: brandColors.gray[50],
    margin: 0,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '800px',
  },
  card: {
    backgroundColor: brandColors.white,
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '12px',
  },
  cardText: {
    fontSize: '14px',
    lineHeight: 1.6,
    color: brandColors.gray[60],
    marginBottom: '24px',
  },
  actions: {
    display: 'flex',
    gap: '12px',
  },
};

export default ${prototypeName};
`;

// README template
const readmeTemplate = `# ${prototypeName}

## Description

Describe what this prototype demonstrates.

## Components Used

- Button
- Modal
- Alert
- (add more as you use them)

## How to Run

1. Start the dev server: \`npm run dev\`
2. Navigate to this prototype in the sidebar

## Notes

Add any notes about the prototype here.
`;

// Write files
fs.writeFileSync(path.join(prototypeDir, 'index.tsx'), componentTemplate);
fs.writeFileSync(path.join(prototypeDir, 'README.md'), readmeTemplate);

// Success message
console.log('\n\x1b[32m✓ Created prototype: ' + prototypeName + '\x1b[0m\n');
console.log('Files created:');
console.log(`  src/prototypes/${prototypeName}/index.tsx`);
console.log(`  src/prototypes/${prototypeName}/README.md`);
console.log('\nNext steps:');
console.log(`  1. Open src/prototypes/${prototypeName}/index.tsx`);
console.log('  2. Describe your UI to Cursor AI');
console.log('  3. The AI will generate your prototype\n');
