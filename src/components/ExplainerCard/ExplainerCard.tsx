import React from 'react';
import styles from './ExplainerCard.module.css';

export interface ExplainerCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  variant?: 'default' | 'highlighted';
  className?: string;
}

export const ExplainerCard: React.FC<ExplainerCardProps> = ({
  icon,
  title,
  description,
  action,
  variant = 'default',
  className,
}) => {
  const classes = [
    styles.card,
    variant === 'highlighted' && styles.highlighted,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
};

export default ExplainerCard;
