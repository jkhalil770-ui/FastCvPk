const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\Qadri Laptop\\.gemini\\antigravity\\brain\\1446d50a-468a-4fe5-8f77-fbd8d837e5ba\\media__1779712470918.jpg';
const baseDir = 'c:\\Users\\Qadri Laptop\\Downloads\\fastcvpk';

// ICO Generation Helper Function (generates a valid multi-resolution Windows ICO file containing PNGs)
function createIco(pngBuffers, sizes) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Icon Type (1 for ICO)
  header.writeUInt16LE(pngBuffers.length, 4); // Number of images

  const directories = [];
  let currentOffset = 6 + 16 * pngBuffers.length;

  for (let i = 0; i < pngBuffers.length; i++) {
    const buf = pngBuffers[i];
    const size = sizes[i];
    
    const dir = Buffer.alloc(16);
    dir.writeUInt8(size >= 256 ? 0 : size, 0); // Width
    dir.writeUInt8(size >= 256 ? 0 : size, 1); // Height
    dir.writeUInt8(0, 2); // Palette
    dir.writeUInt8(0, 3); // Reserved
    dir.writeUInt16LE(1, 4); // Color planes
    dir.writeUInt16LE(32, 6); // Bits per pixel (32-bit color depth)
    dir.writeUInt32LE(buf.length, 8); // PNG size
    dir.writeUInt32LE(currentOffset, 12); // Offset
    
    directories.push(dir);
    currentOffset += buf.length;
  }

  return Buffer.concat([header, ...directories, ...pngBuffers]);
}

async function run() {
  console.log('--- STARTING FAVICON & BRANDING ICON GENERATION ---');
  if (!fs.existsSync(src)) {
    console.error(`ERROR: Source image not found at ${src}`);
    process.exit(1);
  }

  const stats = fs.statSync(src);
  console.log(`Source image confirmed. Size: ${stats.size} bytes`);

  // Load source image
  console.log('Loading image using Jimp...');
  const image = await Jimp.read(src);
  console.log(`Successfully loaded image. Dimensions: ${image.width}x${image.height}`);

  // 1. Generate PNG targets
  const targets = [
    { name: 'public/logo.png', size: 512 },
    { name: 'public/icon-192x192.png', size: 192 },
    { name: 'public/icon-512x512.png', size: 512 },
    { name: 'public/apple-touch-icon.png', size: 180 },
    { name: 'public/favicon-32x32.png', size: 32 },
    { name: 'public/favicon-16x16.png', size: 16 },
    { name: 'app/icon.png', size: 512 }
  ];

  for (const target of targets) {
    const destPath = path.join(baseDir, target.name);
    console.log(`Generating ${target.name} (${target.size}x${target.size})...`);
    
    // Resize the image to target size
    const resized = image.clone().resize({ w: target.size, h: target.size });
    
    // Get PNG buffer and write to destination
    const pngBuffer = await resized.getBuffer('image/png');
    fs.writeFileSync(destPath, pngBuffer);
    console.log(`Saved: ${target.name}`);
  }

  // 2. Generate Multi-Resolution ICO files
  console.log('Generating multi-resolution ICO file (16x16, 32x32, 48x48)...');
  const icoSizes = [16, 32, 48];
  const pngBuffers = [];

  for (const size of icoSizes) {
    console.log(`Resizing for ICO: ${size}x${size}...`);
    const resized = image.clone().resize({ w: size, h: size });
    const buf = await resized.getBuffer('image/png');
    pngBuffers.push(buf);
  }

  const icoBuffer = createIco(pngBuffers, icoSizes);

  // Write ICO to targets
  const icoTargets = ['public/favicon.ico', 'app/favicon.ico'];
  for (const target of icoTargets) {
    const destPath = path.join(baseDir, target);
    fs.writeFileSync(destPath, icoBuffer);
    console.log(`Saved: ${target}`);
  }

  console.log('--- ALL ICONS GENERATED & EXPORTED SUCCESSFULLY! ---');
}

run().catch(err => {
  console.error('An unexpected error occurred during generation:', err);
  process.exit(1);
});
