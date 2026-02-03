import React from 'react';
import { OrgSelectList } from './OrgSelectList';
import { organizations } from '../data/mockData';

interface OrgSelectStepProps {
  selectedOrgIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

/**
 * OrgSelectStep Component
 * 
 * Step 2 of the wizard: Select organizations.
 * Uses OrgSelectList for the selection interface.
 */
export const OrgSelectStep: React.FC<OrgSelectStepProps> = ({
  selectedOrgIds,
  onSelectionChange,
}) => {
  return (
    <OrgSelectList
      organizations={organizations}
      selectedIds={selectedOrgIds}
      onSelectionChange={onSelectionChange}
    />
  );
};

export default OrgSelectStep;
