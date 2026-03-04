Prepare a production release. Optional version override: $ARGUMENTS

## Instructions

Follow these steps in order. This skill prepares the release but does NOT merge to main — that's a manual step.

### 1. Gather changes since last release
```
git log main..HEAD --oneline --no-merges
```
List all commits that will be included in this release.

### 2. Determine version bump
- Read `docs/CHANGELOG.md` to find the current version (top `## [x.y.z]` entry)
- Propose a semver bump:
  - **Major** (x+1.0.0): Breaking changes
  - **Minor** (x.y+1.0): New features, non-breaking
  - **Patch** (x.y.z+1): Bug fixes only
- If `$ARGUMENTS` provides a specific version, use that instead
- Ask the user to confirm the version

### 3. Write changelog entry
- Open `docs/CHANGELOG.md`
- Insert a new entry at the top (below the header), using today's date
- Categorize commits into: **Added**, **Changed**, **Fixed**, **Removed** (omit empty categories)
- Follow the existing format in the file
- Write clear, user-facing descriptions (not raw commit messages)

### 4. Final build check
Run `npm run build`. If it fails, stop and fix before continuing.

### 5. Commit the changelog
```
git add docs/CHANGELOG.md
git commit -m "chore: changelog for v<version>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

### 6. Push and merge to staging for final preview
```
git push origin <current-branch>
git checkout staging
git pull origin staging
git merge <current-branch> --no-edit
git push origin staging
git push galaxy staging
git checkout <current-branch>
```

### 7. Print manual merge instructions
Do NOT execute these — just print them for the user to run manually:

```
# When ready to release to production:
git checkout main
git pull origin main
git merge <feature-branch> --no-edit
git push origin main
git push galaxy main
```

Print:
```
Release v<version> prepared!
Changelog updated and pushed to staging for final preview.
Preview: https://staging-radiantplay.vercel.app

When you're satisfied with the preview, run the commands above to merge to main and deploy to production.
```
