/**
 * Figma Sync Utility
 * 
 * Provides integration with Figma MCP tools for syncing component metadata.
 * This utility helps track when components were last synced from Figma
 * and manages the connection between Figma designs and code components.
 */

import type { ComponentMeta } from '../data/componentRegistry';
import type { VersionChange } from '../data/versionHistory';

/**
 * Figma node metadata returned from MCP
 */
export interface FigmaNodeMetadata {
  nodeId: string;
  name: string;
  type: string;
  children?: FigmaNodeMetadata[];
}

/**
 * Figma code connect mapping
 */
export interface FigmaCodeConnectMap {
  [nodeId: string]: {
    codeConnectSrc: string;
    codeConnectName: string;
  };
}

/**
 * Sync result for a single component
 */
export interface ComponentSyncResult {
  componentId: string;
  success: boolean;
  previousSync?: string;
  newSync: string;
  changes: string[];
  error?: string;
}

/**
 * Overall sync session result
 */
export interface SyncSessionResult {
  sessionId: string;
  timestamp: string;
  totalComponents: number;
  syncedComponents: number;
  failedComponents: number;
  results: ComponentSyncResult[];
  version?: string;
}

/**
 * Generate a unique session ID for sync tracking
 */
export const generateSyncSessionId = (): string => {
  return `sync-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get current ISO date string
 */
export const getCurrentISODate = (): string => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Parse Figma URL to extract file key and node ID
 */
export const parseFigmaUrl = (url: string): { fileKey: string; nodeId?: string } | null => {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    
    // Format: /design/:fileKey/:fileName or /design/:fileKey/branch/:branchKey/:fileName
    const designIndex = pathParts.indexOf('design');
    if (designIndex === -1) return null;
    
    const fileKey = pathParts[designIndex + 1];
    
    // Check for branch format
    const branchIndex = pathParts.indexOf('branch');
    const finalFileKey = branchIndex !== -1 ? pathParts[branchIndex + 1] : fileKey;
    
    // Extract node ID from query params
    const nodeIdParam = urlObj.searchParams.get('node-id');
    const nodeId = nodeIdParam ? nodeIdParam.replace('-', ':') : undefined;
    
    return { fileKey: finalFileKey, nodeId };
  } catch {
    return null;
  }
};

/**
 * Map Figma component name to local component ID
 */
export const mapFigmaNameToComponentId = (figmaName: string): string | null => {
  const nameMap: Record<string, string> = {
    'Button': 'button',
    'Checkbox': 'checkbox',
    'Radio': 'radio',
    'Toggle': 'toggle',
    'Toggle Switch': 'toggle',
    'Text Input': 'textinput',
    'TextInput': 'textinput',
    'Search Input': 'searchinput',
    'SearchInput': 'searchinput',
    'Select': 'select',
    'Dropdown': 'select',
    'Alert': 'alert',
    'Modal': 'modal',
    'Dialog': 'modal',
    'Tooltip': 'tooltip',
    'Popover': 'popover',
    'Table': 'table',
    'Chip': 'chip',
    'Tag': 'chip',
    'Tabs': 'tabs',
  };
  
  // Try exact match first
  if (nameMap[figmaName]) {
    return nameMap[figmaName];
  }
  
  // Try case-insensitive match
  const lowerName = figmaName.toLowerCase();
  for (const [key, value] of Object.entries(nameMap)) {
    if (key.toLowerCase() === lowerName) {
      return value;
    }
  }
  
  // Try partial match
  for (const [key, value] of Object.entries(nameMap)) {
    if (lowerName.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerName)) {
      return value;
    }
  }
  
  return null;
};

/**
 * Extract component states from Figma variants
 */
export const extractStatesFromVariants = (variants: string[]): string[] => {
  const statePatterns = [
    'default', 'hover', 'active', 'pressed', 'focus', 'disabled',
    'checked', 'unchecked', 'indeterminate', 'selected', 'unselected',
    'on', 'off', 'open', 'closed', 'loading', 'error', 'success', 'warning', 'info',
    'empty', 'filled',
  ];
  
  const extractedStates = new Set<string>();
  
  for (const variant of variants) {
    const lowerVariant = variant.toLowerCase();
    for (const state of statePatterns) {
      if (lowerVariant.includes(state)) {
        extractedStates.add(state);
      }
    }
  }
  
  return Array.from(extractedStates);
};

/**
 * Create a version change entry for a sync operation
 */
export const createSyncVersionChange = (
  componentName: string,
  changes: string[]
): VersionChange => {
  return {
    type: 'synced',
    component: componentName,
    description: changes.length > 0 
      ? `Updated: ${changes.join(', ')}`
      : 'Synced from Figma',
  };
};

/**
 * Format sync results for display
 */
export const formatSyncResults = (result: SyncSessionResult): string => {
  const lines = [
    `Figma Sync Complete`,
    `==================`,
    `Session: ${result.sessionId}`,
    `Time: ${result.timestamp}`,
    ``,
    `Results:`,
    `  Total: ${result.totalComponents}`,
    `  Synced: ${result.syncedComponents}`,
    `  Failed: ${result.failedComponents}`,
    ``,
  ];
  
  if (result.results.length > 0) {
    lines.push(`Details:`);
    for (const r of result.results) {
      const status = r.success ? '✓' : '✗';
      lines.push(`  ${status} ${r.componentId}`);
      if (r.changes.length > 0) {
        for (const change of r.changes) {
          lines.push(`      - ${change}`);
        }
      }
      if (r.error) {
        lines.push(`      Error: ${r.error}`);
      }
    }
  }
  
  return lines.join('\n');
};

/**
 * Instructions for manual Figma sync
 * 
 * Since Figma MCP tools require the Figma desktop app to be open,
 * this provides guidance on how to trigger a sync manually.
 */
export const getSyncInstructions = (): string => {
  return `
To sync components from Figma:

1. Open your Figma file in the Figma Desktop app
2. Select the component you want to sync
3. Use the Figma MCP tools:
   - get_code_connect_map: Get component-to-code mappings
   - get_metadata: Get component structure and node info
   - get_design_context: Get full design context for code generation

4. Update the componentRegistry.ts file with:
   - figmaNodeId: The Figma node ID
   - figmaFileKey: The Figma file key
   - lastFigmaSync: Today's date

5. Add a version entry to versionHistory.ts with:
   - type: 'figma-sync'
   - changes: List of synced components

Example MCP call:
  Tool: get_code_connect_map
  Arguments: { nodeId: "1234:5678" }
`;
};

/**
 * Validate component metadata before update
 */
export const validateComponentMeta = (meta: Partial<ComponentMeta>): string[] => {
  const errors: string[] = [];
  
  if (!meta.id) {
    errors.push('Component ID is required');
  }
  if (!meta.name) {
    errors.push('Component name is required');
  }
  if (meta.states && meta.states.length === 0) {
    errors.push('At least one state is required');
  }
  if (meta.lastFigmaSync && !/^\d{4}-\d{2}-\d{2}$/.test(meta.lastFigmaSync)) {
    errors.push('lastFigmaSync must be in YYYY-MM-DD format');
  }
  if (meta.lastModified && !/^\d{4}-\d{2}-\d{2}$/.test(meta.lastModified)) {
    errors.push('lastModified must be in YYYY-MM-DD format');
  }
  
  return errors;
};

export default {
  generateSyncSessionId,
  getCurrentISODate,
  parseFigmaUrl,
  mapFigmaNameToComponentId,
  extractStatesFromVariants,
  createSyncVersionChange,
  formatSyncResults,
  getSyncInstructions,
  validateComponentMeta,
};
