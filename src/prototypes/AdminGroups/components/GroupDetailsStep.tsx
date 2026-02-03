import React from 'react';
import { TextInput } from '../../../components/TextInput';
import { TextArea } from '../../../components/TextArea';
import { formStyles as styles } from '../styles';

interface GroupDetailsData {
  name: string;
  displayName: string;
  description: string;
}

interface GroupDetailsStepProps {
  data: GroupDetailsData;
  onChange: (data: GroupDetailsData) => void;
}

/**
 * GroupDetailsStep Component
 * 
 * Step 1 of the wizard: Enter group details.
 * Fields: Name (required), Display name, Description
 */
export const GroupDetailsStep: React.FC<GroupDetailsStepProps> = ({
  data,
  onChange,
}) => {
  const handleChange = (field: keyof GroupDetailsData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange({ ...data, [field]: e.target.value });
  };

  return (
    <div>
      {/* Name field (required) */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>
          Name <span style={styles.required}>*</span>
        </label>
        <TextInput
          value={data.name}
          onChange={handleChange('name')}
          placeholder="Enter group name"
        />
        <div style={styles.helperText}>
          Unique identifier for the group. Use lowercase and hyphens.
        </div>
      </div>

      {/* Display name field */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Display name</label>
        <TextInput
          value={data.displayName}
          onChange={handleChange('displayName')}
          placeholder="Enter display name"
        />
        <div style={styles.helperText}>
          Human-readable name shown in the UI.
        </div>
      </div>

      {/* Description field */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Description</label>
        <TextArea
          value={data.description}
          onChange={handleChange('description')}
          placeholder="Describe the purpose of this group"
          rows={4}
        />
      </div>
    </div>
  );
};

export default GroupDetailsStep;
