const key = process.env.INDEXNOW_KEY;
const rawUrls = process.env.INDEXNOW_URLS ?? '';
const urls = rawUrls.split(',').map((url) => url.trim()).filter(Boolean);
const origin = (process.env.SITE_ORIGIN ?? 'https://jichangzhan.com').replace(/\/$/, '');
const host = new URL(origin).host;

if (!key || !/^[A-Za-z0-9-]{8,128}$/.test(key)) {
  throw new Error('Set INDEXNOW_KEY to the same key used by the public verification file.');
}
if (!urls.length) throw new Error('Set INDEXNOW_URLS to a comma-separated list of published canonical URLs.');

for (const value of urls) {
  const url = new URL(value);
  if (url.origin !== origin || url.search || url.hash) {
    throw new Error(`Only canonical URLs on ${origin} without query or fragment are accepted: ${value}`);
  }
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `${origin}/${key}.txt`, urlList: urls }),
});

if (!response.ok) {
  const body = await response.text();
  throw new Error(`IndexNow returned HTTP ${response.status}: ${body.slice(0, 500)}`);
}
console.log(`IndexNow accepted ${urls.length} URL(s). Submission does not guarantee crawling or indexing.`);
