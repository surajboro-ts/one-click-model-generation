import { CSSProperties } from 'react';
import { systemColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

export const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: systemColors.light['background-sunken'],
  },
  content: {
    padding: `${spacing.H}px`,
    maxWidth: '1200px',
    margin: '0 auto',
  },
};
