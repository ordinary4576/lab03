const fs = require('fs');
const path = require('path');

const distBrowserDir = path.join(__dirname, '..', 'dist', 'lab03', 'browser');
const src = path.join(distBrowserDir, 'index.html');
const dest = path.join(distBrowserDir, '404.html');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('✓ Successfully created 404.html fallback for GitHub Pages SPA routing at:', dest);
} else {
  console.error('✗ Error: Source file not found at:', src);
  process.exit(1);
}
