const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\Qadri Laptop\\.gemini\\antigravity\\brain\\1446d50a-468a-4fe5-8f77-fbd8d837e5ba\\fastcv_modern_icon_1779711756719.png';
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
