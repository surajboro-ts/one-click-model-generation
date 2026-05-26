import React, { useState } from 'react';
import DataModelEditorComponent from '../DataModelEditor/DataModelEditor';
import { DataWorkspaceHome } from './components/DataWorkspaceHome';
import { ModelSelectionModal } from './components/ModelSelectionModal';
import { ConnectionSelectionScreen } from './components/ConnectionSelectionScreen';
import { ModelOnboardingScreen } from './components/ModelOnboardingScreen';
import type { DataConnection } from './data/mockData';

/**
 * OneClickModelGeneration
 *
 * Goal: Explore a new onboarding experience and full model generation from a single click.
 * User: Data analyst
 * Flows: Data Workspace home page → Connection selection → Onboarding screen → Data model editor
 */

type Screen = 'home' | 'connections' | 'onboarding' | 'editor';

export const OneClickModelGeneration: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<DataConnection | null>(null);
  // Shown as an overlay on top of the onboarding screen when the user wants to switch connection.
  const [showConnectionPicker, setShowConnectionPicker] = useState(false);

  return (
    <>
      {/* Home page is always rendered for 'home' and 'connections' screens so the
          connection modal overlays the same background as the model-selection modal. */}
      {(screen === 'home' || screen === 'connections') && (
        <>
          <DataWorkspaceHome onOpenModal={() => setIsModalOpen(true)} />
          <ModelSelectionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onNext={() => {
              setIsModalOpen(false);
              setScreen('connections');
            }}
          />
        </>
      )}

      {/* Connection selection from home — RdModal floats on top of the home page */}
      {screen === 'connections' && (
        <ConnectionSelectionScreen
          onBack={() => {
            setScreen('home');
            setIsModalOpen(true);
          }}
          onDismiss={() => setScreen('home')}
          onNext={(conn) => {
            setSelectedConnection(conn);
            setScreen('onboarding');
          }}
        />
      )}

      {screen === 'onboarding' && selectedConnection && (
        <ModelOnboardingScreen
          connection={selectedConnection}
          onBuild={() => setScreen('editor')}
          onSkip={() => setScreen('editor')}
          onChangeConnection={() => setShowConnectionPicker(true)}
        />
      )}

      {/* Connection picker opened from onboarding — RdModal floats on top of the onboarding screen */}
      {screen === 'onboarding' && showConnectionPicker && (
        <ConnectionSelectionScreen
          cancelLabel="Cancel"
          confirmLabel="Apply"
          onBack={() => setShowConnectionPicker(false)}
          onDismiss={() => setShowConnectionPicker(false)}
          onNext={(conn) => {
            setSelectedConnection(conn);
            setShowConnectionPicker(false);
          }}
        />
      )}

      {screen === 'editor' && (() => {
        // Only set blank config if _handleBuildModel hasn't already set 'existing'
        if (!(window as any).__DME_CONFIG__) {
          (window as any).__DME_CONFIG__ = { spotterModel: true, welcomeVariant: 'blank' };
        }
        return <DataModelEditorComponent />;
      })()}
    </>
  );
};

export default OneClickModelGeneration;
