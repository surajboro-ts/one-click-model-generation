import React from 'react';
import { brandColors } from '../tokens/colors/brand';
import { Typography } from '../components/Typography';

interface TypographyExampleProps {
  variant: string;
  label: string;
  specs: string;
  sample?: string;
}

const TypographyExample: React.FC<TypographyExampleProps> = ({ variant, label, specs, sample }) => {
  return (
    <div style={styles.typographyRow}>
      <div style={styles.typographyMeta}>
        <code style={styles.variantCode}>{variant}</code>
        <span style={styles.specsLabel}>{specs}</span>
      </div>
      <div style={styles.typographySample}>
        <Typography variant={variant as any} noMargin>
          {sample || label}
        </Typography>
      </div>
    </div>
  );
};

export const TypographyPage: React.FC = () => {
  const typographyVariants = [
    { variant: 'headline-large', label: 'Headline Large', specs: '32px / 700 / -0.5px' },
    { variant: 'page-title', label: 'Page Title', specs: '24px / 600 / -0.25px' },
    { variant: 'modal-title', label: 'Modal Title', specs: '20px / 600 / 0' },
    { variant: 'section-label', label: 'Section Label', specs: '18px / 600 / 0' },
    { variant: 'content-label', label: 'Content Label', specs: '16px / 600 / 0' },
    { variant: 'content-label-med', label: 'Content Label Medium', specs: '16px / 500 / 0' },
    { variant: 'body-large', label: 'Body Large', specs: '16px / 400 / 0' },
    { variant: 'body-normal', label: 'Body Normal', specs: '14px / 400 / 0' },
    { variant: 'body-small', label: 'Body Small', specs: '13px / 400 / 0' },
    { variant: 'footnote', label: 'Footnote', specs: '12px / 400 / 0' },
    { variant: 'overline', label: 'OVERLINE', specs: '12px / 600 / 0.5px uppercase' },
    { variant: 'code', label: 'Code', specs: '13px / 500 / SF Mono' },
  ];

  const colorVariants = [
    { color: 'base', label: 'Base', hex: brandColors.gray[90] },
    { color: 'gray', label: 'Gray', hex: brandColors.gray[60] },
    { color: 'gray-light', label: 'Gray Light', hex: brandColors.gray[50] },
    { color: 'accent', label: 'Accent', hex: brandColors.blue[60] },
    { color: 'success', label: 'Success', hex: brandColors.green[60] },
    { color: 'warning', label: 'Warning', hex: brandColors.yellow[70] },
    { color: 'failure', label: 'Failure', hex: brandColors.red[60] },
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <Typography variant="headline-large" noMargin>Typography</Typography>
        <Typography variant="body-large" color="gray" style={{ marginTop: 12, maxWidth: 700 }}>
          The Radiant typography system provides consistent text styling across all components.
          Built on the "Plain" font family with a comprehensive scale from headlines to footnotes.
        </Typography>
      </div>

      {/* Font Family Section */}
      <section style={styles.section}>
        <Typography variant="modal-title" noMargin style={{ marginBottom: 16 }}>Font Family</Typography>
        <div style={styles.fontCard}>
          <div style={styles.fontPreview}>
            <span style={styles.fontSample}>Aa</span>
          </div>
          <div style={styles.fontInfo}>
            <Typography variant="content-label" noMargin>Plain</Typography>
            <Typography variant="footnote" color="gray" noMargin>
              Primary typeface for UI text, labels, and body content
            </Typography>
            <code style={styles.fontStack}>
              "Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
            </code>
          </div>
        </div>
        <div style={styles.fontCard}>
          <div style={styles.fontPreview}>
            <span style={{ ...styles.fontSample, fontFamily: '"SF Mono", Monaco, monospace' }}>Aa</span>
          </div>
          <div style={styles.fontInfo}>
            <Typography variant="content-label" noMargin>SF Mono</Typography>
            <Typography variant="footnote" color="gray" noMargin>
              Monospace font for code, tokens, and technical content
            </Typography>
            <code style={styles.fontStack}>
              "SF Mono", Monaco, Inconsolata, "Roboto Mono", monospace
            </code>
          </div>
        </div>
      </section>

      {/* Type Scale Section */}
      <section style={styles.section}>
        <Typography variant="modal-title" noMargin style={{ marginBottom: 8 }}>Type Scale</Typography>
        <Typography variant="body-normal" color="gray" noMargin style={{ marginBottom: 24 }}>
          All typography variants with their specifications (size / weight / letter-spacing)
        </Typography>
        <div style={styles.typographyList}>
          {typographyVariants.map((item) => (
            <TypographyExample
              key={item.variant}
              variant={item.variant}
              label={item.label}
              specs={item.specs}
              sample={item.label}
            />
          ))}
        </div>
      </section>

      {/* Color Variants Section */}
      <section style={styles.section}>
        <Typography variant="modal-title" noMargin style={{ marginBottom: 8 }}>Colour Variants</Typography>
        <Typography variant="body-normal" color="gray" noMargin style={{ marginBottom: 24 }}>
          Semantic colour options for text hierarchy and meaning
        </Typography>
        <div style={styles.colorGrid}>
          {colorVariants.map((item) => (
            <div key={item.color} style={styles.colorCard}>
              <Typography variant="body-normal" color={item.color as any} noMargin>
                {item.label}
              </Typography>
              <code style={styles.colorCode}>{item.hex}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Guidelines Section */}
      <section style={styles.section}>
        <Typography variant="modal-title" noMargin style={{ marginBottom: 16 }}>Usage Guidelines</Typography>
        <div style={styles.guidelinesGrid}>
          <div style={styles.guidelineCard}>
            <Typography variant="content-label" noMargin>Headlines</Typography>
            <Typography variant="footnote" color="gray" noMargin>
              Use headline-large for page headers, page-title for section headers
            </Typography>
          </div>
          <div style={styles.guidelineCard}>
            <Typography variant="content-label" noMargin>Body Text</Typography>
            <Typography variant="footnote" color="gray" noMargin>
              body-normal (14px) for most content, body-large (16px) for emphasis
            </Typography>
          </div>
          <div style={styles.guidelineCard}>
            <Typography variant="content-label" noMargin>Labels</Typography>
            <Typography variant="footnote" color="gray" noMargin>
              content-label for form labels, section-label for group headers
            </Typography>
          </div>
          <div style={styles.guidelineCard}>
            <Typography variant="content-label" noMargin>Supporting Text</Typography>
            <Typography variant="footnote" color="gray" noMargin>
              footnote for captions, overline for section dividers
            </Typography>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section style={styles.section}>
        <Typography variant="modal-title" noMargin style={{ marginBottom: 16 }}>Code Example</Typography>
        <div style={styles.codeBlock}>
          <pre style={styles.codeContent}>{`import { Typography } from '@radiant/components';

<Typography variant="page-title">Welcome to Radiant</Typography>
<Typography variant="body-normal" color="gray">
  A comprehensive design system for building consistent UIs.
</Typography>
<Typography variant="footnote" color="gray-light">
  Last updated: Today
</Typography>`}</pre>
        </div>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 1000,
  },
  header: {
    marginBottom: 40,
  },
  section: {
    marginBottom: 48,
  },
  fontCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    padding: 24,
    backgroundColor: brandColors.white,
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: 12,
    marginBottom: 12,
  },
  fontPreview: {
    width: 80,
    height: 80,
    backgroundColor: brandColors.gray[10],
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontSample: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 36,
    fontWeight: 600,
    color: brandColors.gray[90],
  },
  fontInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  fontStack: {
    fontFamily: '"SF Mono", Monaco, monospace',
    fontSize: 11,
    color: brandColors.gray[50],
    marginTop: 8,
    backgroundColor: brandColors.gray[10],
    padding: '6px 10px',
    borderRadius: 6,
  },
  typographyList: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: brandColors.white,
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: 12,
    overflow: 'hidden',
  },
  typographyRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 24px',
    borderBottom: `1px solid ${brandColors.gray[10]}`,
  },
  typographyMeta: {
    width: 240,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  variantCode: {
    fontFamily: '"SF Mono", Monaco, monospace',
    fontSize: 12,
    fontWeight: 500,
    color: brandColors.blue[60],
  },
  specsLabel: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 11,
    color: brandColors.gray[50],
  },
  typographySample: {
    flex: 1,
  },
  colorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 12,
  },
  colorCard: {
    padding: 20,
    backgroundColor: brandColors.white,
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  colorCode: {
    fontFamily: '"SF Mono", Monaco, monospace',
    fontSize: 11,
    color: brandColors.gray[50],
  },
  guidelinesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 16,
  },
  guidelineCard: {
    padding: 20,
    backgroundColor: brandColors.gray[10],
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  codeBlock: {
    backgroundColor: brandColors.gray[90],
    borderRadius: 12,
    padding: 24,
    overflow: 'auto',
  },
  codeContent: {
    fontFamily: '"SF Mono", Monaco, monospace',
    fontSize: 13,
    lineHeight: '22px',
    color: brandColors.gray[30],
    margin: 0,
  },
};

export default TypographyPage;
