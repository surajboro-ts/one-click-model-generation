import React from 'react';
import { referenceColors } from '../../../tokens/colors';

interface ImpersonationBorderProps {
  active: boolean;
  children: React.ReactNode;
}

const BORDER_COLOR = referenceColors.brand['60'];
const BORDER_WIDTH = 3;

/**
 * ImpersonationBorder
 *
 * Renders a fixed 3px blue border around the entire viewport when
 * impersonation is active. Uses pointer-events: none so underlying
 * content remains fully interactive.
 */
export const ImpersonationBorder: React.FC<ImpersonationBorderProps> = ({ active, children }) => {
  if (!active) return <>{children}</>;

  return (
    <div style={styles.wrapper}>
      <div style={styles.overlay} aria-hidden="true">
        <div style={styles.top} />
        <div style={styles.right} />
        <div style={styles.bottom} />
        <div style={styles.left} />
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
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 9999,
  },
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: BORDER_WIDTH,
    backgroundColor: BORDER_COLOR,
  },
  right: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: BORDER_WIDTH,
    backgroundColor: BORDER_COLOR,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: BORDER_WIDTH,
    backgroundColor: BORDER_COLOR,
  },
  left: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: BORDER_WIDTH,
    backgroundColor: BORDER_COLOR,
  },
};
