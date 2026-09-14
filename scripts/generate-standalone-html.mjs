import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_CODE = path.resolve(__dirname, '..', '..')
const DASHBOARD_DIR = path.resolve(BASE_CODE, 'crml-ui-dashboard')

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CRML - UI // Multi-Framework Documentation & Installation Hub</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Cabinet+Grotesk:wght@800;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --crt-electric-lime: #CCFF00;
      --crt-hot-pink: #FF007F;
      --crt-cyber-cyan: #00F0FF;
      --crt-sunburst-yellow: #FFD600;
      --crt-obsidian: #0D0D0D;
      --crml-bg-base: #FAFAFA;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background-color: var(--crml-bg-base);
      color: var(--crt-obsidian);
      font-family: 'Space Grotesk', sans-serif;
    }
    .font-mono { font-family: 'Space Mono', monospace; }
    .font-heading { font-family: 'Space Grotesk', sans-serif; font-weight: 900; }

    .top-announcement-bar {
      background-color: #0D0D0D;
      color: #FFFFFF;
      padding: 0.5rem 1rem;
      font-size: 0.75rem;
      font-weight: 800;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.75rem;
      border-bottom: 2px solid #0D0D0D;
    }
    .announcement-divider { color: #CCFF00; }

    .main-nav-header {
      border-bottom: 3.5px solid #0D0D0D;
      background-color: #FFFFFF;
      padding: 1.25rem 2.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1.5rem;
      flex-wrap: wrap;
    }
    .brand-block { display: flex; align-items: center; gap: 1.25rem; }
    .brand-logo-chip {
      background-color: #0D0D0D;
      color: #FFFFFF;
      font-size: 1.5rem;
      font-weight: 900;
      padding: 0.4rem 0.85rem;
      border: 3px solid #0D0D0D;
      border-radius: 8px;
      box-shadow: 4px 4px 0px #CCFF00;
    }
    .logo-accent { color: #CCFF00; }
    .brand-title { margin: 0; font-size: 1.25rem; font-weight: 900; }
    .brand-sub { font-size: 0.75rem; color: #71717A; font-weight: 700; }

    .tactile-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 800;
      font-size: 0.85rem;
      padding: 0.65rem 1.25rem;
      border: 2.5px solid #0D0D0D;
      border-radius: 8px;
      box-shadow: 3px 3px 0px #0D0D0D;
      cursor: pointer;
      text-decoration: none;
      text-transform: uppercase;
      user-select: none;
      transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .tactile-btn:hover {
      transform: translate(-1px, -1px);
      box-shadow: 4px 4px 0px #0D0D0D;
    }
    .tactile-btn:active {
      transform: translate(2px, 2px);
      box-shadow: 1px 1px 0px #0D0D0D;
    }
    .variant-lime { background-color: #CCFF00; color: #0D0D0D; }
    .variant-pink { background-color: #FF007F; color: #FFFFFF; }
    .variant-cyan { background-color: #00F0FF; color: #0D0D0D; }
    .variant-yellow { background-color: #FFD600; color: #0D0D0D; }
    .variant-outline { background-color: #FFFFFF; color: #0D0D0D; }
    .variant-obsidian { background-color: #0D0D0D; color: #FFFFFF; }

    .hero-section {
      padding: 3rem 2.5rem;
      display: grid;
      grid-template-columns: 1fr 1.15fr;
      gap: 3rem;
      border-bottom: 3.5px solid #0D0D0D;
    }
    @media (max-width: 1024px) {
      .hero-section { grid-template-columns: 1fr; }
    }
    .hero-heading {
      font-size: 3.5rem;
      font-weight: 900;
      margin: 0 0 1.25rem 0;
      line-height: 1.05;
    }
    .hero-highlight {
      background-color: #CCFF00;
      padding: 0 0.5rem;
      border: 3px solid #0D0D0D;
      box-shadow: 5px 5px 0px #0D0D0D;
    }
    .hero-description {
      font-size: 1rem;
      color: #52525B;
      line-height: 1.6;
      margin: 0 0 2rem 0;
      max-width: 540px;
    }

    .distribution-header-card {
      background: #FFFFFF;
      border: 3.5px solid #0D0D0D;
      border-radius: 14px;
      box-shadow: 7px 7px 0px #0D0D0D;
      overflow: hidden;
    }
    .dist-header {
      background: #0D0D0D;
      color: #FFFFFF;
      padding: 0.85rem 1.25rem;
      font-size: 0.9rem;
      font-weight: 900;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .fw-toggle-pills {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      background: #E4E4E7;
      border-bottom: 3px solid #0D0D0D;
    }
    .fw-toggle-btn {
      background: transparent;
      border: none;
      border-right: 2px solid #0D0D0D;
      padding: 0.85rem 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .fw-toggle-btn:last-child { border-right: none; }
    .fw-toggle-btn.active {
      background: #CCFF00;
      font-weight: 900;
    }

    .selected-fw-panel {
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .npm-terminal {
      background: #18181B;
      border: 2.5px solid #0D0D0D;
      border-radius: 8px;
      box-shadow: 4px 4px 0px #0D0D0D;
      overflow: hidden;
    }
    .terminal-bar {
      background: #27272A;
      padding: 0.4rem 0.85rem;
      font-size: 0.7rem;
      font-weight: 800;
      color: #A1A1AA;
      display: flex;
      justify-content: space-between;
    }
    .terminal-content {
      padding: 0.85rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
    }
    .prompt-symbol { color: #CCFF00; font-weight: 900; }
    .command-text { color: #FFFFFF; font-size: 0.95rem; font-weight: 800; flex: 1; }

    .action-row {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }
    .flex-1 { flex: 1; }

    .sticker-chip {
      display: inline-flex;
      align-items: center;
      padding: 0.35rem 0.85rem;
      font-size: 0.8rem;
      font-weight: 900;
      border: 2.5px solid #0D0D0D;
      border-radius: 999px;
      box-shadow: 3px 3px 0px #0D0D0D;
    }
    .badge-chip {
      display: inline-flex;
      align-items: center;
      padding: 0.2rem 0.55rem;
      font-size: 0.75rem;
      font-weight: 800;
      border: 2px solid #0D0D0D;
      border-radius: 4px;
      box-shadow: 2px 2px 0px #0D0D0D;
    }
  </style>
</head>
<body>
  <div class="top-announcement-bar font-mono">
    <span>⚡ CRML-UI v5.5 ECOSYSTEM ONLINE</span>
    <span class="announcement-divider">•</span>
    <span>70 PRIMITIVES ACROSS VUE 3, REACT, SVELTE & HTML5</span>
    <span class="announcement-divider">•</span>
    <span style="color: #CCFF00; font-weight: 900;">0% AMBIENT BLUR • 100% PARITY</span>
  </div>

  <header class="main-nav-header">
    <div class="brand-block">
      <div class="brand-logo-chip font-heading">
        <span class="logo-accent">CRML</span>-UI
      </div>
      <div>
        <h1 class="brand-title font-heading">MULTI-FRAMEWORK DOCUMENTATION HUB</h1>
        <span class="brand-sub font-mono">// VUE 3 • REACT 18/19 • SVELTE 5 • VANILLA HTML5</span>
      </div>
    </div>
    <div style="display: flex; gap: 0.65rem;">
      <a href="#install" class="tactile-btn variant-lime">⚡ QUICK INSTALL</a>
      <a href="https://github.com" target="_blank" class="tactile-btn variant-obsidian">★ GITHUB ↗</a>
    </div>
  </header>

  <section class="hero-section" id="install">
    <div>
      <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
        <span class="sticker-chip variant-pink">★ OFFICIAL HUB</span>
        <span class="badge-chip variant-cyan">MULTI-REPO</span>
        <span class="badge-chip variant-yellow">PARALLEL SYNC</span>
      </div>

      <h2 class="hero-heading font-heading">
        ONE SYSTEM.<br>
        <span class="hero-highlight">FOUR FRAMEWORKS.</span><br>
        ZERO BLUR.
      </h2>

      <p class="hero-description font-mono">
        Production-grade, highly tactile Neubrutalism, Y2K Cyber Mecha, and Streetwear component library.
        Pilih framework target di samping untuk <strong>menginstall via NPM dan membuka registry package</strong>, atau <strong>langsung mendownload template HTML5 mandiri</strong>.
      </p>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem;">
        <div style="background: #fff; border: 2.5px solid #0D0D0D; padding: 0.75rem; text-align: center; border-radius: 8px; box-shadow: 3px 3px 0px #0D0D0D;">
          <strong style="font-size: 1.5rem; display: block;">70</strong>
          <span style="font-size: 0.65rem; color: #71717A;">PRIMITIVES</span>
        </div>
        <div style="background: #fff; border: 2.5px solid #0D0D0D; padding: 0.75rem; text-align: center; border-radius: 8px; box-shadow: 3px 3px 0px #0D0D0D;">
          <strong style="font-size: 1.5rem; display: block;">4</strong>
          <span style="font-size: 0.65rem; color: #71717A;">FRAMEWORKS</span>
        </div>
        <div style="background: #fff; border: 2.5px solid #0D0D0D; padding: 0.75rem; text-align: center; border-radius: 8px; box-shadow: 3px 3px 0px #0D0D0D;">
          <strong style="font-size: 1.5rem; display: block;">100%</strong>
          <span style="font-size: 0.65rem; color: #71717A;">PARITY</span>
        </div>
        <div style="background: #fff; border: 2.5px solid #0D0D0D; padding: 0.75rem; text-align: center; border-radius: 8px; box-shadow: 3px 3px 0px #0D0D0D;">
          <strong style="font-size: 1.5rem; display: block;">0%</strong>
          <span style="font-size: 0.65rem; color: #71717A;">AMBIENT BLUR</span>
        </div>
      </div>
    </div>

    <!-- Framework Card -->
    <div class="distribution-header-card">
      <div class="dist-header font-heading">
        <span>📦 FRAMEWORK INSTALLER & DOWNLOAD CENTER</span>
        <span style="color: #CCFF00; font-size: 0.75rem;">● SELECT TARGET</span>
      </div>

      <div class="fw-toggle-pills">
        <button class="fw-toggle-btn active font-mono" onclick="switchTab('vue', this)">
          <span style="font-size: 1.25rem;">🟢</span>
          <span style="font-size: 0.95rem; font-weight: 900;">Vue 3</span>
          <span style="font-size: 0.65rem; color: #52525B;">MASTER REPO</span>
        </button>
        <button class="fw-toggle-btn font-mono" onclick="switchTab('react', this)">
          <span style="font-size: 1.25rem;">⚛️</span>
          <span style="font-size: 0.95rem; font-weight: 900;">React</span>
          <span style="font-size: 0.65rem; color: #52525B;">v18 / 19</span>
        </button>
        <button class="fw-toggle-btn font-mono" onclick="switchTab('svelte', this)">
          <span style="font-size: 1.25rem;">🧡</span>
          <span style="font-size: 0.95rem; font-weight: 900;">Svelte</span>
          <span style="font-size: 0.65rem; color: #52525B;">v5.0+</span>
        </button>
        <button class="fw-toggle-btn font-mono" onclick="switchTab('html', this)">
          <span style="font-size: 1.25rem;">🌐</span>
          <span style="font-size: 0.95rem; font-weight: 900;">HTML5</span>
          <span style="font-size: 0.65rem; color: #52525B;">STANDALONE</span>
        </button>
      </div>

      <!-- Panel Vue -->
      <div id="panel-vue" class="selected-fw-panel">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <span style="font-size: 0.75rem; color: #71717A; font-weight: 800;">// NPM PACKAGE // VITE LIBRARY</span>
            <h3 style="margin: 0.25rem 0 0 0; font-size: 1.5rem; font-weight: 900;">Vue 3 (crml-ui)</h3>
          </div>
          <span class="badge-chip">v0.1.0 • ESM & UMD</span>
        </div>
        <p style="margin: 0; font-size: 0.9rem; color: #52525B;">The master implementation with 70 tactile primitives, Composition API &lt;script setup lang="ts"&gt;, strict TypeScript types, and deep slot customizability.</p>
        <div class="npm-terminal font-mono">
          <div class="terminal-bar"><span>TERMINAL INSTALL COMMAND</span><span>● ● ●</span></div>
          <div class="terminal-content">
            <span class="prompt-symbol">$</span>
            <code class="command-text" id="cmd-vue">npm install crml-ui</code>
            <button class="tactile-btn variant-lime" style="padding: 0.25rem 0.65rem; font-size: 0.75rem;" onclick="copyVal('cmd-vue')">📋 COPY</button>
          </div>
        </div>
        <div class="action-row">
          <a href="https://www.npmjs.com/package/crml-ui" target="_blank" class="tactile-btn variant-pink flex-1">🚀 BUKA HALAMAN NPM (crml-ui) ↗</a>
        </div>
      </div>

      <!-- Panel React -->
      <div id="panel-react" class="selected-fw-panel" style="display: none;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <span style="font-size: 0.75rem; color: #71717A; font-weight: 800;">// NPM PACKAGE // REACT 18/19</span>
            <h3 style="margin: 0.25rem 0 0 0; font-size: 1.5rem; font-weight: 900;">React (crml-ui-react)</h3>
          </div>
          <span class="badge-chip">v0.1.0 • TSX BUNDLE</span>
        </div>
        <p style="margin: 0; font-size: 0.9rem; color: #52525B;">Fully typed React TSX components with identical tactile spring rebound physics, 0% ambient blur, and props parity for Next.js, Remix, and Vite.</p>
        <div class="npm-terminal font-mono">
          <div class="terminal-bar"><span>TERMINAL INSTALL COMMAND</span><span>● ● ●</span></div>
          <div class="terminal-content">
            <span class="prompt-symbol">$</span>
            <code class="command-text" id="cmd-react">npm install crml-ui-react</code>
            <button class="tactile-btn variant-lime" style="padding: 0.25rem 0.65rem; font-size: 0.75rem;" onclick="copyVal('cmd-react')">📋 COPY</button>
          </div>
        </div>
        <div class="action-row">
          <a href="https://www.npmjs.com/package/crml-ui-react" target="_blank" class="tactile-btn variant-pink flex-1">🚀 BUKA HALAMAN NPM (crml-ui-react) ↗</a>
        </div>
      </div>

      <!-- Panel Svelte -->
      <div id="panel-svelte" class="selected-fw-panel" style="display: none;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <span style="font-size: 0.75rem; color: #71717A; font-weight: 800;">// NPM PACKAGE // SVELTE 4/5</span>
            <h3 style="margin: 0.25rem 0 0 0; font-size: 1.5rem; font-weight: 900;">Svelte (crml-ui-svelte)</h3>
          </div>
          <span class="badge-chip">v0.1.0 • SVELTE KIT</span>
        </div>
        <p style="margin: 0; font-size: 0.9rem; color: #52525B;">High-performance reactive components for Svelte 4 and Svelte 5 with native slots, event forwarding, and identical Neubrutal styling.</p>
        <div class="npm-terminal font-mono">
          <div class="terminal-bar"><span>TERMINAL INSTALL COMMAND</span><span>● ● ●</span></div>
          <div class="terminal-content">
            <span class="prompt-symbol">$</span>
            <code class="command-text" id="cmd-svelte">npm install crml-ui-svelte</code>
            <button class="tactile-btn variant-lime" style="padding: 0.25rem 0.65rem; font-size: 0.75rem;" onclick="copyVal('cmd-svelte')">📋 COPY</button>
          </div>
        </div>
        <div class="action-row">
          <a href="https://www.npmjs.com/package/crml-ui-svelte" target="_blank" class="tactile-btn variant-pink flex-1">🚀 BUKA HALAMAN NPM (crml-ui-svelte) ↗</a>
        </div>
      </div>

      <!-- Panel HTML5 -->
      <div id="panel-html" class="selected-fw-panel" style="display: none;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <span style="font-size: 0.75rem; color: #71717A; font-weight: 800;">// STANDALONE TEMPLATE KIT</span>
            <h3 style="margin: 0.25rem 0 0 0; font-size: 1.5rem; font-weight: 900;">Vanilla HTML5 & CSS</h3>
          </div>
          <span class="badge-chip">ZERO DEPENDENCY</span>
        </div>
        <p style="margin: 0; font-size: 0.9rem; color: #52525B;">Zero-dependency standalone HTML5 starter template, universal CSS classes (.crml-btn, .crml-card, .crml-badge), and vanilla tactile JS physics for any tech stack.</p>
        <div class="action-row">
          <button class="tactile-btn variant-lime flex-1" onclick="downloadHtmlTemplate()">💾 DOWNLOAD STARTER TEMPLATE (.HTML) ⬇</button>
          <button class="tactile-btn variant-yellow flex-1" onclick="downloadCssTokens()">🎨 DOWNLOAD CSS TOKENS (.CSS) ⬇</button>
        </div>
      </div>
    </div>
  </section>

  <script>
    function switchTab(id, btn) {
      document.querySelectorAll('.fw-toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      ['vue', 'react', 'svelte', 'html'].forEach(f => {
        document.getElementById('panel-' + f).style.display = (f === id ? 'flex' : 'none');
      });
    }

    function copyVal(id) {
      const text = document.getElementById(id).innerText;
      navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard: ' + text));
    }

    function downloadHtmlTemplate() {
      const content = '<!DOCTYPE html>\\n<html>\\n<head>\\n  <title>CRML-UI HTML5</title>\\n  <style>body { font-family: sans-serif; padding: 2rem; background: #fafafa; } .crml-btn { padding: 0.75rem 1.5rem; font-weight: bold; background: #CCFF00; border: 3px solid #0D0D0D; box-shadow: 4px 4px 0px #0D0D0D; cursor: pointer; }</style>\\n</head>\\n<body>\\n  <h1>CRML-UI HTML5 Starter</h1>\\n  <button class="crml-btn">TACTILE BUTTON</button>\\n</body>\\n</html>';
      const blob = new Blob([content], { type: 'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'crml-ui-starter.html';
      a.click();
    }

    function downloadCssTokens() {
      const content = ':root { --crt-electric-lime: #CCFF00; --crt-hot-pink: #FF007F; --crt-cyber-cyan: #00F0FF; --crt-sunburst-yellow: #FFD600; --crt-obsidian: #0D0D0D; }';
      const blob = new Blob([content], { type: 'text/css' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'crml-tokens.css';
      a.click();
    }
  </script>
</body>
</html>
`

fs.writeFileSync(path.resolve(DASHBOARD_DIR, 'standalone.html'), htmlContent, 'utf-8')
console.log('✅ Generated standalone.html in crml-ui-dashboard!')
