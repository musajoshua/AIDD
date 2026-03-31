# The Monolith: A High-Density Editorial Design System

## 1. Overview & Creative North Star
**The Creative North Star: "Precision Brutalism"**

This design system rejects the "fluff" of the modern web. It is built for power users who demand high information density, extreme legibility, and a UI that recedes to let the work take center stage. Drawing inspiration from high-end Swiss typography and elite developer tools, this system uses a "Zinc-first" philosophy. 

We break the "template" look through **Intentional Asymmetry**. Instead of centered, breathing layouts, we favor left-aligned, high-density structures that mimic a sophisticated technical manual. The aesthetic is "Dark Mode Native," treating the screen not as a canvas of light, but as a void where information is etched with surgical precision.

---

## 2. Colors & Surface Logic

### The Neutral Backbone
We utilize a Zinc-based scale (`#0e0e11` to `#e6e4ef`) to create a cold, professional atmosphere. 

*   **Background:** `#0e0e11` (The Void)
*   **Primary Accent:** `#c0c1ff` (Indigo-500 equivalent, used only for critical intent)
*   **Surface Hierarchy:**
    *   `surface-container-lowest`: `#000000` (Used for deep inset areas like terminal views)
    *   `surface-container-low`: `#131317` (The default workspace background)
    *   `surface-container`: `#19191e` (Standard component background)
    *   `surface-container-high`: `#1f1f26` (Hover states and active row highlighting)

### The "No-Line" Rule & Tonal Boundary
Traditional 1px solid borders are often a crutch for poor contrast. In this system, boundaries are defined by **Background Shift**. 
*   **Instruction:** Do not use a border to separate a sidebar from a main content area. Instead, set the Sidebar to `surface-container-low` and the Main Content to `surface`.
*   **Exception:** 1px borders are permitted *only* for structural table data and input fields using the `outline-variant` (`#474750`) at 50% opacity.

### Glass & Texture
To prevent the UI from feeling "flat" or "dead," use **Backdrop Blurs** (`blur-md`) on global navigation headers and dropdowns. Use the `surface-variant` (`#24252d`) with an opacity of 70% to allow content to ghost behind the UI as the user scrolls.

---

## 3. Typography: The Geist Hierarchy

We utilize the **Geist** typeface family to bridge the gap between "Editorial Design" and "Code Editor."

| Role | Token | Font | Size | Weight | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Geist Sans | 3.5rem | 600 | -0.04em |
| **Headline** | `headline-sm` | Geist Sans | 1.5rem | 500 | -0.02em |
| **Title** | `title-sm` | Geist Sans | 1rem | 500 | 0 |
| **Body** | `body-md` | Geist Sans | 0.875rem | 400 | 0 |
| **Metadata** | `label-sm` | **Geist Mono** | 0.6875rem | 400 | +0.02em |

**Editorial Direction:** Use `Geist Mono` for all timestamps, IDs, version numbers, and status counts. This creates a "Data-Ink" ratio that feels authoritative and technical.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved by "stacking" Zinc tiers. 
1.  **Level 0 (Base):** `surface` (`#0e0e11`)
2.  **Level 1 (Sections):** `surface-container-low` (`#131317`)
3.  **Level 2 (Active Elements):** `surface-container-high` (`#1f1f26`)

### Ambient Shadows
Shadows are strictly reserved for **Floating Overlays** (Menus, Dropdowns). 
*   **Spec:** `0px 8px 24px -4px rgba(0, 0, 0, 0.6)`. 
*   No shadows on buttons, cards, or sidebar elements.

### The Ghost Border
For accessibility in high-density tables, use a "Ghost Border":
*   `border: 1px solid var(--outline-variant);` at 20% opacity. It should be felt, not seen.

---

## 5. Components

### Buttons: Precision Triggers
*   **Primary:** Background: `primary` (`#c0c1ff`), Text: `on-primary` (`#2724b8`). Sharp 4px corners (`rounded`). No gradient.
*   **Secondary/Ghost:** Background: `transparent`, Border: `outline-variant`. Text: `on-surface`.
*   **Interaction:** On hover, primary buttons shift to `primary-dim`.

### Tables & Lists (The Core Pattern)
This system forbids "Cards." All data must live in structured lists.
*   **Row Height:** 32px (compact) or 44px (standard).
*   **Separation:** No horizontal dividers. Use a 1px `transparent` border that turns into `surface-container-highest` on hover to highlight the row.
*   **Density:** Use `body-sm` (14px) for list content to maximize info-density.

### Input Fields
*   **Visuals:** Inset background using `surface-container-lowest`. 1px border using `outline`.
*   **Focus:** Border shifts to `primary` with no outer glow/ring.

### Additional Component: The "Metadata Tag"
A specialized chip for Geist Mono text. 
*   **Style:** `surface-container-high` background, 2px roundedness, `label-sm` (11px) mono text. Used for Git hashes, status codes, and IDs.

---

## 6. Do's and Don'ts

### Do
*   **Do** embrace "Information Overload." Users of this system value seeing 50 rows of data over one large, pretty image.
*   **Do** use `Geist Mono` for any numerical data.
*   **Do** use `spacing-1` (4px) and `spacing-2` (8px) for almost all internal padding.

### Don't
*   **Don't** use soft, large rounded corners. Keep `rounded-lg` (8px) as the absolute maximum for large containers; use 2px-4px for small ones.
*   **Don't** use shadows to create depth; use color shifts between `surface-container` tiers.
*   **Don't** use icons as purely decorative elements. Every icon must represent a functional action.
*   **Don't** use gradients. Professionalism is found in flat, deliberate color choices.