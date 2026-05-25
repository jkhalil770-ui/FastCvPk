const fs = require('fs');
const path = require('path');
const https = require('https');

const fontsDir = path.join(__dirname, '..', 'public', 'fonts');

if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

const fontsToDownload = [
  {
    filename: 'NotoNastaliqUrdu-Regular.ttf',
    urls: [
      'https://github.com/google/fonts/raw/main/ofl/notonastaliqurdu/NotoNastaliqUrdu%5Bwght%5D.ttf',
      'https://raw.githubusercontent.com/google/fonts/main/ofl/notonastaliqurdu/NotoNastaliqUrdu%5Bwght%5D.ttf'
    ]
  }
];

function downloadFile(urls, destPath, index = 0) {
  return new Promise((resolve, reject) => {
    if (index >= urls.length) {
      return reject(new Error(`Failed to download from all URLs for ${path.basename(destPath)}`));
    }

    const url = urls[index];
    console.log(`Downloading ${path.basename(destPath)} from URL ${index + 1}/${urls.length}: ${url}`);

    const request = https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile([response.headers.location], destPath, 0)
          .then(resolve)
          .catch(() => downloadFile(urls, destPath, index + 1).then(resolve).catch(reject));
      }

      if (response.statusCode !== 200) {
        console.warn(`Got status ${response.statusCode} for URL ${url}`);
        return downloadFile(urls, destPath, index + 1).then(resolve).catch(reject);
      }

      const fileStream = fs.createWriteStream(destPath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Successfully downloaded ${path.basename(destPath)}`);
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(destPath, () => {});
        console.warn(`Error writing file: ${err.message}`);
        downloadFile(urls, destPath, index + 1).then(resolve).catch(reject);
      });
    });

    request.on('error', (err) => {
      console.warn(`Network error for URL ${url}: ${err.message}`);
      downloadFile(urls, destPath, index + 1).then(resolve).catch(reject);
    });
  });
}

async function start() {
  for (const font of fontsToDownload) {
    const dest = path.join(fontsDir, font.filename);
    try {
      await downloadFile(font.urls, dest);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  }
  console.log('All fonts downloaded successfully!');
}

start();
