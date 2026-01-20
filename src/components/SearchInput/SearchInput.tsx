import React, { forwardRef } from 'react';
import { SearchIcon } from '../icons';
import styles from './SearchInput.module.css';

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Additional CSS class name */
  className?: string;
}

/**
 * SearchInput Component
 * 
 * A search input field with a leading search icon.
 * 
 * @example
 * ```tsx
 * <SearchInput placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
 * ```
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({
  placeholder = 'Search',
  value,
  onChange,
  disabled = false,
  className,
  ...props
}, ref) => {
  const containerClasses = [
    styles.container,
    disabled && styles.disabled,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <SearchIcon size={16} className={styles.icon} />
      <input
        ref={ref}
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;

