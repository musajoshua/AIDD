# US-3: Mark a task as completed or reopen it

**Labels:** `priority: must-have`, `type: feature`, `area: frontend`, `area: database`
**Epic:** Task Management
**Story Points:** 3
**Depends On:** US-1, US-2, US-4

## User Story

**As a** logged-in user,
**I want to** mark a task as completed or revert it back to active,
**So that** I can track my progress and distinguish finished work from outstanding work.

## Acceptance Criteria

- [ ] Each task in the list has a clearly visible toggle (checkbox or button) to mark it as completed.
- [ ] Toggling a task updates its `completed` field and `updatedAt` timestamp in Firestore, and completed tasks are visually distinct (e.g., strikethrough, muted colours).
- [ ] A completed task can be toggled back to active, restoring its original appearance.
- [ ] The toggle provides immediate optimistic UI feedback; if the Firestore update fails, the UI reverts and an error message is shown.
