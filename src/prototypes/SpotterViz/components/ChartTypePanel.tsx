import React, { useEffect, useRef } from 'react';
import { Icon } from '../../../components/icons';
import type { ChartConfig, SettingId } from '../types';
import styles from './SettingsPanel.module.css';

interface ChartTypePanelProps {
  config: ChartConfig;
  onConfigChange: (updates: Partial<ChartConfig>) => void;
  highlightedSetting: SettingId | null;
}

const CHART_TYPES: { type: ChartConfig['chartType']; label: string; icon: React.ReactNode }[] = [
  { type: 'bar', label: 'Bar', icon: <Icon name="chart" size="m" /> },
  { type: 'line', label: 'Line', icon: <Icon name="controls" size="m" /> },
  { type: 'area', label: 'Area', icon: <Icon name="navigate" size="m" /> },
];

export const ChartTypePanel: React.FC<ChartTypePanelProps> = ({
  config,
  onConfigChange,
  highlightedSetting,
}) => {
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlightedSetting === 'chartType' && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightedSetting]);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3 className={styles.headerTitle}>Chart type</h3>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <p className={styles.sectionTitle}>Select type</p>
          <div
            ref={highlightRef}
            className={`${styles.chartGrid} ${highlightedSetting === 'chartType' ? styles.highlight : ''}`}
          >
            {CHART_TYPES.map(ct => (
              <button
                key={ct.type}
                type="button"
                className={`${styles.chartTypeBtn} ${config.chartType === ct.type ? styles.chartTypeBtnActive : ''}`}
                onClick={() => onConfigChange({ chartType: ct.type })}
              >
                {ct.icon}
                {ct.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartTypePanel;
