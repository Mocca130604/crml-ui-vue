import fs from 'fs';

const files = [
  'C:/Code/crml-ui-dashboard/src/App.vue',
  'C:/Code/crml-ui/playground/StandaloneDashboard.vue'
];

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.log('Skipping (not found):', file);
    continue;
  }
  let content = fs.readFileSync(file, 'utf8');

  // 1. Update CrmlNavbar props
  content = content.replace(
    /@search-click="scrollToSection\('catalog'\)"\s*@action-click="scrollToSection\('install'\)"/,
    `action-text="☕ BUY ME A COFFEE"\n        action-href="https://buymeacoffee.com/crml"\n        @search-click="scrollToSection('catalog')"`
  );

  // 2. Update hero action buttons
  const heroBtnRegex = /(<div class="hero-action-buttons">[\s\S]*?)(<\/div>)/;
  content = content.replace(heroBtnRegex, (match, p1, p2) => {
    if (p1.includes('buymeacoffee.com/crml')) return match;
    return `${p1}  <a href="https://buymeacoffee.com/crml" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">\n              <CrmlBouncyButton variant="yellow" size="lg">\n                ☕ BUY ME A COFFEE\n              </CrmlBouncyButton>\n            </a>\n          ${p2}`;
  });

  // 3. Update footer badges
  const footerBadgesRegex = /(<div class="footer-badges">)/;
  content = content.replace(footerBadgesRegex, (match) => {
    if (content.includes('footer-badges') && content.includes('☕ BUY ME A COFFEE</CrmlBadge>')) return match;
    return `${match}\n          <a href="https://buymeacoffee.com/crml" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">\n            <CrmlBadge variant="warning">☕ BUY ME A COFFEE</CrmlBadge>\n          </a>`;
  });

  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully updated:', file);
}
