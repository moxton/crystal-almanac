/**
 * IndexNow - Instantly notify Bing, Yandex, Naver, Seznam of new/updated URLs.
 * Run after any deploy: node scripts/indexnow.js
 *
 * Options:
 *   node scripts/indexnow.js                  # Submit all URLs from sitemap
 *   node scripts/indexnow.js /crystals/ruby   # Submit specific URL(s)
 */

const KEY = "70ffdcf30875f09c2711f7b14c1b2214";
const HOST = "https://crystalalmanac.com";

async function main() {
  const args = process.argv.slice(2);
  let urls;

  if (args.length > 0) {
    // Submit specific URLs passed as arguments
    urls = args.map((path) => path.startsWith("http") ? path : `${HOST}${path}`);
  } else {
    // Fetch all URLs from sitemap
    const res = await fetch(`${HOST}/sitemap.xml`);
    const xml = await res.text();
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  }

  console.log(`Submitting ${urls.length} URLs to IndexNow...`);

  // IndexNow works best with smaller batches
  const batchSize = 100;
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const r = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: HOST.replace("https://", ""),
        key: KEY,
        keyLocation: `${HOST}/${KEY}.txt`,
        urlList: batch,
      }),
    });
    console.log(`Batch ${Math.floor(i / batchSize) + 1}: ${r.status} ${r.ok ? "OK" : "FAILED"}`);
    if (i + batchSize < urls.length) await new Promise((r) => setTimeout(r, 5000));
  }

  console.log("Done.");
}

main();
