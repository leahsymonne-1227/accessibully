import { useEffect, useState } from 'react'

const sections = [
  { id: 'overview', number: '01', label: 'Overview' },
  { id: 'foundations', number: '02', label: 'Foundations' },
  { id: 'type', number: '03', label: 'Typography' },
  { id: 'components', number: '04', label: 'Components' },
  { id: 'why', number: '05', label: 'Why' },
]

const colors = [
  { name: 'Canvas', hex: '#1C1C1C', className: 'canvas' },
  { name: 'Issue', hex: '#242424', className: 'issue' },
  { name: 'Scan', hex: '#E01A24', className: 'scan' },
  { name: 'Text', hex: '#F6F6F6', className: 'text' },
  { name: 'Focus', hex: '#1677FF', className: 'focus' },
]

function App() {
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.2, 0.5, 1] },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="site-shell">
        <header className="site-header">
          <div>
            <p className="eyebrow">ACCESSIBUL11Y · A PROJECT IN PROGRESS</p>
            <h1>The Accessibully</h1>
            <p className="header-subtitle">
              A dev tool for finding common accessibility issues—and showing you how to fix them.
            </p>
          </div>
          <div className="header-action">
            <a
              className="store-button"
              href="https://chromewebstore.google.com/search/Accessibul11y"
              target="_blank"
              rel="noreferrer"
            >
              Chrome Web Store <span className="visually-hidden">(opens in a new tab)</span>
            </a>
            <span className="store-note">Store search · listing in progress</span>
          </div>
        </header>

        <div className="page-divider" />

        <div className="page-layout">
          <nav className="section-nav" aria-label="On this page">
            <p className="nav-title">ON THIS PAGE</p>
            <ol>
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    className={activeSection === section.id ? 'nav-link is-active' : 'nav-link'}
                    href={`#${section.id}`}
                    aria-current={activeSection === section.id ? 'location' : undefined}
                  >
                    <span className="nav-number" aria-hidden="true">{section.number}</span>
                    <span>{section.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <main id="main-content" className="content">
            <section id="overview" className="content-section overview" aria-labelledby="overview-title">
              <p className="section-kicker">01&nbsp; / &nbsp;OVERVIEW</p>
              <h2 id="overview-title">Small fixes. Clear next steps.</h2>
              <p className="section-lede">
                Accessibul11y is a developer-tool concept for spotting common accessibility issues and helping you decide what to fix next.
              </p>
            </section>

            <section id="foundations" className="content-section" aria-labelledby="foundations-title">
              <p className="section-kicker">02&nbsp; / &nbsp;FOUNDATIONS</p>
              <h2 id="foundations-title" className="section-title">Color roles</h2>
              <ul className="color-list" aria-label="Accessibul11y color palette">
                {colors.map((color) => (
                  <li className="color-token" key={color.name}>
                    <span className={`swatch swatch-${color.className}`} aria-hidden="true" />
                    <span className="token-copy">
                      <span className="token-name">{color.name}</span>
                      <code>{color.hex}</code>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="supporting-copy">
                Dark result surfaces, a red scan action, a blue keyboard-focus ring, and light text keep the interface clear and recognizable.
              </p>
            </section>

            <section id="type" className="content-section type-section" aria-labelledby="type-title">
              <div>
                <p className="section-kicker">03&nbsp; / &nbsp;TYPE</p>
                <h2 id="type-title" className="type-sample">Access for everyone.</h2>
                <p className="type-caption">Inter&nbsp; / &nbsp;interface + headings</p>
              </div>
              <div className="focus-token">
                <p className="focus-value"><span aria-hidden="true">focus/blue-ring&nbsp; / &nbsp;</span><code>#1677FF</code></p>
                <p className="supporting-copy">Shown around the scan button when keyboard-focused.</p>
              </div>
            </section>

            <section id="components" className="content-section component-section" aria-labelledby="components-title">
              <div className="component-copy">
                <p className="section-kicker">04&nbsp; / &nbsp;COMPONENTS</p>
                <h2 id="components-title" className="section-title">The scan</h2>
                <p className="supporting-copy">
                  One click checks a page and calls attention to an issue. The example shows the scan action and a missing-main landmark message.
                </p>
              </div>
              <figure className="product-preview">
                <div className="preview-artwork">
                  <img
                    src={`${import.meta.env.BASE_URL}scan-preview.png`}
                    alt="Accessibul11y browser extension preview. It shows a scan button and the result: ‘Missing your main squeeze.’"
                    width="658"
                    height="560"
                  />
                  <span className="preview-button-face" aria-hidden="true" />
                  <span className="preview-button-label" aria-hidden="true">Scan This Page</span>
                  <span className="preview-card-outline" aria-hidden="true" />
                </div>
                <figcaption>Early scan-result concept · a missing main landmark</figcaption>
              </figure>
            </section>

            <section id="why" className="content-section why-section" aria-labelledby="why-title">
              <p className="section-kicker">05&nbsp; / &nbsp;WHY</p>
              <h2 id="why-title" className="section-title">Small fixes, made easier to act on.</h2>
              <p className="why-copy">
                Accessibility checks can feel like a wall of rules. Accessibul11y aims to point developers toward common fixes with clear next steps—and just enough personality to make the process less grim.
              </p>
              <p className="wordmark">ACCESSIBUL11Y</p>
            </section>
          </main>
        </div>
      </div>
    </>
  )
}

export default App
