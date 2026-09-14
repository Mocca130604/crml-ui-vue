import fs from 'fs';

const files = [
  'C:/Code/crml-ui-dashboard/src/App.vue',
  'C:/Code/crml-ui/playground/StandaloneDashboard.vue'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // 1. Toast message
  content = content.replace(
    'message="70 Primitives aktif di port 7171 dengan dukungan Cloudflare Tunnel (ui.crml.my.id)!"',
    'message="Semua 70 tactile primitives aktif dengan 100% keselarasan props dan tactile physics!"'
  );

  // 2. Remove PORT 7171 READY and CLOUDFLARE TUNNEL badges
  content = content.replace(
    /<CrmlBadge variant="success">PORT 7171 READY<\/CrmlBadge>/g,
    '<CrmlBadge variant="success">PRODUCTION READY</CrmlBadge>'
  );
  content = content.replace(
    /\s*<CrmlBadge variant="primary">CLOUDFLARE TUNNEL \(ui\.crml\.my\.id\)<\/CrmlBadge>/g,
    ''
  );

  // 3. Remove local path in footer
  content = content.replace(
    'Independent Dashboard & Documentation Website at C:\\Code\\crml-ui-dashboard',
    'Unified Documentation Hub & Component Playground'
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log('Cleaned:', file);
}
