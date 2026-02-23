import React from 'react';
import { referenceColors } from '../../../tokens/colors';

interface ImpersonationBorderProps {
  active: boolean;
  children: React.ReactNode;
}

const BORDER_COLOR = referenceColors.brand['60'];
const BORDER_WIDTH = 3;

export const ImpersonationBorder: React.FC<ImpersonationBorderProps> = ({ active, children }) => {
  if (!active) return <>{children}</>;

  return (
    <div style={styles.wrapper}>
      <div style={styles.borderOverlay}>
        <div style={styles.borderTop} />
        <div style={styles.borderRight} />
        <div style={styles.borderBottom} />
        <div style={styles.borderLeft} />
      </div>
      {children}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  borderOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 9999,
  },
  borderTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: BORDER_WIDTH,
    backgroundColor: BORDER_COLOR,
  },
  borderRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: BORDER_WIDTH,
    backgroundColor: BORDER_COLOR,
  },
  borderBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: BORDER_WIDTH,
    backgroundColor: BORDER_COLOR,
  },
  borderLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: BORDER_WIDTH,
    backgroundColor: BORDER_COLOR,
  },
};
