import fs from 'fs';

const files = [
  'C:/Code/crml-ui-dashboard/src/App.vue',
  'C:/Code/crml-ui/playground/StandaloneDashboard.vue'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Fix info-top-row and h2 placement
  const searchBlock = /<div class="info-top-row">[\s\S]*?<\/div>\s*<\/div>\s*<!-- Component Title on its own line -->[\s\S]*?<\/h2>\s*<\/div>/;

  const correctBlock = `<div class="info-top-row">
                  <div class="info-badges-row">
                    <CrmlStickerBadge variant="pink" tilt="none">{{ activeComp.category.toUpperCase() }}</CrmlStickerBadge>
                    <CrmlBadge variant="primary">{{ activeComp.type.toUpperCase() }}</CrmlBadge>
                    <CrmlBadge variant="warning">0% AMBIENT BLUR</CrmlBadge>
                    <CrmlBadge variant="success">SPRING REBOUND</CrmlBadge>
                  </div>

                  <!-- Code Target Switcher -->
                  <div class="code-target-box font-mono">
                    <span class="target-title">CODE TARGET:</span>
                    <div class="target-btn-group">
                      <button
                        v-for="fw in (['vue', 'react', 'svelte', 'html'] as const)"
                        :key="fw"
                        class="target-btn"
                        :class="{ active: activeFw === fw }"
                        @click="activeFw = fw"
                      >
                        {{ fw.toUpperCase() }}
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Component Title on its own line -->
                <h2 class="active-comp-title font-heading">
                  <span class="active-comp-icon">{{ activeComp.icon }}</span> {{ activeComp.name }}
                </h2>`;

  if (searchBlock.test(content)) {
    content = content.replace(searchBlock, correctBlock);
    console.log('Fixed block in:', file);
  } else {
    // Try regex that captures info-top-row up to info-desc-box
    const broaderSearch = /<div class="comp-info-card">\s*<div class="info-top-row">[\s\S]*?(?=<div class="info-desc-box)/;
    const broaderReplace = `<div class="comp-info-card">\n                ` + correctBlock + `\n\n                `;
    if (broaderSearch.test(content)) {
      content = content.replace(broaderSearch, broaderReplace);
      console.log('Fixed broader block in:', file);
    } else {
      console.log('Did not match in:', file);
    }
  }

  fs.writeFileSync(file, content, 'utf8');
}
