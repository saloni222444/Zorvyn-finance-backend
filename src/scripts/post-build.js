const fs = require('fs');
const path = require('path');

// Copy package.json to dist
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
// Remove devDependencies for production
delete packageJson.devDependencies;
delete packageJson.scripts.dev;
delete packageJson.scripts['import-data'];

fs.writeFileSync(
  path.join(__dirname, '../dist/package.json'),
  JSON.stringify(packageJson, null, 2)
);

console.log('✅ package.json copied to dist folder');