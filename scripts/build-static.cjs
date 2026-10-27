const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist', 'client');
fs.mkdirSync(path.join(output, 'assets'), {recursive:true});
for (const file of ['index.html', 'style.css', 'app.js']) fs.copyFileSync(path.join(root, file), path.join(output, file));
// Publish only current site assets; retain the original haircut photos locally.
for (const file of ['barberous-logo.jpg', 'elie-chehade-portrait.png', 'favicon.svg']) fs.copyFileSync(path.join(root, 'assets', file), path.join(output, 'assets', file));
fs.cpSync(path.join(root, 'assets', 'fonts'), path.join(output, 'assets', 'fonts'), {recursive:true});
console.log('Static bundle ready: dist/client (no haircut photographs)');
