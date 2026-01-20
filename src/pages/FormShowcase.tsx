import React, { useState } from 'react';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';
import { Radio } from '../components/Radio';
import { Checkbox } from '../components/Checkbox';
import { Modal } from '../components/Modal';
import { brandColors } from '../tokens/colors/brand';

/**
 * FormShowcase Page
 * 
 * Demonstrates the Modal component with a form containing:
 * - TextInput component
 * - Radio button component
 * - Checkbox component
 * - Primary and Secondary buttons
 * 
 * All components are from the Radiant Design System.
 */
export const FormShowcase: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    preference: 'option1',
    agreeTerms: false,
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert(`Form submitted!\n\nName: ${formData.name}\nPreference: ${formData.preference}\nAgreed to terms: ${formData.agreeTerms}`);
    setIsModalOpen(false);
    // Reset form
    setFormData({
      name: '',
      preference: 'option1',
      agreeTerms: false,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    // Reset form
    setFormData({
      name: '',
      preference: 'option1',
      agreeTerms: false,
    });
  };

  return (
    <div style={styles.container}>
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Modal Form Demo</h2>
        <p style={styles.description}>
          Click the button below to open a modal with a form containing components from the Radiant Design System:
        </p>
        
        <div style={styles.componentList}>
          <div style={styles.componentItem}>
            <span style={styles.componentLabel}>TextInput</span>
            <span style={styles.componentPath}>→ components/TextInput/TextInput.tsx</span>
          </div>
          <div style={styles.componentItem}>
            <span style={styles.componentLabel}>Radio</span>
            <span style={styles.componentPath}>→ components/Radio/Radio.tsx</span>
          </div>
          <div style={styles.componentItem}>
            <span style={styles.componentLabel}>Checkbox</span>
            <span style={styles.componentPath}>→ components/Checkbox/Checkbox.tsx</span>
          </div>
          <div style={styles.componentItem}>
            <span style={styles.componentLabel}>Button (Primary)</span>
            <span style={styles.componentPath}>→ components/Button/Button.tsx</span>
          </div>
          <div style={styles.componentItem}>
            <span style={styles.componentLabel}>Button (Secondary)</span>
            <span style={styles.componentPath}>→ components/Button/Button.tsx</span>
          </div>
          <div style={styles.componentItem}>
            <span style={styles.componentLabel}>Modal</span>
            <span style={styles.componentPath}>→ components/Modal/Modal.tsx</span>
          </div>
        </div>

        <div style={styles.buttonWrapper}>
          <Button 
            variant="primary" 
            size="large"
            onClick={() => setIsModalOpen(true)}
          >
            Open Form Modal
          </Button>
        </div>
      </section>

      {/* Modal with Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title="User Preferences"
        size="medium"
        footer={
          <>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSubmit}
              disabled={!formData.agreeTerms}
            >
              Submit
            </Button>
          </>
        }
      >
        <div style={styles.formContent}>
          {/* TextInput Component */}
          <div style={styles.formField}>
            <TextInput
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <span style={styles.fieldNote}>Component: TextInput</span>
          </div>

          {/* Radio Button Group */}
          <div style={styles.formField}>
            <span style={styles.fieldLabel}>Select Preference</span>
            <div style={styles.radioGroup}>
              <Radio
                name="preference"
                value="option1"
                label="Option 1 - Standard"
                checked={formData.preference === 'option1'}
                onChange={(value) => setFormData({ ...formData, preference: value })}
              />
              <Radio
                name="preference"
                value="option2"
                label="Option 2 - Advanced"
                checked={formData.preference === 'option2'}
                onChange={(value) => setFormData({ ...formData, preference: value })}
              />
              <Radio
                name="preference"
                value="option3"
                label="Option 3 - Premium"
                checked={formData.preference === 'option3'}
                onChange={(value) => setFormData({ ...formData, preference: value })}
              />
            </div>
            <span style={styles.fieldNote}>Component: Radio</span>
          </div>

          {/* Checkbox */}
          <div style={styles.formField}>
            <Checkbox
              label="I agree to the terms and conditions"
              checked={formData.agreeTerms}
              onChange={(checked) => setFormData({ ...formData, agreeTerms: checked })}
            />
            <span style={styles.fieldNote}>Component: Checkbox</span>
          </div>
        </div>
      </Modal>

      {/* Component Mapping Table */}
      <section style={styles.section}>
        <h3 style={styles.subsectionTitle}>Component Code Mapping</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Component</th>
              <th style={styles.tableHeader}>File Path</th>
              <th style={styles.tableHeader}>CSS Module</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.tableCell}>Modal</td>
              <td style={styles.tableCellCode}>src/components/Modal/Modal.tsx</td>
              <td style={styles.tableCellCode}>Modal.module.css</td>
            </tr>
            <tr>
              <td style={styles.tableCell}>TextInput</td>
              <td style={styles.tableCellCode}>src/components/TextInput/TextInput.tsx</td>
              <td style={styles.tableCellCode}>TextInput.module.css</td>
            </tr>
            <tr>
              <td style={styles.tableCell}>Radio</td>
              <td style={styles.tableCellCode}>src/components/Radio/Radio.tsx</td>
              <td style={styles.tableCellCode}>Radio.module.css</td>
            </tr>
            <tr>
              <td style={styles.tableCell}>Checkbox</td>
              <td style={styles.tableCellCode}>src/components/Checkbox/Checkbox.tsx</td>
              <td style={styles.tableCellCode}>Checkbox.module.css</td>
            </tr>
            <tr>
              <td style={styles.tableCell}>Button</td>
              <td style={styles.tableCellCode}>src/components/Button/Button.tsx</td>
              <td style={styles.tableCellCode}>Button.module.css</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',
  },
  section: {
    backgroundColor: brandColors.white,
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0px 1px 3px rgba(29, 35, 47, 0.1)',
  },
  sectionTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '24px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '16px',
  },
  subsectionTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '18px',
    fontWeight: 600,
    color: brandColors.gray[90],
    marginBottom: '16px',
  },
  description: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 375,
    color: brandColors.gray[60],
    marginBottom: '24px',
    lineHeight: '22px',
  },
  componentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '32px',
  },
  componentItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 12px',
    backgroundColor: brandColors.gray[10],
    borderRadius: '6px',
  },
  componentLabel: {
    fontFamily: '"SF Mono", Monaco, monospace',
    fontSize: '13px',
    fontWeight: 500,
    color: brandColors.blue[60],
    minWidth: '160px',
  },
  componentPath: {
    fontFamily: '"SF Mono", Monaco, monospace',
    fontSize: '12px',
    color: brandColors.gray[60],
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  formContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  formField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  fieldLabel: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[90],
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '4px',
  },
  fieldNote: {
    fontFamily: '"SF Mono", Monaco, monospace',
    fontSize: '11px',
    color: brandColors.gray[50],
    marginTop: '4px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: '8px',
    overflow: 'hidden',
    border: `1px solid ${brandColors.gray[20]}`,
  },
  tableHeader: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 600,
    color: brandColors.gray[70],
    textAlign: 'left',
    padding: '12px 16px',
    backgroundColor: brandColors.gray[10],
    borderBottom: `1px solid ${brandColors.gray[20]}`,
  },
  tableCell: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: brandColors.gray[90],
    padding: '12px 16px',
    borderBottom: `1px solid ${brandColors.gray[20]}`,
  },
  tableCellCode: {
    fontFamily: '"SF Mono", Monaco, monospace',
    fontSize: '12px',
    color: brandColors.gray[70],
    padding: '12px 16px',
    borderBottom: `1px solid ${brandColors.gray[20]}`,
  },
};

export default FormShowcase;
