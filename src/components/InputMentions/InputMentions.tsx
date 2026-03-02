import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './InputMentions.module.css';

export interface MentionSuggestion {
  id: string;
  label: string;
  avatar?: string;
}

export interface InputMentionsProps {
  value?: string;
  onChange?: (value: string) => void;
  suggestions?: MentionSuggestion[];
  onMention?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

// Compute initials from a label
function getInitials(label: string): string {
  const words = label.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export const InputMentions: React.FC<InputMentionsProps> = ({
  value = '',
  onChange,
  suggestions = [],
  onMention,
  placeholder = 'Type @ to mention someone…',
  className,
}) => {
  const [mentionQuery, setMentionQuery] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Tracks the cursor position where @ was typed
  const mentionStartRef = useRef<number>(-1);

  // Filter suggestions against the current query
  const filtered = mentionQuery !== null
    ? suggestions.filter((s) =>
        s.label.toLowerCase().includes(mentionQuery.toLowerCase())
      )
    : [];

  const isOpen = mentionQuery !== null && filtered.length > 0;

  const closeSuggestions = useCallback(() => {
    setMentionQuery(null);
    mentionStartRef.current = -1;
    setActiveIndex(0);
  }, []);

  const insertMention = useCallback(
    (suggestion: MentionSuggestion) => {
      if (!textareaRef.current) return;
      const cursorPos = textareaRef.current.selectionStart ?? value.length;
      const startPos = mentionStartRef.current;
      if (startPos === -1) return;

      // Replace from @ up to current cursor with @label + space
      const before = value.slice(0, startPos);
      const after = value.slice(cursorPos);
      const newValue = `${before}@${suggestion.label} ${after}`;

      onChange?.(newValue);
      closeSuggestions();

      // Move cursor to after inserted mention
      requestAnimationFrame(() => {
        if (!textareaRef.current) return;
        const pos = before.length + suggestion.label.length + 2; // '@' + label + ' '
        textareaRef.current.setSelectionRange(pos, pos);
        textareaRef.current.focus();
      });
    },
    [value, onChange, closeSuggestions]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      onChange?.(newValue);

      const cursorPos = e.target.selectionStart ?? 0;

      // Look backward from cursor for @ not preceded by word character
      const textBeforeCursor = newValue.slice(0, cursorPos);
      const atIndex = textBeforeCursor.lastIndexOf('@');

      if (atIndex !== -1) {
        // Check nothing between @ and cursor is a space (i.e. still in same token)
        const tokenAfterAt = textBeforeCursor.slice(atIndex + 1);
        if (!tokenAfterAt.includes(' ') && !tokenAfterAt.includes('\n')) {
          mentionStartRef.current = atIndex;
          setMentionQuery(tokenAfterAt);
          setActiveIndex(0);
          onMention?.(tokenAfterAt);
          return;
        }
      }

      // No mention in progress
      closeSuggestions();
    },
    [onChange, onMention, closeSuggestions]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((idx) => (idx + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((idx) => (idx - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[activeIndex]) {
          insertMention(filtered[activeIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeSuggestions();
      }
    },
    [isOpen, filtered, activeIndex, insertMention, closeSuggestions]
  );

  // Close on click outside
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeSuggestions();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [closeSuggestions]);

  const containerClasses = [styles.container, className].filter(Boolean).join(' ');

  return (
    <div ref={containerRef} className={containerClasses}>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={3}
        aria-label="Message input"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      />

      {isOpen && (
        <ul
          className={styles.dropdown}
          role="listbox"
          aria-label="Mention suggestions"
        >
          {filtered.map((suggestion, idx) => (
            <li
              key={suggestion.id}
              role="option"
              aria-selected={idx === activeIndex}
              className={[styles.suggestionItem, idx === activeIndex && styles.active]
                .filter(Boolean)
                .join(' ')}
              onMouseDown={(e) => {
                // Prevent textarea blur before we can insert
                e.preventDefault();
                insertMention(suggestion);
              }}
              onMouseEnter={() => setActiveIndex(idx)}
            >
              {suggestion.avatar ? (
                <img
                  src={suggestion.avatar}
                  alt=""
                  className={styles.avatar}
                  aria-hidden="true"
                />
              ) : (
                <span className={styles.avatarFallback} aria-hidden="true">
                  {getInitials(suggestion.label)}
                </span>
              )}
              <span className={styles.suggestionLabel}>{suggestion.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

InputMentions.displayName = 'InputMentions';

export default InputMentions;
