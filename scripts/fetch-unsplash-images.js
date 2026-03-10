#!/usr/bin/env node

/**
 * Crystal Almanac - Unsplash Image Finder
 * 
 * Run from the crystal-almanac project folder:
 *   node scripts/fetch-unsplash-images.js
 *
 * Output: ~/Downloads/crystal-images.csv
 * Auto-resumes. Auto-waits on rate limit. Ctrl+C safe.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const ACCESS_KEY = 'IMAZrUxCyRIrng9vcCheZbje-hjpUJq6BQm5t4zvVoc';
const OUTPUT_FILE = path.join(os.homedir(), 'Downloads', 'crystal-images.csv');
const CRYSTALS_FILE = path.join(process.cwd(), 'app', 'data', 'crystals.json');
const RESULTS_PER_CRYSTAL = 3;
const DELAY_MS = 1200;

const CSV_HEADER = 'crystal_id,crystal_name,rank,image_url_regular,image_url_small,image_url_raw,width,height,photographer,photographer_url,unsplash_link,description,download_url';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function esc(str) {
  if (!str) return '';
  str = String(str);
  return (str.includes(',') || str.includes('"') || str.includes('\n'))
    ? `"${str.replace(/"/g, '""')}"` : str;
}

function getCompletedIds() {
  if (!fs.existsSync(OUTPUT_FILE)) return new Set();
  const lines = fs.readFileSync(OUTPUT_FILE, 'utf-8').split('\n').slice(1);
  const ids = new Set();
  for (const line of lines) {
    if (line.trim()) ids.add(line.split(',')[0].replace(/"/g, ''));
  }
  return ids;
}

function appendRows(rows) {
  const needsHeader = !fs.existsSync(OUTPUT_FILE) || fs.readFileSync(OUTPUT_FILE, 'utf-8').trim() === '';
  fs.appendFileSync(OUTPUT_FILE, (needsHeader ? CSV_HEADER + '\n' : '') + rows.join('\n') + '\n');
}

async function searchUnsplash(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${RESULTS_PER_CRYSTAL}&orientation=landscape&content_filter=high`;
  const res = await fetch(url, {
    headers: { 'Authorization': `Client-ID ${ACCESS_KEY}`, 'Accept-Version': 'v1' }
  });
  const remaining = res.headers.get('x-ratelimit-remaining');
  if (remaining !== null) process.stdout.write(`[${remaining} left] `);
  if (res.status === 403 || res.status === 429) {
    return { rateLimited: true, resetTime: parseInt(res.headers.get('x-ratelimit-reset') || '0') };
  }
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return { results: (await res.json()).results || [], rateLimited: false };
}

async function searchWithFallback(crystal) {
  const queries = [`${crystal.name} crystal`, `${crystal.name} mineral`, `${crystal.name} gemstone`, crystal.name];
  for (const q of queries) {
    const r = await searchUnsplash(q);
    if (r.rateLimited) return r;
    if (r.results.length > 0) return r;
    await sleep(DELAY_MS);
  }
  return { results: [], rateLimited: false };
}

function photoRow(id, name, rank, p) {
  return [esc(id), esc(name), rank, esc(p.urls?.regular), esc(p.urls?.small), esc(p.urls?.raw),
    p.width || '', p.height || '', esc(p.user?.name), esc(p.user?.links?.html),
    esc(p.links?.html), esc(p.description || p.alt_description), esc(p.links?.download)].join(',');
}

async function main() {
  if (process.argv.includes('--reset') && fs.existsSync(OUTPUT_FILE)) {
    fs.unlinkSync(OUTPUT_FILE);
    console.log('Cleared previous results.\n');
  }

  if (!fs.existsSync(CRYSTALS_FILE)) {
    console.error(`Can't find crystals.json at: ${CRYSTALS_FILE}`);
    console.error('Run this from the crystal-almanac project folder:');
    console.error('  cd ~/Downloads/crystal-almanac && node scripts/fetch-unsplash-images.js');
    process.exit(1);
  }

  const crystals = JSON.parse(fs.readFileSync(CRYSTALS_FILE, 'utf-8'));
  const done = getCompletedIds();
  const todo = crystals.filter(c => !done.has(c.id));

  console.log(`Total: ${crystals.length} | Done: ${done.size} | Remaining: ${todo.length}`);
  console.log(`Output: ${OUTPUT_FILE}\n`);
  if (!todo.length) { console.log('All done! Use --reset to redo.'); return; }

  let found = 0, missed = 0, missList = [];

  for (let i = 0; i < todo.length; i++) {
    const c = todo[i];
    const globalIndex = crystals.indexOf(c) + 1;
    process.stdout.write(`[${globalIndex}/${crystals.length}] ${c.name}... `);

    const r = await searchWithFallback(c);

    if (r.rateLimited) {
      const waitMs = r.resetTime ? Math.max((r.resetTime * 1000) - Date.now() + 5000, 60000) : 3600000;
      console.log(`\n\n--- RATE LIMITED ---`);
      console.log(`Waiting ${Math.ceil(waitMs / 60000)} min. Progress saved. Ctrl+C to quit and re-run later.\n`);
      await sleep(waitMs);
      i--;
      continue;
    }

    if (!r.results.length) {
      missed++;
      missList.push(c.name);
      appendRows([[esc(c.id), esc(c.name), 1, 'NO_RESULTS', '', '', '', '', '', '', '', '', ''].join(',')]);
      console.log('no results');
    } else {
      found++;
      appendRows(r.results.slice(0, RESULTS_PER_CRYSTAL).map((p, j) => photoRow(c.id, c.name, j + 1, p)));
      console.log(`${r.results.length} images`);
    }
    await sleep(DELAY_MS);
  }

  console.log(`\n--- DONE ---`);
  console.log(`File: ${OUTPUT_FILE}`);
  console.log(`Found: ${found} | No results: ${missed}`);
  if (missList.length) console.log(`Missing: ${missList.join(', ')}`);
  console.log(`\nUnsplash requires photographer attribution: unsplash.com/license`);
}

main().catch(e => {
  console.error(`\nError: ${e.message}\nProgress saved at ${OUTPUT_FILE}. Re-run to resume.`);
  process.exit(1);
});
