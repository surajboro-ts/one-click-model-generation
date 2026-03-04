Ship current work to staging. Optional commit message override: $ARGUMENTS

## Instructions

Follow these steps in order. Stop immediately if any step fails.

### 1. Pre-flight build check
Run `npm run build`. If it fails, report the errors and stop — do NOT commit broken code.

### 2. Show what changed
Run `git diff --stat` and `git status` to summarize changed files. Present a brief summary to the user.

### 3. Stage files
- Stage specific changed files by name (use `git add <file1> <file2> ...`)
- NEVER use `git add -A` or `git add .`
- NEVER stage `.env`, `.claude/settings.json`, or other sensitive/local files
- If unsure about a file, ask before staging

### 4. Generate commit message
- If `$ARGUMENTS` is provided and non-empty, use it as the commit message
- Otherwise, auto-generate a conventional commit message based on the staged changes:
  - `feat: ...` for new features
  - `fix: ...` for bug fixes
  - `chore: ...` for maintenance, config, docs
  - `refactor: ...` for refactoring
  - `style: ...` for styling changes
- Keep the first line under 72 characters

### 5. Confirm with user
Show the proposed commit message and staged files. Ask "Commit and ship to staging?" before proceeding.

### 6. Commit
```
git commit -m "<message>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

### 7. Push feature branch
```
git push -u origin <current-branch>
```

### 8. Merge to staging and push
```
git checkout staging
git pull origin staging
git merge <feature-branch> --no-edit
git push origin staging
git push galaxy staging
git checkout <feature-branch>
```

If the `staging` branch doesn't exist yet, create it from the current feature branch:
```
git checkout -b staging
git push -u origin staging
git push galaxy staging
git checkout <feature-branch>
```

### 9. Report
Print:
```
Shipped to staging!
Preview: https://staging-radiantplay.vercel.app
Branch: <feature-branch>
Commit: <short-hash> <message>

Next: /release when ready for production, or keep working and /ship again.
```

> **Note:** If the staging preview URL hasn't been configured in Vercel yet, remind the user to set it up per the Vercel Staging Domain Setup instructions in CLAUDE.md.
