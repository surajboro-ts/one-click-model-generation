import React, { useState } from 'react';
import { systemColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { dataConnections, mockAIResponses } from './data/mockData';
import DataModelEditorComponent from '../DataModelEditor/DataModelEditor';

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
  const [aiMessageIndex, setAiMessageIndex] = useState(0);

  const handleStartFlow = () => setScreen('connections');
  const handleSelectConnection = () => setScreen('onboarding');
  const handleGenerateModel = () => setScreen('editor');
  const handleNext = () => setAiMessageIndex((i) => (i + 1) % mockAIResponses.length);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: systemColors.light['background-sunken'] }}>
      {/* Home Screen */}
      {screen === 'home' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: `${spacing.F}px`,
          }}
        >
          <h1
            style={{
              fontSize: '36px',
              fontWeight: 700,
              color: systemColors.light['content-primary'],
              marginBottom: `${spacing.D}px`,
              textAlign: 'center',
            }}
          >
            Data Workspace
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: systemColors.light['content-secondary'],
              marginBottom: `${spacing.H}px`,
              maxWidth: 400,
              textAlign: 'center',
            }}
          >
            Create a new data model with AI-powered guidance to structure your data in seconds.
          </p>
          <button
            onClick={handleStartFlow}
            style={{
              padding: `${spacing.C}px ${spacing.F}px`,
              fontSize: '16px',
              fontWeight: 600,
              backgroundColor: systemColors.light['content-brand'],
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.opacity = '1';
            }}
          >
            Create model
          </button>
        </div>
      )}

      {/* Connection Selection Screen */}
      {screen === 'connections' && (
        <div style={{ padding: `${spacing.H}px`, maxWidth: 800, margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: systemColors.light['content-primary'],
              marginBottom: `${spacing.F}px`,
            }}
          >
            Select data source
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: `${spacing.D}px`,
            }}
          >
            {dataConnections.map((conn) => (
              <div
                key={conn.id}
                onClick={() => handleSelectConnection()}
                style={{
                  padding: `${spacing.D}px`,
                  backgroundColor: systemColors.light['background-base'],
                  border: `1px solid ${systemColors.light['border-default']}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget).style.backgroundColor = systemColors.light['background-subtle'];
                  (e.currentTarget).style.borderColor = systemColors.light['border-brand'];
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget).style.backgroundColor = systemColors.light['background-base'];
                  (e.currentTarget).style.borderColor = systemColors.light['border-default'];
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: `${spacing.B}px` }}>{conn.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: systemColors.light['content-primary'] }}>
                  {conn.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Onboarding Screen */}
      {screen === 'onboarding' && (
        <div
          style={{
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: systemColors.light['background-base'],
          }}
        >
          {/* Left side - Form */}
          <div
            style={{
              flex: 1,
              padding: `${spacing.H}px`,
              maxWidth: 500,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: systemColors.light['content-primary'],
                marginBottom: `${spacing.D}px`,
              }}
            >
              Set up your model
            </h2>
            <div style={{ marginBottom: `${spacing.D}px` }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: systemColors.light['content-primary'],
                  marginBottom: `${spacing.B}px`,
                }}
              >
                Model name
              </label>
              <input
                type="text"
                placeholder="E.g. Retail Analytics Model"
                style={{
                  width: '100%',
                  padding: `${spacing.B}px ${spacing.C}px`,
                  fontSize: '14px',
                  border: `1px solid ${systemColors.light['border-default']}`,
                  borderRadius: '6px',
                  fontFamily: 'inherit',
                }}
              />
            </div>
            <div style={{ marginBottom: `${spacing.F}px` }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: systemColors.light['content-primary'],
                  marginBottom: `${spacing.B}px`,
                }}
              >
                Description
              </label>
              <textarea
                placeholder="Describe your data..."
                style={{
                  width: '100%',
                  padding: `${spacing.B}px ${spacing.C}px`,
                  fontSize: '14px',
                  border: `1px solid ${systemColors.light['border-default']}`,
                  borderRadius: '6px',
                  fontFamily: 'inherit',
                  minHeight: 100,
                  resize: 'none',
                }}
              />
            </div>
            <button
              onClick={handleGenerateModel}
              style={{
                padding: `${spacing.C}px ${spacing.F}px`,
                fontSize: '16px',
                fontWeight: 600,
                backgroundColor: systemColors.light['content-brand'],
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.opacity = '1';
              }}
            >
              Generate model
            </button>
          </div>

          {/* Right side - AI insights (mock) */}
          <div
            style={{
              flex: 1,
              padding: `${spacing.H}px`,
              backgroundColor: systemColors.light['background-sunken'],
              borderLeft: `1px solid ${systemColors.light['border-divider']}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: systemColors.light['content-primary'],
                marginBottom: `${spacing.D}px`,
              }}
            >
              AI suggestions
            </h3>
            <div
              style={{
                padding: `${spacing.D}px`,
                backgroundColor: systemColors.light['background-base'],
                borderLeft: `4px solid ${systemColors.light['content-brand']}`,
                borderRadius: '4px',
                marginBottom: `${spacing.D}px`,
              }}
            >
              <p
                style={{
                  fontSize: '14px',
                  color: systemColors.light['content-secondary'],
                  lineHeight: '1.5',
                  margin: 0,
                }}
              >
                {mockAIResponses[aiMessageIndex]}
              </p>
            </div>
            <button
              onClick={handleNext}
              style={{
                padding: `${spacing.B}px ${spacing.D}px`,
                fontSize: '13px',
                backgroundColor: systemColors.light['background-base'],
                border: `1px solid ${systemColors.light['border-default']}`,
                borderRadius: '6px',
                cursor: 'pointer',
                color: systemColors.light['content-brand'],
              }}
            >
              Next suggestion
            </button>
          </div>
        </div>
      )}

      {/* Data Model Editor Screen — uses the existing DataModelEditor component */}
      {screen === 'editor' && (() => {
        (window as any).__DME_CONFIG__ = { spotterModel: false, welcomeVariant: 'blank' };
        return <DataModelEditorComponent />;
      })()}
    </div>
  );
};

export default OneClickModelGeneration;
