/**
 * VariantDropdown - UI Variant Selector
 * 
 * Dropdown for selecting the ResultCard variant.
 * Positioned in top-right of demo wrapper.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '../../../components/icons';
import { brandColors } from '../../../tokens/colors/brand';
import { spacing } from '../../../tokens/spacing';
import type { CardVariant } from '../types';

interface VariantOption {
  id: CardVariant;
  label: string;
  description: string;
}

const VARIANT_OPTIONS: VariantOption[] = [
  { id: 'figmaSpec', label: 'Figma Spec', description: 'px-16 py-8, 14px icon' },
  { id: 'compact', label: 'Compact', description: 'Single line, py-6' },
  { id: 'spacious', label: 'Spacious', description: '16px icon with bg' },
  { id: 'twoLine16', label: 'Two-Line 16px', description: '16px icon, two lines' },
  { id: 'twoLine20', label: 'Two-Line 20px', description: '20px icon, two lines' },
];

interface VariantDropdownProps {
  /** Currently selected variant */
  value: CardVariant;
  /** Handler when variant changes */
  onChange: (variant: CardVariant) => void;
}

export const VariantDropdown: React.FC<VariantDropdownProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = VARIANT_OPTIONS.find(opt => opt.id === value);

  return (
    <div ref={containerRef} style={styles.container}>
      <button
        style={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span style={styles.triggerLabel}>Variant: {selectedOption?.label}</span>
        <Icon name="chevron-down" size="xs" />
      </button>

      {isOpen && (
        <div style={styles.dropdown} role="listbox">
          {VARIANT_OPTIONS.map((option) => (
            <div
              key={option.id}
              style={{
                ...styles.option,
                ...(option.id === value ? styles.optionSelected : {}),
              }}
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
              role="option"
              aria-selected={option.id === value}
            >
              <div style={styles.optionLabel}>{option.label}</div>
              <div style={styles.optionDescription}>{option.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'relative',
    display: 'inline-block',
  },
  trigger: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`, // 8px
    padding: `${spacing.B}px ${spacing.C}px`, // 8px 12px
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    color: brandColors.white,
    fontSize: 13,
    fontWeight: 400,
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
    backdropFilter: 'blur(8px)',
  },
  triggerLabel: {
    whiteSpace: 'nowrap',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    marginTop: 4,
    minWidth: 220,
    backgroundColor: brandColors.white,
    border: `1px solid ${brandColors.gray[20]}`,
    borderRadius: 8,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    zIndex: 100,
  },
  option: {
    padding: `${spacing.C}px ${spacing.D}px`, // 12px 16px
    cursor: 'pointer',
    transition: 'background-color 0.1s ease',
    borderBottom: `1px solid ${brandColors.gray[20]}`,
  },
  optionSelected: {
    backgroundColor: brandColors.blue[10],
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: brandColors.gray[90],
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 12,
    color: brandColors.gray[60],
  },
};

export default VariantDropdown;
