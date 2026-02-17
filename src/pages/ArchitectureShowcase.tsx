import React, { useState } from 'react';
import { systemColors, referenceColors } from '../tokens/colors';

type ActiveLayer = 'brand' | 'semantic' | 'component' | null;

export const ArchitectureShowcase: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<ActiveLayer>(null);

  return (
    <div style={styles.container}>
      {/* Header */}
      <section style={styles.headerSection}>
        <h2 style={styles.pageTitle}>Token Architecture</h2>
        <p style={styles.pageDescription}>
          The Radiant Design System uses a 3-tier token architecture that provides flexibility, 
          consistency, and maintainability across all components.
        </p>
      </section>

      {/* Architecture Diagram */}
      <section style={styles.diagramSection}>
        <h3 style={styles.sectionTitle}>Token Flow Diagram</h3>
        <p style={styles.sectionDescription}>
          Click on each layer to see details. Tokens flow from Brand → Semantic → Component.
        </p>
        
        <div style={styles.flowChart}>
          {/* Brand Layer */}
          <div 
            style={{
              ...styles.layer,
              ...styles.brandLayer,
              ...(activeLayer === 'brand' ? styles.layerActive : {}),
            }}
            onClick={() => setActiveLayer(activeLayer === 'brand' ? null : 'brand')}
          >
            <div style={styles.layerHeader}>
              <span style={styles.layerNumber}>1</span>
              <span style={styles.layerTitle}>Brand Tokens</span>
            </div>
            <p style={styles.layerSubtitle}>Primitive Values</p>
            <div style={styles.layerContent}>
              <code style={styles.tokenExample}>blue.60 = #2770EF</code>
              <code style={styles.tokenExample}>gray.90 = #1D232F</code>
              <code style={styles.tokenExample}>green.60 = #06BF7F</code>
            </div>
            <div style={styles.layerFile}>
              <span style={styles.fileIcon}>📄</span>
              <code>tokens/colors/brand.ts</code>
            </div>
          </div>

          {/* Arrow 1 */}
          <div style={styles.arrowContainer}>
            <svg width="40" height="60" viewBox="0 0 40 60" style={styles.arrow}>
              <path d="M20 0 L20 45 M10 35 L20 50 L30 35" stroke={systemColors.light['border-default']} strokeWidth="2" fill="none" />
            </svg>
            <span style={styles.arrowLabel}>references</span>
          </div>

          {/* Semantic Layer */}
          <div 
            style={{
              ...styles.layer,
              ...styles.semanticLayer,
              ...(activeLayer === 'semantic' ? styles.layerActive : {}),
            }}
            onClick={() => setActiveLayer(activeLayer === 'semantic' ? null : 'semantic')}
          >
            <div style={styles.layerHeader}>
              <span style={styles.layerNumber}>2</span>
              <span style={styles.layerTitle}>Semantic Tokens</span>
            </div>
            <p style={styles.layerSubtitle}>Meaningful Names</p>
            <div style={styles.layerContent}>
              <code style={styles.tokenExample}>--color-primary</code>
              <code style={styles.tokenExample}>--color-text-default</code>
              <code style={styles.tokenExample}>--color-success</code>
            </div>
            <div style={styles.layerFile}>
              <span style={styles.fileIcon}>📄</span>
              <code>styles/tokens.css</code>
            </div>
          </div>

          {/* Arrow 2 */}
          <div style={styles.arrowContainer}>
            <svg width="40" height="60" viewBox="0 0 40 60" style={styles.arrow}>
              <path d="M20 0 L20 45 M10 35 L20 50 L30 35" stroke={systemColors.light['border-default']} strokeWidth="2" fill="none" />
            </svg>
            <span style={styles.arrowLabel}>used by</span>
          </div>

          {/* Component Layer */}
          <div 
            style={{
              ...styles.layer,
              ...styles.componentLayer,
              ...(activeLayer === 'component' ? styles.layerActive : {}),
            }}
            onClick={() => setActiveLayer(activeLayer === 'component' ? null : 'component')}
          >
            <div style={styles.layerHeader}>
              <span style={styles.layerNumber}>3</span>
              <span style={styles.layerTitle}>Component Tokens</span>
            </div>
            <p style={styles.layerSubtitle}>Applied Styles</p>
            <div style={styles.layerContent}>
              <code style={styles.tokenExample}>.button &#123; color: var(--color-brand-white) &#125;</code>
              <code style={styles.tokenExample}>.checkbox &#123; border: var(--color-brand-gray-50) &#125;</code>
            </div>
            <div style={styles.layerFile}>
              <span style={styles.fileIcon}>📄</span>
              <code>components/*.module.css</code>
            </div>
          </div>
        </div>

        {/* Layer Details */}
        {activeLayer && (
          <div style={styles.detailsPanel}>
            {activeLayer === 'brand' && (
              <>
                <h4 style={styles.detailsTitle}>🎨 Brand / Primitive Tokens</h4>
                <p style={styles.detailsDescription}>
                  The foundation of the color system. These are raw color values organized by hue and lightness.
                  They should <strong>never be used directly</strong> in components.
                </p>
                <div style={styles.codeBlock}>
                  <div style={styles.codeHeader}>tokens/colors/brand.ts</div>
                  <pre style={styles.code}>{`export const brandColors = {
  blue: {
    100: '#001740',  // Darkest
    80: '#163772',
    70: '#2359B6',
    60: '#2770EF',   // Primary
    50: '#71A1F4',
    40: '#ABC7F9',
    30: '#CEDCF5',
    20: '#DEE8FA',
    10: '#EBF2FD',   // Lightest
  },
  gray: {
    90: '#1D232F',   // Text default
    60: '#777E8B',   // Text secondary
    50: '#A5ACB9',   // Borders
    20: '#EAEDF2',   // Backgrounds
    10: '#F6F8FA',
  },
  // green, red, yellow, etc.
}`}</pre>
                </div>
              </>
            )}
            {activeLayer === 'semantic' && (
              <>
                <h4 style={styles.detailsTitle}>💡 Semantic / Alias Tokens</h4>
                <p style={styles.detailsDescription}>
                  CSS custom properties that give meaningful names to colors. They reference brand tokens 
                  and can change based on theme (light/dark mode).
                </p>
                <div style={styles.codeBlock}>
                  <div style={styles.codeHeader}>styles/tokens.css</div>
                  <pre style={styles.code}>{`:root {
  /* Brand color references */
  --color-brand-blue-60: #2770EF;
  --color-brand-gray-90: #1D232F;
  --color-brand-white: #FFFFFF;
  
  /* Semantic aliases */
  --color-primary: var(--color-brand-blue-60);
  --color-primary-hover: var(--color-brand-blue-70);
  --color-text-default: var(--color-brand-gray-90);
  --color-text-inverse: var(--color-brand-white);
  
  /* Spacing tokens */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  
  /* Typography tokens */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-weight-light: 375;
}`}</pre>
                </div>
              </>
            )}
            {activeLayer === 'component' && (
              <>
                <h4 style={styles.detailsTitle}>🧩 Component Tokens</h4>
                <p style={styles.detailsDescription}>
                  CSS modules that consume tokens to style components. They use CSS variables 
                  for consistent, maintainable styling.
                </p>
                <div style={styles.codeBlock}>
                  <div style={styles.codeHeader}>components/Button/Button.module.css</div>
                  <pre style={styles.code}>{`.button {
  font-family: var(--font-family-primary);
  border-radius: var(--radius-2xl);
  transition: background-color var(--duration-fast);
}

.primary.standard {
  background-color: var(--color-brand-blue-60);
  color: var(--color-brand-white);
}

.primary.standard:hover {
  background-color: var(--color-brand-blue-70);
}

.secondary.standard {
  background-color: var(--color-brand-gray-20);
  color: var(--color-brand-gray-90);
}`}</pre>
                </div>
              </>
            )}
          </div>
        )}
      </section>

      {/* Real Example */}
      <section style={styles.exampleSection}>
        <h3 style={styles.sectionTitle}>Real Example: Button Component</h3>
        <p style={styles.sectionDescription}>
          See how tokens flow through the system to create a Primary Button.
        </p>

        <div style={styles.exampleFlow}>
          {/* Step 1 */}
          <div style={styles.exampleStep}>
            <div style={styles.stepHeader}>
              <span style={styles.stepNumber}>1</span>
              <span style={styles.stepTitle}>Brand Token Defined</span>
            </div>
            <div style={styles.stepContent}>
              <code style={styles.stepCode}>blue.60 = '#2770EF'</code>
              <div style={styles.colorPreview}>
                <div style={{ ...styles.colorSwatch, backgroundColor: '#2770EF' }} />
                <span>#2770EF</span>
              </div>
            </div>
          </div>

          <div style={styles.stepArrow}>→</div>

          {/* Step 2 */}
          <div style={styles.exampleStep}>
            <div style={styles.stepHeader}>
              <span style={styles.stepNumber}>2</span>
              <span style={styles.stepTitle}>CSS Variable Created</span>
            </div>
            <div style={styles.stepContent}>
              <code style={styles.stepCode}>--color-brand-blue-60: #2770EF</code>
            </div>
          </div>

          <div style={styles.stepArrow}>→</div>

          {/* Step 3 */}
          <div style={styles.exampleStep}>
            <div style={styles.stepHeader}>
              <span style={styles.stepNumber}>3</span>
              <span style={styles.stepTitle}>Component Uses Token</span>
            </div>
            <div style={styles.stepContent}>
              <code style={styles.stepCode}>background: var(--color-brand-blue-60)</code>
            </div>
          </div>

          <div style={styles.stepArrow}>→</div>

          {/* Step 4 */}
          <div style={styles.exampleStep}>
            <div style={styles.stepHeader}>
              <span style={styles.stepNumber}>4</span>
              <span style={styles.stepTitle}>Rendered Button</span>
            </div>
            <div style={styles.stepContent}>
              <button style={styles.previewButton}>Add</button>
            </div>
          </div>
        </div>
      </section>

      {/* File Structure */}
      <section style={styles.structureSection}>
        <h3 style={styles.sectionTitle}>File Structure</h3>
        <div style={styles.fileTree}>
          <div style={styles.treeItem}>
            <span style={styles.folderIcon}>📁</span>
            <span style={styles.folderName}>src/</span>
          </div>
          <div style={{ ...styles.treeItem, marginLeft: 20 }}>
            <span style={styles.folderIcon}>📁</span>
            <span style={styles.folderName}>tokens/</span>
            <span style={styles.treeLabel}>← Brand tokens (TypeScript)</span>
          </div>
          <div style={{ ...styles.treeItem, marginLeft: 40 }}>
            <span style={styles.folderIcon}>📁</span>
            <span style={styles.folderName}>colors/</span>
          </div>
          <div style={{ ...styles.treeItem, marginLeft: 60 }}>
            <span style={styles.fileIcon}>📄</span>
            <span style={styles.fileName}>brand.ts</span>
            <span style={styles.treeDesc}>Raw color values</span>
          </div>
          <div style={{ ...styles.treeItem, marginLeft: 60 }}>
            <span style={styles.fileIcon}>📄</span>
            <span style={styles.fileName}>semantic.ts</span>
            <span style={styles.treeDesc}>Meaningful color names</span>
          </div>
          <div style={{ ...styles.treeItem, marginLeft: 20 }}>
            <span style={styles.folderIcon}>📁</span>
            <span style={styles.folderName}>styles/</span>
            <span style={styles.treeLabel}>← CSS custom properties</span>
          </div>
          <div style={{ ...styles.treeItem, marginLeft: 40 }}>
            <span style={styles.fileIcon}>📄</span>
            <span style={styles.fileName}>tokens.css</span>
            <span style={styles.treeDesc}>All CSS variables</span>
          </div>
          <div style={{ ...styles.treeItem, marginLeft: 40 }}>
            <span style={styles.fileIcon}>📄</span>
            <span style={styles.fileName}>global.css</span>
            <span style={styles.treeDesc}>Base styles</span>
          </div>
          <div style={{ ...styles.treeItem, marginLeft: 20 }}>
            <span style={styles.folderIcon}>📁</span>
            <span style={styles.folderName}>components/</span>
            <span style={styles.treeLabel}>← Component library</span>
          </div>
          <div style={{ ...styles.treeItem, marginLeft: 40 }}>
            <span style={styles.folderIcon}>📁</span>
            <span style={styles.folderName}>Button/</span>
          </div>
          <div style={{ ...styles.treeItem, marginLeft: 60 }}>
            <span style={styles.fileIcon}>📄</span>
            <span style={styles.fileName}>Button.tsx</span>
            <span style={styles.treeDesc}>React component</span>
          </div>
          <div style={{ ...styles.treeItem, marginLeft: 60 }}>
            <span style={styles.fileIcon}>📄</span>
            <span style={styles.fileName}>Button.module.css</span>
            <span style={styles.treeDesc}>Scoped styles with tokens</span>
          </div>
        </div>
      </section>

      {/* Token Categories */}
      <section style={styles.categoriesSection}>
        <h3 style={styles.sectionTitle}>Token Categories</h3>
        <div style={styles.categoryGrid}>
          <div style={styles.categoryCard}>
            <div style={{ ...styles.categoryIcon, backgroundColor: referenceColors.blue['10'] }}>🎨</div>
            <h4 style={styles.categoryTitle}>Colors</h4>
            <ul style={styles.categoryList}>
              <li>Blue scale (10-100)</li>
              <li>Gray scale (0-100)</li>
              <li>Green, Red, Yellow</li>
              <li>Purple, Orange, Teal</li>
            </ul>
          </div>
          <div style={styles.categoryCard}>
            <div style={{ ...styles.categoryIcon, backgroundColor: referenceColors.green['10'] }}>📏</div>
            <h4 style={styles.categoryTitle}>Spacing</h4>
            <ul style={styles.categoryList}>
              <li>4px increments</li>
              <li>spacing-1 to spacing-24</li>
              <li>Consistent gaps</li>
              <li>Padding & margins</li>
            </ul>
          </div>
          <div style={styles.categoryCard}>
            <div style={{ ...styles.categoryIcon, backgroundColor: referenceColors.purple['10'] }}>🔤</div>
            <h4 style={styles.categoryTitle}>Typography</h4>
            <ul style={styles.categoryList}>
              <li>Font family: Plain</li>
              <li>Sizes: 12-40px</li>
              <li>Weights: 375-600</li>
              <li>Line heights</li>
            </ul>
          </div>
          <div style={styles.categoryCard}>
            <div style={{ ...styles.categoryIcon, backgroundColor: referenceColors.yellow['10'] }}>⬜</div>
            <h4 style={styles.categoryTitle}>Radius & Shadow</h4>
            <ul style={styles.categoryList}>
              <li>Radius: 2-24px, full</li>
              <li>Shadows: xs-2xl</li>
              <li>Focus rings</li>
              <li>Elevation levels</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={styles.benefitsSection}>
        <h3 style={styles.sectionTitle}>Why This Architecture?</h3>
        <div style={styles.benefitsGrid}>
          <div style={styles.benefitCard}>
            <span style={styles.benefitIcon}>🔄</span>
            <h4 style={styles.benefitTitle}>Single Source of Truth</h4>
            <p style={styles.benefitDesc}>Change a color once in brand.ts, and it updates everywhere automatically.</p>
          </div>
          <div style={styles.benefitCard}>
            <span style={styles.benefitIcon}>🌙</span>
            <h4 style={styles.benefitTitle}>Theme Support</h4>
            <p style={styles.benefitDesc}>Semantic tokens can swap values for light/dark mode without touching components.</p>
          </div>
          <div style={styles.benefitCard}>
            <span style={styles.benefitIcon}>🧩</span>
            <h4 style={styles.benefitTitle}>Consistency</h4>
            <p style={styles.benefitDesc}>All components use the same tokens, ensuring visual harmony across the system.</p>
          </div>
          <div style={styles.benefitCard}>
            <span style={styles.benefitIcon}>🛠️</span>
            <h4 style={styles.benefitTitle}>Maintainability</h4>
            <p style={styles.benefitDesc}>Clear separation of concerns makes updates and debugging straightforward.</p>
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

  // Header
  headerSection: {
    backgroundColor: systemColors.light['background-base'],
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  pageTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '28px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: '12px',
  },
  pageDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 375,
    color: systemColors.light['content-secondary'],
    lineHeight: '24px',
    maxWidth: '800px',
  },

  // Section styles
  sectionTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '20px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: '8px',
  },
  sectionDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 375,
    color: systemColors.light['content-secondary'],
    marginBottom: '24px',
  },

  // Diagram Section
  diagramSection: {
    backgroundColor: systemColors.light['background-base'],
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  flowChart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0',
    padding: '24px 0',
  },
  layer: {
    width: '100%',
    maxWidth: '500px',
    padding: '20px 24px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 200ms ease',
    border: '2px solid transparent',
  },
  layerActive: {
    transform: 'scale(1.02)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
  brandLayer: {
    backgroundColor: referenceColors.blue['10'],
    borderColor: systemColors.light['background-information'],
  },
  semanticLayer: {
    backgroundColor: referenceColors.green['10'],
    borderColor: systemColors.light['background-success'],
  },
  componentLayer: {
    backgroundColor: referenceColors.purple['10'],
    borderColor: referenceColors.purple['20'],
  },
  layerHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '4px',
  },
  layerNumber: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: systemColors.light['content-primary'],
    color: systemColors.light['background-base'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 600,
  },
  layerTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '18px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
  },
  layerSubtitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    color: systemColors.light['content-secondary'],
    marginLeft: '40px',
    marginBottom: '12px',
  },
  layerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginLeft: '40px',
    marginBottom: '12px',
  },
  tokenExample: {
    fontFamily: '"SF Mono", "Monaco", "Inconsolata", monospace',
    fontSize: '12px',
    color: referenceColors.gray['70'],
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: '4px 8px',
    borderRadius: '4px',
    width: 'fit-content',
  },
  layerFile: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginLeft: '40px',
    fontSize: '12px',
    color: systemColors.light['content-tertiary'],
  },
  fileIcon: {
    fontSize: '14px',
  },
  arrowContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '4px 0',
  },
  arrow: {
    display: 'block',
  },
  arrowLabel: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '11px',
    color: systemColors.light['content-tertiary'],
    marginTop: '-8px',
  },

  // Details Panel
  detailsPanel: {
    marginTop: '24px',
    padding: '24px',
    backgroundColor: systemColors.light['background-sunken'],
    borderRadius: '8px',
    border: `1px solid ${systemColors.light['background-subtle']}`,
  },
  detailsTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: '8px',
  },
  detailsDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    color: systemColors.light['content-secondary'],
    lineHeight: '20px',
    marginBottom: '16px',
  },
  codeBlock: {
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: systemColors.light['content-primary'],
  },
  codeHeader: {
    padding: '8px 16px',
    backgroundColor: systemColors.light['background-raised-inverse'],
    fontFamily: '"SF Mono", "Monaco", "Inconsolata", monospace',
    fontSize: '12px',
    color: systemColors.light['border-default'],
  },
  code: {
    padding: '16px',
    margin: 0,
    fontFamily: '"SF Mono", "Monaco", "Inconsolata", monospace',
    fontSize: '13px',
    color: referenceColors.gray['30'],
    lineHeight: '20px',
    overflow: 'auto',
  },

  // Example Section
  exampleSection: {
    backgroundColor: systemColors.light['background-base'],
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  exampleFlow: {
    display: 'flex',
    alignItems: 'stretch',
    gap: '12px',
    overflowX: 'auto',
    padding: '16px 0',
  },
  exampleStep: {
    flex: '1 1 200px',
    minWidth: '180px',
    padding: '16px',
    backgroundColor: systemColors.light['background-sunken'],
    borderRadius: '8px',
    border: `1px solid ${systemColors.light['background-subtle']}`,
  },
  stepHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  stepNumber: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: systemColors.light['content-brand'],
    color: systemColors.light['background-base'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 600,
  },
  stepTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
  },
  stepContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  stepCode: {
    fontFamily: '"SF Mono", "Monaco", "Inconsolata", monospace',
    fontSize: '11px',
    color: referenceColors.gray['70'],
    backgroundColor: systemColors.light['background-base'],
    padding: '6px 8px',
    borderRadius: '4px',
    wordBreak: 'break-all',
  },
  stepArrow: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '24px',
    color: systemColors.light['border-default'],
    flexShrink: 0,
  },
  colorPreview: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: systemColors.light['content-secondary'],
  },
  colorSwatch: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    border: `1px solid ${referenceColors.gray['30']}`,
  },
  previewButton: {
    padding: '6px 16px',
    backgroundColor: systemColors.light['content-brand'],
    color: systemColors.light['background-base'],
    border: 'none',
    borderRadius: '16px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 375,
    cursor: 'pointer',
  },

  // File Structure
  structureSection: {
    backgroundColor: systemColors.light['background-base'],
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  fileTree: {
    fontFamily: '"SF Mono", "Monaco", "Inconsolata", monospace',
    fontSize: '13px',
    lineHeight: '28px',
  },
  treeItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  folderIcon: {
    fontSize: '16px',
  },
  folderName: {
    color: systemColors.light['content-primary'],
    fontWeight: 500,
  },
  fileName: {
    color: referenceColors.gray['70'],
  },
  treeLabel: {
    color: systemColors.light['content-brand'],
    fontSize: '11px',
    marginLeft: '8px',
  },
  treeDesc: {
    color: systemColors.light['content-tertiary'],
    fontSize: '11px',
    marginLeft: '8px',
  },

  // Categories
  categoriesSection: {
    backgroundColor: systemColors.light['background-base'],
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  categoryCard: {
    padding: '20px',
    backgroundColor: systemColors.light['background-sunken'],
    borderRadius: '8px',
    textAlign: 'center',
  },
  categoryIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    margin: '0 auto 12px',
  },
  categoryTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: '8px',
  },
  categoryList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    color: systemColors.light['content-secondary'],
    lineHeight: '22px',
    textAlign: 'left',
  },

  // Benefits
  benefitsSection: {
    backgroundColor: systemColors.light['content-primary'],
    borderRadius: '12px',
    padding: '32px',
  },
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
  },
  benefitCard: {
    padding: '20px',
    backgroundColor: systemColors.light['background-raised-inverse'],
    borderRadius: '8px',
  },
  benefitIcon: {
    fontSize: '28px',
    display: 'block',
    marginBottom: '12px',
  },
  benefitTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    color: systemColors.light['background-base'],
    marginBottom: '8px',
  },
  benefitDesc: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    color: systemColors.light['border-default'],
    lineHeight: '18px',
  },
};

export default ArchitectureShowcase;

