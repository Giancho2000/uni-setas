// Copies dist/index.html to dist/404.html so GitHub Pages serves the SPA on deep links.
import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve(import.meta.dirname, '..', 'dist');
const source = resolve(dist, 'index.html');

if (!existsSync(source)) {
  console.error('dist/index.html not found. Run the build first.');
  process.exit(1);
}

copyFileSync(source, resolve(dist, '404.html'));
console.log('Created dist/404.html');
