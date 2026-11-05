---
name: ui-accessibility
description: "Use when improving keyboard focus, contrast, labels, semantics, screen-reader friendliness, or general usability for the CarolinaTech marketing site. Covers accessible interactions and inclusive UI fixes."
---

# Accessibility UI Skill

## When to use
- Improve focus states and keyboard navigation
- Audit contrast, text clarity, and hover/focus feedback
- Fix invalid labels, alt text, or semantic button/link usage
- Preserve usability for users with limited mobility or assistive tech

## Workflow
1. Review the affected component in `index.html` and the matching styles in `assets/css/`.
2. Prefer semantic HTML first: buttons for actions, links for navigation, labels for form inputs.
3. Ensure visible focus indicators remain strong against the current dark theme.
4. Maintain accessible color contrast and readable type scales.
5. Keep actions understandable without relying only on color or motion.
6. Validate that key tasks still work with keyboard-only navigation.

## Relevant files
- `index.html`
- `assets/css/components.css`
- `assets/css/sections.css`
- `assets/css/responsive.css`
- `assets/js/main.js`

## Quality bar
- The interface remains inclusive, readable, and easy to navigate.
- Interactive elements are clearly identifiable and usable without a mouse.
- The site stays polished while remaining accessible to all visitors.
