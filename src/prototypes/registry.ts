/**
 * Project Registry
 * 
 * Central registry for discovering and managing playground projects.
 * Projects are folders in src/prototypes/ that export a default component.
 */

import React from 'react';

// Import thumbnail images
import CmdkThumbnail from './thumbnails/Cmdk.svg';
import AdminGroupsThumbnail from './thumbnails/AdminGroups.svg';
import SpotterMemoryThumbnail from './thumbnails/SpotterMemory.svg';
import LiveboardThumbnail from './thumbnails/Liveboard.svg';

/**
 * Metadata for a playground project
 */
export interface ProjectMeta {
  /** Unique identifier (folder name) */
  id: string;
  /** Display name */
  name: string;
  /** Project description */
  description?: string;
  /** Project author/designer */
  author?: string;
  /** Last modified date */
  lastModified?: string;
  /** Thumbnail image path */
  thumbnail?: string;
  /** Project component */
  component: React.ComponentType;
  /** Number of shared Radiant design system components used */
  dsComponents?: number;
  /** Number of custom/local components created for this prototype */
  customComponents?: number;
  /** Which gallery section: 'sample' for built-in examples, 'mine' for user-created (default) */
  section?: 'sample' | 'mine';
}

/**
 * Project registry
 * 
 * Projects are auto-registered by `npm run new-prototype`.
 * To add a thumbnail later, import an SVG and add it to the entry.
 */

// Import project components (lazy-loaded for code splitting)
const Liveboard = React.lazy(() => import('./Liveboard'));
const Cmdk = React.lazy(() => import('./Cmdk'));
const SpotterMemory = React.lazy(() => import('./SpotterMemory'));
const AdminGroups = React.lazy(() => import('./AdminGroups'));
const ImpersonationV2 = React.lazy(() => import('./ImpersonationV2'));
const SpotterModelProto = React.lazy(() => import('./SpotterModel'));

/**
 * All registered projects
 */
export const projectRegistry: ProjectMeta[] = [
  {
    id: 'Liveboard',
    name: 'Liveboard',
    description: 'TSE Business Overview dashboard with KPIs, charts, and regional data visualization.',
    author: 'Design Team',
    lastModified: '2026-02-19',
    thumbnail: LiveboardThumbnail,
    component: Liveboard,
    dsComponents: 10,
    customComponents: 10,
    section: 'sample',
  },
  {
    id: 'Cmdk',
    name: 'Command Palette',
    description: 'Command-K interface for quick navigation and actions with keyboard shortcuts and context-aware filtering.',
    author: 'Design Team',
    lastModified: '2026-02-19',
    thumbnail: CmdkThumbnail,
    component: Cmdk,
    dsComponents: 12,
    customComponents: 11,
    section: 'sample',
  },
  {
    id: 'SpotterMemory',
    name: 'Spotter Memory',
    description: 'Memory Sources object table experience with search, filtering, and pagination.',
    author: 'Design Team',
    lastModified: '2026-02-19',
    thumbnail: SpotterMemoryThumbnail,
    component: SpotterMemory,
    dsComponents: 6,
    customComponents: 5,
    section: 'sample',
  },
  {
    id: 'AdminGroups',
    name: 'Admin Groups',
    description: 'Group creation wizard with bulk org assignment and role management.',
    author: 'Design Team',
    lastModified: '2026-02-19',
    thumbnail: AdminGroupsThumbnail,
    component: AdminGroups,
    dsComponents: 9,
    customComponents: 10,
    section: 'sample',
  },
  {
    id: 'ImpersonationV2',
    name: 'Admin Impersonation',
    description: 'Admin palette impersonation — blue viewport border, GlobalHeader icon, session timer popup, and Toast notification.',
    author: 'Design Team',
    lastModified: '2026-03-03',
    component: ImpersonationV2,
    dsComponents: 11,
    customComponents: 3,
    section: 'sample',
  },
  {
    id: 'SpotterModel',
    name: 'Spotter Model',
    description: 'SpotterModel agent edit flow — onboarding, table/join recommendations, columns editing, and impact-aware delete.',
    author: 'Design Team',
    lastModified: '2026-03-03',
    component: SpotterModelProto,
    dsComponents: 5,
    customComponents: 14,
    section: 'sample',
  },
  // Add more projects here. New prototypes default to 'mine' section.
  // Set section: 'sample' to show under Sample prototypes instead.
  // {
  //   id: 'my-project',
  //   name: 'My Project',
  //   description: 'Description of my project',
  //   author: 'Designer Name',
  //   component: React.lazy(() => import('./my-project')),
  // },
];

/**
 * Get a project by ID
 */
export function getProject(id: string): ProjectMeta | undefined {
  return projectRegistry.find(p => p.id === id);
}

/**
 * Get all projects (excluding templates and examples)
 */
export function getAllProjects(): ProjectMeta[] {
  return projectRegistry;
}

/**
 * Check if a project exists
 */
export function projectExists(id: string): boolean {
  return projectRegistry.some(p => p.id === id);
}

export default projectRegistry;
