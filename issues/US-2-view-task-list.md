# US-2: View task list with sorting and filtering options

**Labels:** `priority: must-have`, `type: feature`, `area: frontend`, `area: database`
**Epic:** Task Management
**Story Points:** 5
**Depends On:** US-1, US-4

## User Story

**As a** logged-in user,
**I want to** see all my tasks in a list and be able to sort and filter them,
**So that** I can quickly find and focus on the tasks that matter most.

## Acceptance Criteria

- [ ] After signing in, the user sees a task list displaying each task's **title**, colour-coded **priority badge**, formatted **due date**, and **completion status**.
- [ ] The list can be **sorted** by due date, priority, or creation date (ascending / descending).
- [ ] The list can be **filtered** by status (`All` / `Active` / `Completed`) and by priority (`All` / `High` / `Medium` / `Low`).
- [ ] When no tasks exist, an empty-state message with a prompt to create the first task is displayed.
- [ ] The list updates in real-time via Firestore (`onSnapshot`) when tasks are added, modified, or deleted, and shows appropriate loading / error states.
