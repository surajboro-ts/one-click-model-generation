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
import HomepageExampleThumbnail from './thumbnails/Homepage_example.svg';

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
}

/**
 * Project registry
 * 
 * Projects are auto-registered by `npm run new-prototype`.
 * To add a thumbnail later, import an SVG and add it to the entry.
 */

// Import project components
// Use dynamic imports for better code splitting
const HomepageExample = React.lazy(() => import('./Homepage_example'));
const Liveboard = React.lazy(() => import('./Liveboard'));
const Cmdk = React.lazy(() => import('./Cmdk'));
const SpotterMemory = React.lazy(() => import('./SpotterMemory'));
const AdminGroups = React.lazy(() => import('./AdminGroups'));

/**
 * All registered projects
 */
export const projectRegistry: ProjectMeta[] = [
  {
    id: 'Homepage_example',
    name: 'Homepage Example',
    description: 'A sample homepage prototype demonstrating the template structure.',
    author: 'Template',
    thumbnail: HomepageExampleThumbnail,
    component: HomepageExample,
  },
  {
    id: 'Liveboard',
    name: 'Liveboard',
    description: 'TSE Business Overview dashboard with KPIs, charts, and regional data visualization.',
    author: 'Design Team',
    thumbnail: LiveboardThumbnail,
    component: Liveboard,
  },
  {
    id: 'Cmdk',
    name: 'Command Palette',
    description: 'Command-K interface for quick navigation and actions with keyboard shortcuts and context-aware filtering.',
    author: 'Design Team',
    thumbnail: CmdkThumbnail,
    component: Cmdk,
  },
  {
    id: 'SpotterMemory',
    name: 'Spotter Memory',
    description: 'Memory Sources object table experience with search, filtering, and pagination.',
    author: 'Design Team',
    thumbnail: SpotterMemoryThumbnail,
    component: SpotterMemory,
  },
  {
    id: 'AdminGroups',
    name: 'Admin Groups',
    description: 'Group creation wizard with bulk org assignment and role management.',
    author: 'Design Team',
    thumbnail: AdminGroupsThumbnail,
    component: AdminGroups,
  },
  // Add more projects here as they are created
  // {
  //   id: 'my-project',
  //   name: 'My Project',
  //   description: 'Description of my project',
  //   author: 'Designer Name',
  //   thumbnail: MyProjectThumbnail,
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
