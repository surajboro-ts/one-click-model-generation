import React, { useState } from 'react';
import { RdModal } from '@components/RdModal';
import { Card } from '@components/Card';
import { Icon } from '@components/icons';
import { systemColors } from '@tokens/colors';
import { spacing } from '@tokens/spacing';
import { fontSize, fontWeight } from '@tokens/typography';

type CardId = 'build' | 'semantic' | 'dbt' | 'tml' | 'datasets';

interface OptionCardConfig {
  id: CardId;
  title: string;
  subtitle: string;
  iconName: string;
  // Hardcoded illustration tints — product-level brand colours with no Radiant token equivalent
  iconBg: string;
  iconColor: string;
}

const CARDS: OptionCardConfig[] = [
  {
    id: 'build',
    title: 'Build your own model',
    subtitle: 'Connect your source for search and automated insight creation.',
    iconName: 'database',
    iconBg: '#abc7f9',
    iconColor: '#2770EF',
  },
  {
    id: 'semantic',
    title: 'Import semantic layer',
    subtitle: "Leverage semantic modelling that you've already done to build your model quickly.",
    iconName: 'download',
    iconBg: '#ffccb3',
    iconColor: '#FF8142',
  },
  {
    id: 'dbt',
    title: 'Connect with dbt',
    subtitle: 'Transform your existing dbt models into ThoughtSpot models with ease.',
    iconName: 'schema',
    iconBg: '#fcd4d7',
    iconColor: '#FF694A',
  },
  {
    id: 'tml',
    title: 'Migrate with TML',
    subtitle: 'Use ThoughtSpot Modelling Language (TML) to migrate your content without recreating your model.',
    iconName: 'chart',
    iconBg: '#fde9af',
    iconColor: '#FCC838',
  },
  {
    id: 'datasets',
    title: 'Use ThoughtSpot datasets',
    subtitle: 'Jumpstart your model with datasets already published in Analyst Studio.',
    iconName: 'collection',
    iconBg: '#d1c0fb',
    iconColor: '#8C62F5',
  },
];

// ── SpotterModel logo for the pill — same full SVG as the Data Model Editor intro screen ──
// IDs are scoped to avoid conflicts with the full-size avatar on other screens
const SpotterModelLogo: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 285 285" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="SpotterModel">
    <path d="M142.5 7.12666C217.265 7.12666 277.873 67.7342 277.873 142.5C277.873 217.265 217.265 277.872 142.5 277.872C67.7347 277.872 7.12715 217.265 7.12715 142.5C7.12716 67.7342 67.7347 7.12667 142.5 7.12666Z" fill="#A9EFFF" stroke="url(#pill-ring)" strokeWidth="3.55556"/>
    <mask id="pill-mask0" style={{maskType:'luminance'}} maskUnits="userSpaceOnUse" x="14" y="14" width="257" height="257">
      <path d="M142.496 270.744C213.326 270.744 270.746 213.324 270.746 142.494C270.746 71.6638 213.326 14.2445 142.496 14.2445C71.6658 14.2445 14.2465 71.6638 14.2465 142.494C14.2465 213.324 71.6658 270.744 142.496 270.744Z" fill="white"/>
    </mask>
    <g mask="url(#pill-mask0)">
      <path d="M219.411 265.397C226.139 298.401 173.185 303.995 138.985 306.529C104.786 309.063 50.2883 290.63 64.912 257.608C78.5454 226.808 102.493 184.579 136.781 184.579C186.327 184.579 212.131 229.646 219.411 265.397Z" fill="#1B3E61"/>
    </g>
    <path d="M210.062 94.0072C186.106 91.9194 164.942 109.728 162.872 133.676C162.774 134.854 162.721 136.04 162.712 137.236C157.108 136.29 152.21 137.405 149.23 138.432C147.24 117.75 130.404 100.976 109.597 99.1732C85.6583 97.1033 64.4767 114.894 62.4067 138.842C61.4074 150.423 64.9853 161.719 72.48 170.641C79.9837 179.563 90.4942 185.033 102.075 186.032C103.351 186.139 104.627 186.202 105.894 186.202C116.119 186.202 125.934 182.633 133.875 175.959C142.797 168.455 148.266 157.945 149.266 146.363C149.355 145.293 149.408 144.186 149.426 143.071C151.568 142.206 156.903 140.484 162.926 141.768C164.996 162.656 181.556 179.055 202.55 180.875C226.48 182.963 247.661 165.154 249.74 141.206C251.819 117.259 234.019 96.0861 210.071 94.0161L210.062 94.0072Z" fill="#1B3E61"/>
    <path d="M228.648 119.123C226.497 113.502 222.786 106.891 218.119 100.502C217.182 99.2176 216.201 97.9417 215.184 96.6836C214.648 96.0145 214.104 95.3542 213.551 94.7029C220.029 90.6254 221.635 81.5335 221.635 81.5335C220.751 82.8719 217.459 84.7545 213.31 86.7263C218.869 81.596 221.189 74.9845 219.832 65.3216C219.832 65.3216 218.797 75.0648 207.136 79.3119C205.2 80.0167 202.907 80.9179 200.391 81.9529C204.593 79.1423 207.948 76.1355 208.974 73.1465C212.15 63.8851 204.468 56.2119 204.468 56.2119C204.468 56.2119 205.592 65.7499 188.194 75.6359C171.232 70.3895 159.116 56.2833 121.49 66.428C109.071 69.7739 98.9883 75.0113 91.0385 80.5253C84.4092 78.3661 78.5383 75.5645 75.6296 71.5494C75.6296 71.5494 70.5974 82.515 83.3653 86.4408C83.3653 86.4408 60.7293 82.5417 54.1089 68.3552C53.9127 67.9359 47.7295 76.8761 54.3677 85.8609C58.3024 91.1875 63.4596 94.5512 69.5357 96.416C58.0259 96.7193 50.4597 91.3838 50.4597 91.3838C53.1453 98.8964 58.9805 103.081 65.9757 105.204C61.5591 108.622 49.6656 119.605 47.8901 140.153L52.4137 132.837C52.4137 132.837 47.8544 149.736 51.9051 162.575L54.4926 155.205C54.4926 155.205 55.1618 175.227 63.5577 181.455L63.4952 174.237C63.4952 174.237 71.5343 187.879 84.088 192.759L75.0229 198.603C75.0229 198.603 83.3653 202.761 91.9396 201.673C100.05 200.638 104.065 198.853 104.065 198.853L94.5093 208.445C94.5093 208.445 110.561 208.552 119.884 201.012C118.698 203.145 118.171 206.348 120.714 210.711C120.714 210.711 136.971 208.204 141.548 201.61C141.548 201.61 146.714 209.846 154.726 209.739C154.726 209.739 162.738 205.616 164.139 200.013C164.139 200.013 170.84 205.973 175.417 206.027C175.417 206.027 178.593 203.778 178.79 200.129C178.79 200.129 190.746 203.68 198.044 199.389L191.95 189.173L192.824 188.833C200.328 185.916 207.368 181.91 213.596 176.851C214.622 176.021 215.63 175.164 216.611 174.272C217.316 173.63 217.994 172.979 218.646 172.327C221.197 169.784 223.214 167.233 223.856 165.073C226.114 157.48 227.934 145.748 227.934 145.748C227.934 145.748 229.897 150.485 229.665 154.946C233.02 146.684 233.439 131.686 228.648 119.114V119.123Z" fill="#1B3E61"/>
    <mask id="pill-mask1" style={{maskType:'luminance'}} maskUnits="userSpaceOnUse" x="47" y="56" width="186" height="155">
      <path d="M228.636 119.129C226.486 113.508 222.774 106.896 218.108 100.508C217.171 99.223 216.189 97.9471 215.172 96.689C214.637 96.0198 214.003 95.1009 213.441 94.4406C219.919 90.3631 221.623 81.5389 221.623 81.5389C220.74 82.8773 217.447 84.7599 213.298 86.7317C218.857 81.6014 221.177 74.9899 219.821 65.327C219.821 65.327 218.786 75.0702 207.124 79.3172C205.188 80.0221 202.895 80.9233 200.379 81.9583C204.581 79.1477 207.936 76.1409 208.962 73.1519C212.138 63.8905 204.456 56.2173 204.456 56.2173C204.456 56.2173 205.581 65.7553 188.182 75.6412C171.221 70.3949 159.104 56.2887 121.479 66.4334C109.059 69.7793 98.9766 75.0167 91.0267 80.5307C84.3975 78.3715 78.5266 75.5699 75.6179 71.5548C75.6179 71.5548 70.5857 82.5204 83.3535 86.4462C83.3535 86.4462 60.7176 82.5471 54.0972 68.3606C53.9009 67.9413 47.7177 76.8815 54.356 85.8662C58.2907 91.1929 63.4478 94.5566 69.5239 96.4214C58.0141 96.7247 50.448 91.3892 50.448 91.3892C53.1336 98.9018 58.9688 103.086 65.9639 105.21C61.5474 108.627 49.6539 119.61 47.8783 140.159L52.402 132.842C52.402 132.842 47.8427 149.741 51.8934 162.58L54.4809 155.211C54.4809 155.211 55.15 175.232 63.546 181.46L63.4835 174.242C63.4835 174.242 71.5225 187.884 84.0762 192.765L75.0112 198.609C75.0112 198.609 83.3535 202.767 91.9279 201.678C100.038 200.643 104.053 198.859 104.053 198.859L94.4975 208.45C94.4975 208.45 110.549 208.557 119.873 201.018C118.686 203.15 118.16 206.353 120.702 210.716C120.702 210.716 136.959 208.209 141.536 201.616C141.536 201.616 146.702 209.851 154.714 209.744C154.714 209.744 162.727 205.622 164.127 200.019C164.127 200.019 170.828 205.979 175.405 206.032C175.405 206.032 178.582 203.784 178.778 200.135C178.778 200.135 190.734 203.686 198.032 199.394L191.938 189.178L192.813 188.839C200.316 185.921 207.356 181.915 213.584 176.856C214.61 176.026 215.618 175.17 216.6 174.278C217.305 173.635 217.983 172.984 218.634 172.333C221.186 169.79 223.202 167.238 223.845 165.079C226.102 157.486 227.922 145.753 227.922 145.753C227.922 145.753 229.885 150.491 229.653 154.952C233.008 146.69 233.427 131.691 228.636 119.12V119.129Z" fill="white"/>
    </mask>
    <g mask="url(#pill-mask1)">
      <path d="M210.055 94.0057C186.098 91.9179 164.934 109.727 162.864 133.674C162.766 134.852 162.713 136.039 162.704 137.234C157.101 136.289 152.202 137.404 149.222 138.43C147.232 117.748 130.396 100.974 109.589 99.1718C85.6505 97.1018 64.4689 114.893 62.3989 138.84C61.3996 150.422 64.9775 161.717 72.4722 170.64C79.9759 179.562 90.4864 185.031 102.068 186.031C103.343 186.138 104.619 186.2 105.886 186.2C116.111 186.2 125.926 182.631 133.867 175.957C142.789 168.454 148.259 157.943 149.258 146.362C149.347 145.291 149.401 144.185 149.418 143.07C151.56 142.204 156.895 140.482 162.918 141.767C164.988 162.654 181.548 179.053 202.542 180.874C226.472 182.961 247.653 165.152 249.732 141.205C251.811 117.257 234.011 96.0846 210.064 94.0147L210.055 94.0057Z" fill="#A9EFFF"/>
    </g>
    <path d="M133.873 143.507C135.054 129.869 125.493 117.902 112.518 116.778C99.5429 115.655 88.0669 125.799 86.8857 139.437C85.7045 153.075 95.2655 165.042 108.241 166.166C121.216 167.29 132.692 157.145 133.873 143.507Z" fill="white"/>
    <path d="M115.67 149.629C120.322 149.629 124.093 145.858 124.093 141.206C124.093 136.555 120.322 132.784 115.67 132.784C111.019 132.784 107.248 136.555 107.248 141.206C107.248 145.858 111.019 149.629 115.67 149.629Z" fill="#1B3E61"/>
    <path d="M217.916 138.506C219.026 125.697 210.636 114.51 199.178 113.517C187.72 112.525 177.532 122.103 176.422 134.912C175.313 147.72 183.702 158.908 195.161 159.9C206.619 160.893 216.807 151.314 217.916 138.506Z" fill="white"/>
    <path d="M193.642 145.437C197.658 144.837 200.395 140.886 199.757 136.612C199.118 132.338 195.344 129.359 191.329 129.96C187.313 130.56 184.575 134.511 185.214 138.785C185.853 143.059 189.626 146.038 193.642 145.437Z" fill="#1B3E61"/>
    <defs>
      <linearGradient id="pill-ring" x1="70.3635" y1="26.276" x2="252.718" y2="206.627" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2770EF"/>
        <stop offset="1" stopColor="#06BF7F"/>
      </linearGradient>
    </defs>
  </svg>
);

// ── AI powered pill (always visible on the build card) ─────────────────────────
// Pill border uses the same animated conic-gradient as the card's selected state
const AIPoweredPill: React.FC = () => (
  <div style={{ position: 'absolute', top: -16, right: 14, zIndex: 3, pointerEvents: 'none' }}>
    {/* Gradient border wrapper — same spinning conic technique as the selected card border */}
    <div
      style={{
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
        padding: '1.5px',
        display: 'inline-flex',
      }}
    >
      {/* Square spinner — non-square causes uneven gradient density on sides */}
      <div
        style={{
          position: 'absolute',
          width: 200,
          height: 200,
          top: '50%',
          left: '50%',
          marginTop: -100,
          marginLeft: -100,
          background: 'conic-gradient(from 0deg, #8C62F5, #48D1E0, #2770EF, #8C62F5)',
          animation: 'spotter-border-spin 3s linear infinite',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: '#fff',
          borderRadius: 22,
          padding: '5px 12px 5px 6px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 11,
          fontWeight: fontWeight.medium,
          color: systemColors.light['content-primary'],
          whiteSpace: 'nowrap',
        }}
      >
        <SpotterModelLogo />
        AI powered
      </div>
    </div>
  </div>
);

export interface ModelSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
}

export const ModelSelectionModal: React.FC<ModelSelectionModalProps> = ({
  isOpen,
  onClose,
  onNext,
}) => {
  const [selectedCard, setSelectedCard] = useState<CardId | null>('build');
  const [buildHovered, setBuildHovered] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (selectedCard === 'build') {
      onNext();
    }
  };

  const cardContent = (card: OptionCardConfig) => (
    <div
      style={{
        display: 'flex',
        gap: `${spacing.F}px`,
        alignItems: 'flex-start',
        padding: `${spacing.D}px`,
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: spacing.K,
          height: spacing.K,
          borderRadius: 4,
          backgroundColor: card.iconBg,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name={card.iconName as any} size="l" color={card.iconColor} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: `${spacing.A}px`, flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontSize: fontSize.md,
            fontWeight: fontWeight.medium,
            color: systemColors.light['content-brand'],
            lineHeight: '24px',
          }}
        >
          {card.title}
        </span>
        <span
          style={{
            fontSize: fontSize.xs,
            color: systemColors.light['content-secondary'],
            lineHeight: '18px',
          }}
        >
          {card.subtitle}
        </span>
      </div>
    </div>
  );

  return (
    <RdModal
      size="M2"
      title="Select a data modelling option"
      onClose={onClose}
      cancelLabel="Cancel"
      onCancel={onClose}
      confirmLabel="Next"
      onConfirm={handleNext}
    >
      {/* Keyframes for the rotating gradient border on the build card */}
      <style>{`
        @keyframes spotter-border-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: `${spacing.F}px`,
        }}
      >
        {CARDS.map((card) => {
          const isSelected = selectedCard === card.id;

          // ── Build card — custom rendering with gradient border + AI pill ──
          if (card.id === 'build') {
            return (
              <div
                key={card.id}
                style={{ position: 'relative' }}
                onClick={() => setSelectedCard('build')}
                onMouseEnter={() => setBuildHovered(true)}
                onMouseLeave={() => setBuildHovered(false)}
              >
                <AIPoweredPill />

                {isSelected ? (
                  /* Selected: animated conic-gradient border */
                  <div
                    style={{
                      position: 'relative',
                      borderRadius: 9,
                      overflow: 'hidden',
                      padding: 2,
                      height: 152,
                      cursor: 'pointer',
                    }}
                  >
                    {/* Square spinner — must be square so the conic gradient sweeps uniformly on all sides */}
                    <div
                      style={{
                        position: 'absolute',
                        width: 700,
                        height: 700,
                        top: '50%',
                        left: '50%',
                        marginTop: -350,
                        marginLeft: -350,
                        background: 'conic-gradient(from 0deg, #8C62F5, #48D1E0, #2770EF, #8C62F5)',
                        animation: 'spotter-border-spin 3s linear infinite',
                      }}
                    />
                    {/* Inner card surface — very light blue tint for selected state */}
                    <div
                      style={{
                        position: 'relative',
                        zIndex: 1,
                        backgroundColor: '#EEF3FD',
                        borderRadius: 7,
                        height: '100%',
                        overflow: 'hidden',
                      }}
                    >
                      {cardContent(card)}
                    </div>
                  </div>
                ) : (
                  /* Unselected: inset box-shadow border + same padding:2 as selected so content doesn't shift */
                  <div
                    style={{
                      height: 152,
                      borderRadius: 8,
                      padding: 2,
                      boxShadow: `inset 0 0 0 1px ${buildHovered
                        ? systemColors.light['border-brand']
                        : systemColors.light['border-default']}`,
                      backgroundColor: '#fff',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      transition: 'box-shadow 0.15s',
                      boxSizing: 'border-box',
                    }}
                  >
                    {cardContent(card)}
                  </div>
                )}
              </div>
            );
          }

          // ── All other cards — standard Card component ──
          return (
            <Card
              key={card.id}
              interactive
              isSelected={isSelected}
              data={card.id}
              onClick={(id) => setSelectedCard(id as CardId)}
              style={{
                height: 152,
                ...(isSelected ? {
                  borderColor: systemColors.light['border-brand'],
                  boxShadow: `0 0 0 1px ${systemColors.light['border-focus']}`,
                  backgroundColor: '#EEF3FD',
                } : {
                  boxShadow: 'none',
                }),
              }}
            >
              {cardContent(card)}
            </Card>
          );
        })}
      </div>
    </RdModal>
  );
};

export default ModelSelectionModal;
