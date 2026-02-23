import React from 'react';
import { Button } from '../../../components/Button';
import { Typography } from '../../../components/Typography';
import { systemColors } from '../../../tokens/colors';
import { spacing } from '../../../tokens/spacing';
import { fontFamily } from '../../../tokens/typography';

interface ImpersonationPopupProps {
  userName: string;
  elapsedTime: string;
  onExitSession: () => void;
}

/**
 * ImpersonationPopup — displayed inside a <Popover> component.
 * No backdrop or absolute positioning here; Popover handles that.
 */
export const ImpersonationPopup: React.FC<ImpersonationPopupProps> = ({
  userName,
  elapsedTime,
  onExitSession,
}) => {
  return (
    <div style={styles.container}>
      {/* Info section */}
      <div style={styles.infoSection}>
        <Typography variant="body-normal" noMargin style={{ color: systemColors.light['content-secondary'] }}>
          Acting as
        </Typography>
        <div style={styles.detailsRow}>
          <Typography variant="content-label" noMargin style={{ color: systemColors.light['content-primary'] }}>
            &lt;{userName}&gt;
          </Typography>
          <span style={styles.timer}>{elapsedTime}</span>
        </div>
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Action */}
      <div style={styles.actionsSection}>
        <Button
          variant="primary"
          size="basic"
          fullWidth
          onClick={onExitSession}
        >
          Exit session
        </Button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: 246,
    fontFamily: fontFamily.primary,
  },
  infoSection: {
    padding: `${spacing.E}px ${spacing.D}px ${spacing.D}px`,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.B,
  },
  detailsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.B,
  },
  timer: {
    fontFamily: fontFamily.primary,
    fontSize: 16,
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    lineHeight: '24px',
    fontVariantNumeric: 'tabular-nums',
  },
  divider: {
    height: 1,
    backgroundColor: systemColors.light['border-divider'],
    margin: `0 ${spacing.D}px`,
  },
  actionsSection: {
    padding: spacing.D,
  },
};
