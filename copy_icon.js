const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\Qadri Laptop\\.gemini\\antigravity\\brain\\bf3afd2e-32eb-49a3-8e09-01801fd6fcc4\\fastcv_premium_favicon_1780260591319.png';
const baseDir = 'c:\\Users\\Qadri Laptop\\Downloads\\fastcvpk';

const targets = [
  'public/logo.png',
  'public/icon-192x192.png',
  'public/icon-512x512.png',
  'public/apple-touch-icon.png',
  'public/favicon-32x32.png',
  'public/favicon-16x16.png',
  'public/favicon.ico',
  'app/icon.png',
  'app/favicon.ico'
];

targets.forEach(target => {
  const dest = path.join(baseDir, target);
  fs.copyFileSync(src, dest);
  console.log('Copied to', dest);
});
