import React, { useEffect, useRef } from 'react';
import type { ChartConfig, SettingId } from '../types';
import styles from './SettingsPanel.module.css';

interface AxisPanelProps {
  config: ChartConfig;
  onConfigChange: (updates: Partial<ChartConfig>) => void;
  highlightedSetting: SettingId | null;
}

export const AxisPanel: React.FC<AxisPanelProps> = ({
  config,
  onConfigChange,
  highlightedSetting,
}) => {
  const xAxisRef = useRef<HTMLDivElement>(null);
  const yAxisRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const dataLabelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref =
      highlightedSetting === 'xAxisLabel' ? xAxisRef :
      highlightedSetting === 'yAxisLabel' ? yAxisRef :
      highlightedSetting === 'gridLines' ? gridRef :
      highlightedSetting === 'dataLabels' ? dataLabelsRef : null;
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightedSetting]);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3 className={styles.headerTitle}>Axis</h3>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <p className={styles.sectionTitle}>X-axis</p>
          <div
            ref={xAxisRef}
            className={`${styles.settingRow} ${highlightedSetting === 'xAxisLabel' ? styles.highlight : ''}`}
          >
            <span className={styles.settingLabel}>Label</span>
            <input
              type="text"
              className={styles.inputField}
              style={{ width: '120px' }}
              value={config.xAxisLabel}
              onChange={e => onConfigChange({ xAxisLabel: e.target.value })}
            />
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>Y-axis</p>
          <div
            ref={yAxisRef}
            className={`${styles.settingRow} ${highlightedSetting === 'yAxisLabel' ? styles.highlight : ''}`}
          >
            <span className={styles.settingLabel}>Label</span>
            <input
              type="text"
              className={styles.inputField}
              style={{ width: '120px' }}
              value={config.yAxisLabel}
              onChange={e => onConfigChange({ yAxisLabel: e.target.value })}
            />
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>Display</p>
          <div
            ref={gridRef}
            className={`${styles.settingRow} ${highlightedSetting === 'gridLines' ? styles.highlight : ''}`}
          >
            <span className={styles.settingLabel}>Grid lines</span>
            <button
              type="button"
              className={`${styles.toggle} ${config.showGridLines ? styles.toggleActive : ''}`}
              onClick={() => onConfigChange({ showGridLines: !config.showGridLines })}
            >
              <span className={styles.toggleKnob} />
            </button>
          </div>
          <div
            ref={dataLabelsRef}
            className={`${styles.settingRow} ${highlightedSetting === 'dataLabels' ? styles.highlight : ''}`}
          >
            <span className={styles.settingLabel}>Data labels</span>
            <button
              type="button"
              className={`${styles.toggle} ${config.showDataLabels ? styles.toggleActive : ''}`}
              onClick={() => onConfigChange({ showDataLabels: !config.showDataLabels })}
            >
              <span className={styles.toggleKnob} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AxisPanel;
