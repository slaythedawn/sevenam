/* Tells Bing (and Yandex, Seznam, Naver) that URLs changed, without waiting for
   a crawl to come around.

     node tools/indexnow.js                 every URL in sitemap.xml
     node tools/indexnow.js /pricing /about just these

   Bing removed its bulk URL submission page; IndexNow is what replaced it. The
   protocol is a single POST — no SDK, no auth header, no dependency, which is
   why this fits here.

   Ownership is proved by KEY_FILE being fetchable at the site root. That file is
   public by design and is in this repository on purpose: the key's only job is
   to be readable by anyone, so publishing it exposes nothing. The worst anyone
   can do with it is ask Bing to recrawl pages that are already public.

   Run it after a deploy, not before — IndexNow tells search engines to come and
   look now, so the change has to already be live or they will re-read the old
   page and you will have spent the quota for nothing. */

const fs = require('fs');
const path = require('path');

const HOST = 'sevenam.com.au';
const KEY = '7dda69eb31274ca1af96731e66389ffa';
const KEY_FILE = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

const ROOT = path.join(__dirname, '..');

function fromSitemap() {
  const xml = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

/* Accepts "/pricing", "pricing" or a full URL, so the argument can be copied
   from a sitemap, a browser bar or a slug list without thinking about it. */
function normalise(arg) {
  if (arg.startsWith('http')) return arg;
  return `https://${HOST}/${arg.replace(/^\//, '')}`;
}

async function main() {
  const args = process.argv.slice(2);
  const urls = args.length ? args.map(normalise) : fromSitemap();

  const foreign = urls.filter((u) => !u.startsWith(`https://${HOST}/`));
  if (foreign.length) {
    console.error(`refusing to submit ${foreign.length} URL(s) not on ${HOST}:`);
    foreign.forEach((u) => console.error('  ' + u));
    process.exit(1);
  }

  /* The protocol caps a single request at 10,000. We are two orders of
     magnitude below that, so one request is always enough — but say so rather
     than silently truncating if that ever stops being true. */
  if (urls.length > 10000) {
    console.error(`${urls.length} URLs exceeds the 10,000 per-request limit`);
    process.exit(1);
  }

  console.log(`submitting ${urls.length} URL(s) to IndexNow as ${HOST}`);

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_FILE, urlList: urls }),
  });

  /* IndexNow returns an empty body, so the status code is the whole answer.
     These are the ones worth naming — the rest fall through with their code. */
  const meaning = {
    200: 'accepted',
    202: 'accepted — key still being validated, which is normal on a first run',
    400: 'bad request: the JSON or the URL list was malformed',
    403: `key rejected: check ${KEY_FILE} is live and contains exactly the key`,
    422: `URLs did not match host ${HOST}, or the key does not match the host`,
    429: 'rate limited: too many submissions, try again later',
  }[res.status];

  console.log(`${res.status} ${meaning || res.statusText}`);
  if (res.status !== 200 && res.status !== 202) process.exit(1);
}

main().catch((err) => {
  console.error('indexnow failed:', err && err.message);
  process.exit(1);
});
