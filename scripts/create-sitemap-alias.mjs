import { access, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const dist = resolve('dist');
const generatedIndex = resolve(dist, 'sitemap-index.xml');
const publicAlias = resolve(dist, 'sitemap.xml');

await access(generatedIndex);
await copyFile(generatedIndex, publicAlias);
console.log('Created /sitemap.xml as the canonical sitemap index alias.');
