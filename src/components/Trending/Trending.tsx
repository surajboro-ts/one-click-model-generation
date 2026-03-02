import React from 'react';
import styles from './Trending.module.css';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface TrendingItem {
  id: string;
  label: string;
  count?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface TrendingSectionData {
  title: string;
  items: TrendingItem[];
}

export interface TrendingProps {
  sections?: TrendingSectionData[];
  items?: TrendingItem[];
  maxItems?: number;
  className?: string;
}

export interface TrendingSectionProps {
  title: string;
  items: TrendingItem[];
  maxItems?: number;
}

// ─── Trend arrows ──────────────────────────────────────────────────────────

const TrendUpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2 9L10 3M10 3H5M10 3V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrendDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2 3L10 9M10 9H5M10 9V4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrendNeutralIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Single trending item row ──────────────────────────────────────────────

const TrendingItemRow: React.FC<{ item: TrendingItem; index: number }> = ({ item, index }) => {
  const trendIcon = item.trend === 'up'
    ? <TrendUpIcon />
    : item.trend === 'down'
    ? <TrendDownIcon />
    : item.trend === 'neutral'
    ? <TrendNeutralIcon />
    : null;

  const trendClass = item.trend === 'up'
    ? styles.trendUp
    : item.trend === 'down'
    ? styles.trendDown
    : styles.trendNeutral;

  const rowClasses = [styles.item, item.onClick && styles.clickable].filter(Boolean).join(' ');

  return (
    <div
      className={rowClasses}
      onClick={item.onClick}
      role={item.onClick ? 'button' : undefined}
      tabIndex={item.onClick ? 0 : undefined}
      onKeyDown={
        item.onClick
          ? (e) => { if (e.key === 'Enter' || e.key === ' ') item.onClick?.(); }
          : undefined
      }
      aria-label={item.onClick ? item.label : undefined}
    >
      {/* Icon or numbered index */}
      <div className={styles.itemPrefix}>
        {item.icon ? (
          <span className={styles.itemIcon}>{item.icon}</span>
        ) : (
          <span className={styles.itemIndex}>{index + 1}</span>
        )}
      </div>

      {/* Label */}
      <span className={styles.itemLabel}>{item.label}</span>

      {/* Count badge */}
      {item.count !== undefined && (
        <span className={styles.countBadge}>{item.count.toLocaleString()}</span>
      )}

      {/* Trend arrow */}
      {trendIcon && (
        <span className={[styles.trendIcon, trendClass].join(' ')}>
          {trendIcon}
        </span>
      )}
    </div>
  );
};

// ─── TrendingSection ────────────────────────────────────────────────────────

export const TrendingSection: React.FC<TrendingSectionProps> = ({ title, items, maxItems }) => {
  const visibleItems = maxItems !== undefined ? items.slice(0, maxItems) : items;

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>{title}</div>
      <div className={styles.itemList}>
        {visibleItems.map((item, index) => (
          <TrendingItemRow key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

TrendingSection.displayName = 'TrendingSection';

// ─── Trending (root) ───────────────────────────────────────────────────────

const TrendingBase: React.FC<TrendingProps> = ({ sections, items, maxItems, className }) => {
  const containerClasses = [styles.container, className].filter(Boolean).join(' ');

  // If sections provided, render multiple TrendingSection
  if (sections && sections.length > 0) {
    return (
      <div className={containerClasses}>
        {sections.map((section, i) => (
          <TrendingSection
            key={i}
            title={section.title}
            items={section.items}
            maxItems={maxItems}
          />
        ))}
      </div>
    );
  }

  // If flat items provided, render a single unsectioned list
  if (items && items.length > 0) {
    const visibleItems = maxItems !== undefined ? items.slice(0, maxItems) : items;
    return (
      <div className={containerClasses}>
        <div className={styles.itemList}>
          {visibleItems.map((item, index) => (
            <TrendingItemRow key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    );
  }

  return <div className={containerClasses} />;
};

TrendingBase.displayName = 'Trending';

// ─── Compound type ──────────────────────────────────────────────────────────

type TrendingComponent = React.FC<TrendingProps> & {
  Section: typeof TrendingSection;
};

export const Trending = TrendingBase as TrendingComponent;
Trending.Section = TrendingSection;

export default Trending;
