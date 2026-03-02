import React from 'react';
import styles from './NoData.module.css';

export interface NoDataProps {
  title?: string;
  description?: string;
  illustration?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const NoData: React.FC<NoDataProps> = ({
  title = 'No data available',
  description,
  illustration,
  action,
  className,
}) => {
  const classes = [styles.container, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {illustration && <div className={styles.illustration}>{illustration}</div>}
      {title && <p className={styles.title}>{title}</p>}
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
};

export default NoData;
