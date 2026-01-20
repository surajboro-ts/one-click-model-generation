import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { Toggle } from '../components/Toggle';
import { SearchInput } from '../components/SearchInput';
import { Modal } from '../components/Modal';
import { Alert } from '../components/Alert';
import { brandColors } from '../tokens/colors/brand';

// Sample country data
const COUNTRIES = [
  'Algeria',
  'Belgium',
  'Canada',
  'Denmark',
  'Egypt',
  'France',
  'Germany',
  'Hungary',
  'India',
  'Japan',
  'Kenya',
  'Luxembourg',
];

// Token inspection data for each component type
const COMPONENT_TOKENS = {
  'button-primary': {
    component: 'Button',
    variant: 'Primary',
    tokens: {
      background: { token: '--color-brand-blue-60', value: '#2770EF' },
      backgroundHover: { token: '--color-brand-blue-70', value: '#2359B6' },
      color: { token: '--color-brand-white', value: '#FFFFFF' },
      font: { token: '--font-family-primary', value: 'Plain' },
      fontSize: { token: '--font-size-sm', value: '14px' },
      fontWeight: { token: '--font-weight-light', value: '375' },
      borderRadius: { token: '--radius-2xl', value: '16px' },
      padding: { token: '--spacing-4', value: '16px horizontal' },
    },
  },
  'button-secondary': {
    component: 'Button',
    variant: 'Secondary',
    tokens: {
      background: { token: '--color-brand-gray-20', value: '#EAEDF2' },
      backgroundHover: { token: '--color-brand-gray-30', value: '#DBDFE7' },
      color: { token: '--color-brand-gray-90', value: '#1D232F' },
      font: { token: '--font-family-primary', value: 'Plain' },
      fontSize: { token: '--font-size-sm', value: '14px' },
      fontWeight: { token: '--font-weight-light', value: '375' },
      borderRadius: { token: '--radius-2xl', value: '16px' },
    },
  },
  'button-tertiary': {
    component: 'Button',
    variant: 'Tertiary',
    tokens: {
      background: { token: 'transparent', value: 'transparent' },
      backgroundHover: { token: '--color-hover', value: 'rgba(192, 198, 207, 0.12)' },
      color: { token: '--color-brand-blue-60', value: '#2770EF' },
      font: { token: '--font-family-primary', value: 'Plain' },
      fontSize: { token: '--font-size-xs', value: '12px' },
      fontWeight: { token: '--font-weight-regular', value: '400' },
      borderRadius: { token: '--radius-md', value: '6px' },
    },
  },
  'checkbox': {
    component: 'Checkbox',
    variant: 'Default',
    tokens: {
      boxSize: { token: 'fixed', value: '16x16px' },
      borderColor: { token: '--color-brand-gray-50', value: '#A5ACB9' },
      borderColorChecked: { token: '--color-brand-blue-60', value: '#2770EF' },
      checkColor: { token: '--color-brand-blue-60', value: '#2770EF' },
      labelColor: { token: '--color-brand-gray-90', value: '#1D232F' },
      font: { token: '--font-family-primary', value: 'Plain' },
      fontSize: { token: '--font-size-sm', value: '14px' },
      gap: { token: '--spacing-3', value: '12px' },
    },
  },
  'toggle': {
    component: 'Toggle',
    variant: 'Default',
    tokens: {
      trackSize: { token: 'fixed', value: '28x16px' },
      trackColorOff: { token: '--color-brand-gray-40', value: '#C0C6CF' },
      trackColorOn: { token: '--color-brand-blue-60', value: '#2770EF' },
      thumbColor: { token: '--color-brand-white', value: '#FFFFFF' },
      thumbSize: { token: 'fixed', value: '12px' },
      labelColor: { token: '--color-brand-gray-90', value: '#1D232F' },
      font: { token: '--font-family-primary', value: 'Plain' },
      fontSize: { token: '--font-size-sm', value: '14px' },
    },
  },
  'search-input': {
    component: 'SearchInput',
    variant: 'Default',
    tokens: {
      background: { token: '--color-brand-white', value: '#FFFFFF' },
      borderColor: { token: '--color-brand-gray-30', value: '#DBDFE7' },
      borderColorFocus: { token: '--color-brand-blue-60', value: '#2770EF' },
      textColor: { token: '--color-brand-gray-90', value: '#1D232F' },
      placeholderColor: { token: '--color-brand-gray-50', value: '#A5ACB9' },
      iconColor: { token: '--color-brand-gray-50', value: '#A5ACB9' },
      font: { token: '--font-family-primary', value: 'Plain' },
      fontSize: { token: '--font-size-sm', value: '14px' },
      borderRadius: { token: '--radius-lg', value: '8px' },
    },
  },
  'modal': {
    component: 'Modal',
    variant: 'Dialog',
    tokens: {
      background: { token: '--color-brand-white', value: '#FFFFFF' },
      borderRadius: { token: '--radius-md', value: '6px' },
      shadow: { token: 'custom', value: '0px 24px 32px rgba(25, 35, 49, 0.16)' },
      headerFont: { token: '--font-family-primary', value: 'Plain Medium' },
      headerSize: { token: 'custom', value: '20px' },
      headerColor: { token: '--color-brand-gray-90', value: '#1D232F' },
      footerBackground: { token: '--color-brand-gray-10', value: '#F6F8FA' },
    },
  },
};

type InspectData = typeof COMPONENT_TOKENS[keyof typeof COMPONENT_TOKENS] | null;

export const PlaygroundShowcase: React.FC = () => {
  // Filter Dialog State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['Algeria']);
  const [showSelected, setShowSelected] = useState(false);
  
  // Alert Modal State
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  // Inspect Mode State
  const [inspectMode, setInspectMode] = useState(false);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Filter countries based on search and show selected toggle
  const filteredCountries = useMemo(() => {
    let countries = COUNTRIES;
    
    if (searchQuery) {
      countries = countries.filter(country => 
        country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (showSelected) {
      countries = countries.filter(country => 
        selectedCountries.includes(country)
      );
    }
    
    return countries;
  }, [searchQuery, showSelected, selectedCountries]);

  // Handlers
  const handleCountryToggle = (country: string) => {
    setSelectedCountries(prev => 
      prev.includes(country)
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const handleSelectAll = () => {
    setSelectedCountries(filteredCountries);
  };

  const handleClear = () => {
    setSelectedCountries([]);
  };

  const handleCancel = () => {
    setSearchQuery('');
    setSelectedCountries(['Algeria']);
    setShowSelected(false);
  };

  const handleAdd = () => {
    alert(`Added filters: ${selectedCountries.join(', ')}`);
  };

  // Alert Modal handlers
  const handleOpenAlertModal = () => {
    setIsAlertModalOpen(true);
  };

  const handleCloseAlertModal = () => {
    setIsAlertModalOpen(false);
  };

  const handleConfirmAlert = () => {
    console.log('Confirmed with options:', { dontShowAgain, agreeToTerms });
    setIsAlertModalOpen(false);
  };

  // Inspect handlers
  const handleMouseEnter = useCallback((componentId: string, e: React.MouseEvent) => {
    if (inspectMode) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setTooltipPosition({ 
        x: rect.right + 12, 
        y: rect.top 
      });
      setHoveredComponent(componentId);
    }
  }, [inspectMode]);

  const handleMouseLeave = useCallback(() => {
    setHoveredComponent(null);
  }, []);

  // Toggle inspect mode and clear hover state
  const toggleInspectMode = useCallback(() => {
    setInspectMode(prev => {
      if (prev) {
        // Turning off - clear hover state
        setHoveredComponent(null);
      }
      return !prev;
    });
  }, []);

  // Only get inspect data if we have a valid hovered component
  const inspectData = hoveredComponent 
    ? COMPONENT_TOKENS[hoveredComponent as keyof typeof COMPONENT_TOKENS] || null 
    : null;

  // Wrapper component for inspectable elements
  const Inspectable: React.FC<{
    id: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
  }> = ({ id, children, style }) => (
    <div
      style={{
        ...style,
        position: 'relative',
        outline: inspectMode && hoveredComponent === id ? `2px solid ${brandColors.blue[60]}` : 'none',
        outlineOffset: '2px',
        borderRadius: '4px',
        transition: 'outline 150ms ease',
      }}
      onMouseEnter={(e) => handleMouseEnter(id, e)}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {inspectMode && (
        <div style={{
          position: 'absolute',
          top: '-6px',
          left: '-6px',
          width: '12px',
          height: '12px',
          backgroundColor: brandColors.blue[60],
          borderRadius: '50%',
          border: `2px solid ${brandColors.white}`,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          opacity: hoveredComponent === id ? 1 : 0.5,
          transition: 'opacity 150ms ease',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Introduction */}
      <section style={styles.introSection}>
        <h2 style={styles.introTitle}>Component Playground</h2>
        <p style={styles.introDescription}>
          This playground demonstrates how the Radiant design system components work together in a real-world scenario. 
          The filter dialog below uses Button, Checkbox, Toggle, and SearchInput components.
        </p>
      </section>

      {/* Filter Dialog Demo */}
      <section style={styles.demoSection}>
        <div style={styles.demoHeader}>
          <div style={styles.demoHeaderLeft}>
            <h3 style={styles.demoTitle}>Filter Dialog</h3>
            <span style={styles.demoBadge}>Interactive Demo</span>
          </div>
          <button
            style={{
              ...styles.inspectButton,
              backgroundColor: inspectMode ? brandColors.blue[60] : brandColors.gray[20],
              color: inspectMode ? brandColors.white : brandColors.gray[90],
            }}
            onClick={toggleInspectMode}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '6px' }}>
              <path 
                d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M14 14L10.5 10.5" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            {inspectMode ? 'Inspecting...' : 'Inspect'}
          </button>
        </div>
        
        <div style={styles.demoContent}>
          {/* Inspect Banner - Positioned as overlay to avoid layout shift */}
          {inspectMode && (
            <div style={styles.inspectBanner}>
              <span style={styles.inspectBannerIcon}>🔍</span>
              <span>Inspect mode is ON — Hover over components to see their design tokens</span>
            </div>
          )}
          {/* Mock Background */}
          <div style={styles.mockBackground}>
            <div style={styles.mockSidebar} />
            <div style={styles.mockContent}>
              <div style={styles.mockHeader} />
              <div style={styles.mockRows}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={styles.mockRow} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Filter Dialog Modal */}
          <div style={styles.modalOverlay}>
            <Inspectable id="modal" style={{ display: 'contents' }}>
              <div style={styles.modal}>
                {/* Modal Header */}
                <div style={styles.modalHeader}>
                  <h2 style={styles.modalTitle}>Add filter</h2>
                </div>
                
                {/* Modal Body */}
                <div style={styles.modalBody}>
                  {/* Search Input */}
                  <Inspectable id="search-input">
                    <SearchInput
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </Inspectable>
                  
                  {/* List Header */}
                  <div style={styles.listHeader}>
                    <span style={styles.listTitle}>
                      Country {selectedCountries.length > 0 && `(${selectedCountries.length})`}
                    </span>
                    <div style={styles.listActions}>
                      <Inspectable id="button-tertiary">
                        <Button 
                          variant="tertiary" 
                          size="small"
                          onClick={handleSelectAll}
                        >
                          Select all
                        </Button>
                      </Inspectable>
                      <Inspectable id="button-tertiary">
                        <Button 
                          variant="tertiary" 
                          size="small"
                          onClick={handleClear}
                        >
                          Clear
                        </Button>
                      </Inspectable>
                    </div>
                  </div>
                  
                  {/* Country List */}
                  <div style={styles.countryList}>
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map(country => (
                        <div key={country} style={styles.countryItem}>
                          <Inspectable id="checkbox">
                            <Checkbox
                              label={country}
                              checked={selectedCountries.includes(country)}
                              onChange={() => handleCountryToggle(country)}
                            />
                          </Inspectable>
                        </div>
                      ))
                    ) : (
                      <div style={styles.emptyState}>
                        No countries found
                      </div>
                    )}
                  </div>
                  
                  {/* Show Selected Toggle */}
                  <div style={styles.toggleRow}>
                    <Inspectable id="toggle">
                      <Toggle
                        label="Show selected"
                        checked={showSelected}
                        onChange={setShowSelected}
                        labelPosition="right"
                      />
                    </Inspectable>
                  </div>
                </div>
                
                {/* Modal Footer */}
                <div style={styles.modalFooter}>
                  <Inspectable id="button-secondary">
                    <Button variant="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </Inspectable>
                  <Inspectable id="button-primary">
                    <Button variant="primary" onClick={handleAdd}>
                      Add
                    </Button>
                  </Inspectable>
                </div>
              </div>
            </Inspectable>
          </div>
          
          {/* Inspect Tooltip - Only show when actively hovering over a hotspot */}
          {inspectMode && hoveredComponent !== null && inspectData !== null && (
            <div 
              style={{
                ...styles.inspectTooltip,
                left: tooltipPosition.x,
                top: tooltipPosition.y,
              }}
            >
              <div style={styles.tooltipHeader}>
                <span style={styles.tooltipComponent}>{inspectData.component}</span>
                <span style={styles.tooltipVariant}>{inspectData.variant}</span>
              </div>
              <div style={styles.tooltipDivider} />
              <div style={styles.tooltipBody}>
                {Object.entries(inspectData.tokens).map(([key, data]) => (
                  <div key={key} style={styles.tokenRow}>
                    <span style={styles.tokenName}>{key}</span>
                    <div style={styles.tokenValues}>
                      <code style={styles.tokenCode}>{data.token}</code>
                      <span style={styles.tokenValue}>
                        {data.value.startsWith('#') && (
                          <span 
                            style={{
                              ...styles.colorSwatch,
                              backgroundColor: data.value,
                            }} 
                          />
                        )}
                        {data.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Component Usage */}
      <section style={styles.usageSection}>
        <h3 style={styles.usageTitle}>Components Used</h3>
        <div style={styles.componentGrid}>
          <div style={styles.componentCard}>
            <div style={styles.componentIcon}>🔘</div>
            <h4 style={styles.componentName}>Button</h4>
            <p style={styles.componentDesc}>Primary, Secondary, and Tertiary variants for different action hierarchies</p>
          </div>
          <div style={styles.componentCard}>
            <div style={styles.componentIcon}>☑️</div>
            <h4 style={styles.componentName}>Checkbox</h4>
            <p style={styles.componentDesc}>Multi-select country options with checked state management</p>
          </div>
          <div style={styles.componentCard}>
            <div style={styles.componentIcon}>🔀</div>
            <h4 style={styles.componentName}>Toggle</h4>
            <p style={styles.componentDesc}>Binary "Show selected" filter toggle</p>
          </div>
          <div style={styles.componentCard}>
            <div style={styles.componentIcon}>🔍</div>
            <h4 style={styles.componentName}>SearchInput</h4>
            <p style={styles.componentDesc}>Filter countries by search query</p>
          </div>
        </div>
      </section>

      {/* State Display */}
      <section style={styles.stateSection}>
        <h3 style={styles.stateTitle}>Current State</h3>
        <div style={styles.stateDisplay}>
          <div style={styles.stateItem}>
            <span style={styles.stateLabel}>Search Query:</span>
            <code style={styles.stateValue}>{searchQuery || '(empty)'}</code>
          </div>
          <div style={styles.stateItem}>
            <span style={styles.stateLabel}>Selected Countries:</span>
            <code style={styles.stateValue}>
              {selectedCountries.length > 0 ? selectedCountries.join(', ') : '(none)'}
            </code>
          </div>
          <div style={styles.stateItem}>
            <span style={styles.stateLabel}>Show Selected:</span>
            <code style={styles.stateValue}>{showSelected ? 'true' : 'false'}</code>
          </div>
          <div style={styles.stateItem}>
            <span style={styles.stateLabel}>Inspect Mode:</span>
            <code style={styles.stateValue}>{inspectMode ? 'ON' : 'OFF'}</code>
          </div>
        </div>
      </section>

      {/* Alert Modal Demo Section */}
      <section style={styles.alertModalSection}>
        <div style={styles.alertModalHeader}>
          <div>
            <h3 style={styles.alertModalTitle}>Popup Alert Modal</h3>
            <p style={styles.alertModalDescription}>
              A modal dialog with an alert message and checkbox options.
            </p>
          </div>
          <Button variant="primary" onClick={handleOpenAlertModal}>
            Open Alert Modal
          </Button>
        </div>
      </section>

      {/* Alert Modal */}
      <Modal
        isOpen={isAlertModalOpen}
        onClose={handleCloseAlertModal}
        title="Important Notice"
        size="small"
        footer={
          <>
            <Button variant="secondary" onClick={handleCloseAlertModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmAlert}>
              Confirm
            </Button>
          </>
        }
      >
        <div style={styles.alertModalContent}>
          <Alert
            status="warning"
            variant="section-multiline"
            message="This action will permanently delete your data. Please make sure you have backed up any important information before proceeding."
            dismissible={false}
          />
          
          <div style={styles.checkboxGroup}>
            <Checkbox
              label="I understand and agree to the terms"
              checked={agreeToTerms}
              onChange={setAgreeToTerms}
            />
            <Checkbox
              label="Don't show this message again"
              checked={dontShowAgain}
              onChange={setDontShowAgain}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  
  // Introduction
  introSection: {
    backgroundColor: brandColors.white,
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  introTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '28px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '12px',
  },
  introDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 375,
    color: brandColors.gray[60],
    lineHeight: '24px',
    maxWidth: '800px',
  },
  
  // Demo Section
  demoSection: {
    backgroundColor: brandColors.white,
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  demoHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 32px',
    borderBottom: `1px solid ${brandColors.gray[20]}`,
  },
  demoHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  demoTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '18px',
    fontWeight: 600,
    color: brandColors.gray[90],
    margin: 0,
  },
  demoBadge: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    color: brandColors.blue[60],
    backgroundColor: brandColors.blue[10],
    padding: '4px 12px',
    borderRadius: '12px',
  },
  inspectButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 150ms ease',
  },
  inspectBanner: {
    position: 'absolute',
    top: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: brandColors.gray[90],
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    color: brandColors.white,
  },
  inspectBannerIcon: {
    fontSize: '16px',
  },
  demoContent: {
    position: 'relative',
    height: '600px',
    backgroundColor: brandColors.gray[30],
    overflow: 'hidden',
  },
  
  // Mock Background
  mockBackground: {
    display: 'flex',
    height: '100%',
    opacity: 0.5,
  },
  mockSidebar: {
    width: '200px',
    backgroundColor: brandColors.gray[90],
  },
  mockContent: {
    flex: 1,
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  mockHeader: {
    height: '48px',
    backgroundColor: brandColors.gray[20],
    borderRadius: '4px',
  },
  mockRows: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
  },
  mockRow: {
    height: '40px',
    backgroundColor: brandColors.gray[20],
    borderRadius: '4px',
  },
  
  // Modal Overlay
  modalOverlay: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(29, 35, 47, 0.4)',
  },
  modal: {
    width: '394px',
    height: '540px',
    backgroundColor: brandColors.white,
    borderRadius: '6px',
    boxShadow: '0px 0px 4px 0px rgba(25, 35, 49, 0.08), 0px 24px 32px 0px rgba(25, 35, 49, 0.16)',
    display: 'flex',
    flexDirection: 'column',
  },
  
  // Modal Header
  modalHeader: {
    padding: '20px 24px',
    borderBottom: `1px solid ${brandColors.gray[20]}`,
  },
  modalTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '20px',
    fontWeight: 600,
    color: brandColors.gray[90],
    letterSpacing: '-0.08px',
    lineHeight: '28px',
    margin: 0,
  },
  
  // Modal Body
  modalBody: {
    padding: '16px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    flex: 1,
    overflow: 'hidden',
    minHeight: 0,
  },
  
  // List Header
  listHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    minHeight: '24px',
  },
  listTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[90],
    minWidth: '100px',
  },
  listActions: {
    display: 'flex',
    gap: '4px',
  },
  
  // Country List
  countryList: {
    display: 'flex',
    flexDirection: 'column',
    height: '224px',
    minHeight: '224px',
    maxHeight: '224px',
    overflowY: 'auto',
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: '6px',
    padding: '8px 0',
  },
  countryItem: {
    padding: '6px 16px',
    minHeight: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    boxSizing: 'border-box',
  },
  emptyState: {
    padding: '24px',
    textAlign: 'center',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    color: brandColors.gray[50],
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Toggle Row
  toggleRow: {
    paddingTop: '12px',
    marginTop: '4px',
    borderTop: `1px solid ${brandColors.gray[20]}`,
    flexShrink: 0,
  },
  
  // Modal Footer
  modalFooter: {
    padding: '20px 24px',
    backgroundColor: brandColors.gray[10],
    borderBottomLeftRadius: '6px',
    borderBottomRightRadius: '6px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px',
  },
  
  // Inspect Tooltip
  inspectTooltip: {
    position: 'fixed',
    zIndex: 1000,
    width: '320px',
    backgroundColor: brandColors.gray[90],
    borderRadius: '8px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  tooltipHeader: {
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: brandColors.gray[80],
  },
  tooltipComponent: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    color: brandColors.white,
  },
  tooltipVariant: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    color: brandColors.blue[40],
    backgroundColor: 'rgba(39, 112, 239, 0.2)',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  tooltipDivider: {
    height: '1px',
    backgroundColor: brandColors.gray[70],
  },
  tooltipBody: {
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    maxHeight: '300px',
    overflowY: 'auto',
  },
  tokenRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  tokenName: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '11px',
    fontWeight: 500,
    color: brandColors.gray[50],
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tokenValues: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
  },
  tokenCode: {
    fontFamily: '"SF Mono", "Monaco", "Inconsolata", monospace',
    fontSize: '12px',
    color: brandColors.green[50],
    backgroundColor: 'rgba(6, 191, 127, 0.15)',
    padding: '2px 6px',
    borderRadius: '3px',
  },
  tokenValue: {
    fontFamily: '"SF Mono", "Monaco", "Inconsolata", monospace',
    fontSize: '12px',
    color: brandColors.gray[40],
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  colorSwatch: {
    width: '12px',
    height: '12px',
    borderRadius: '2px',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  
  // Usage Section
  usageSection: {
    backgroundColor: brandColors.white,
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  usageTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '18px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '20px',
  },
  componentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  componentCard: {
    padding: '20px',
    backgroundColor: brandColors.gray[10],
    borderRadius: '8px',
    textAlign: 'center',
  },
  componentIcon: {
    fontSize: '32px',
    marginBottom: '12px',
  },
  componentName: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '8px',
  },
  componentDesc: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    fontWeight: 375,
    color: brandColors.gray[60],
    lineHeight: '18px',
  },
  
  // State Section
  stateSection: {
    backgroundColor: brandColors.gray[90],
    borderRadius: '12px',
    padding: '24px',
  },
  stateTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[40],
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  stateDisplay: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  stateItem: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '12px',
  },
  stateLabel: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 375,
    color: brandColors.gray[50],
    minWidth: '140px',
  },
  stateValue: {
    fontFamily: '"SF Mono", "Monaco", "Inconsolata", monospace',
    fontSize: '13px',
    color: brandColors.green[50],
    backgroundColor: 'rgba(6, 191, 127, 0.1)',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  
  // Alert Modal Section
  alertModalSection: {
    backgroundColor: brandColors.white,
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  alertModalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alertModalTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '18px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '8px',
  },
  alertModalDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 375,
    color: brandColors.gray[60],
    margin: 0,
  },
  alertModalContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
};

export default PlaygroundShowcase;
