/**
 * Project Registry
 * 
 * Central registry for discovering and managing playground projects.
 * Projects are folders in src/prototypes/ that export a default component.
 */

import React from 'react';

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
 * Project registry - manually registered projects
 * 
 * To add a new project:
 * 1. Create a folder in src/prototypes/
 * 2. Create an index.tsx with a default export
 * 3. Add an entry to this registry
 */

// Import project components
// Use dynamic imports for better code splitting
const HomepageExample = React.lazy(() => import('./Homepage_example'));
const Liveboard = React.lazy(() => import('./Liveboard'));
const Cmdk = React.lazy(() => import('./Cmdk'));

/**
 * All registered projects
 */
export const projectRegistry: ProjectMeta[] = [
  {
    id: 'Homepage_example',
    name: 'Homepage Example',
    description: 'A sample homepage prototype demonstrating the template structure.',
    author: 'Template',
    component: HomepageExample,
  },
  {
    id: 'Liveboard',
    name: 'Liveboard',
    description: 'TSE Business Overview dashboard with KPIs, charts, and regional data visualization.',
    author: 'Design Team',
    component: Liveboard,
  },
  {
    id: 'Cmdk',
    name: 'Command Palette',
    description: 'Command-K interface for quick navigation and actions with keyboard shortcuts.',
    author: 'Design Team',
    component: Cmdk,
  },
  // Add more projects here as they are created
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
