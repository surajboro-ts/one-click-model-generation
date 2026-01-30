# Radiant Prototyping Kit

Build interactive prototypes with AI assistance using ThoughtSpot's Radiant design system.

[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF)](https://vitejs.dev/)

---

## What is This?

The **Radiant Prototyping Kit** is a fork-ready repository for designers to create interactive prototypes that look and feel like ThoughtSpot's product. 

**How it works:**
1. Fork this repository
2. Open in Cursor IDE
3. Describe your UI or paste a screenshot
4. AI generates code using Radiant components
5. Preview your interactive prototype in the browser

---

## Quick Start

### 1. Fork and Clone

```bash
# Fork this repo on GitHub, then:
git clone https://github.com/YOUR-USERNAME/figmaradiant.git
cd figmaradiant
npm install
```

### 2. Start Development

```bash
npm run dev
```

Open http://localhost:5173

### 3. Open in Cursor

```bash
cursor .
```

### 4. Create Your Prototype

**Option A: Use the CLI**
```bash
npm run new-prototype MyPrototype
```

**Option B: Describe to AI**

In Cursor, open a new file and describe your UI:

> "Create a filter dialog with a search input, list of country checkboxes, and a 'Show selected' toggle at the bottom"

The AI will generate the code using Radiant components.

---

## Available Components

| Category | Components |
|----------|------------|
| **Buttons** | Button (primary, secondary, tertiary) |
| **Forms** | TextInput, SearchInput, Select, Checkbox, Radio, Toggle |
| **Feedback** | Alert, Modal, Tooltip, Popover |
| **Data** | Table, Chip |
| **Navigation** | Tabs, Sidebar |
| **Icons** | 46 icons |

---

## Project Structure

```
src/
├── components/       # Radiant component library
├── prototypes/       # Your prototypes go here
│   ├── _template/    # Starter template
│   └── _examples/    # Reference implementations
├── mocks/           # Sample data for prototypes
└── tokens/          # Design tokens
```

---

## Example Prototypes

The kit includes three example prototypes:

- **Filter Dialog** - Modal with search and multi-select
- **Data Dashboard** - Metrics, tabs, and data table
- **Settings Panel** - Sidebar navigation with forms

Browse them in the app or study the code in `src/prototypes/_examples/`.

---

## Mock Data

Import realistic sample data for your prototypes:

```tsx
import { users, analytics, navigation, forms } from '../mocks';

// User profiles
users.profiles

// KPI metrics
analytics.metrics

// Dropdown options
forms.countries
```

---

## For Designers

### Workflow

1. **Describe** - Tell Cursor AI what you want to build
2. **Generate** - AI creates code using Radiant components
3. **Preview** - See your prototype live in the browser
4. **Iterate** - Ask for changes and refinements

### Tips

- Paste screenshots from Figma for visual reference
- Mention specific component names (Button, Modal, etc.)
- Describe interactions ("opens when clicking...")
- Reference example prototypes for patterns

### Documentation

- [Prototyping Guide](docs/prototyping-guide.md) - Detailed how-to
- [Forking Guide](docs/collaboration/forking-guide.md) - Setup instructions
- [Contributing](docs/collaboration/contributing-back.md) - Share your work

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run new-prototype` | Create a new prototype |

---

## Design System Docs

| Document | Description |
|----------|-------------|
| [Design Tokens](design-token-structure.md) | Token architecture |
| [Component Patterns](docs/component-patterns.md) | React patterns |
| [Content Guidelines](docs/content-guidelines-detailed.md) | UI text rules |

---

## Contributing

Created something useful? Consider contributing back:

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a pull request

See [Contributing Guide](docs/collaboration/contributing-back.md) for details.

---

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **CSS Modules** - Scoped styling
- **Design Tokens** - Consistent theming

---

**Built for ThoughtSpot designers to prototype faster.**
