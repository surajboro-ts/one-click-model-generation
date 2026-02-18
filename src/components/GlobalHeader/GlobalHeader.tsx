import React, { forwardRef } from 'react';
import { Icon } from '../icons';
import { referenceColors } from '../../tokens/colors';
import styles from './GlobalHeader.module.css';

const THOUGHTSPOT_LOGO_PATH =
  'M21.0234 18.0469C22.6674 18.0469 24.0008 19.3795 24.001 21.0234C24.001 22.6675 22.6675 24.001 21.0234 24.001C19.3795 24.0008 18.0469 22.6674 18.0469 21.0234C18.047 19.3796 19.3796 18.047 21.0234 18.0469ZM23.8135 7.44141H15.627V23.8125H14.1387V7.44141H12.6514V23.8125H11.1631V7.44141H9.6748V23.8125H8.18652V7.44141H0V5.95312H23.8135V7.44141ZM23.8135 4.46484H0V2.97656H23.8135V4.46484ZM23.8135 1.48828H0V0H23.8135V1.48828Z';
const SEARCH_ICON_PATH =
  'M13 7.5C13 10.5376 10.5376 13 7.5 13C4.46243 13 2 10.5376 2 7.5C2 4.46243 4.46243 2 7.5 2C10.5376 2 13 4.46243 13 7.5ZM12.2798 13.2798C10.9821 14.3543 9.31644 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 9.10418 14.4964 10.5907 13.6386 11.8101L17.4142 15.5858L16 17L12.2798 13.2798Z';
const HELP_ICON_PATH =
  'M0.306085 2.70328C0.101746 3.26688 0 3.89311 0 4.58196H2.11546C2.11546 3.73012 2.2986 3.05071 2.66319 2.54458C3.02778 2.03759 3.59416 1.78367 4.3615 1.78367C4.55214 1.78961 4.74044 1.82788 4.91855 1.8969C5.13687 1.97692 5.33825 2.098 5.51207 2.25377C5.71138 2.43512 5.87233 2.65544 5.98519 2.90144C6.11491 3.16995 6.1802 3.4925 6.1802 3.86823C6.1802 4.18135 6.1395 4.44985 6.05895 4.67633C5.97925 4.90108 5.86733 5.10439 5.72574 5.2854C5.58329 5.46726 5.42219 5.63282 5.24244 5.78295C5.06354 5.93393 4.87446 6.09606 4.67691 6.27192C4.42933 6.48467 4.21566 6.69999 4.03676 6.91959C3.85701 7.13835 3.70524 7.39227 3.58145 7.67965C3.45766 7.96788 3.36863 8.30244 3.31267 8.68504C3.25671 9.06593 3.22873 10.4493 3.22873 11H5.23312C5.23312 10.5496 5.27382 9.25036 5.35436 8.93811C5.43491 8.62499 5.54853 8.3522 5.69775 8.12058C5.84489 7.89047 6.01913 7.67932 6.21666 7.49178C6.41506 7.30477 6.63127 7.11004 6.86698 6.91016C7.06454 6.73516 7.26209 6.55587 7.4605 6.37486C7.6589 6.193 7.83441 5.9897 7.98703 5.76662C8.14135 5.54438 8.26406 5.28624 8.35733 4.99373C8.45061 4.6995 8.49768 4.35634 8.49768 3.96169C8.49768 3.39723 8.39976 2.87385 8.20221 2.38903C8.00465 1.90592 7.73134 1.48453 7.38145 1.12401C7.02727 0.758313 6.60242 0.472271 6.13328 0.284676C5.60004 0.0953748 4.99495 0 4.31657 0C3.65682 0 3.06557 0.109143 2.5442 0.328611C2.02055 0.547223 1.57115 0.859471 1.19429 1.26469C0.817438 1.6682 0.521816 2.14874 0.306085 2.70328Z';
const BELL_ICON_PATH =
  'M14.809 11.7122C13.5183 11.0551 12.7668 9.7408 12.7668 8.28587V6.05578V5.8679C12.7668 3.45093 11.1004 1.69013 8.84765 1.22077V1.19717C8.84765 0.540043 8.30761 0 7.65048 0C6.99335 0 6.45331 0.540043 6.45331 1.19717V1.22077C4.20054 1.69001 2.53415 3.45086 2.53415 5.8679V6.05578V8.30855C2.53415 9.78711 1.73633 11.0315 0.44566 11.7586C0.187883 11.8993 0 12.275 0 12.6272C0 13.1437 0.422052 13.5893 0.962096 13.5893H14.387C14.9034 13.5893 15.3491 13.1672 15.3491 12.6272C15.3019 12.2288 15.0904 11.8529 14.809 11.7122Z';

const classNames = (...values: Array<string | undefined | false>): string =>
  values.filter(Boolean).join(' ');

const hexToRgba = (hex: string, alpha: number): string => {
  const normalized = hex.replace('#', '');
  const int = Number.parseInt(normalized, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export interface GlobalHeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  onLogoClick?: () => void;
  searchPlaceholder?: string;
  searchMode?: 'trigger' | 'input';
  onSearchClick?: () => void;
  onSearchChange?: (query: string) => void;
  searchValue?: string;
  showKeyboardHint?: boolean;
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  showHamburger?: boolean;
  onHamburgerClick?: () => void;
  onHelpClick?: () => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  showDefaultActions?: boolean;
  rightSlot?: React.ReactNode;
}

export const GlobalHeader = forwardRef<HTMLElement, GlobalHeaderProps>(
  (
    {
      logo,
      onLogoClick,
      searchPlaceholder = 'Search in ThoughtSpot',
      searchMode = 'trigger',
      onSearchClick,
      onSearchChange,
      searchValue = '',
      showKeyboardHint = true,
      userName = 'Workspace',
      userAvatar,
      notificationCount = 0,
      showHamburger = false,
      onHamburgerClick,
      onHelpClick,
      onNotificationClick,
      onProfileClick,
      showDefaultActions = true,
      rightSlot,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const tokenStyles = {
      '--gh-bg': referenceColors.gray['90'],
      '--gh-border': referenceColors.gray['80'],
      '--gh-surface': '#232f43',
      '--gh-surface-hover': '#2f3a4e',
      '--gh-active': referenceColors.brand['50'],
      '--gh-text': referenceColors.gray['30'],
      '--gh-muted': referenceColors.gray['50'],
      '--gh-subtle': referenceColors.gray['60'],
      '--gh-danger': referenceColors.red['60'],
      '--gh-focus': referenceColors.brand['60'],
      '--gh-hover-ring': hexToRgba(referenceColors.brand['50'], 0.28),
    } as React.CSSProperties;

    const mergedStyle: React.CSSProperties = {
      ...tokenStyles,
      ...style,
    };

    return (
      <header ref={ref} className={classNames(styles.header, className)} style={mergedStyle} {...props}>
        <div className={styles.leftSection}>
          {showHamburger && (
            <button
              type="button"
              className={styles.iconButton}
              onClick={onHamburgerClick}
              aria-label="Toggle sidebar"
            >
              <Icon name="hamburger" size="m" color="var(--gh-text)" />
            </button>
          )}

          <button type="button" className={styles.logoButton} onClick={onLogoClick} aria-label="Go to home">
            {logo ?? (
              <svg className={styles.logo} fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path d={THOUGHTSPOT_LOGO_PATH} fill={referenceColors.gray['00']} />
              </svg>
            )}
          </button>
        </div>

        <div className={styles.rightSection}>
          {searchMode === 'input' ? (
            <label className={styles.searchField}>
              <span className={styles.searchIcon} aria-hidden="true">
                <svg fill="none" viewBox="0 0 18 17">
                  <path d={SEARCH_ICON_PATH} fill="currentColor" />
                </svg>
              </span>
              <input
                type="text"
                value={searchValue}
                onChange={(event) => onSearchChange?.(event.target.value)}
                placeholder={searchPlaceholder}
                className={styles.searchInput}
                aria-label={searchPlaceholder}
              />
            </label>
          ) : (
            <button type="button" className={styles.searchTrigger} onClick={onSearchClick} aria-label={searchPlaceholder}>
              <span className={styles.searchIcon} aria-hidden="true">
                <svg fill="none" viewBox="0 0 18 17">
                  <path d={SEARCH_ICON_PATH} fill="currentColor" />
                </svg>
              </span>
              <span className={styles.searchPlaceholder}>{searchPlaceholder}</span>
              {showKeyboardHint && <kbd className={styles.keyboardHint}>Cmd+K</kbd>}
            </button>
          )}

          {showDefaultActions && (
            <>
              <button type="button" className={styles.circleButton} onClick={onHelpClick} aria-label="Help">
                <svg className={styles.helpIcon} fill="none" viewBox="0 0 9 16" aria-hidden="true">
                  <path d={HELP_ICON_PATH} fill="currentColor" />
                  <path d="M5.2 13H3.2V16H5.2V13Z" fill="currentColor" />
                </svg>
              </button>

              <button
                type="button"
                className={styles.circleButton}
                onClick={onNotificationClick}
                aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount})` : ''}`}
              >
                <svg className={styles.notificationIcon} fill="none" viewBox="0 0 16 14" aria-hidden="true">
                  <path d={BELL_ICON_PATH} fill="currentColor" />
                </svg>
                {notificationCount > 0 && <span className={styles.notificationDot} />}
              </button>

              <button type="button" className={styles.profileButton} onClick={onProfileClick} aria-label="Profile menu">
                <span className={styles.profileName}>{userName}</span>
                <Icon name="chevron-down" size="s" color="var(--gh-text)" aria-hidden />
                {userAvatar ? (
                  <img src={userAvatar} alt="" className={styles.avatar} />
                ) : (
                  <span className={styles.avatarFallback} aria-hidden>
                    <Icon name="profile" size="m" color="var(--gh-text)" />
                  </span>
                )}
              </button>
            </>
          )}

          {rightSlot}
        </div>
      </header>
    );
  },
);

GlobalHeader.displayName = 'GlobalHeader';

export default GlobalHeader;
