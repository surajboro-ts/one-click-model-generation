Show the current project status.

## Instructions

Run the following git commands and present a clean summary:

### 1. Current branch and latest commit
```
git branch --show-current
git log -1 --oneline
```

### 2. Commits ahead of main
```
git log main..HEAD --oneline --no-merges
```
If on main, say "On main branch (no feature branch active)".

### 3. Uncommitted changes
```
git status --short
```
If clean, say "Working tree clean".

### 4. Unshipped commits (ahead of staging)
```
git log staging..HEAD --oneline --no-merges 2>/dev/null
```
If the staging branch doesn't exist, say "No staging branch yet — use /ship to create it".

### 5. Present the summary
Format it cleanly:

```
Branch: <branch-name>
Latest: <short-hash> <message>

Ahead of main: <n> commit(s)
  - <hash> <message>
  - ...

Uncommitted changes:
  M src/components/Button.tsx
  A src/prototypes/NewThing/index.tsx
  (or "Working tree clean")

Unshipped (ahead of staging): <n> commit(s)
  - <hash> <message>
  - ...
  (or "All shipped" / "No staging branch yet")
```
