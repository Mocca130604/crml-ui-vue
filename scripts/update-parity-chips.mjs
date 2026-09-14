import fs from 'fs';

const files = [
  'C:/Code/crml-ui-dashboard/src/App.vue',
  'C:/Code/crml-ui/playground/StandaloneDashboard.vue'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Replace parity row cells with CrmlBadge
  const oldRowRegex = /<td><span class="cat-pill-tag">\{\{\s*item\.category\s*\}\}<\/span><\/td>\s*<td><span class="check-pill vue-tag">[^<]*<\/span><\/td>\s*<td><span class="check-pill react-tag">[^<]*<\/span><\/td>\s*<td><span class="check-pill svelte-tag">[^<]*<\/span><\/td>\s*<td><span class="check-pill html-tag">[^<]*<\/span><\/td>\s*<td><span class="status-btn">[^<]*<\/span><\/td>/;

  const newRowReplacement = `<td>
                    <CrmlBadge variant="neutral" size="sm">{{ item.category }}</CrmlBadge>
                  </td>
                  <td>
                    <CrmlBadge variant="lime" size="sm">✓ VUE 3</CrmlBadge>
                  </td>
                  <td>
                    <CrmlBadge variant="cyan" size="sm">✓ TSX</CrmlBadge>
                  </td>
                  <td>
                    <CrmlBadge variant="pink" size="sm">✓ SVELTE</CrmlBadge>
                  </td>
                  <td>
                    <CrmlBadge variant="yellow" size="sm">✓ HTML5</CrmlBadge>
                  </td>
                  <td>
                    <CrmlBadge variant="lime" size="sm" clickable>100% DOKUMENTASI ↗</CrmlBadge>
                  </td>`;

  if (oldRowRegex.test(content)) {
    content = content.replace(oldRowRegex, newRowReplacement);
    console.log('Parity row replaced with CrmlBadge in:', file);
  } else {
    console.log('Regex did not match directly in:', file, 'trying line replacement');
    // Fallback line search
    const lines = content.split('\n');
    let replaced = false;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('class="cat-pill-tag"')) {
        lines.splice(i, 6, 
          '                  <td><CrmlBadge variant="neutral" size="sm">{{ item.category }}</CrmlBadge></td>',
          '                  <td><CrmlBadge variant="lime" size="sm">✓ VUE 3</CrmlBadge></td>',
          '                  <td><CrmlBadge variant="cyan" size="sm">✓ TSX</CrmlBadge></td>',
          '                  <td><CrmlBadge variant="pink" size="sm">✓ SVELTE</CrmlBadge></td>',
          '                  <td><CrmlBadge variant="yellow" size="sm">✓ HTML5</CrmlBadge></td>',
          '                  <td><CrmlBadge variant="lime" size="sm" clickable>100% PARITY ↗</CrmlBadge></td>'
        );
        replaced = true;
        break;
      }
    }
    if (replaced) {
      content = lines.join('\n');
      console.log('Replaced via lines in:', file);
    }
  }

  fs.writeFileSync(file, content, 'utf8');
}
