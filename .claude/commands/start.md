Start a new work branch for: $ARGUMENTS

## Instructions

1. Fetch latest and ensure we're on a clean main:
   ```
   git fetch --all
   git checkout main
   git pull origin main
   ```

2. Determine the branch prefix from the description:
   - If the work is a new feature or addition → `feat/`
   - If it's a bug fix → `fix/`
   - If it's chores, docs, config, cleanup → `chore/`

3. Slugify the description into a branch name:
   - Lowercase, replace spaces with hyphens, remove special characters
   - Keep it under 50 chars
   - Example: "Add dark mode toggle" → `feat/add-dark-mode-toggle`

4. Create and switch to the new branch:
   ```
   git checkout -b <prefix>/<slug>
   ```

5. Print a confirmation like:
   ```
   Branch created: feat/add-dark-mode-toggle
   Ready to work. When done, use /ship to push to staging.
   Use /status anytime to check progress.
   ```
