import React from 'react';
import styles from './SafeHTML.module.css';

export interface SafeHTMLProps {
  html: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}

function sanitize(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '');
}

export const SafeHTML: React.FC<SafeHTMLProps> = ({
  html,
  as: Tag = 'div',
  className,
}) => {
  const classes = [styles.container, className].filter(Boolean).join(' ');

  return (
    <Tag
      className={classes}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: sanitize(html) }}
    />
  );
};

export default SafeHTML;
