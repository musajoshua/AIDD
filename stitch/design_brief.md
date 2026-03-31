# TaskFlow — Design Brief for Google Stitch

**App Name:** TaskFlow
**Type:** Collaborative task management web app
**Stack context:** Next.js, Tailwind CSS, Geist font family, Firebase Auth

---

## 1. Global Design Philosophy

- **Minimal, content-first.** Every pixel must earn its place. No decorative elements that don't serve a function.
- **High information density with visual clarity.** Show a lot of data without feeling cramped — use whitespace as a structural tool, not filler.
- **Linear, Notion, and Vercel Dashboard-level polish.** The UI should feel like a premium SaaS product, not a bootstrap template.
- **No rounded-everything. No gratuitous shadows. No gradient backgrounds.** Flat, sharp, intentional.

---

## 2. Color & Theme

- **Palette:** Zinc-based neutral scale (zinc-50 through zinc-950). Use color extremely sparingly — only for status, actions, and errors.
- **Accent color:** A single accent (blue-500 or indigo-500) used only for primary CTAs and active states. Never more than one accent color on screen at a time.
- **Dark mode native.** Design for dark mode first. Light mode should be equally considered, not an afterthought. Both must feel intentional.
- **Status colors:** Red for overdue/error, amber/yellow for warning/in-progress, green for completed, blue for info/active. Use these as small chips/dots, never large blocks.
- **No colored backgrounds for sections.** Use borders, subtle dividers, and spacing to separate content — not colored containers.

---

## 3. Typography

- **Font:** Geist Sans (body), Geist Mono (timestamps, IDs, metadata).
- **Hierarchy:** Only 3 text sizes in main content: `text-sm` (14px) for most things, `text-xs` (12px) for metadata/timestamps, `text-lg` or `text-xl` (max) for page titles. Avoid anything larger.
- **Weight:** Medium (500) for labels and nav, Semibold (600) for headings, Regular (400) for body. Never use bold (700+) except the app logo.
- **Tracking:** Tight tracking (`tracking-tight`) on headings. Normal on body.
- **Letter spacing and line height matter.** Make text breathable but not loose.

---

## 4. Layout & Spacing

- **Max content width:** 1024px (`max-w-5xl`), centered. No full-bleed layouts except the header.
- **Consistent spacing scale:** 4px base. Use multiples: 8, 12, 16, 24, 32. Never arbitrary padding.
- **Sticky header** with a bottom border, not a shadow. Height: 64px.
- **No sidebar.** Use a top navigation bar. The app should feel like a single focused workspace, not an admin panel.
- **Card-free design where possible.** Lists and items should be rows in a clean table/list format, not floating cards with shadows. If cards are used, they should have a 1px border (zinc-200/zinc-800) and no shadow, or at most a `shadow-xs`.

---

## 5. Navigation & Header

- **Logo:** "TaskFlow" in bold, left-aligned in the header. No icon/logo mark needed — the wordmark is the brand.
- **Navigation items** sit in the header bar as text links with subtle hover states (background highlight, not underline). Active state uses a bottom border indicator or a slightly darker background pill.
- **User area:** Right side of header. Show email as muted text, a small avatar circle (initials-based, zinc-700 bg with white text), and a sign-out action tucked into a minimal dropdown — not a visible button at all times.
- **No hamburger menus on desktop.** On mobile, collapse nav into a clean slide-down sheet, not a sidebar drawer.

---

## 6. Task List — The Core View

- **Table-style list, not a card grid.** Each task is a single row. Columns: checkbox, task title, due date, priority, assignee, status.
- **Rows are interactive.** Hover highlights the entire row with a subtle zinc-100/zinc-900 background. Click opens a task detail panel.
- **Inline editing.** Clicking a task title should make it editable in-place. No modal for simple edits.
- **Checkboxes:** Custom styled, rounded square (not circles). Checked state fills with zinc-900 (light) or zinc-50 (dark) with a clean checkmark.
- **Completed tasks:** Strike-through text with reduced opacity (opacity-50). Keep them visible but visually receded.
- **Empty state:** A single line of muted text centered: "No tasks yet. Create one to get started." with a subtle text button. No illustrations, no giant icons.
- **Batch actions:** When multiple tasks are selected, a slim action bar slides up from the bottom (or appears at the top of the list) with options: delete, change status, assign. Minimal footprint.

---

## 7. Task Detail / Side Panel

- **Slide-in panel from the right**, not a modal. Width: ~480px. The main list stays visible behind it, slightly dimmed.
- **Panel header:** Task title (editable), with a small X button to close. No "Save" button — changes auto-save with a tiny "Saved" indicator that fades out.
- **Sections inside the panel:**
  - **Metadata row:** Status dropdown, priority dropdown, due date picker, assignee — all inline, compact, using small pill-style selectors.
  - **Description:** A plain text area with markdown support. Minimal toolbar (bold, italic, list, link) that only appears on focus.
  - **Subtasks:** A simple indented checklist. Add subtask via a "+ Add subtask" text button at the bottom.
  - **Activity log:** Timestamps and actions in `text-xs` monospace at the bottom. Muted. Not prominent.
- **No tabs inside the panel.** Everything is on one scrollable view.

---

## 8. Forms & Inputs

- **Inputs:** 1px border (zinc-300/zinc-700), rounded-lg (8px), `text-sm`. Focus state: 2px ring in zinc-900/zinc-100 at 10% opacity. No colored focus rings.
- **Labels:** Always above the input, `text-sm font-medium`, zinc-700/zinc-300. Never floating labels.
- **Error states:** Red border on the input + a small red message below in `text-xs`. No icons in error messages.
- **Buttons:**
  - **Primary:** Filled zinc-900 (light) / zinc-50 (dark). `text-sm font-medium`. Rounded-lg.
  - **Secondary:** 1px border, transparent background, zinc text. For cancel/back actions.
  - **Danger:** Red-600 filled, only for destructive actions, and only after a confirmation step.
  - **Ghost:** No border, no background, just text with hover background. For tertiary actions.
- **Button height:** Consistent 36px (`py-2 px-4`) or 40px (`py-2.5 px-4`). Never mix sizes on the same row.
- **Disabled state:** `opacity-50` and `cursor-not-allowed`. No grayed-out alternative colors.

---

## 9. Dropdowns, Selects & Popovers

- **Custom dropdowns**, not native `<select>`. Styled consistently with the design system.
- **Dropdown menus:** 1px border, `rounded-lg`, subtle `shadow-md` (the one place shadow is acceptable). Items are `text-sm` with hover highlight. Active/selected item has a small check icon on the right.
- **Date picker:** Compact, inline calendar popover. Muted grid. Selected date highlighted with zinc-900/zinc-50 fill. Today's date has a subtle dot indicator below the number.
- **Popovers attach tightly** to their trigger element. No floating far away.

---

## 10. Status & Priority Indicators

- **Status:** Small colored dot (8px) + text label. Not a full colored badge.
  - To Do: zinc-400 dot
  - In Progress: blue-500 dot
  - Done: green-500 dot
  - Blocked: red-500 dot
- **Priority:** Text only with subtle color, or a small icon.
  - High: red-500 text or small upward arrow
  - Medium: amber-500 text or dash
  - Low: zinc-400 text or downward arrow
- **No large colored badges or pills.** Keep indicators compact and non-distracting.

---

## 11. Animations & Transitions

- **Duration:** 150ms for micro-interactions (hover, focus), 200ms for panels/dropdowns, 300ms for page transitions. Never longer.
- **Easing:** `ease-out` for entrances, `ease-in` for exits. Never linear, never bouncy.
- **What to animate:** Hover backgrounds, panel slide-ins, dropdown fade-in, toast notifications sliding in, checkbox check animation.
- **What NOT to animate:** Page loads, list rendering, layout shifts. Content should appear instantly.
- **Loading states:** A thin, indeterminate progress bar at the very top of the viewport (like YouTube/GitHub), not spinners. If a spinner is needed, use a small (16px) one, never centered-page spinners with "Loading..." text.

---

## 12. Toast Notifications

- **Position:** Bottom-right, stacked. Max 3 visible at a time.
- **Style:** Small, `rounded-lg`, 1px border, subtle shadow. White/zinc-900 background. A thin left-side color stripe for type (green=success, red=error, blue=info).
- **Auto-dismiss** after 4 seconds. Include a small X to dismiss manually.
- **No icons in toasts.** The color stripe is enough to convey type.

---

## 13. Filters & Search

- **Search bar** at the top of the task list. Clean input with a muted search icon (zinc-400) inside. No separate search button — search is live as you type.
- **Filters:** A row of small, pill-shaped filter buttons below the search bar. Inactive = outlined/ghost. Active = filled zinc-900/zinc-50. Clicking toggles. Keep to one row — overflow scrolls horizontally on mobile.
- **Filter categories:** Status, Priority, Assignee, Due Date range. No more than 4.
- **Active filter count:** A tiny superscript number badge on a "Filters" button if filters are collapsed.

---

## 14. Mobile Responsiveness

- **Breakpoints:** sm (640px), md (768px), lg (1024px). Design primarily for md+ and adapt down.
- **Mobile task list:** Single column. Each task row becomes a compact card-like row showing title + status dot + due date. Tap to open full-screen detail view (not side panel).
- **Mobile navigation:** Collapse header nav items into a clean top sheet or bottom sheet. Never a left drawer.
- **Touch targets:** Minimum 44px for all interactive elements on mobile.
- **No horizontal scrolling.** Everything must fit within the viewport width.

---

## 15. Micro-Details That Elevate the UI

- **Dividers:** Use `border-zinc-200 dark:border-zinc-800` — thin, subtle. Never thick or colored.
- **Avatars:** Initials-based circles, 28-32px for inline, 40px for profile areas. Use deterministic background colors based on the user's name (consistent hashing).
- **Keyboard shortcuts:** Support them and show hints in tooltips (e.g., hovering "New Task" button shows `N` shortcut). No dedicated shortcut modal unless the app grows.
- **Focus rings on keyboard navigation only** (`:focus-visible`), never on click.
- **Truncation:** Long task titles truncate with ellipsis in list view, show full text in detail panel.
- **Relative timestamps:** "2h ago", "Yesterday", "Mar 28" — not "2026-03-28T14:32:00Z".
- **Skeleton loaders** (pulsing zinc-200/zinc-800 blocks) for async content, matching the exact layout of the content they replace. Never generic spinners.

---

## 16. What to Avoid

- No gradients anywhere
- No box shadows except on dropdowns and toasts (and even then, very subtle)
- No border-radius larger than 12px on anything
- No emoji as UI indicators
- No colored section backgrounds
- No hero sections, marketing banners, or onboarding wizards
- No floating action buttons (FAB)
- No tooltips that block content
- No "Are you sure?" modals for non-destructive actions
- No loading screens that block the whole page
- No unnecessary icons — if a text label is clear, don't add an icon next to it
- No more than 2 font weights visible at any one time in the same section

---

## 17. Overall Feel to Target

Think: **Linear meets Notion meets Vercel Dashboard.** Professional, dense but breathable, monochrome with surgical color use, and every interaction feels instant and deliberate. The user should feel like they're using a tool built by people who care about craft.
