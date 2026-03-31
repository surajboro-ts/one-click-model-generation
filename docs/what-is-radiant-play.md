# Radiant Play: A design system playground for prototyping ideas at full fidelity

## The problem with prototyping today

Design teams at product companies face a recurring tension. Static mockups in Figma communicate layout and visual intent, but they can't show how a feature actually feels — how a wizard flows across four steps, how a table responds to filtering, or how a sidebar and command palette interact in context. Getting to that level of fidelity traditionally requires engineering time, which means prototyping competes with production work for the same resources.

The result is a compromise: ideas are evaluated from static frames, and the gap between "what was imagined" and "what gets built" only becomes visible after development has already started.

## What Radiant Play is

Radiant Play is a prototyping playground built on ThoughtSpot's Radiant design system. It lets designers and product teams create interactive, high-fidelity prototypes that use the same components, tokens, and patterns as the real product — without writing production code or pulling engineers off their roadmap.

Each prototype is a self-contained experiment. It runs in a browser, uses real UI components, responds to interaction, and displays realistic data. When a stakeholder opens a prototype, they're evaluating the idea on its merits — not mentally interpolating from a flat mockup.

Radiant Play is not a handoff tool. The prototypes it produces are for exploring and validating ideas, not for shipping directly into production. The goal is to make the concept convincing enough that the conversation shifts from "what would this look like?" to "should we build this?"

## How it works

### A shared component library, not a blank canvas

At its core, Radiant Play provides 73+ pre-built UI components drawn from ThoughtSpot's Radiant design system: buttons, modals, tables, form inputs, navigation shells, cards, tooltips, tabs, chips, avatars, and more. These aren't simplified stand-ins — they're the same components, with the same visual language, that appear in the production product.

When someone builds a prototype, they compose from this library. A command palette prototype uses the real `Modal`, `SearchInput`, and `Tabs` components. An admin settings page uses the real `AppShell`, `Sidebar`, and `Table`. This means every prototype inherits the visual consistency of the design system without any extra effort.

### Design tokens instead of hardcoded values

Every color, spacing value, font size, border radius, and shadow in Radiant Play comes from a structured token system. Colors follow a three-layer architecture — reference tokens (raw brand palette), system tokens (semantic assignments like `content-primary` or `background-sunken`), and component tokens (specific to individual components). Spacing uses a 4px base unit scale. Typography maps to named styles like `page-title`, `body-normal`, and `footnote`.

This isn't just good practice — it's enforced. Hardcoded hex values, raw pixel spacing, and inline font families are explicitly forbidden. The constraint exists because prototypes that drift from the design system's visual language stop feeling like the real product, and the whole point is that they should feel real.

### Each prototype is an independent experiment

Prototypes live in isolated folders under `src/prototypes/`. Each one is a self-contained experiment with its own components, data, and state management. They share the design system components and tokens, but nothing else. A prototype exploring a new Spotter memory management experience doesn't interfere with one exploring admin group creation.

Currently, the playground hosts prototypes for:

- **Command Palette** — A command-K interface with keyboard navigation, context-aware filtering, and multi-page routing
- **Spotter Memory** — Memory source management with tabbed object tables, search, and pagination
- **Admin Groups** — A multi-step wizard for group creation with org assignment and role management
- **Spotter Model** — Agent-driven model editing with onboarding flows and impact-aware deletion
- **Admin Language Settings** — CSV-based translation management with upload validation
- **MiniSpotters** — Domain-specific AI assistant instances with bounded context
- **Liveboard Template** — A starter template for Liveboard-style prototypes with KPI tiles and chart panels

New prototypes can be scaffolded with a single command (`npm run new-prototype`), which creates the folder structure, registers the prototype in the gallery, and wires up the routing.

### A gallery for browsing and launching

The playground opens to a gallery view that shows all available prototypes as cards. Each card displays the prototype's name, description, author, last modified date, and a count of how many design system vs. custom components it uses. Clicking a card launches the prototype in a full-page view.

The gallery is split into two sections — sample prototypes (reference implementations that demonstrate patterns) and user-created prototypes (new experiments). This makes the playground useful both as a pattern library and as a working canvas.

## The role of AI

Radiant Play is designed to work with AI coding assistants. The project includes over 5,300 lines of structured rules across 16 files that give AI models deep context about the design system: which components exist, how tokens should be used, what layout patterns to follow, how to write UI text, and how to translate Figma designs into code.

When a designer describes a prototype they want to build — "an admin page with a groups table and a multi-step creation wizard" — the AI assistant can generate it using the correct components, tokens, and patterns. The rules act as guardrails: they prevent the AI from inventing components that don't exist, using colors that aren't in the token system, or producing layouts that don't follow the established patterns.

The project also integrates with Figma through an MCP (Model Context Protocol) server, allowing prototypes to be generated from Figma designs or, conversely, for running prototypes to be captured back into Figma for further design iteration.

This isn't about replacing designers with AI. It's about removing the mechanical work of translating an idea into a running prototype, so the designer can focus on the idea itself.

## What makes this approach different

Most prototyping tools sit outside the design system. They use their own rendering, their own component abstractions, and their own styling — which means the prototype always looks slightly different from the real product. The gap is small enough to ignore in a demo, but large enough to mislead when evaluating subtle interaction patterns or visual density.

Radiant Play takes the opposite approach: the design system is the prototyping tool. Because prototypes are built from the same components and tokens as the product, what you see in the prototype is what the feature would actually look like. There's no translation layer, no "imagine this but with the real styling."

This matters most when the question being asked isn't "does this layout work?" but "does this experience feel right?" — which is exactly the question that prototypes are supposed to answer.

## Who it's for

Radiant Play is built for designers, product managers, and design technologists at ThoughtSpot who want to explore ideas with enough fidelity to make real decisions. It's particularly useful for:

- **Concept validation** — Testing whether a new feature's interaction model works before committing engineering resources
- **Stakeholder communication** — Showing a running prototype instead of describing a static mockup
- **Design system adoption** — Every prototype reinforces the design system's patterns, making them more familiar across the organization
- **Parallel exploration** — Multiple prototypes can explore different approaches to the same problem simultaneously, without competing for engineering bandwidth

## The bottom line

Radiant Play exists because the distance between "idea" and "something you can interact with" shouldn't require a production engineering cycle. By building prototypes on top of the real design system, it makes that distance shorter — and makes the prototypes trustworthy enough to base real decisions on.
