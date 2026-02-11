/**
 * Icon Component Types
 * 
 * Type definitions for the icon system.
 */

import { IconSize } from '../../tokens/icons';

/**
 * Base props shared by all individual icon components
 */
export interface BaseIconProps {
  /** Size variant of the icon */
  size?: IconSize;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Additional CSS class names */
  className?: string;
  /** Accessibility label */
  'aria-label'?: string;
  /** Hide from screen readers when decorative */
  'aria-hidden'?: boolean;
}

/**
 * Props for the main Icon component that renders icons by name
 */
export interface IconProps extends BaseIconProps {
  /** Name of the icon to render */
  name: IconName;
}

/**
 * Icon component type for registry entries
 */
export type IconComponent = React.FC<BaseIconProps>;

/**
 * All available icon names in the system
 * This will be populated by the registry
 */
export type IconName =
  | 'plus'
  | 'cross'
  | 'cross-circle'
  | 'cross-circle2'
  | 'chevron-down'
  | 'chevron-up'
  | 'chevron-left'
  | 'chevron-right'
  | 'caret-down'
  | 'caret-up'
  | 'caret-left'
  | 'caret-right'
  | 'arrow-down'
  | 'arrow-up'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-down-circle'
  | 'arrow-up-circle'
  | 'arrow-left-circle'
  | 'arrow-right-circle'
  | 'checkmark'
  | 'checkmark-circle'
  | 'information'
  | 'info-circle'
  | 'question-mark'
  | 'exclamation-point-circle'
  | 'eye'
  | 'eye-undo'
  | 'copy'
  | 'copy-link'
  | 'trash-can'
  | 'pencil'
  | 'edit-text'
  | 'search'
  | 'magnifying-glass'
  | 'cog'
  | 'settings'
  | 'star'
  | 'star-undo'
  | 'pin'
  | 'pinboard'
  | 'bookmark'
  | 'funnel'
  | 'filter'
  | 'sort'
  | 'more'
  | 'hamburger'
  | 'expand'
  | 'fullscreen'
  | 'fullscreen-undo'
  | 'download'
  | 'upload'
  | 'upload-data'
  | 'play'
  | 'pause'
  | 'video'
  | 'microphone'
  | 'camera'
  | 'clock'
  | 'calendar-cleaned'
  | 'profile'
  | 'add-user'
  | 'follow'
  | 'follow-undo'
  | 'following'
  | 'community'
  | 'thumb-up'
  | 'thumb-up-undo'
  | 'thumb-down'
  | 'thumb-down-undo'
  | 'present'
  | 'share'
  | 'paper-plane'
  | 'save'
  | 'save-worksheet'
  | 'note'
  | 'documentation'
  | 'book'
  | 'book-closed'
  | 'database'
  | 'schema'
  | 'formula'
  | 'data-column'
  | 'attribute'
  | 'chart'
  | 'table'
  | 'grid-view'
  | 'list-view'
  | 'navigate'
  | 'rocket'
  | 'drill-down'
  | 'explore'
  | 'brush'
  | 'tag'
  | 'lock'
  | 'lock-undo'
  | 'key'
  | 'sign-out'
  | 'reset'
  | 'sync'
  | 'undo'
  | 'redo'
  | 'minus'
  | 'text'
  | 'text-undo'
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strike-through'
  | 'case'
  | 'number-format'
  | 'conditional-format'
  | 'zoom-area'
  | 'show-underlying-data'
  | 'replay-search'
  | 'r-analysis'
  | 'create-worksheet'
  | 'create-pinboard'
  | 'agenda'
  | 'bulb'
  | 'enter'
  | 'escape'
  | 'embrace'
  | 'cord'
  | 'drag'
  | 'wrench'
  | 'measure'
  | 'monitor'
  | 'app-switcher'
  | 'group-undo'
  | 'pdf'
  | 'ppt'
  | 'excel'
  | 'doc'
  | 'verified'
  | 'join-outer'
  | 'join-left'
  | 'join-right'
  | 'join-inner'
  | 'ai'
  | 'answer'
  | 'liveboard'
  | 'controls'
  | 'collection'
  | 'spotter'
  | 'folder';

/**
 * Re-export IconSize for convenience
 */
export type { IconSize } from '../../tokens/icons';
