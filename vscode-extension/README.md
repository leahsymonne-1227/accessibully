# Accessibu11y for VS Code

This extension adapts the quick checks from the Accessibu11y Chrome extension for use while editing. It publishes warnings in VS Code’s **Problems** panel and updates them as supported files change.

## Checks

- No `<main>` landmark in an HTML, JSX, or TSX file.
- An `<img>` element without an `alt` attribute.
- An `<input>` element without an `aria-label` or `id`, matching the original Chrome extension’s rule.
- A 3- or 6-digit hex text color and background color in the same inline style or CSS/SCSS block when their calculated contrast is below 4.5:1.

The browser extension analyzes rendered pages and computed colors. A source editor cannot see computed styles, so the contrast check only reads opaque 3- and 6-digit hex literals written together in source. It does not resolve CSS variables, named colors, `rgb()` values, alpha transparency, the cascade, inherited backgrounds, or framework-generated markup. The input check also cannot establish whether an `id` is connected to a real `<label>`. Treat findings as quick prompts to review, not a complete accessibility audit or a WCAG conformance result.

## Try it in VS Code

1. Open this `vscode-extension` folder in VS Code.
2. Press **F5** to launch an Extension Development Host window.
3. Open an HTML, JSX, TSX, CSS, or SCSS file. Findings appear in the **Problems** panel as you edit.
4. To scan matching files throughout the open workspace, run **Accessibu11y: Scan Workspace** from the Command Palette.

To package the extension for installation, package this folder as a VS Code extension (VSIX) with the VS Code Extension Manager tool, `vsce`. A publisher account is needed to publish it to the Marketplace.

## Files

- `src/extension.js` implements the diagnostics and workspace command.
- `package.json` declares VS Code compatibility and the command.

