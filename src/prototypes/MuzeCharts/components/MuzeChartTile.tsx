import React, { useEffect, useRef, useState } from 'react';
import { systemColors } from '@tokens/colors';
import { spacing } from '@tokens/spacing';
import { fontFamily, fontSize, fontWeight } from '@tokens/typography';

interface Props {
  title: string;
  description?: string;
  Chart: React.FC<{ width?: number; height?: number }>;
  mode?: 'view' | 'edit';
  selected?: boolean;
  onSelect?: () => void;
  style?: React.CSSProperties;
}

export const MuzeChartTile: React.FC<Props> = ({ title, description, Chart, mode = 'view', selected, onSelect, style }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ w: Math.floor(width), h: Math.floor(height) });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isEdit = mode === 'edit';

  return (
    <div
      onClick={isEdit && onSelect ? onSelect : undefined}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        background: systemColors.light['background-base'],
        border: `1px solid ${selected ? systemColors.light['border-focus'] : systemColors.light['border-default']}`,
        borderRadius: 8,
        padding: spacing.D,
        boxSizing: 'border-box',
        cursor: isEdit ? 'pointer' : 'default',
        ...style,
      }}
    >
      <div style={{ marginBottom: spacing.B }}>
        <div style={{
          fontFamily,
          fontSize: fontSize['16'],
          fontWeight: fontWeight.medium,
          color: systemColors.light['content-primary'],
          lineHeight: '20px',
        }}>{title}</div>
        {description && (
          <div style={{
            fontFamily,
            fontSize: fontSize['13'],
            fontWeight: fontWeight.regular,
            color: systemColors.light['content-secondary'],
            marginTop: spacing.A,
            lineHeight: '18px',
          }}>{description}</div>
        )}
      </div>
      <div ref={containerRef} style={{ flex: 1, minHeight: 0, position: 'relative' }}>
        {size.w > 0 && size.h > 0 && <Chart width={size.w} height={size.h} />}
      </div>
    </div>
  );
};
