import React from 'react';
import { brandColors } from '../tokens/colors/brand';

interface ComponentCardProps {
  name: string;
  description: string;
  icon: string;
  variants: number;
  status: 'stable' | 'beta' | 'new';
  onClick: () => void;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  name,
  description,
  icon,
  variants,
  status,
  onClick,
}) => {
  const statusColors = {
    stable: { bg: '#06BF7F1A', text: '#06BF7F' },
    beta: { bg: '#F5A6231A', text: '#F5A623' },
    new: { bg: '#2770EF1A', text: '#2770EF' },
  };

  return (
    <button onClick={onClick} style={styles.card}>
      <div style={styles.cardIcon}>{icon}</div>
      <div style={styles.cardContent}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>{name}</h3>
          <span
            style={{
              ...styles.cardStatus,
              backgroundColor: statusColors[status].bg,
              color: statusColors[status].text,
            }}
          >
            {status}
          </span>
        </div>
        <p style={styles.cardDescription}>{description}</p>
        <div style={styles.cardMeta}>
          <span style={styles.cardVariants}>{variants} variant{variants !== 1 ? 's' : ''}</span>
        </div>
      </div>
      <div style={styles.cardArrow}>→</div>
    </button>
  );
};

interface RadiantHomePageProps {
  onNavigate: (id: string) => void;
}

export const RadiantHomePage: React.FC<RadiantHomePageProps> = ({ onNavigate }) => {
  // All 30 components organized by category
  const componentCategories = [
    {
      category: 'Selection Controls',
      components: [
        { id: 'button', name: 'Button', description: 'Primary, secondary, and tertiary buttons', icon: '🔘', variants: 3, status: 'stable' as const },
        { id: 'checkbox', name: 'Checkbox', description: 'Selection for multiple choices', icon: '☑️', variants: 3, status: 'stable' as const },
        { id: 'radio', name: 'Radio', description: 'Single selection from options', icon: '🔘', variants: 2, status: 'stable' as const },
        { id: 'toggle', name: 'Toggle', description: 'Switch for on/off states', icon: '🔀', variants: 2, status: 'stable' as const },
      ],
    },
    {
      category: 'Inputs',
      components: [
        { id: 'textinput', name: 'TextInput', description: 'Text input with validation', icon: '📝', variants: 3, status: 'stable' as const },
        { id: 'textarea', name: 'TextArea', description: 'Multi-line text input', icon: '📄', variants: 2, status: 'new' as const },
        { id: 'searchinput', name: 'SearchInput', description: 'Search with clear button', icon: '🔍', variants: 1, status: 'stable' as const },
        { id: 'select', name: 'Select', description: 'Dropdown selection', icon: '📋', variants: 3, status: 'stable' as const },
        { id: 'datepicker', name: 'DatePicker', description: 'Date selection calendar', icon: '📅', variants: 2, status: 'new' as const },
        { id: 'segmentedcontrol', name: 'SegmentedControl', description: 'Mutually exclusive segments', icon: '🔲', variants: 3, status: 'new' as const },
      ],
    },
    {
      category: 'Feedback',
      components: [
        { id: 'alert', name: 'Alert', description: 'Notification banners', icon: '⚠️', variants: 5, status: 'stable' as const },
        { id: 'toast', name: 'Toast', description: 'Temporary notifications', icon: '🍞', variants: 4, status: 'new' as const },
        { id: 'modal', name: 'Modal', description: 'Overlay dialogs', icon: '🪟', variants: 3, status: 'stable' as const },
        { id: 'tooltip', name: 'Tooltip', description: 'Hover information', icon: '💬', variants: 4, status: 'stable' as const },
        { id: 'popover', name: 'Popover', description: 'Interactive overlays', icon: '📌', variants: 2, status: 'stable' as const },
        { id: 'loadingindicator', name: 'LoadingIndicator', description: 'Spinners and skeletons', icon: '⏳', variants: 5, status: 'new' as const },
        { id: 'progressbar', name: 'ProgressBar', description: 'Progress visualization', icon: '📊', variants: 4, status: 'new' as const },
      ],
    },
    {
      category: 'Data Display',
      components: [
        { id: 'table', name: 'Table', description: 'Data tables with sorting', icon: '📊', variants: 3, status: 'stable' as const },
        { id: 'chip', name: 'Chip', description: 'Attribute and filter pills', icon: '🏷️', variants: 4, status: 'stable' as const },
        { id: 'avatar', name: 'Avatar', description: 'User avatars and groups', icon: '👤', variants: 6, status: 'new' as const },
      ],
    },
    {
      category: 'Navigation',
      components: [
        { id: 'tabs', name: 'Tabs', description: 'Content organization tabs', icon: '📑', variants: 2, status: 'stable' as const },
        { id: 'link', name: 'Link', description: 'Navigation links', icon: '🔗', variants: 4, status: 'new' as const },
        { id: 'menu', name: 'Menu', description: 'Dropdown action menus', icon: '📜', variants: 2, status: 'new' as const },
        { id: 'pagination', name: 'Pagination', description: 'Page navigation', icon: '📖', variants: 3, status: 'new' as const },
        { id: 'stepper', name: 'Stepper', description: 'Multi-step progress', icon: '🚶', variants: 2, status: 'new' as const },
      ],
    },
    {
      category: 'Layout',
      components: [
        { id: 'card', name: 'Card', description: 'Content containers', icon: '🃏', variants: 3, status: 'new' as const },
        { id: 'accordion', name: 'Accordion', description: 'Collapsible sections', icon: '📂', variants: 3, status: 'new' as const },
        { id: 'divider', name: 'Divider', description: 'Content separators', icon: '➖', variants: 2, status: 'new' as const },
      ],
    },
    {
      category: 'Typography',
      components: [
        { id: 'typography', name: 'Typography', description: 'Text variants and styles', icon: '🔤', variants: 20, status: 'new' as const },
      ],
    },
  ];

  // Flatten for backward compatibility
  const components = componentCategories.flatMap(cat => cat.components);

  const stats = [
    { label: 'Components', value: '30', icon: '🧩' },
    { label: 'Widgets', value: '5', icon: '🎛️' },
    { label: 'Design Tokens', value: '150+', icon: '🎯' },
    { label: 'TypeScript', value: '100%', icon: '💪' },
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            <span style={styles.heroBadgeIcon}>✨</span>
            <span>Design System v1.0</span>
          </div>
          <h1 style={styles.heroTitle}>Radiant</h1>
          <p style={styles.heroSubtitle}>
            A comprehensive React component library built with TypeScript. 
            Designed for consistency, accessibility, and developer experience.
          </p>
          <div style={styles.heroActions}>
            <button 
              style={styles.primaryButton}
              onClick={() => onNavigate('button')}
            >
              Browse Components
            </button>
            <button 
              style={styles.secondaryButton}
              onClick={() => onNavigate('architecture')}
            >
              Token Architecture
            </button>
          </div>
        </div>
        <div style={styles.heroVisual}>
          <div style={styles.heroPattern} />
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <span style={styles.statIcon}>{stat.icon}</span>
            <span style={styles.statValue}>{stat.value}</span>
            <span style={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Token Architecture Section */}
      <section style={styles.tokenSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Token Architecture</h2>
          <p style={styles.sectionDescription}>
            A 3-tier token system that powers consistent visual language across all components
          </p>
        </div>
        <div style={styles.tokenFlow}>
          <div style={styles.tokenLayer} onClick={() => onNavigate('colours')}>
            <div style={{ ...styles.tokenLayerIcon, backgroundColor: brandColors.blue[10] }}>
              <span style={{ color: brandColors.blue[60], fontSize: '20px' }}>1</span>
            </div>
            <div style={styles.tokenLayerContent}>
              <h4 style={styles.tokenLayerTitle}>Brand Tokens</h4>
              <p style={styles.tokenLayerDesc}>Primitive color values: blue.60, gray.90, green.60</p>
            </div>
          </div>
          <div style={styles.tokenArrow}>→</div>
          <div style={styles.tokenLayer} onClick={() => onNavigate('architecture')}>
            <div style={{ ...styles.tokenLayerIcon, backgroundColor: brandColors.green[10] }}>
              <span style={{ color: brandColors.green[60], fontSize: '20px' }}>2</span>
            </div>
            <div style={styles.tokenLayerContent}>
              <h4 style={styles.tokenLayerTitle}>Semantic Tokens</h4>
              <p style={styles.tokenLayerDesc}>Meaningful names: --color-primary, --color-success</p>
            </div>
          </div>
          <div style={styles.tokenArrow}>→</div>
          <div style={styles.tokenLayer} onClick={() => onNavigate('button')}>
            <div style={{ ...styles.tokenLayerIcon, backgroundColor: brandColors.purple[10] }}>
              <span style={{ color: brandColors.purple[60], fontSize: '20px' }}>3</span>
            </div>
            <div style={styles.tokenLayerContent}>
              <h4 style={styles.tokenLayerTitle}>Component Tokens</h4>
              <p style={styles.tokenLayerDesc}>Component-specific: --button-bg, --input-border</p>
            </div>
          </div>
        </div>
        <button style={styles.tokenCTA} onClick={() => onNavigate('architecture')}>
          View Full Token Architecture →
        </button>
      </section>

      {/* Components Grid - Organized by Category */}
      <section style={styles.componentsSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Components</h2>
          <p style={styles.sectionDescription}>
            Explore all {components.length} components with live examples and documentation
          </p>
        </div>
        {componentCategories.map((category) => (
          <div key={category.category} style={styles.categorySection}>
            <h3 style={styles.categoryTitle}>{category.category}</h3>
            <div style={styles.componentsGrid}>
              {category.components.map((component) => (
                <ComponentCard
                  key={component.id}
                  name={component.name}
                  description={component.description}
                  icon={component.icon}
                  variants={component.variants}
                  status={component.status}
                  onClick={() => onNavigate(component.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Quick Links */}
      <section style={styles.quickLinksSection}>
        <div style={styles.quickLinkCard} onClick={() => onNavigate('colours')}>
          <div style={styles.quickLinkIcon}>🎨</div>
          <div style={styles.quickLinkContent}>
            <h3 style={styles.quickLinkTitle}>Colour System</h3>
            <p style={styles.quickLinkDescription}>
              Explore the complete colour palette with 8 scales and usage guidelines.
            </p>
          </div>
        </div>
        <div style={styles.quickLinkCard} onClick={() => onNavigate('typography')}>
          <div style={styles.quickLinkIcon}>🔤</div>
          <div style={styles.quickLinkContent}>
            <h3 style={styles.quickLinkTitle}>Typography</h3>
            <p style={styles.quickLinkDescription}>
              Typography system with 20+ variants for consistent text styling.
            </p>
          </div>
        </div>
        <div style={styles.quickLinkCard} onClick={() => onNavigate('icons')}>
          <div style={styles.quickLinkIcon}>⭐</div>
          <div style={styles.quickLinkContent}>
            <h3 style={styles.quickLinkTitle}>Icons</h3>
            <p style={styles.quickLinkDescription}>
              Browse 46 carefully crafted icons with searchable gallery.
            </p>
          </div>
        </div>
        <div style={styles.quickLinkCard} onClick={() => onNavigate('registry')}>
          <div style={styles.quickLinkIcon}>📋</div>
          <div style={styles.quickLinkContent}>
            <h3 style={styles.quickLinkTitle}>Component Registry</h3>
            <p style={styles.quickLinkDescription}>
              Full component status, source, and implementation details.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  // Hero
  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '60px',
    padding: '60px',
    background: 'linear-gradient(135deg, #1A1F2E 0%, #0F1419 100%)',
    borderRadius: '24px',
    marginBottom: '32px',
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    flex: 1,
    zIndex: 1,
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: 'rgba(39, 112, 239, 0.15)',
    borderRadius: '20px',
    marginBottom: '24px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    fontWeight: 500,
    color: '#5B9AFF',
  },
  heroBadgeIcon: {
    fontSize: '14px',
  },
  heroTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '64px',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '16px',
    letterSpacing: '-2px',
    background: 'linear-gradient(135deg, #ffffff 0%, #A5ACB9 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '18px',
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: '28px',
    maxWidth: '480px',
    marginBottom: '32px',
  },
  heroActions: {
    display: 'flex',
    gap: '16px',
  },
  primaryButton: {
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #2770EF 0%, #1E5BBB 100%)',
    border: 'none',
    borderRadius: '12px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '15px',
    fontWeight: 500,
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    boxShadow: '0 4px 16px rgba(39, 112, 239, 0.4)',
  },
  secondaryButton: {
    padding: '14px 28px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '15px',
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.8)',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  heroVisual: {
    width: '300px',
    height: '300px',
    position: 'relative',
  },
  heroPattern: {
    width: '100%',
    height: '100%',
    background: `
      radial-gradient(circle at 50% 50%, rgba(39, 112, 239, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(39, 112, 239, 0.2) 0%, transparent 40%),
      radial-gradient(circle at 20% 80%, rgba(6, 191, 127, 0.2) 0%, transparent 40%)
    `,
    borderRadius: '50%',
    animation: 'pulse 4s ease-in-out infinite',
  },

  // Stats
  statsSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '48px',
  },
  statCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '24px',
    background: brandColors.white,
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  },
  statIcon: {
    fontSize: '28px',
  },
  statValue: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '32px',
    fontWeight: 700,
    color: brandColors.gray[90],
  },
  statLabel: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    fontWeight: 500,
    color: brandColors.gray[50],
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },

  // Token Architecture
  tokenSection: {
    marginBottom: '48px',
    padding: '32px',
    backgroundColor: brandColors.white,
    borderRadius: '20px',
    border: `1px solid ${brandColors.gray[20]}`,
  },
  tokenFlow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    marginBottom: '24px',
  },
  tokenLayer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    backgroundColor: brandColors.gray[10],
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 200ms ease',
  },
  tokenLayerIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
  },
  tokenLayerContent: {
    flex: 1,
  },
  tokenLayerTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    color: brandColors.gray[90],
    margin: 0,
    marginBottom: '4px',
  },
  tokenLayerDesc: {
    fontFamily: '"SF Mono", Monaco, monospace',
    fontSize: '11px',
    color: brandColors.gray[50],
    margin: 0,
  },
  tokenArrow: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '24px',
    color: brandColors.gray[30],
  },
  tokenCTA: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: `1px solid ${brandColors.gray[30]}`,
    borderRadius: '8px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    fontWeight: 500,
    color: brandColors.gray[70],
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },

  // Components
  componentsSection: {
    marginBottom: '48px',
  },
  sectionHeader: {
    marginBottom: '24px',
  },
  sectionTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '28px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '8px',
  },
  sectionDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    color: brandColors.gray[50],
  },
  categorySection: {
    marginBottom: '32px',
  },
  categoryTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    color: brandColors.gray[60],
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  componentsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    background: brandColors.white,
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 200ms ease',
    textAlign: 'left',
  },
  cardIcon: {
    fontSize: '32px',
    width: '56px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: brandColors.gray[10],
    borderRadius: '12px',
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '6px',
  },
  cardTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    color: brandColors.gray[90],
    margin: 0,
  },
  cardStatus: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '10px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: '3px 8px',
    borderRadius: '6px',
  },
  cardDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    fontWeight: 400,
    color: brandColors.gray[50],
    margin: 0,
    marginBottom: '8px',
    lineHeight: '18px',
  },
  cardMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  cardVariants: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    color: brandColors.gray[40],
  },
  cardArrow: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '20px',
    color: brandColors.gray[30],
    transition: 'all 200ms ease',
  },

  // Quick Links
  quickLinksSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  quickLinkCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px',
    padding: '28px',
    background: `linear-gradient(135deg, ${brandColors.gray[10]} 0%, ${brandColors.white} 100%)`,
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 200ms ease',
  },
  quickLinkIcon: {
    fontSize: '40px',
  },
  quickLinkContent: {
    flex: 1,
  },
  quickLinkTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '18px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '8px',
  },
  quickLinkDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    color: brandColors.gray[50],
    lineHeight: '22px',
    margin: 0,
  },
};

export default RadiantHomePage;
