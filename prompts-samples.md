# Parallel agent demo — feature prompts

Use these with two teammates (or two agents) on **separate branches from `main`**. Each feature touches different files, so the branches should merge cleanly without conflicts.

Run both in parallel:

```bash
git checkout main && git pull
git checkout -b feature/todo-filters      # Teammate A
git checkout -b feature/settings-page     # Teammate B
```

After both land, merge one branch into `main`, then merge the other and resolve any integration testing (not file conflicts).

---

## Feature A — Filter tabs (All / Active / Completed)

**Branch:** `feature/todo-filters`

**Why this is a good parallel task:** Filtering is self-contained UI state. It only touches the list layer and the app shell — not settings, not delete flows, not new routes.

**Files you own (do not edit other files):**

- `components/todo/todo-filter.tsx` *(new)*
- `components/todo/todo-list.tsx`
- `components/todo/todo-app.tsx`

**Estimated agent time:** ~20–40 minutes

### Prompt — copy/paste to the agent

```
Add a filter bar to the TODO app so users can switch between All, Active, and Completed todos.

Requirements:
- Create components/todo/todo-filter.tsx with three toggle buttons: All, Active, Completed
- Style the filter using the existing Sooshial-Medea theme: Neucha font (already global), primary-400 (#333) borders, hand-drawn border-radius on buttons (match components/button/button.module.css pattern), use the existing Button component where it fits
- Store the active filter in todo-app.tsx state (default: All)
- Pass the filtered list into TodoList — filtering logic can live in todo-app.tsx or todo-list.tsx, but keep TodoList presentational if possible
- Active filter button should look selected (e.g. secondary variant); others use primary variant
- Empty state should reflect the filter, e.g. "No active todos" vs "No completed todos"
- Do not add new routes, settings, or change the Todo type
- Do not edit todo-item.tsx, todo-form.tsx, or page.tsx
- Keep localStorage key and Todo shape unchanged: { id, text, done }
- Run npm run build when done and fix any errors

Acceptance checklist:
- [ ] All shows every todo
- [ ] Active shows only done === false
- [ ] Completed shows only done === true
- [ ] Filter persists visually during the session (state in memory is fine)
- [ ] Build passes
```

---

## Feature B — Settings page + optional delete confirmation

**Branch:** `feature/settings-page`

**Why this is a good parallel task:** A new `/settings` route and delete-guard logic live in completely different files from the filter work. No shared edits with Feature A.

**Files you own (do not edit other files):**

- `app/settings/page.tsx` *(new)*
- `components/settings/settings-panel.tsx` *(new)*
- `lib/app-settings.ts` *(new)*
- `components/todo/todo-item.tsx`
- `app/page.tsx` *(add a small link to /settings only)*

**Estimated agent time:** ~25–45 minutes

### Prompt — copy/paste to the agent

```
Add a /settings page with user preferences stored in localStorage, and wire one preference into delete behavior.

Requirements:
- Create lib/app-settings.ts with:
  - Storage key: "todo-agents-demo:settings"
  - Type: { confirmBeforeDelete: boolean }
  - Defaults: { confirmBeforeDelete: false }
  - Functions: loadSettings(), saveSettings(partial), with try/catch for malformed JSON
- Create components/settings/settings-panel.tsx (client component) with a labeled checkbox: "Ask before deleting a todo"
  - Load settings on mount, save on toggle
  - Use existing Input/Button/Card theme components where appropriate
- Create app/settings/page.tsx with a heading "Settings", the panel, and a link back to home (/)
- Update components/todo/todo-item.tsx:
  - Before calling onDelete, if confirmBeforeDelete is true, show window.confirm("Delete this todo?")
  - Read settings from lib/app-settings.ts (load on click or once in component — keep it simple)
- Add a subtle text link on app/page.tsx near the title pointing to /settings (e.g. "Settings")
- Do not change todo-app.tsx, todo-list.tsx, or todo-form.tsx
- Do not change the todos localStorage key or Todo type
- Run npm run build when done and fix any errors

Acceptance checklist:
- [ ] /settings renders and toggles persist after refresh
- [ ] When confirmBeforeDelete is off, delete works as today
- [ ] When confirmBeforeDelete is on, delete shows a browser confirm dialog
- [ ] Link on home page navigates to settings
- [ ] Build passes
```

---

## Feature C — Toolbar, stats, and clear completed *(PR demo — already implemented)*

**Branch:** `feature/todo-toolbar`

**Why this is a good PR review demo:** Adds a modal, a toolbar component, and new app-level actions — enough surface area for meaningful review comments (a11y, edge cases, styling) without being risky to merge.

**Files touched:**

- `components/modal/modal.tsx` + `modal.module.css` *(new)*
- `components/todo/todo-toolbar.tsx` *(new)*
- `components/todo/todo-app.tsx`

See open PR on GitHub for review.

### Prompt — copy/paste to the agent (for reference)

```
Add a toolbar above the todo list showing counts and a "Clear completed" action with a confirmation modal.

Requirements:
- Create components/modal/modal.tsx + modal.module.css matching Sooshial-Medea modal styling (irregular border-radius, overlay backdrop)
  - Modal should accept onClose, title, children, and action buttons via props — keep it reusable
  - Trap focus is nice-to-have; at minimum support Escape to close and aria-labelledby on title
- Create components/todo/todo-toolbar.tsx showing: "X active · Y completed · Z total"
  - Show a "Clear completed" button only when completed count > 0
  - Button uses existing theme Button component
- In todo-app.tsx:
  - Add clearCompleted() that removes todos where done === true
  - When Clear completed is clicked, open the modal asking "Remove all completed todos?" with Cancel and Clear buttons
  - Render TodoToolbar between TodoForm and TodoList, passing counts and handlers
- Do not add routes or change Todo type
- Run npm run build when done

Acceptance checklist:
- [ ] Counts update as todos are added/toggled/deleted
- [ ] Clear completed button hidden when completed count is 0
- [ ] Modal confirms before clearing; Cancel does nothing
- [ ] Clear removes only done todos; active todos remain
- [ ] Build passes
```

---

## Suggested demo script for teammates

1. **Parallel work:** Split the room — Agent A runs Feature A prompt on `feature/todo-filters`, Agent B runs Feature B prompt on `feature/settings-page`.
2. **Show git graph:** Both branches from `main`, no overlapping files.
3. **Merge A → main**, then **merge B → main** (should be conflict-free).
4. **PR review:** Walk through the open PR for Feature C — comment on modal a11y, copy, edge cases; approve or request changes; do **not** merge during the demo.
