const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../node_modules/@react-pdf/textkit/lib/textkit.js');

if (!fs.existsSync(targetPath)) {
  console.log('textkit.js not found, skipping patch.');
  process.exit(0);
}

let content = fs.readFileSync(targetPath, 'utf8');

const targetCode = `        for (let i = 0; i < selectedIndices.length; i += 1) {
            const index = selectedIndices[i];
            const glyph = getItemAtIndex(line.runs, 'glyphs', index);
            if (addedGlyphs.has(glyph.id))
                continue;
            updatedGlyphs.push(glyph);
            updatedPositions.push(getItemAtIndex(line.runs, 'positions', index));
            if (glyph.isLigature) {
                addedGlyphs.add(glyph.id);
            }
        }`;

const replacementCode = `        for (let i = 0; i < selectedIndices.length; i += 1) {
            const index = selectedIndices[i];
            const glyph = getItemAtIndex(line.runs, 'glyphs', index);
            if (!glyph)
                continue;
            if (addedGlyphs.has(glyph.id))
                continue;
            updatedGlyphs.push(glyph);
            const position = getItemAtIndex(line.runs, 'positions', index);
            if (position) {
                updatedPositions.push(position);
            }
            if (glyph.isLigature) {
                addedGlyphs.add(glyph.id);
            }
        }`;

if (content.includes('if (!glyph)') && content.includes('updatedPositions.push(position)')) {
  console.log('textkit.js already patched.');
} else {
  // Let's normalize content line endings to LF to perform the search and replace
  const normalizedContent = content.replace(/\r\n/g, '\n');
  const normalizedTarget = targetCode.replace(/\r\n/g, '\n');
  const normalizedReplacement = replacementCode.replace(/\r\n/g, '\n');

  if (normalizedContent.includes(normalizedTarget)) {
    // We can do the replacement on the normalized content, keeping CRLF if the original file had it.
    // Or simpler: replace it directly using string replacement after matching normalized version, 
    // or just write back LF version since JS engines handle both fine.
    const patchedContent = normalizedContent.replace(normalizedTarget, normalizedReplacement);
    fs.writeFileSync(targetPath, patchedContent, 'utf8');
    console.log('Successfully patched textkit.js for RTL/Urdu support!');
  } else {
    console.error('ERROR: Could not find target code to patch in textkit.js!');
    process.exit(1);
  }
}
