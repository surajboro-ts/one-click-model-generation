import React from 'react';
import { Button } from '../../../components/Button';
import { Typography } from '../../../components/Typography';
import { systemColors } from '../../../tokens/colors';
import { spacing } from '../../../tokens/spacing';
import { fontFamily } from '../../../tokens/typography';

interface ImpersonationPopupProps {
  /** Name of the user being impersonated */
  userName: string;
  /** Live session elapsed time formatted as HH:MM:SS */
  elapsedTime: string;
  /** Called when admin clicks "Exit session" */
  onExitSession: () => void;
}

/**
 * ImpersonationPopup
 *
 * Popup content displayed inside a <Popover> component — it owns no
 * backdrop or absolute positioning of its own.
 *
 * Shows:
 *   - "Acting as" label
 *   - Impersonated user name
 *   - Live session timer
 *   - "Exit session" primary button
 */
export const ImpersonationPopup: React.FC<ImpersonationPopupProps> = ({
  userName,
  elapsedTime,
  onExitSession,
}) => (
  <div style={styles.container}>
    {/* Info section */}
    <div style={styles.infoSection}>
      <Typography
        variant="body-normal"
        noMargin
        style={{ color: systemColors.light['content-secondary'] }}
      >
        Acting as
      </Typography>

      <div style={styles.detailsRow}>
        <Typography
          variant="content-label"
          noMargin
          style={{ color: systemColors.light['content-primary'] }}
        >
          &lt;{userName}&gt;
        </Typography>
        <span style={styles.timer}>{elapsedTime}</span>
      </div>
    </div>

    {/* Divider */}
    <div style={styles.divider} />

    {/* Action */}
    <div style={styles.actionsSection}>
      <Button variant="primary" size="basic" fullWidth onClick={onExitSession}>
        Exit session
      </Button>
    </div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: 260,
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
    flexShrink: 0,
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
