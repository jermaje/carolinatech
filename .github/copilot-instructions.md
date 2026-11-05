# CarolinaTech Project Guidelines

## Front-end approach
- This repository is a static marketing website built with semantic HTML, modular CSS, and vanilla JavaScript.
- Keep components accessible: good contrast, keyboard focus states, valid button/link semantics, and descriptive alt text.
- Favor small, targeted CSS changes in the existing `assets/css/` structure instead of introducing frameworks or large rewrites.
- Keep the visual language consistent with the current premium dark-tech aesthetic: deep backgrounds, electric blue accents, glassmorphism, and clean spacing.

## Layout and styling
- Prefer CSS custom properties from `assets/css/variables.css` over repeated hard-coded values.
- Work mobile-first and verify layout behavior at common breakpoints such as 320px, 768px, 1024px, and 1440px.
- Keep animations subtle and purposeful; prioritize smooth transitions and lightweight motion.
- Reuse shared helper classes and component patterns from `components.css` and `sections.css` when adding or modifying UI.

## Content and interactions
- Preserve the landing-page content structure and conversion-focused hierarchy in `index.html`.
- Use existing JS patterns in `assets/js/main.js` for interactions instead of creating duplicate logic.
- Ensure contact, navbar, modal, and reveal interactions remain keyboard-friendly and performant.

## Quality bar
- Keep files organized by responsibility: structure in `index.html`, styling in `assets/css/`, scripts in `assets/js/`.
- Avoid unnecessary dependencies and build tooling for this static site.
- Validate UI changes by checking responsiveness, readability, and task flow before finalizing.
