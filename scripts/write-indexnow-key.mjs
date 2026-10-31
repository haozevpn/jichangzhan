import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const key = process.env.INDEXNOW_KEY;
if (!key || !/^[A-Za-z0-9-]{8,128}$/.test(key)) {
  throw new Error('Set INDEXNOW_KEY to a privately generated 8–128 character alphanumeric key.');
}

const publicDir = resolve('public');
await mkdir(publicDir, { recursive: true });
await writeFile(resolve(publicDir, `${key}.txt`), key, { encoding: 'utf8', flag: 'w' });
console.log(`Created the public IndexNow verification file for ${key.length} characters. The generated key file is git-ignored.`);
