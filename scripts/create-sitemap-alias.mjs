import { access, copyFile, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const dist = resolve('dist');
const generatedIndex = resolve(dist, 'sitemap-index.xml');
const publicAlias = resolve(dist, 'sitemap.xml');

await access(generatedIndex);
const indexXml = await readFile(generatedIndex, 'utf8');
const childLocations = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

if (childLocations.length === 1) {
  const childName = new URL(childLocations[0]).pathname.split('/').pop();
  if (!childName) throw new Error('The generated sitemap child URL has no filename.');
  const childPath = resolve(dist, childName);
  await access(childPath);
  await copyFile(childPath, publicAlias);
  console.log(`Created /sitemap.xml as a direct URL sitemap from ${childName}.`);
} else {
  await writeFile(publicAlias, indexXml, 'utf8');
  console.log(`Created /sitemap.xml as a sitemap index with ${childLocations.length} child sitemaps.`);
}
