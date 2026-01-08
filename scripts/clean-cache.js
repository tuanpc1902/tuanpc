#!/usr/bin/env node

/**
 * Script to clean cache directories after build
 * Removes cache directories that shouldn't be deployed
 */

const fs = require('fs');
const path = require('path');

const cacheDirs = [
  'cache',
  '.vite',
  'node_modules/.cache',
  'dist',
];

let cleaned = false;

cacheDirs.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (fs.existsSync(fullPath)) {
    try {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`✓ Removed ${dir}`);
      cleaned = true;
    } catch (error) {
      console.warn(`⚠ Could not remove ${dir}:`, error.message);
    }
  }
});

if (!cleaned) {
  console.log('✓ No cache directories found to clean');
}
