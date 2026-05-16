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
  const [selectedCard, setSelectedCard] = useState<CardId | null>(null);

  if (!isOpen) return null;

  const handleNext = () => {
    if (selectedCard === 'build') {
      onNext();
    }
  };

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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: `${spacing.F}px`,
        }}
      >
        {CARDS.map((card) => {
          const isSelected = selectedCard === card.id;
          return (
          <Card
            key={card.id}
            interactive
            isSelected={isSelected}
            data={card.id}
            onClick={(id) => setSelectedCard(id as CardId)}
            style={{
              height: 152,
              // Inline styles beat CSS :hover — lock border and suppress hover shadow
              ...(isSelected ? {
                borderColor: systemColors.light['border-brand'],
                boxShadow: `0 0 0 1px ${systemColors.light['border-focus']}`,
              } : {
                boxShadow: 'none',
              }),
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: `${spacing.F}px`,
                alignItems: 'flex-start',
                padding: `${spacing.D}px`,
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
          </Card>
          );
        })}
      </div>
    </RdModal>
  );
};

export default ModelSelectionModal;
