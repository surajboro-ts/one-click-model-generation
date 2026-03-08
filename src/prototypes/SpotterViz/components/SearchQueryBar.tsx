import React from 'react';
import { Icon } from '../../../components/icons';
import styles from './SearchQueryBar.module.css';

export const SearchQueryBar: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <div className={styles.source}>
          <span className={styles.sourceIcon}>
            <Icon name="hamburger" size="s" />
          </span>
          <span className={styles.divider} />
          <span className={styles.sourceName}>Retail Apparel</span>
          <Icon name="chevron-down" size="s" color="#777E8B" />
        </div>

        <span className={styles.divider} />

        <div className={styles.tokens}>
          <Icon name="search" size="s" color="#777E8B" />
          <span className={`${styles.token} ${styles.tokenBlue}`}>Product</span>
          <span className={`${styles.token} ${styles.tokenGreen}`}>Total sales</span>
          <span className={`${styles.token} ${styles.tokenGray}`}>Monthly</span>
        </div>

        <button type="button" className={styles.goButton}>Go</button>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.actionBtn} aria-label="Undo">
          <Icon name="undo" size="s" />
        </button>
        <button type="button" className={styles.actionBtn} aria-label="Redo">
          <Icon name="redo" size="s" />
        </button>
        <button type="button" className={styles.actionBtn} aria-label="Reset">
          <Icon name="reset" size="s" />
        </button>
      </div>
    </div>
  );
};

export default SearchQueryBar;
