import React from 'react';
import { Icon } from '../../../components/icons';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import type { PanelId } from '../types';
import styles from './IconToolbar.module.css';

interface ToolbarItem {
  id: PanelId | string;
  icon: React.ReactNode;
  label: string;
  panelId: PanelId;
}

const TOOLBAR_ITEMS: ToolbarItem[] = [
  { id: 'spotter', icon: <Icon name="spotter" size="m" />, label: 'Spotter', panelId: 'spotter' },
  { id: 'chartType', icon: <Icon name="chart" size="m" />, label: 'Chart type', panelId: 'chartType' },
  { id: 'expand', icon: <Icon name="expand" size="m" />, label: 'Expand', panelId: null },
  { id: 'barChart', icon: <Icon name="controls" size="m" />, label: 'Bar chart', panelId: null },
  { id: 'download', icon: <Icon name="download" size="m" />, label: 'Download', panelId: null },
  { id: 'numberFormat', icon: <Icon name="number-format" size="m" />, label: 'Number format', panelId: null },
  { id: 'display', icon: <Icon name="monitor" size="m" />, label: 'Display', panelId: null },
  { id: 'filterSettings', icon: <Icon name="filter" size="m" />, label: 'Filters', panelId: null },
  { id: 'settings', icon: <Icon name="settings" size="m" />, label: 'Settings', panelId: null },
];

const BOTTOM_ITEMS: ToolbarItem[] = [
  { id: 'colors', icon: <Icon name="brush" size="m" />, label: 'Colors', panelId: 'colors' },
  { id: 'axis', icon: <Icon name="formula" size="m" />, label: 'Axis', panelId: 'axis' },
  { id: 'bolt', icon: <Icon name="bulb" size="m" />, label: 'Quick actions', panelId: null },
];

interface IconToolbarProps {
  activePanelId: PanelId;
  onPanelChange: (panelId: PanelId) => void;
}

export const IconToolbar: React.FC<IconToolbarProps> = ({ activePanelId, onPanelChange }) => {
  const handleClick = (item: ToolbarItem) => {
    if (item.panelId) {
      onPanelChange(activePanelId === item.panelId ? 'spotter' : item.panelId);
    }
  };

  return (
    <div className={styles.toolbar}>
      {TOOLBAR_ITEMS.map(item => (
        <Tooltip key={item.id} content={item.label} placement="left">
          <button
            type="button"
            className={`${styles.iconBtn} ${activePanelId === item.panelId && item.panelId ? styles.iconBtnActive : ''}`}
            onClick={() => handleClick(item)}
            aria-label={item.label}
          >
            {item.id === 'spotter' ? (
              <span className={styles.spotterIcon}>{item.icon}</span>
            ) : (
              item.icon
            )}
          </button>
        </Tooltip>
      ))}

      <div className={styles.divider} />

      {BOTTOM_ITEMS.map(item => (
        <Tooltip key={item.id} content={item.label} placement="left">
          <button
            type="button"
            className={`${styles.iconBtn} ${activePanelId === item.panelId && item.panelId ? styles.iconBtnActive : ''}`}
            onClick={() => handleClick(item)}
            aria-label={item.label}
          >
            {item.icon}
          </button>
        </Tooltip>
      ))}
    </div>
  );
};

export default IconToolbar;
