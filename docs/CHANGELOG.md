# Changelog

All notable changes to the Radiant Prototyping Kit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-01-30

### Added

- **New Home Page**: Simple split landing page with two large cards for navigating to Radiant (design system) and Playground (projects)
- **Playground Gallery** (`/playground`): Grid view of all registered projects with project cards showing name, description, and author
- **Full-Page Project View** (`/playground/:projectName`): Distraction-free environment for individual projects with:
  - Floating back button (top-left)
  - Project name badge (top-right)
  - Escape key support to return to gallery
  - Lazy loading with Suspense
- **Project Registry** (`src/prototypes/registry.ts`): Central registry for discovering and managing playground projects with metadata support

### Changed

- **URL Structure**: Reorganized routes under `/radiant/*` for design system content:
  - `/radiant` - Component overview
  - `/radiant/components/*` - Component documentation pages
  - `/radiant/architecture` - Token architecture
  - `/radiant/icons` - Icon gallery
  - `/radiant/examples/*` - Example prototypes
- **Renamed `HomePage.tsx` to `RadiantHomePage.tsx`**: The original component overview page is now dedicated to the Radiant section
- **Updated App.tsx routing**: Complete restructure with new route definitions and legacy redirects

### Removed

- **`PlaygroundShowcase.tsx`**: Replaced by the new Playground system (Gallery + Project views)
- **`WelcomePage.tsx`**: Replaced by the new simple split HomePage

### Migration Notes

- Old routes like `/components`, `/architecture`, `/icons` now redirect to their `/radiant/*` equivalents
- The playground is no longer a component demo; it's now a project workspace
- To add new projects to the Playground:
  1. Create a folder in `src/prototypes/`
  2. Export a default component from `index.tsx`
  3. Register the project in `src/prototypes/registry.ts`

---

## [1.0.0] - Initial Release

### Added

- Core component library (17 components)
- 3-tier design token system (Brand, Alias, Mapped)
- Icon library (46 icons)
- Component documentation pages
- Example prototypes (Filter Dialog, Data Dashboard, Settings Panel)
- AI-assisted prototyping workflow
- Collaboration documentation (forking, branching, contributing)
