import React, { useRef } from 'react';
import styles from './SearchBar.module.css';

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <line x1="10.5" y1="10.5" x2="13.5" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SpinnerIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ animation: 'rd-searchbar-spin 0.8s linear infinite' }}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.2" />
    <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value = '',
  onChange,
  onSearch,
  onClear,
  loading = false,
  size = 'md',
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const containerClasses = [
    styles.container,
    styles[size],
    className,
  ].filter(Boolean).join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
    }
  };

  const handleClear = () => {
    onChange?.('');
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div className={containerClasses}>
      <span className={styles.leadingIcon}>
        {loading ? <SpinnerIcon /> : <SearchIcon />}
      </span>
      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        aria-label={placeholder}
      />
      {value && !loading && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="Clear search"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="11" y1="1" x2="1" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
