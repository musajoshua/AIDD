# US-4: Sign up and sign in with email and password

**Labels:** `priority: must-have`, `type: feature`, `area: frontend`, `area: auth`
**Epic:** Authentication
**Story Points:** 5
**Depends On:** —

## User Story

**As a** new or returning user,
**I want to** create an account or sign in using my email and password,
**So that** my tasks are private, secure, and accessible only to me.

## Acceptance Criteria

- [ ] Unauthenticated users are redirected to a **Sign In / Sign Up** page with two modes. Sign Up requires **email**, **password** (min 8 chars, 1 uppercase, 1 digit), and **confirm password**. Sign In requires **email** and **password**.
- [ ] Inline validation errors are shown for invalid email, weak password, mismatched passwords, wrong credentials (*"Invalid email or password"*), and duplicate email on sign-up.
- [ ] On successful sign-up or sign-in, the user is redirected to the task list page. Auth state is managed via an `AuthContext` with `onAuthStateChanged` and persists across browser refreshes.
- [ ] A **Sign Out** button in the header signs the user out and redirects to the sign-in page. Protected routes (task list, create task) are inaccessible without authentication.
- [ ] A loading spinner is displayed while auth state is being determined on initial page load.
