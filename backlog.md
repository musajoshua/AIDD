# TaskFlow — Product Backlog

> Living document for tracking all user stories, their status, and acceptance criteria.
> Each story follows a JIRA-style format and maps 1-to-1 with a GitHub Issue.

---

## Status Legend

| Tag | Meaning |
|-----|---------|
| `TODO` | Not started |
| `IN PROGRESS` | Currently being worked on |
| `IN REVIEW` | PR open, awaiting review |
| `DONE` | Merged and verified |
| `BLOCKED` | Waiting on a dependency or decision |

## Label Reference

| Label | Color | Description |
|-------|-------|-------------|
| `priority: must-have` | 🔴 Red | MoSCoW — Must Have |
| `priority: should-have` | 🟠 Orange | MoSCoW — Should Have |
| `priority: could-have` | 🟡 Yellow | MoSCoW — Could Have |
| `type: feature` | 🟣 Purple | New user-facing functionality |
| `type: bug` | 🔵 Blue | Defect fix |
| `type: chore` | ⚪ Grey | Tooling, refactor, docs |
| `area: frontend` | 🟢 Green | Frontend (Next.js / UI) |
| `area: auth` | 🔐 | Authentication (Firebase Auth) |
| `area: database` | 🗄️ | Persistence (Firestore) |
| `story-points: N` | — | Estimated effort (Fibonacci) |

---

## Sprint Backlog — Must Have (US1 – US4)

---

### US-1 — Create a Task

| Field | Value |
|-------|-------|
| **ID** | US-1 |
| **Title** | Create a new task with title, description, priority, and due date |
| **Status** | `TODO` |
| **Labels** | `priority: must-have`, `type: feature`, `area: frontend`, `area: database` |
| **Story Points** | 5 |
| **Assignee** | — |
| **Sprint** | 1 |
| **Epic** | Task Management |
| **Depends On** | US-4 (user must be authenticated) |

#### Description

**As a** logged-in user,
**I want to** create a new task by providing a title, description, priority level, and due date,
**So that** I can keep track of work I need to accomplish.

#### Acceptance Criteria

- [ ] **AC-1.1**: A "Create Task" button / entry point is visible on the task list page.
- [ ] **AC-1.2**: Clicking the button opens a form (modal or dedicated page) with the following fields:
  - **Title** (text input, required, max 120 characters)
  - **Description** (textarea, optional, max 500 characters)
  - **Priority** (select / radio: `High`, `Medium`, `Low` — default `Medium`)
  - **Due Date** (date picker, optional, must be today or in the future)
- [ ] **AC-1.3**: The form validates all required fields before submission. Inline error messages are displayed for invalid inputs.
- [ ] **AC-1.4**: On valid submission the task is persisted to Firestore under the authenticated user's `tasks` sub-collection with the following document schema:
  ```json
  {
    "title": "string",
    "description": "string",
    "priority": "high | medium | low",
    "dueDate": "Timestamp | null",
    "completed": false,
    "createdAt": "Timestamp",
    "updatedAt": "Timestamp",
    "userId": "string"
  }
  ```
- [ ] **AC-1.5**: After successful creation, the user is redirected (or the modal closes) and the new task appears in the task list without a full page reload.
- [ ] **AC-1.6**: A success toast / notification confirms the task was created.
- [ ] **AC-1.7**: If the Firestore write fails, an error message is displayed and the form data is preserved so the user can retry.

#### Technical Notes

- Use a Client Component for the form (interactive state, validation).
- Write a `createTask()` helper in `lib/firestore.ts` wrapping the Firestore `addDoc` call.
- Use `serverTimestamp()` for `createdAt` and `updatedAt`.

#### Definition of Done

- [ ] All acceptance criteria pass manual testing.
- [ ] Component is responsive (mobile + desktop).
- [ ] No console errors or warnings.
- [ ] Code reviewed and merged to `main`.

---

### US-2 — View Task List with Sorting and Filters

| Field | Value |
|-------|-------|
| **ID** | US-2 |
| **Title** | View my task list with sorting and filtering options |
| **Status** | `TODO` |
| **Labels** | `priority: must-have`, `type: feature`, `area: frontend`, `area: database` |
| **Story Points** | 5 |
| **Assignee** | — |
| **Sprint** | 1 |
| **Epic** | Task Management |
| **Depends On** | US-1, US-4 |

#### Description

**As a** logged-in user,
**I want to** see all my tasks in a list and be able to sort and filter them,
**So that** I can quickly find and focus on the tasks that matter most.

#### Acceptance Criteria

- [ ] **AC-2.1**: After signing in, the user lands on a task list page that displays all of their tasks.
- [ ] **AC-2.2**: Each task card / row shows at minimum:
  - Title
  - Priority badge (colour-coded: 🔴 High, 🟠 Medium, 🟢 Low)
  - Due date (formatted, e.g., "Mar 31, 2026")
  - Completion status (checkbox or visual indicator)
- [ ] **AC-2.3**: The list supports **sorting** by:
  - Due date (ascending / descending)
  - Priority (High → Low / Low → High)
  - Creation date (newest / oldest)
- [ ] **AC-2.4**: The list supports **filtering** by:
  - Status: `All`, `Active` (not completed), `Completed`
  - Priority: `All`, `High`, `Medium`, `Low`
- [ ] **AC-2.5**: Sorting and filter selections persist during the session (e.g., React state or URL query params).
- [ ] **AC-2.6**: When no tasks exist, a friendly empty-state illustration and a prompt to create the first task are displayed.
- [ ] **AC-2.7**: The list updates in real-time when tasks are added, modified, or deleted (Firestore `onSnapshot`).
- [ ] **AC-2.8**: Loading and error states are handled with appropriate UI feedback (skeleton loader, error banner).

#### Technical Notes

- Use Firestore `onSnapshot` for real-time updates.
- Sorting can be done client-side for small datasets; switch to Firestore `orderBy` if performance requires it.
- Consider using URL search params (`useSearchParams`) for filter state to support deep-linking.

#### Definition of Done

- [ ] All acceptance criteria pass manual testing.
- [ ] Works on mobile (responsive card layout) and desktop (table or list).
- [ ] No console errors or warnings.
- [ ] Code reviewed and merged to `main`.

---

### US-3 — Mark a Task as Completed

| Field | Value |
|-------|-------|
| **ID** | US-3 |
| **Title** | Mark a task as completed or reopen it |
| **Status** | `TODO` |
| **Labels** | `priority: must-have`, `type: feature`, `area: frontend`, `area: database` |
| **Story Points** | 3 |
| **Assignee** | — |
| **Sprint** | 1 |
| **Epic** | Task Management |
| **Depends On** | US-1, US-2, US-4 |

#### Description

**As a** logged-in user,
**I want to** mark a task as completed (or revert it back to active),
**So that** I can track my progress and distinguish finished work from outstanding work.

#### Acceptance Criteria

- [ ] **AC-3.1**: Each task in the list has a clearly visible toggle control (checkbox or button) to mark it as completed.
- [ ] **AC-3.2**: Clicking the toggle sets the task's `completed` field to `true` in Firestore and updates `updatedAt`.
- [ ] **AC-3.3**: Completed tasks are visually distinct from active tasks (e.g., strikethrough title, muted colours, moved to bottom of list).
- [ ] **AC-3.4**: A completed task can be toggled back to active (`completed: false`), restoring its original appearance.
- [ ] **AC-3.5**: The toggle action provides immediate optimistic UI feedback; the checkbox/indicator updates instantly before the Firestore write completes.
- [ ] **AC-3.6**: If the Firestore update fails, the UI reverts the toggle and displays an error message.
- [ ] **AC-3.7**: A brief success confirmation (e.g., subtle animation or toast) is shown after toggling.

#### Technical Notes

- Use Firestore `updateDoc` to set `completed` and `updatedAt`.
- Implement optimistic updates: update local state first, rollback on error.
- Animation: consider a CSS transition (e.g., fade + strikethrough) for the completion visual.

#### Definition of Done

- [ ] All acceptance criteria pass manual testing.
- [ ] Toggle works reliably with rapid repeated clicks (debounce / disable during write).
- [ ] No console errors or warnings.
- [ ] Code reviewed and merged to `main`.

---

### US-4 — Sign In / Sign Up by Email

| Field | Value |
|-------|-------|
| **ID** | US-4 |
| **Title** | Sign up and sign in with email and password |
| **Status** | `TODO` |
| **Labels** | `priority: must-have`, `type: feature`, `area: frontend`, `area: auth` |
| **Story Points** | 5 |
| **Assignee** | — |
| **Sprint** | 1 |
| **Epic** | Authentication |
| **Depends On** | — |

#### Description

**As a** new or returning user,
**I want to** create an account or sign in using my email and password,
**So that** my tasks are private, secure, and accessible only to me.

#### Acceptance Criteria

- [ ] **AC-4.1**: An unauthenticated user is redirected to a **Sign In / Sign Up** page.
- [ ] **AC-4.2**: The page provides two modes (tabs or toggle): **Sign In** and **Sign Up**.
- [ ] **AC-4.3**: **Sign Up** form fields:
  - Email (required, valid email format)
  - Password (required, minimum 8 characters, at least 1 uppercase letter and 1 digit)
  - Confirm Password (required, must match Password)
- [ ] **AC-4.4**: **Sign In** form fields:
  - Email (required)
  - Password (required)
- [ ] **AC-4.5**: Inline validation errors are displayed for:
  - Invalid email format
  - Password too short / does not meet complexity rules
  - Passwords do not match (sign-up)
  - Wrong credentials (sign-in) — generic message: *"Invalid email or password"*
  - Email already in use (sign-up)
- [ ] **AC-4.6**: On successful sign-up, Firebase Auth creates the user and the app redirects to the task list page.
- [ ] **AC-4.7**: On successful sign-in, the app redirects to the task list page.
- [ ] **AC-4.8**: The user's auth state is managed via an `AuthContext` (React Context + `onAuthStateChanged` listener).
- [ ] **AC-4.9**: A **Sign Out** button is available in the app header / navigation. Clicking it signs the user out and redirects to the sign-in page.
- [ ] **AC-4.10**: Protected routes (task list, task creation) are inaccessible to unauthenticated users; navigating to them redirects to sign-in.
- [ ] **AC-4.11**: Auth state is persisted across browser refreshes (Firebase default `LOCAL` persistence).
- [ ] **AC-4.12**: Loading spinner is shown while auth state is being determined on initial page load.

#### Technical Notes

- Use `createUserWithEmailAndPassword` and `signInWithEmailAndPassword` from Firebase Auth SDK.
- Wrap app in `<AuthProvider>` exporting `useAuth()` hook.
- Middleware or a route-guard component should enforce protected routes.
- Store Firebase config in `.env.local` (not committed to version control).

#### Definition of Done

- [ ] All acceptance criteria pass manual testing.
- [ ] Sign-up → sign-out → sign-in round-trip works end to end.
- [ ] Protected route redirect works correctly.
- [ ] No console errors or warnings.
- [ ] Code reviewed and merged to `main`.

---

## Future Stories (Backlog)

> Stories below have not been refined yet. They will be detailed before being pulled into a sprint.

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| US-5 | Edit an existing task | `should-have` | `TODO` |
| US-6 | Delete a task | `should-have` | `TODO` |
| US-7 | Filter tasks by priority (high/medium/low) | `should-have` | `TODO` |
| US-8 | Dashboard with statistics | `could-have` | `TODO` |
| US-9 | Dark mode | `could-have` | `TODO` |
| US-10 | Export tasks to CSV | `could-have` | `TODO` |

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-03-31 | — | Initial backlog created with US-1 through US-4 detailed; US-5 – US-10 listed as future stories. |
