import React, { useEffect, useRef } from 'react';
import type { ChartConfig, SettingId } from '../types';
import styles from './SettingsPanel.module.css';

interface ColorPanelProps {
  config: ChartConfig;
  onConfigChange: (updates: Partial<ChartConfig>) => void;
  highlightedSetting: SettingId | null;
}

const PRESET_COLORS = ['#F47E89', '#E22B3D', '#2770EF', '#71A1F4', '#06BF7F', '#FCC838', '#8C62F5', '#4A515E'];

export const ColorPanel: React.FC<ColorPanelProps> = ({
  config,
  onConfigChange,
  highlightedSetting,
}) => {
  const barColorRef = useRef<HTMLDivElement>(null);
  const condFmtRef = useRef<HTMLDivElement>(null);
  const plotlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref =
      highlightedSetting === 'barColor' ? barColorRef :
      highlightedSetting === 'conditionalFormat' ? condFmtRef :
      highlightedSetting === 'plotline' ? plotlineRef : null;
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightedSetting]);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3 className={styles.headerTitle}>Colors</h3>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <p className={styles.sectionTitle}>Bar color</p>
          <div
            ref={barColorRef}
            className={`${styles.settingRow} ${highlightedSetting === 'barColor' ? styles.highlight : ''}`}
          >
            <span className={styles.settingLabel}>Default color</span>
            <div className={styles.colorSwatchRow}>
              {PRESET_COLORS.slice(0, 4).map(c => (
                <span
                  key={c}
                  className={styles.colorSwatch}
                  style={{
                    backgroundColor: c,
                    outline: c === config.conditionalFormatting.belowColor ? '2px solid #2770EF' : 'none',
                    outlineOffset: '1px',
                  }}
                  onClick={() =>
                    onConfigChange({
                      conditionalFormatting: { ...config.conditionalFormatting, belowColor: c },
                    })
                  }
                />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>Conditional formatting</p>
          <div
            ref={condFmtRef}
            className={highlightedSetting === 'conditionalFormat' ? styles.highlight : ''}
          >
            <div className={styles.settingRow}>
              <span className={styles.settingLabel}>Enabled</span>
              <button
                type="button"
                className={`${styles.toggle} ${config.conditionalFormatting.enabled ? styles.toggleActive : ''}`}
                onClick={() =>
                  onConfigChange({
                    conditionalFormatting: {
                      ...config.conditionalFormatting,
                      enabled: !config.conditionalFormatting.enabled,
                    },
                  })
                }
              >
                <span className={styles.toggleKnob} />
              </button>
            </div>
            <div className={styles.settingRow}>
              <span className={styles.settingLabel}>Above threshold</span>
              <div className={styles.colorSwatchRow}>
                {PRESET_COLORS.slice(4, 7).map(c => (
                  <span
                    key={c}
                    className={styles.colorSwatch}
                    style={{
                      backgroundColor: c,
                      outline: c === config.conditionalFormatting.aboveColor ? '2px solid #2770EF' : 'none',
                      outlineOffset: '1px',
                    }}
                    onClick={() =>
                      onConfigChange({
                        conditionalFormatting: { ...config.conditionalFormatting, aboveColor: c },
                      })
                    }
                  />
                ))}
              </div>
            </div>
            <div className={styles.settingRow}>
              <span className={styles.settingLabel}>Below threshold</span>
              <div className={styles.colorSwatchRow}>
                {PRESET_COLORS.slice(0, 3).map(c => (
                  <span
                    key={c}
                    className={styles.colorSwatch}
                    style={{
                      backgroundColor: c,
                      outline: c === config.conditionalFormatting.belowColor ? '2px solid #2770EF' : 'none',
                      outlineOffset: '1px',
                    }}
                    onClick={() =>
                      onConfigChange({
                        conditionalFormatting: { ...config.conditionalFormatting, belowColor: c },
                      })
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>Plotline</p>
          <div
            ref={plotlineRef}
            className={highlightedSetting === 'plotline' ? styles.highlight : ''}
          >
            <div className={styles.settingRow}>
              <span className={styles.settingLabel}>Enabled</span>
              <button
                type="button"
                className={`${styles.toggle} ${config.plotline ? styles.toggleActive : ''}`}
                onClick={() =>
                  onConfigChange({
                    plotline: config.plotline
                      ? null
                      : { value: 20000, color: '#06BF7F', label: 'Target : 20k', style: 'dashed' },
                  })
                }
              >
                <span className={styles.toggleKnob} />
              </button>
            </div>
            {config.plotline && (
              <>
                <div className={styles.settingRow}>
                  <span className={styles.settingLabel}>Value</span>
                  <input
                    type="number"
                    className={styles.inputField}
                    value={config.plotline.value}
                    onChange={e => {
                      const val = parseInt(e.target.value, 10) || 0;
                      onConfigChange({
                        plotline: {
                          ...config.plotline!,
                          value: val,
                          label: `Target : ${(val / 1000).toFixed(0)}k`,
                        },
                      });
                    }}
                  />
                </div>
                <div className={styles.settingRow}>
                  <span className={styles.settingLabel}>Color</span>
                  <span
                    className={styles.colorSwatch}
                    style={{ backgroundColor: config.plotline.color }}
                  />
                </div>
                <div className={styles.settingRow}>
                  <span className={styles.settingLabel}>Style</span>
                  <span className={styles.settingValue}>
                    {config.plotline.style === 'dashed' ? 'Dashed' : 'Solid'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPanel;
