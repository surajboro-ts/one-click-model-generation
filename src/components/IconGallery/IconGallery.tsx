import React, { useState, useMemo } from 'react';
import { Icon, iconNames, IconName, IconSize } from '../icons';
import styles from './IconGallery.module.css';

export type GallerySize = 'compact' | 'default' | 'large';
export type GalleryTheme = 'light' | 'dark';

export interface IconGalleryProps {
  /**
   * Gallery size/density
   * @default 'default'
   */
  size?: GallerySize;
  /**
   * Icon display size
   * @default 'm'
   */
  iconSize?: IconSize;
  /**
   * Color theme
   * @default 'light'
   */
  theme?: GalleryTheme;
  /**
   * Enable search filtering
   * @default true
   */
  searchable?: boolean;
  /**
   * Enable icon selection
   * @default false
   */
  selectable?: boolean;
  /**
   * Currently selected icon
   */
  selectedIcon?: IconName;
  /**
   * Selection change handler
   */
  onSelectIcon?: (iconName: IconName) => void;
  /**
   * Click handler for icons
   */
  onIconClick?: (iconName: IconName) => void;
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * IconGallery Component
 * 
 * Displays all available icons in a searchable, browsable gallery.
 * 
 * **Features:**
 * - Search/filter icons by name
 * - Select icons for forms
 * - Multiple size options
 * - Light and dark themes
 * 
 * @example
 * ```tsx
 * // Basic gallery
 * <IconGallery />
 * 
 * // With selection
 * <IconGallery 
 *   selectable 
 *   selectedIcon={selectedIcon}
 *   onSelectIcon={setSelectedIcon}
 * />
 * 
 * // Large icons on dark background
 * <IconGallery 
 *   size="large" 
 *   iconSize="l" 
 *   theme="dark" 
 * />
 * ```
 */
export const IconGallery: React.FC<IconGalleryProps> = ({
  size = 'default',
  iconSize = 'm',
  theme = 'light',
  searchable = true,
  selectable = false,
  selectedIcon,
  onSelectIcon,
  onIconClick,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIcons = useMemo(() => {
    if (!searchQuery.trim()) return iconNames;
    
    const query = searchQuery.toLowerCase();
    return iconNames.filter((name) => 
      name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleIconClick = (iconName: IconName) => {
    if (selectable && onSelectIcon) {
      onSelectIcon(iconName);
    }
    if (onIconClick) {
      onIconClick(iconName);
    }
  };

  const sizeClass = size !== 'default' ? styles[`gallery${size.charAt(0).toUpperCase() + size.slice(1)}`] : '';
  const themeClass = theme === 'dark' ? styles.galleryDark : '';

  const galleryClasses = [
    styles.gallery,
    sizeClass,
    themeClass,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.searchWrapper}>
      {searchable && (
        <input
          type="text"
          className={styles.search}
          placeholder="Search icons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search icons"
        />
      )}
      
      <span className={styles.count}>
        {filteredIcons.length} {filteredIcons.length === 1 ? 'icon' : 'icons'} available
      </span>
      
      <div className={galleryClasses} role="listbox" aria-label="Icon gallery">
        {filteredIcons.length === 0 ? (
          <div className={styles.empty}>
            No icons found matching "{searchQuery}"
          </div>
        ) : (
          filteredIcons.map((iconName) => {
            const isSelected = selectable && selectedIcon === iconName;
            
            return (
              <button
                key={iconName}
                type="button"
                className={`${styles.item} ${isSelected ? styles.itemSelected : ''}`}
                onClick={() => handleIconClick(iconName)}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
              >
                <div className={styles.iconContainer}>
                  <Icon name={iconName} size={iconSize} />
                </div>
                <span className={styles.iconName}>{iconName}</span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default IconGallery;
