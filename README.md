# M Arbaz Khan — Portfolio

Personal portfolio of **M Arbaz Khan**, Web Accessibility Expert (WCAG 2.2, ADA, Section 508, PDF/UA).

A static site with no build step — open `index.html` or serve the folder (e.g. GitHub Pages).

## Structure

```
index.html          Semantic HTML content (all content works without JavaScript)
css/styles.css      Styles: cascade layers, native nesting, light-dark(), container queries
js/main.js          Progressive enhancements: theme toggle, mobile nav, project filters
assets/img/         Optimised profile photos (WebP + JPEG, 480/800 px)
```

## Accessibility

- Targets WCAG 2.2 AA; checked with axe-core in light/dark themes at desktop and mobile widths (0 violations)
- Skip link, landmarks, one `h1`, logical heading order, descriptive link text
- Visible focus indicator, keyboard-operable nav (Escape closes the menu), 44px+ touch targets
- Light / dark theme follows the OS and can be toggled (`aria-pressed`, remembered per browser)
- Respects `prefers-reduced-motion`, `prefers-contrast` and Windows forced-colours mode
- Project filters use `aria-pressed` with a polite live region announcing results
- New-tab links are announced; language proficiency uses native `<meter>`
