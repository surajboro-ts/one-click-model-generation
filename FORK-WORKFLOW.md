# Fork Workflow — Designer Onboarding Guide

How to get started with the Radiant Play as a designer.

---

## Overview

Each designer works on their own **fork** (personal copy) of the project. This keeps the main repo safe — no one can accidentally overwrite production code. Changes flow back only through Pull Requests that are reviewed and approved.

```
Main repo (faris-ts/radiantplay)       ← source of truth, deployed to Vercel
    ↑ Pull Requests (reviewed by maintainer)
    |
Your fork (your-username/radiantplay)  ← your personal copy, full control
```

---

## Prerequisites

| Tool | Link | Notes |
|------|------|-------|
| **GitHub account** | [github.com](https://github.com) | You'll receive a collaborator invite |
| **Node.js 18+** | [nodejs.org](https://nodejs.org) | Download the LTS version |
| **Cursor IDE** | [cursor.so](https://cursor.so) | AI-powered code editor |

---

## Step 1: Accept the invite

You'll receive a GitHub collaborator invite via email or at [github.com/notifications](https://github.com/notifications). Accept it to get access to the private repo.

## Step 2: Fork the repo

1. Go to [github.com/faris-ts/radiantplay](https://github.com/faris-ts/radiantplay)
2. Click the **Fork** button (top right)
3. Select your personal account as the destination
4. You now have `your-username/radiantplay` — your own private copy

## Step 3: Clone your fork

Open a terminal and run:

```bash
git clone https://github.com/YOUR-USERNAME/radiantplay.git
cd radiantplay
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## Step 4: Add the upstream remote

This connects your fork to the original repo so you can pull updates:

```bash
git remote add upstream https://github.com/faris-ts/radiantplay.git
```

Verify with:

```bash
git remote -v
```

You should see:

```
origin    https://github.com/YOUR-USERNAME/radiantplay.git  (your fork)
upstream  https://github.com/faris-ts/radiantplay.git       (main repo)
```

## Step 5: Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. You should see the Radiant Playground.

---

## Building prototypes

### Create a new prototype

Open a second terminal and run:

```bash
npm run new-prototype MyPrototypeName
```

Then open `src/prototypes/MyPrototypeName/index.tsx` and use Cursor AI to build your UI:

- **Cmd+K** — inline edit
- **Chat panel** — describe what you want in natural language
- **Paste a Figma screenshot** — say "Recreate this using Radiant components"

The AI already knows all Radiant components, tokens, and patterns.

### Save your work

```bash
git add .
git commit -m "Add my prototype"
git push origin main
```

This pushes to **your fork only** — the main repo is unaffected.

---

## Staying in sync

The main repo gets updates regularly (new components, fixes, improvements). Pull them into your fork:

### Option A: Command line

```bash
git fetch upstream
git merge upstream/main
git push origin main
```

### Option B: GitHub UI

1. Go to your fork on GitHub
2. You'll see a banner: "This branch is X commits behind faris-ts:main"
3. Click **Sync fork** → **Update branch**

Do this regularly to stay up to date.

---

## Contributing back (optional)

If you've built something that should be in the main repo:

1. Push your changes to your fork
2. Go to your fork on GitHub
3. Click **Contribute** → **Open pull request**
4. Set the base to `faris-ts/radiantplay` branch `staging`
5. Describe your changes and submit
6. The maintainer reviews and merges (or requests changes)

---

## What you can and cannot do

| Action | Allowed? |
|--------|:--------:|
| Clone and run the project | Yes |
| Build prototypes in your fork | Yes |
| Push to your fork | Yes |
| Push to the main repo | No |
| Open Pull Requests to the main repo | Yes |
| Merge your own PRs | No (maintainer only) |
| Delete or modify the main repo | No |

---

## Quick reference

| Task | Command |
|------|---------|
| Start dev server | `npm run dev` |
| Create prototype | `npm run new-prototype Name` |
| Save changes | `git add . && git commit -m "message" && git push` |
| Pull latest updates | `git fetch upstream && git merge upstream/main` |
| Check remote setup | `git remote -v` |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't fork the repo | Make sure you've accepted the collaborator invite first |
| `npm install` fails | Verify Node.js is installed: `node --version` (need 18+) |
| AI doesn't know components | Make sure you opened the `radiantplay` folder in Cursor (not a parent folder) |
| "Upstream" merge conflicts | Run `git merge upstream/main`, resolve conflicts in Cursor, then commit |
| Changes not showing in browser | Make sure `npm run dev` is still running |

---

**Questions?** Reach out to the design systems team.
