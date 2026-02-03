import React from 'react';
import { SearchInput } from '../../../components/SearchInput';
import { Button } from '../../../components/Button';
import { toolbarStyles as styles } from '../styles';

interface ObjectTableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
  addButtonLabel: string;
}

/**
 * ObjectTableToolbar Component
 * 
 * Toolbar with search input and primary action button.
 */
export const ObjectTableToolbar: React.FC<ObjectTableToolbarProps> = ({
  searchValue,
  onSearchChange,
  onAddClick,
  addButtonLabel,
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.searchWrapper}>
        <SearchInput
          placeholder="Search"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button
        variant="primary"
        icon="plus"
        iconPosition="leading"
        onClick={onAddClick}
      >
        {addButtonLabel}
      </Button>
    </div>
  );
};

export default ObjectTableToolbar;
