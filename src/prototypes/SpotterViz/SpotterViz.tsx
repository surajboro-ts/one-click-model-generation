import React, { useState, useCallback, useRef } from 'react';
import { GlobalHeader } from '../../components/GlobalHeader';
import type { PanelId, SettingId, ChartConfig, ChatMessage, AiOptionData } from './types';
import { DEFAULT_CHART_CONFIG, INITIAL_MESSAGES } from './data/chartData';
import {
  SearchQueryBar,
  ChartArea,
  IconToolbar,
  SpotterPanel,
  ChartTypePanel,
  ColorPanel,
  AxisPanel,
} from './components';
import styles from './SpotterViz.module.css';

export const SpotterViz: React.FC = () => {
  const [activePanelId, setActivePanelId] = useState<PanelId>('spotter');
  const [chartConfig, setChartConfig] = useState<ChartConfig>(DEFAULT_CHART_CONFIG);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [highlightedSetting, setHighlightedSetting] = useState<SettingId | null>(null);
  const highlightTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleChartConfigChange = useCallback((updates: Partial<ChartConfig>) => {
    setChartConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const handleViewSettings = useCallback((option: AiOptionData) => {
    setActivePanelId(option.deepLink.panelId);
    setHighlightedSetting(option.deepLink.settingId);
    if (highlightTimer.current) clearTimeout(highlightTimer.current);
    highlightTimer.current = setTimeout(() => setHighlightedSetting(null), 2000);
  }, []);

  const renderPanel = () => {
    switch (activePanelId) {
      case 'spotter':
        return (
          <SpotterPanel
            messages={messages}
            onMessagesChange={setMessages}
            onChartConfigChange={handleChartConfigChange}
            onViewSettings={handleViewSettings}
          />
        );
      case 'chartType':
        return (
          <ChartTypePanel
            config={chartConfig}
            onConfigChange={handleChartConfigChange}
            highlightedSetting={highlightedSetting}
          />
        );
      case 'colors':
        return (
          <ColorPanel
            config={chartConfig}
            onConfigChange={handleChartConfigChange}
            highlightedSetting={highlightedSetting}
          />
        );
      case 'axis':
        return (
          <AxisPanel
            config={chartConfig}
            onConfigChange={handleChartConfigChange}
            highlightedSetting={highlightedSetting}
          />
        );
      default:
        return (
          <SpotterPanel
            messages={messages}
            onMessagesChange={setMessages}
            onChartConfigChange={handleChartConfigChange}
            onViewSettings={handleViewSettings}
          />
        );
    }
  };

  return (
    <div className={styles.page}>
      <GlobalHeader
        searchPlaceholder="Search in your library"
        showHamburger
      />

      <div className={styles.editorBody}>
        <SearchQueryBar />

        <div className={styles.contentRow}>
          <div className={styles.chartAreaWrapper}>
            <ChartArea config={chartConfig} />
          </div>

          <IconToolbar
            activePanelId={activePanelId}
            onPanelChange={setActivePanelId}
          />

          <div className={styles.rightPanel}>
            {renderPanel()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotterViz;
