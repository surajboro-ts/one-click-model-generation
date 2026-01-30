# Command+K Modal Prototype

A Spotlight-style search and navigation modal for ThoughtSpot.

## Figma Reference

[Command - K](https://www.figma.com/design/NOBclHxlaihg14bTVyJtHE/Command---K?node-id=367-15459)

## Features

- Real-time search filtering
- Keyboard navigation (arrow keys, enter, escape)
- Result sections (Recent, Recommended, Quick links)
- Context filter bar
- Keyboard shortcuts footer
- Search term highlighting in results

## Usage

```tsx
import { CommandKModal } from '../../prototypes/CommandKModal';

// Render the modal
<CommandKModal />
```

## Keyboard Shortcuts

| Keys | Action |
|------|--------|
| ↑ ↓ | Navigate through results |
| ↵ | Select current item |
| Shift + ↵ | Open in new tab |
| ⌘ + ↵ | Open in Spotter |
| Escape | Clear search / Close modal |

## Result Types

- **Answer** - Saved query results
- **Answer (in LB)** - Answers pinned to Liveboards
- **Model** - Data models
- **Navigate** - Navigation destinations
- **Admin Settings** - Configuration pages
- **Spotter** - AI chat actions
- **Create** - Creation actions
- **Help** - Documentation links

## Specification

See [docs/specs/command-k-modal.md](../../docs/specs/command-k-modal.md) for the full engineering specification.

## Mock Data

Mock data is imported from `src/mocks/commandK.ts`.
