import React, { useState } from 'react';
import { GlobalHeader } from '@components/GlobalHeader';
import {
  SpotterShell,
  SpotterLeftSide,
  SpotterRail,
  SpotterRailItem,
  SpotterPanel,
  SpotterPanelAction,
  SpotterPanelSection,
  SpotterPanelItem,
  SpotterLeftToggle,
  SpotterWelcome,
  type SpotterLeftMode,
} from '@spotter/page';
import {
  chats,
  customSpotters,
  dataModels,
  tenantName,
} from './data/mockData';

/**
 * Spotter prototype shell.
 *
 * Goal: validate the Spotter DS layout — header + collapsible left side
 * (rail ↔ panel) + canvas with welcome state.
 *
 * No real chat logic yet — all interactions are stubs.
 */
export const Spotter: React.FC = () => {
  const [mode, setMode] = useState<SpotterLeftMode>('panel');
  const [selectedSpotter, setSelectedSpotter] = useState<string>('default');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [promptValue, setPromptValue] = useState('');
  const [dataModelId, setDataModelId] = useState(dataModels[0].id);

  const toggleMode = (): void => {
    setMode((prev) => (prev === 'rail' ? 'panel' : 'rail'));
  };

  const handleSubmit = (value: string): void => {
    // Stub — log the question. Real chat thread comes later.
    // eslint-disable-next-line no-console
    console.log('[Spotter] submit:', value);
    setPromptValue('');
  };

  const handleQuickAction = (id: string): void => {
    // eslint-disable-next-line no-console
    console.log('[Spotter] quick action:', id);
  };

  const handleNewChat = (): void => {
    setPromptValue('');
    setSelectedChat(null);
    setSelectedSpotter('default');
  };

  const activeDataModel = dataModels.find((m) => m.id === dataModelId) ?? dataModels[0];

  const railContent = (
    <SpotterRail
      top={
        <>
          <SpotterLeftToggle mode={mode} onClick={toggleMode} />
          <SpotterRailItem icon="plus" label="New chat" onClick={handleNewChat} />
        </>
      }
      bottom={<SpotterRailItem icon="book-closed" label="Library" />}
    />
  );

  const panelContent = (
    <SpotterPanel
      top={<SpotterLeftToggle mode={mode} onClick={toggleMode} />}
      primaryAction={
        <SpotterPanelAction
          label="New chat"
          icon="plus"
          onClick={handleNewChat}
        />
      }
      footer={<SpotterPanelAction label="Settings" icon="settings" />}
    >
      <SpotterPanelSection>
        <SpotterPanelItem
          label="Spotter (Default)"
          selected={selectedSpotter === 'default'}
          onClick={() => setSelectedSpotter('default')}
        />
      </SpotterPanelSection>

      <SpotterPanelSection label="Custom spotters">
        {customSpotters.map((spotter) => (
          <SpotterPanelItem
            key={spotter.id}
            label={spotter.name}
            selected={selectedSpotter === spotter.id}
            onClick={() => setSelectedSpotter(spotter.id)}
          />
        ))}
        <SpotterPanelItem
          label="View library"
          trailingIcon="chevron-right"
          selected={selectedSpotter === 'library'}
          onClick={() => setSelectedSpotter('library')}
        />
      </SpotterPanelSection>

      <SpotterPanelSection label="Chats">
        {chats.map((chat) => (
          <SpotterPanelItem
            key={chat.id}
            label={chat.title}
            selected={selectedChat === chat.id}
            onClick={() => setSelectedChat(chat.id)}
          />
        ))}
      </SpotterPanelSection>
    </SpotterPanel>
  );

  return (
    <SpotterShell
      header={
        <GlobalHeader
          theme="light"
          showHamburger
          onHamburgerClick={toggleMode}
          searchPlaceholder="Search in your library"
          showKeyboardHint={false}
          notificationCount={1}
          userName="Alex"
          userAvatar="https://i.pravatar.cc/64?img=47"
        />
      }
      leftSide={
        <SpotterLeftSide
          mode={mode}
          onToggle={toggleMode}
          rail={railContent}
          panel={panelContent}
        />
      }
    >
      <SpotterWelcome
        promptProps={{
          value: promptValue,
          onChange: setPromptValue,
          onSubmit: handleSubmit,
          dataModelLabel: activeDataModel.name,
          onDataModelClick: () => {
            const next = dataModels[(dataModels.indexOf(activeDataModel) + 1) % dataModels.length];
            setDataModelId(next.id);
          },
        }}
        quickActionProps={{ onAction: handleQuickAction }}
      />
    </SpotterShell>
  );
};

export default Spotter;
