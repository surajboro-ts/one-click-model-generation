import React, { useState, useRef, useCallback } from 'react';
import { systemColors } from '../../../tokens/colors';
import { spacing } from '../../../tokens/spacing';
import { fontFamily, fontWeight, fontSize, lineHeight } from '../../../tokens/typography';
import { Icon } from '../../../components';
import { IconButton } from './IconButton';

interface PromptBarProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export const PromptBar: React.FC<PromptBarProps> = ({ onSend, disabled }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.inputRow}>
          <textarea
            ref={inputRef}
            style={styles.input}
            placeholder="Ask me a question. Use '@' to select columns and values."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            rows={1}
            disabled={disabled}
          />
        </div>
        <div style={styles.bottomRow}>
          <div style={styles.leftActions}>
            <div style={styles.modeToggle}>
              <div style={styles.modeToggleBg}>
                <div style={styles.modeToggleThumb} />
              </div>
            </div>
            <div style={styles.divider} />
            <div style={styles.dataSourceChip}>
              <span style={styles.dataSourceText}>Retail Sales</span>
              <Icon name="table" size="xs" />
            </div>
            <IconButton icon="plus" aria-label="Add data source" />
          </div>
          <div style={styles.rightActions}>
            <IconButton icon="controls" aria-label="Controls" />
            {/* Raw button: circular send trigger doesn't map to Radiant Button */}
            <button
              style={{
                ...styles.sendBtn,
                ...(value.trim() ? styles.sendBtnActive : {}),
              }}
              onClick={handleSend}
              disabled={disabled || !value.trim()}
              aria-label="Send message"
            >
              <Icon name="arrow-up" size="s" color="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    maxWidth: 902,
    margin: '0 auto',
    width: '100%',
    paddingBottom: `${spacing.B}px`,
    position: 'relative',
  },
  container: {
    backgroundColor: systemColors.light['background-base'],
    border: `1px solid ${systemColors.light['border-divider']}`,
    borderRadius: 12,
    padding: `${spacing.D}px`,
    boxShadow: '0 0 4px rgba(25, 35, 49, 0.1), 0 2px 4px rgba(25, 35, 49, 0.04)',
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.F}px`,
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.D}px`,
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    resize: 'none' as const,
    fontFamily: fontFamily.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.light,
    lineHeight: `${lineHeight.lg}px`,
    color: systemColors.light['content-primary'],
    backgroundColor: 'transparent',
    minHeight: 24,
    maxHeight: 120,
    overflow: 'auto',
  },
  bottomRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftActions: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.C}px`,
  },
  modeToggle: {
    width: 60,
    height: 32,
    position: 'relative',
  },
  modeToggleBg: {
    width: 60,
    height: 32,
    borderRadius: 17,
    backgroundColor: systemColors.light['background-subtle'],
    position: 'relative',
  },
  modeToggleThumb: {
    width: 28,
    height: 28,
    borderRadius: 17,
    backgroundColor: systemColors.light['background-base'],
    boxShadow: '0 2px 4px rgba(25, 35, 49, 0.04)',
    position: 'absolute',
    top: 2,
    left: 2,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: systemColors.light['border-divider'],
  },
  dataSourceChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: `${spacing.B}px`,
    padding: `6px ${spacing.D}px 6px ${spacing.D}px`,
    backgroundColor: systemColors.light['background-subtle'],
    borderRadius: 18,
    cursor: 'pointer',
  },
  dataSourceText: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.light,
    lineHeight: `${lineHeight.md}px`,
    color: systemColors.light['content-primary'],
  },
  rightActions: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`,
  },
  sendBtn: {
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: 18,
    cursor: 'pointer',
    padding: 0,
    backgroundColor: systemColors.light['content-tertiary'],
    transition: 'background-color 150ms ease',
  },
  sendBtnActive: {
    backgroundColor: systemColors.light['content-brand'],
  },
};

export default PromptBar;
