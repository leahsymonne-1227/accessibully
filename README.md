# Accessibul11y

Accessibul11y is a developer-tool concept for making common accessibility checks and fixes easier to act on. This repository currently contains its responsive project and design-system landing page; it does not yet contain the browser extension or scanning engine.

## Run the page locally

You need Node.js and npm installed.

```sh
npm install
npm run dev
```

Open the local address printed by Vite in your browser. To create a production build, run `npm run build`.

## What's in this repository

- A React + TypeScript landing page based on the Accessibul11y Figma design.
- A compact color and typography specimen.
- A scan-result preview image exported from the design.
- Responsive section navigation, keyboard focus styling, and reduced-motion support.

The Chrome Web Store link currently opens a search for Accessibul11y. The extension listing is still in progress.

## Accessibility

The page uses semantic landmarks, a skip link, keyboard-visible focus, descriptive image text, responsive layouts, and a reduced-motion preference. The design's main text and button colors were checked against WCAG contrast thresholds. This is an initial implementation review, not a claim of full WCAG conformance; assistive-technology and browser testing remains important as the page and extension evolve.

## Project status

Early project / design prototype. See [CHANGELOG.md](CHANGELOG.md) for updates.

## Reuse

No software license is included. The project is publicly viewable on GitHub, but no general permission to reuse, modify, or distribute the code is granted. Copyright does not protect the underlying idea itself; it protects eligible original expression such as code and artwork. Please contact the author before reusing project materials.
Accessibility Scanner
