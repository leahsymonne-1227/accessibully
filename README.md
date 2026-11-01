Accessibu11y

Accessibu11y is an accessibility scanner that makes common accessibility checks and fixes easier to act on. It's available as a Google Chrome extension and a VS Code extension.

Chrome extension: scan live pages in your browser. Get it on the Chrome Web Store
VS Code extension: run quick accessibility checks while editing HTML, JSX, TSX, CSS, and SCSS. Get it on the VS Code Marketplace

This repository contains the VS Code extension and the project's responsive landing page and design system.

Run the page locally

You need Node.js and npm installed.

npm install
npm run dev

Open the local address printed by Vite in your browser. To create a production build, run npm run build.

What's in this repository
A React + TypeScript landing page based on the Accessibu11y Figma design.
A compact color and typography specimen.
A scan-result preview image exported from the design.
Responsive section navigation, keyboard focus styling, and reduced-motion support.
The VS Code extension source, in the vscode-extension folder.
Accessibility

The landing page uses semantic landmarks, a skip link, keyboard-visible focus, descriptive image text, responsive layouts, and a reduced-motion preference. The design's main text and button colors were checked against WCAG contrast thresholds. This is an initial implementation review, not a claim of full WCAG conformance; assistive-technology and browser testing remains important as the page and extensions evolve.

Project status

Both extensions are live and in active development. See CHANGELOG.md for updates.

Reuse

No software license is included. The project is publicly viewable on GitHub, but no general permission to reuse, modify, or distribute the code is granted. Copyright does not protect the underlying idea itself; it protects eligible original expression such as code and artwork. Please contact the author before reusing project materials.
