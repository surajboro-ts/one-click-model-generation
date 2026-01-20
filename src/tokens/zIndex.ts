/**
 * Z-Index Tokens
 * 
 * Layering system for consistent stacking context.
 */

export const zIndex = {
  // Base layers
  hide: -1,
  base: 0,
  
  // Content layers
  raised: 1,
  dropdown: 10,
  sticky: 20,
  
  // Overlay layers
  overlay: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
  
  // Top-level layers
  toast: 70,
  notification: 80,
  
  // Maximum layer
  max: 9999,
} as const;

// Component-specific z-index mapping
export const componentZIndex = {
  // Navigation
  header: zIndex.sticky,
  sidebar: zIndex.sticky,
  mobileNav: zIndex.overlay,
  
  // Dropdowns & Menus
  dropdown: zIndex.dropdown,
  menu: zIndex.dropdown,
  select: zIndex.dropdown,
  
  // Overlays
  modalOverlay: zIndex.overlay,
  drawerOverlay: zIndex.overlay,
  
  // Dialogs
  modal: zIndex.modal,
  dialog: zIndex.modal,
  drawer: zIndex.modal,
  
  // Floating elements
  popover: zIndex.popover,
  tooltip: zIndex.tooltip,
  
  // Notifications
  toast: zIndex.toast,
  alert: zIndex.notification,
  
  // Focus trap (for accessibility)
  focusTrap: zIndex.max,
} as const;

// Type exports
export type ZIndex = keyof typeof zIndex;
export type ComponentZIndex = typeof componentZIndex;

