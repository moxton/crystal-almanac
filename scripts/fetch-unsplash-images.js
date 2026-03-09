#!/usr/bin/env node

/**
 * Crystal Almanac - Unsplash Image Finder
 * 
 * Searches Unsplash for images of each crystal in crystals.json
 * and outputs a CSV with crystal ID, name, image URL, photographer, and Unsplash link.
 *
 * Usage:
 *   UNSPLASH_ACCESS_KEY=your_key_here node scripts/fetch-unsplash-images.js
 *
 * Or set the key below directly.
 */

const fs = require('fs');
const path = require('path');

// ---------- CONFIG ----------
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'IMAZrUxCyRIrng9vcCheZbje-hjpUJq6BQm5t4zvVoc';
const OUTPUT_FILE = path.join(__dirname, '..', 'crystal-images.csv');
const CRYSTALS_FILE = path.join(__dirname, '..', 'app', 'data', 'crystals.json');
const RESULTS_PER_CRYSTAL = 3;       // top N images per crystal
const DELAY_MS = 200;                 // delay between requests (Unsplash rate limit: 50/hr on demo, 5000/hr on production)
// ----------------------------

async function searchUnsplash(query, perPage = 3) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape&content_filter=high`;
  
  const res = await fetch(url, {
    headers: {
      'Authorization': `Client-ID ${ACCESS_KEY}`,
      'Accept-Version': 'v1'
    }
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Unsplash API error ${res.status}: ${errorBody}`);
  }

  const data = await res.json();
  return data.results || [];
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function escapeCsv(str) {
  if (!str) return '';
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

async function main() {
  if (!ACCESS_KEY || ACCESS_KEY === 'YOUR_KEY_HERE') {
    console.error('ERROR: Set your Unsplash API key via UNSPLASH_ACCESS_KEY env variable.');
    console.error('  UNSPLASH_ACCESS_KEY=abc123 node scripts/fetch-unsplash-images.js');
    process.exit(1);
  }

  // Load crystals
  const crystals = JSON.parse(fs.readFileSync(CRYSTALS_FILE, 'utf-8'));
  console.log(`Loaded ${crystals.length} crystals from crystals.json`);

  // CSV header
  const rows = [
    ['crystal_id', 'crystal_name', 'rank', 'image_url_regular', 'image_url_small', 'image_url_raw', 'width', 'height', 'photographer', 'photographer_url', 'unsplash_link', 'description', 'download_url'].join(',')
  ];

  let successCount = 0;
  let noResultCount = 0;
  const noResults = [];

  for (let i = 0; i < crystals.length; i++) {
    const crystal = crystals[i];
    const searchTerms = [
      `${crystal.name} crystal`,
      `${crystal.name} mineral`,
      `${crystal.name} gemstone`
    ];

    console.log(`[${i + 1}/${crystals.length}] Searching: ${crystal.name}...`);

    let allResults = [];

    // Try primary search term first
    try {
      const results = await searchUnsplash(searchTerms[0], RESULTS_PER_CRYSTAL);
      allResults = results;
    } catch (err) {
      console.error(`  Error searching "${searchTerms[0]}": ${err.message}`);
    }

    // If no results, try alternate terms
    if (allResults.length === 0) {
      await sleep(DELAY_MS);
      try {
        const results = await searchUnsplash(searchTerms[1], RESULTS_PER_CRYSTAL);
        allResults = results;
      } catch (err) {
        console.error(`  Error searching "${searchTerms[1]}": ${err.message}`);
      }
    }

    if (allResults.length === 0) {
      await sleep(DELAY_MS);
      try {
        const results = await searchUnsplash(searchTerms[2], RESULTS_PER_CRYSTAL);
        allResults = results;
      } catch (err) {
        console.error(`  Error searching "${searchTerms[2]}": ${err.message}`);
      }
    }

    if (allResults.length === 0) {
      // Last resort: just the name
      await sleep(DELAY_MS);
      try {
        const results = await searchUnsplash(crystal.name, RESULTS_PER_CRYSTAL);
        allResults = results;
      } catch (err) {
        console.error(`  Error searching "${crystal.name}": ${err.message}`);
      }
    }

    if (allResults.length === 0) {
      noResultCount++;
      noResults.push(crystal.name);
      console.log(`  No results found for ${crystal.name}`);
      // Add empty row so we know it's missing
      rows.push([
        escapeCsv(crystal.id),
        escapeCsv(crystal.name),
        '1',
        'NO_RESULTS',
        '', '', '', '', '', '', '', '', ''
      ].join(','));
    } else {
      successCount++;
      allResults.slice(0, RESULTS_PER_CRYSTAL).forEach((photo, rank) => {
        rows.push([
          escapeCsv(crystal.id),
          escapeCsv(crystal.name),
          String(rank + 1),
          escapeCsv(photo.urls?.regular || ''),
          escapeCsv(photo.urls?.small || ''),
          escapeCsv(photo.urls?.raw || ''),
          String(photo.width || ''),
          String(photo.height || ''),
          escapeCsv(photo.user?.name || ''),
          escapeCsv(photo.user?.links?.html || ''),
          escapeCsv(photo.links?.html || ''),
          escapeCsv(photo.description || photo.alt_description || ''),
          escapeCsv(photo.links?.download || '')
        ].join(','));
      });
      console.log(`  Found ${allResults.length} images`);
    }

    await sleep(DELAY_MS);
  }

  // Write CSV
  fs.writeFileSync(OUTPUT_FILE, rows.join('\n'), 'utf-8');

  console.log('\n--- DONE ---');
  console.log(`Results written to: ${OUTPUT_FILE}`);
  console.log(`Crystals with images: ${successCount}`);
  console.log(`Crystals with no results: ${noResultCount}`);
  if (noResults.length > 0) {
    console.log(`Missing: ${noResults.join(', ')}`);
  }
  console.log(`\nRemember: Unsplash requires attribution. Include photographer credit when using images.`);
  console.log(`Guidelines: https://unsplash.com/license`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
