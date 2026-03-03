import React from 'react';
import { systemColors } from '../../../tokens/colors';
import { spacing } from '../../../tokens/spacing';
import { fontFamily, fontWeight, fontSize, lineHeight } from '../../../tokens/typography';
import { IconButton } from './IconButton';
import { chatHistory } from '../data/mockData';

export const ChatSidebar: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.title}>My Chats</span>
        <div style={styles.headerActions}>
          <IconButton icon="plus" aria-label="New chat" size="sm" />
          <IconButton icon="chevron-left" aria-label="Toggle panel" size="sm" />
        </div>
      </div>

      <div style={styles.listContainer}>
        {chatHistory.map((section) => (
          <div key={section.title} style={styles.section}>
            <div style={styles.sectionHeader}>{section.title}</div>
            {section.items.map((item) => (
              <div
                key={item.id}
                style={{
                  ...styles.listItem,
                  ...(item.active ? styles.listItemActive : {}),
                }}
              >
                <span
                  style={{
                    ...styles.listItemText,
                    ...(item.active ? styles.listItemTextActive : {}),
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: 304,
    backgroundColor: systemColors.light['background-base'],
    borderRight: `1px solid ${systemColors.light['border-divider']}`,
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    height: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.E}px ${spacing.F}px`,
  },
  title: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    lineHeight: `${lineHeight.lg}px`,
    color: systemColors.light['content-primary'],
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`,
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.C}px`,
    overflowY: 'auto',
    flex: 1,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
  },
  sectionHeader: {
    fontFamily: fontFamily.primary,
    fontSize: 10,
    fontWeight: 700,
    lineHeight: `${lineHeight.md}px`,
    letterSpacing: '0.6px',
    textTransform: 'uppercase' as const,
    color: systemColors.light['content-secondary'],
    padding: `6px ${spacing.F}px`,
  },
  listItem: {
    padding: `6px ${spacing.F}px`,
    cursor: 'pointer',
    borderRadius: 0,
  },
  listItemActive: {
    backgroundColor: 'rgba(113, 161, 244, 0.12)',
  },
  listItemText: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.light,
    lineHeight: `${lineHeight.md}px`,
    color: systemColors.light['content-primary'],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
    display: 'block',
  },
  listItemTextActive: {
    fontWeight: fontWeight.medium,
    color: systemColors.light['content-brand'],
  },
};

export default ChatSidebar;
