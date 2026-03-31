# US-1: Create a new task with title, description, priority, and due date

**Labels:** `priority: must-have`, `type: feature`, `area: frontend`, `area: database`
**Epic:** Task Management
**Story Points:** 5
**Depends On:** US-4

## User Story

**As a** logged-in user,
**I want to** create a new task by providing a title, description, priority level, and due date,
**So that** I can keep track of work I need to accomplish.

## Acceptance Criteria

- [ ] A "Create Task" button is visible on the task list page. Clicking it opens a form with fields for **Title** (required), **Description** (optional), **Priority** (High / Medium / Low, default Medium), and **Due Date** (optional, today or future).
- [ ] The form validates all required fields before submission and displays inline error messages for any invalid input (e.g., missing title, past due date).
- [ ] On valid submission the task is saved to Firestore under the authenticated user's collection with fields: `title`, `description`, `priority`, `dueDate`, `completed` (false), `createdAt`, `updatedAt`, and `userId`.
- [ ] After successful creation the new task appears in the task list without a full page reload, and a success notification is shown.
- [ ] If the Firestore write fails, an error message is displayed and the form data is preserved so the user can retry.
