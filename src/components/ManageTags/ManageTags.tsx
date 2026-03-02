import React, { useState, useRef, useId } from 'react';
import styles from './ManageTags.module.css';

export interface ManageTagsProps {
  tags: string[];
  onChange?: (tags: string[]) => void;
  maxTags?: number;
  placeholder?: string;
  suggestions?: string[];
  className?: string;
}

const CloseIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const ManageTags = React.forwardRef<HTMLDivElement, ManageTagsProps>(
  (
    {
      tags,
      onChange,
      maxTags,
      placeholder = 'Add tag...',
      suggestions,
      className,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const listboxId = useId();

    const isAtLimit = maxTags !== undefined && tags.length >= maxTags;

    const addTag = (value: string) => {
      const trimmed = value.trim();
      if (!trimmed || isAtLimit) return;
      if (tags.includes(trimmed)) return;
      onChange?.([...tags, trimmed]);
    };

    const removeTag = (tag: string) => {
      onChange?.(tags.filter((t) => t !== tag));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;

      // If a comma is typed, split and add tags
      if (val.includes(',')) {
        const parts = val.split(',');
        // Add all complete parts (everything before the last comma)
        parts.slice(0, -1).forEach((part) => addTag(part));
        // Keep the last part (after the last comma) in the input
        setInputValue(parts[parts.length - 1]);
      } else {
        setInputValue(val);
      }

      setShowSuggestions(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (inputValue.trim()) {
          addTag(inputValue);
          setInputValue('');
          setShowSuggestions(false);
        }
      } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
        // Remove last tag on backspace when input is empty
        removeTag(tags[tags.length - 1]);
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
        setInputValue('');
      }
    };

    const handleSuggestionClick = (suggestion: string) => {
      addTag(suggestion);
      setInputValue('');
      setShowSuggestions(false);
      inputRef.current?.focus();
    };

    const filteredSuggestions = suggestions
      ? suggestions.filter(
          (s) =>
            !tags.includes(s) &&
            s.toLowerCase().includes(inputValue.toLowerCase())
        )
      : [];

    const containerClasses = [styles.container, className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={containerClasses}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Existing tags */}
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            <span className={styles.tagLabel}>{tag}</span>
            <button
              type="button"
              className={styles.removeTagButton}
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag);
              }}
              aria-label={`Remove tag ${tag}`}
            >
              <CloseIcon />
            </button>
          </span>
        ))}

        {/* Input */}
        {!isAtLimit && (
          <div className={styles.inputWrapper}>
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => {
                // Delay to allow suggestion click to register
                setTimeout(() => setShowSuggestions(false), 150);
              }}
              placeholder={tags.length === 0 ? placeholder : ''}
              aria-label="Add tag"
              aria-autocomplete={suggestions ? 'list' : undefined}
              aria-controls={suggestions ? listboxId : undefined}
              aria-expanded={showSuggestions && filteredSuggestions.length > 0}
            />

            {/* Suggestions dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className={styles.suggestions} id={listboxId} role="listbox" aria-label="Tag suggestions">
                {filteredSuggestions.map((suggestion) => (
                  <div
                    key={suggestion}
                    className={styles.suggestionItem}
                    role="option"
                    aria-selected={false}
                    onMouseDown={(e) => {
                      e.preventDefault(); // prevent blur before click
                      handleSuggestionClick(suggestion);
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {isAtLimit && (
          <span className={styles.limitMessage}>
            Max {maxTags} tags
          </span>
        )}
      </div>
    );
  }
);

ManageTags.displayName = 'ManageTags';

export default ManageTags;
