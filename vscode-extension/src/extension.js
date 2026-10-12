const vscode = require('vscode');

const issues = vscode.languages.createDiagnosticCollection('accessibu11y');
const markupLanguages = new Set(['html', 'javascriptreact', 'typescriptreact']);
const styleLanguages = new Set(['css', 'scss']);

function makeDiagnostic(document, start, length, message, code) {
  const from = Math.max(0, Math.min(start, document.getText().length));
  const to = Math.max(from + 1, Math.min(from + Math.max(length, 1), document.getText().length));
  const result = new vscode.Diagnostic(
    new vscode.Range(document.positionAt(from), document.positionAt(to)),
    message,
    vscode.DiagnosticSeverity.Warning
  );
  result.source = 'Accessibu11y';
  result.code = code;
  return result;
}

function analyzeMarkup(document) {
  const text = document.getText();
  const found = [];
  const add = (index, length, message, code) => found.push(makeDiagnostic(document, index, length, message, code));

  if (!/<main\b/i.test(text)) {
    add(0, 1, 'Missing your <main> squeeze. Add a main landmark around the page’s primary content.', 'missing-main');
  }

  for (const match of text.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt\s*=/.test(match[0])) {
      add(match.index, match[0].length, 'Missing Alt Text: add alt text, or alt="" when the image is decorative.', 'missing-alt');
    }
  }

  // Mirrors the browser extension's original rule: an input without either
  // aria-label or id is flagged. An id alone does not prove a label exists.
  for (const match of text.matchAll(/<input\b[^>]*>/gi)) {
    if (!/\baria-label\s*=|\bid\s*=/.test(match[0])) {
      add(match.index, match[0].length, 'No label? Accessibility ghosting. Add an associated label or an accessible name.', 'missing-input-name');
    }
  }

  // The Chrome extension compares computed styles. In source, only compare
  // explicit color/background-color literals in the same inline style.
  for (const match of text.matchAll(/\bstyle\s*=\s*(["'])(.*?)\1/gi)) {
    const declarations = match[2];
    const foreground = declarations.match(/(?:^|;)\s*color\s*:\s*([^;]+)/i)?.[1]?.trim();
    const background = declarations.match(/(?:^|;)\s*background(?:-color)?\s*:\s*([^;]+)/i)?.[1]?.trim();
    addLowContrastIfNeeded(add, match.index, match[0].length, foreground, background);
  }
  return found;
}

function parseHexColor(value) {
  const match = value?.trim().match(/^#([\da-f]{3}|[\da-f]{6})$/i);
  if (!match) return undefined;
  let hex = match[1];
  if (hex.length === 3) hex = [...hex].map(character => character + character).join('');
  return [0, 2, 4].map(index => parseInt(hex.slice(index, index + 2), 16));
}

function relativeLuminance(rgb) {
  const linear = rgb.map(channel => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(first, second) {
  const a = relativeLuminance(first);
  const b = relativeLuminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

function addLowContrastIfNeeded(add, index, length, foreground, background) {
  const fg = parseHexColor(foreground);
  const bg = parseHexColor(background);
  if (!fg || !bg) return;
  const ratio = contrastRatio(fg, bg);
  if (ratio < 4.5) {
    add(index, length, `Low Contrast: this hex color pair has a ${ratio.toFixed(2)}:1 ratio; aim for at least 4.5:1 for normal text.`, 'low-contrast');
  }
}

function analyzeStyles(document) {
  const text = document.getText();
  const found = [];
  // Compare literal declarations within one CSS block. This is intentionally
  // conservative; it does not resolve variables, selectors, cascade, or inheritance.
  for (const block of text.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const declarations = block[2];
    const foreground = declarations.match(/(?:^|;)\s*color\s*:\s*([^;]+)/i)?.[1]?.trim();
    const background = declarations.match(/(?:^|;)\s*background(?:-color)?\s*:\s*([^;]+)/i)?.[1]?.trim();
    if (foreground && background) {
      const offset = block.index + block[0].indexOf('{') + 1;
      addLowContrastIfNeeded(
        (index, length, message, code) => found.push(makeDiagnostic(document, index, length, message, code)),
        offset, declarations.length, foreground, background
      );
    }
  }
  return found;
}

function scan(document) {
  if (document.uri.scheme !== 'file') return;
  let result = [];
  if (markupLanguages.has(document.languageId)) result = analyzeMarkup(document);
  if (styleLanguages.has(document.languageId)) result = analyzeStyles(document);
  issues.set(document.uri, result);
}

function isSupported(document) {
  return markupLanguages.has(document.languageId) || styleLanguages.has(document.languageId);
}

function activate(context) {
  for (const document of vscode.workspace.textDocuments) scan(document);
  context.subscriptions.push(
    issues,
    vscode.workspace.onDidOpenTextDocument(scan),
    vscode.workspace.onDidChangeTextDocument(event => scan(event.document)),
    vscode.workspace.onDidCloseTextDocument(document => issues.delete(document.uri)),
    vscode.commands.registerCommand('accessibu11y.scanWorkspace', async () => {
      const files = await vscode.workspace.findFiles(
        '**/*.{html,htm,jsx,tsx,css,scss}',
        '**/{node_modules,.git,dist,build,out}/**'
      );
      let count = 0;
      for (const uri of files) {
        try {
          const document = await vscode.workspace.openTextDocument(uri);
          if (isSupported(document)) {
            scan(document);
            count += issues.get(uri)?.length ?? 0;
          }
        } catch {
          // Skip files VS Code cannot open.
        }
      }
      vscode.window.showInformationMessage(
        `Accessibu11y scanned ${files.length} files and found ${count} potential issue${count === 1 ? '' : 's'}.`
      );
    })
  );
}

function deactivate() {
  issues.clear();
}

module.exports = { activate, deactivate };
