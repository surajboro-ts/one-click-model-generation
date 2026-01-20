import React, { useState } from 'react';
import { Checkbox } from '../components/Checkbox';
import { Radio } from '../components/Radio';
import { Toggle } from '../components/Toggle';
import { brandColors } from '../tokens/colors/brand';

export const SelectionControlsShowcase: React.FC = () => {
  // Checkbox state
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(true);
  const [checkboxGroup, setCheckboxGroup] = useState<string[]>(['option2']);

  // Radio state
  const [radioValue, setRadioValue] = useState('option1');
  const [planValue, setPlanValue] = useState('monthly');

  // Toggle state
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  // Checkbox group handlers
  const handleCheckboxGroupChange = (value: string, checked: boolean) => {
    if (checked) {
      setCheckboxGroup(prev => [...prev, value]);
    } else {
      setCheckboxGroup(prev => prev.filter(v => v !== value));
    }
  };

  const allSelected = checkboxGroup.length === 3;
  const someSelected = checkboxGroup.length > 0 && checkboxGroup.length < 3;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setCheckboxGroup(['option1', 'option2', 'option3']);
    } else {
      setCheckboxGroup([]);
    }
  };

  return (
    <div style={styles.container}>
      {/* Checkbox Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Checkbox</h2>
        <p style={styles.sectionDescription}>
          A form control for boolean or indeterminate selections. Supports checked, unchecked, and indeterminate states.
        </p>

        {/* States */}
        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>States</h3>
          <div style={styles.stateGrid}>
            <div style={styles.gridHeader}></div>
            <div style={styles.gridHeader}>Unchecked</div>
            <div style={styles.gridHeader}>Checked</div>
            <div style={styles.gridHeader}>Indeterminate</div>

            <div style={styles.gridLabel}>Default</div>
            <div style={styles.gridCell}>
              <Checkbox label="Label" />
            </div>
            <div style={styles.gridCell}>
              <Checkbox label="Label" checked />
            </div>
            <div style={styles.gridCell}>
              <Checkbox label="Label" indeterminate />
            </div>

            <div style={styles.gridLabel}>Disabled</div>
            <div style={styles.gridCell}>
              <Checkbox label="Label" disabled />
            </div>
            <div style={styles.gridCell}>
              <Checkbox label="Label" checked disabled />
            </div>
            <div style={styles.gridCell}>
              <Checkbox label="Label" indeterminate disabled />
            </div>

            <div style={styles.gridLabel}>Error</div>
            <div style={styles.gridCell}>
              <Checkbox label="Label" error />
            </div>
            <div style={styles.gridCell}>
              <Checkbox label="Label" checked error />
            </div>
            <div style={styles.gridCell}>
              <Checkbox label="Label" indeterminate error />
            </div>
          </div>
        </div>

        {/* Interactive Example */}
        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>Interactive Examples</h3>
          <div style={styles.exampleCard}>
            <div style={styles.exampleHeader}>
              <span style={styles.exampleTitle}>Checkbox Group with Select All</span>
            </div>
            <div style={styles.exampleContent}>
              <Checkbox 
                label="Select all" 
                checked={allSelected}
                indeterminate={someSelected}
                onChange={handleSelectAll}
              />
              <div style={styles.indent}>
                <Checkbox 
                  label="Option 1"
                  checked={checkboxGroup.includes('option1')}
                  onChange={(checked) => handleCheckboxGroupChange('option1', checked)}
                />
                <Checkbox 
                  label="Option 2"
                  checked={checkboxGroup.includes('option2')}
                  onChange={(checked) => handleCheckboxGroupChange('option2', checked)}
                />
                <Checkbox 
                  label="Option 3"
                  checked={checkboxGroup.includes('option3')}
                  onChange={(checked) => handleCheckboxGroupChange('option3', checked)}
                />
              </div>
              <div style={styles.result}>
                Selected: {checkboxGroup.length > 0 ? checkboxGroup.join(', ') : 'None'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Radio Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Radio Button</h2>
        <p style={styles.sectionDescription}>
          A form control for single selection from a group of options. Radios with the same name attribute are grouped together.
        </p>

        {/* States */}
        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>States</h3>
          <div style={styles.stateGrid}>
            <div style={styles.gridHeader}></div>
            <div style={styles.gridHeader}>Unselected</div>
            <div style={styles.gridHeader}>Selected</div>

            <div style={styles.gridLabel}>Default</div>
            <div style={styles.gridCell}>
              <Radio label="Label" />
            </div>
            <div style={styles.gridCell}>
              <Radio label="Label" checked />
            </div>

            <div style={styles.gridLabel}>Disabled</div>
            <div style={styles.gridCell}>
              <Radio label="Label" disabled />
            </div>
            <div style={styles.gridCell}>
              <Radio label="Label" checked disabled />
            </div>

            <div style={styles.gridLabel}>Error</div>
            <div style={styles.gridCell}>
              <Radio label="Label" error />
            </div>
            <div style={styles.gridCell}>
              <Radio label="Label" checked error />
            </div>
          </div>
        </div>

        {/* Interactive Example */}
        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>Interactive Examples</h3>
          <div style={styles.row}>
            <div style={styles.exampleCard}>
              <div style={styles.exampleHeader}>
                <span style={styles.exampleTitle}>Radio Group</span>
              </div>
              <div style={styles.exampleContent}>
                <Radio 
                  name="option-group"
                  value="option1"
                  label="Option 1"
                  checked={radioValue === 'option1'}
                  onChange={setRadioValue}
                />
                <Radio 
                  name="option-group"
                  value="option2"
                  label="Option 2"
                  checked={radioValue === 'option2'}
                  onChange={setRadioValue}
                />
                <Radio 
                  name="option-group"
                  value="option3"
                  label="Option 3"
                  checked={radioValue === 'option3'}
                  onChange={setRadioValue}
                />
                <div style={styles.result}>
                  Selected: {radioValue}
                </div>
              </div>
            </div>

            <div style={styles.exampleCard}>
              <div style={styles.exampleHeader}>
                <span style={styles.exampleTitle}>Pricing Plan Selection</span>
              </div>
              <div style={styles.exampleContent}>
                <Radio 
                  name="plan"
                  value="monthly"
                  label="Monthly - $9.99/mo"
                  checked={planValue === 'monthly'}
                  onChange={setPlanValue}
                />
                <Radio 
                  name="plan"
                  value="yearly"
                  label="Yearly - $99/yr (Save 17%)"
                  checked={planValue === 'yearly'}
                  onChange={setPlanValue}
                />
                <Radio 
                  name="plan"
                  value="lifetime"
                  label="Lifetime - $299 one-time"
                  checked={planValue === 'lifetime'}
                  onChange={setPlanValue}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toggle Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Toggle</h2>
        <p style={styles.sectionDescription}>
          A switch control for boolean on/off states. Supports label positioning on either side.
        </p>

        {/* States */}
        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>States</h3>
          <div style={styles.stateGrid}>
            <div style={styles.gridHeader}></div>
            <div style={styles.gridHeader}>Off</div>
            <div style={styles.gridHeader}>On</div>

            <div style={styles.gridLabel}>Default (Label Left)</div>
            <div style={styles.gridCell}>
              <Toggle label="Label" labelPosition="left" />
            </div>
            <div style={styles.gridCell}>
              <Toggle label="Label" labelPosition="left" checked />
            </div>

            <div style={styles.gridLabel}>Default (Label Right)</div>
            <div style={styles.gridCell}>
              <Toggle label="Label" labelPosition="right" />
            </div>
            <div style={styles.gridCell}>
              <Toggle label="Label" labelPosition="right" checked />
            </div>

            <div style={styles.gridLabel}>Disabled</div>
            <div style={styles.gridCell}>
              <Toggle label="Label" disabled />
            </div>
            <div style={styles.gridCell}>
              <Toggle label="Label" checked disabled />
            </div>
          </div>
        </div>

        {/* Interactive Example */}
        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>Interactive Examples</h3>
          <div style={styles.exampleCard}>
            <div style={styles.exampleHeader}>
              <span style={styles.exampleTitle}>Settings Panel</span>
            </div>
            <div style={styles.exampleContent}>
              <div style={styles.settingRow}>
                <div style={styles.settingInfo}>
                  <span style={styles.settingLabel}>Dark Mode</span>
                  <span style={styles.settingDescription}>Enable dark theme for the interface</span>
                </div>
                <Toggle 
                  checked={darkMode}
                  onChange={setDarkMode}
                  showLabel={false}
                />
              </div>
              <div style={styles.divider} />
              <div style={styles.settingRow}>
                <div style={styles.settingInfo}>
                  <span style={styles.settingLabel}>Push Notifications</span>
                  <span style={styles.settingDescription}>Receive alerts on your device</span>
                </div>
                <Toggle 
                  checked={notifications}
                  onChange={setNotifications}
                  showLabel={false}
                />
              </div>
              <div style={styles.divider} />
              <div style={styles.settingRow}>
                <div style={styles.settingInfo}>
                  <span style={styles.settingLabel}>Auto-save</span>
                  <span style={styles.settingDescription}>Automatically save changes</span>
                </div>
                <Toggle 
                  checked={autoSave}
                  onChange={setAutoSave}
                  showLabel={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Without Labels */}
        <div style={styles.subsection}>
          <h3 style={styles.subsectionTitle}>Without Labels</h3>
          <div style={styles.row}>
            <Toggle checked={toggle1} onChange={setToggle1} showLabel={false} />
            <Toggle checked={toggle2} onChange={setToggle2} showLabel={false} />
            <Toggle disabled showLabel={false} />
            <Toggle checked disabled showLabel={false} />
          </div>
        </div>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  section: {
    backgroundColor: brandColors.white,
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '24px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '8px',
  },
  sectionDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 375,
    color: brandColors.gray[60],
    marginBottom: '32px',
    lineHeight: '20px',
  },
  subsection: {
    marginBottom: '32px',
  },
  subsectionTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '16px',
  },
  stateGrid: {
    display: 'grid',
    gridTemplateColumns: '140px repeat(3, 1fr)',
    gap: '16px',
    alignItems: 'center',
  },
  gridHeader: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    color: brandColors.gray[60],
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    textAlign: 'center',
  },
  gridLabel: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[90],
  },
  gridCell: {
    display: 'flex',
    justifyContent: 'center',
    padding: '12px',
    backgroundColor: brandColors.gray[10],
    borderRadius: '8px',
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    alignItems: 'flex-start',
  },
  exampleCard: {
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: '8px',
    overflow: 'hidden',
    flex: '1 1 300px',
    minWidth: '280px',
  },
  exampleHeader: {
    backgroundColor: brandColors.gray[10],
    padding: '12px 16px',
    borderBottom: `1px solid ${brandColors.gray[20]}`,
  },
  exampleTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[90],
  },
  exampleContent: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  indent: {
    marginLeft: '28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  result: {
    marginTop: '8px',
    padding: '8px 12px',
    backgroundColor: brandColors.blue[10],
    borderRadius: '6px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    color: brandColors.blue[70],
  },
  settingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
  },
  settingInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  settingLabel: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[90],
  },
  settingDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 375,
    color: brandColors.gray[60],
  },
  divider: {
    height: '1px',
    backgroundColor: brandColors.gray[20],
    margin: '4px 0',
  },
};

export default SelectionControlsShowcase;

