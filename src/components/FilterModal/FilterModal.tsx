import React, { useState, useCallback, useEffect, useRef } from 'react';
import styles from './FilterModal.module.css';

// ── Types ─────────────────────────────────────────────────────────────────

export type FilterSectionType = 'checkbox' | 'radio' | 'range' | 'search';

export interface FilterSectionOption {
  id: string;
  label: string;
}

export interface FilterSection {
  id: string;
  label: string;
  type: FilterSectionType;
  options?: FilterSectionOption[];
  min?: number;
  max?: number;
}

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  sections: FilterSection[];
  value?: Record<string, unknown>;
  onChange?: (value: Record<string, unknown>) => void;
  onApply?: (value: Record<string, unknown>) => void;
  onReset?: () => void;
  title?: string;
}

// ── Section renderers ─────────────────────────────────────────────────────

interface CheckboxSectionProps {
  section: FilterSection;
  sectionValue: string[];
  onChange: (ids: string[]) => void;
}

const CheckboxSection: React.FC<CheckboxSectionProps> = ({ section, sectionValue, onChange }) => {
  const selected = new Set(sectionValue);

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange(Array.from(next));
  };

  return (
    <div className={styles.optionList}>
      {(section.options ?? []).map((opt) => (
        <label key={opt.id} className={styles.optionRow}>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            checked={selected.has(opt.id)}
            onChange={() => toggle(opt.id)}
          />
          <span className={styles.optionLabel}>{opt.label}</span>
        </label>
      ))}
    </div>
  );
};

interface RadioSectionProps {
  section: FilterSection;
  sectionValue: string;
  onChange: (id: string) => void;
}

const RadioSection: React.FC<RadioSectionProps> = ({ section, sectionValue, onChange }) => (
  <div className={styles.optionList}>
    {(section.options ?? []).map((opt) => (
      <label key={opt.id} className={styles.optionRow}>
        <input
          type="radio"
          className={styles.radioInput}
          name={`filter-radio-${section.id}`}
          checked={sectionValue === opt.id}
          onChange={() => onChange(opt.id)}
        />
        <span className={styles.optionLabel}>{opt.label}</span>
      </label>
    ))}
  </div>
);

interface RangeSectionProps {
  section: FilterSection;
  sectionValue: { min: number; max: number };
  onChange: (v: { min: number; max: number }) => void;
}

const RangeSection: React.FC<RangeSectionProps> = ({ section, sectionValue, onChange }) => {
  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...sectionValue, min: Number(e.target.value) });
  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...sectionValue, max: Number(e.target.value) });

  return (
    <div className={styles.rangeRow}>
      <div className={styles.rangeField}>
        <label className={styles.rangeLabel}>Min</label>
        <input
          type="number"
          className={styles.rangeInput}
          value={sectionValue.min}
          min={section.min}
          max={section.max}
          onChange={handleMin}
          placeholder={section.min !== undefined ? String(section.min) : '0'}
        />
      </div>
      <span className={styles.rangeSeparator}>–</span>
      <div className={styles.rangeField}>
        <label className={styles.rangeLabel}>Max</label>
        <input
          type="number"
          className={styles.rangeInput}
          value={sectionValue.max}
          min={section.min}
          max={section.max}
          onChange={handleMax}
          placeholder={section.max !== undefined ? String(section.max) : '100'}
        />
      </div>
    </div>
  );
};

interface SearchSectionProps {
  section: FilterSection;
  sectionValue: string;
  onChange: (v: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ section, sectionValue, onChange }) => (
  <input
    type="text"
    className={styles.searchInput}
    value={sectionValue}
    onChange={(e) => onChange(e.target.value)}
    placeholder={`Search ${section.label}…`}
    aria-label={`Search ${section.label}`}
  />
);

// ── Close button SVG ──────────────────────────────────────────────────────

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M3 3l10 10M13 3L3 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// ── Utility — build safe default value for a section ────────────────────

function defaultSectionValue(section: FilterSection): unknown {
  switch (section.type) {
    case 'checkbox':
      return [] as string[];
    case 'radio':
      return '';
    case 'range':
      return { min: section.min ?? 0, max: section.max ?? 100 };
    case 'search':
      return '';
  }
}

// ── Main component ────────────────────────────────────────────────────────

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  sections,
  value = {},
  onChange,
  onApply,
  onReset,
  title = 'Filters',
}) => {
  const [localValue, setLocalValue] = useState<Record<string, unknown>>(value);
  const panelRef = useRef<HTMLDivElement>(null);

  // Sync localValue when the modal opens or external value changes
  useEffect(() => {
    if (isOpen) {
      setLocalValue(value);
    }
  }, [isOpen]); // intentionally omit `value` — we only sync on open

  // Escape key closes
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Trap focus to panel when open
  useEffect(() => {
    if (isOpen && panelRef.current) {
      // Focus the first focusable element
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable[0]?.focus();
    }
  }, [isOpen]);

  const updateSection = useCallback(
    (sectionId: string, sectionVal: unknown) => {
      setLocalValue((prev) => {
        const next = { ...prev, [sectionId]: sectionVal };
        onChange?.(next);
        return next;
      });
    },
    [onChange]
  );

  const handleApply = useCallback(() => {
    onApply?.(localValue);
    onClose();
  }, [localValue, onApply, onClose]);

  const handleReset = useCallback(() => {
    const empty: Record<string, unknown> = {};
    sections.forEach((s) => {
      empty[s.id] = defaultSectionValue(s);
    });
    setLocalValue(empty);
    onChange?.(empty);
    onReset?.();
  }, [sections, onChange, onReset]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} aria-modal="true" role="dialog" aria-label={title}>
      <div ref={panelRef} className={styles.panel}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close filters"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {sections.map((section, idx) => {
            const rawVal = localValue[section.id];

            return (
              <React.Fragment key={section.id}>
                <div className={styles.section}>
                  <p className={styles.sectionLabel}>{section.label}</p>

                  {section.type === 'checkbox' && (
                    <CheckboxSection
                      section={section}
                      sectionValue={(rawVal as string[]) ?? []}
                      onChange={(v) => updateSection(section.id, v)}
                    />
                  )}

                  {section.type === 'radio' && (
                    <RadioSection
                      section={section}
                      sectionValue={(rawVal as string) ?? ''}
                      onChange={(v) => updateSection(section.id, v)}
                    />
                  )}

                  {section.type === 'range' && (
                    <RangeSection
                      section={section}
                      sectionValue={
                        (rawVal as { min: number; max: number }) ?? {
                          min: section.min ?? 0,
                          max: section.max ?? 100,
                        }
                      }
                      onChange={(v) => updateSection(section.id, v)}
                    />
                  )}

                  {section.type === 'search' && (
                    <SearchSection
                      section={section}
                      sectionValue={(rawVal as string) ?? ''}
                      onChange={(v) => updateSection(section.id, v)}
                    />
                  )}
                </div>

                {/* Divider between sections */}
                {idx < sections.length - 1 && <div className={styles.divider} />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button type="button" className={styles.resetButton} onClick={handleReset}>
            Reset
          </button>
          <button type="button" className={styles.applyButton} onClick={handleApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

FilterModal.displayName = 'FilterModal';

export default FilterModal;
