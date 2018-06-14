const fs = require('fs');
const path = require('path');
const locales = process.argv[2].split(',');
// TODO accept a --local option to dynamically change the root (e.g. outside of workspaces)
const nodeModulesRoot = path.join(__dirname, '..', '..', '..');
const destPath = path.join(__dirname, '..', 'i18n', 'locale-data');
const srcPath = path.join(nodeModulesRoot, 'node_modules', 'react-intl', 'locale-data');

if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath);
}

locales.forEach((locale) => {
    const filename = `${locale}.js`;
    const src = path.join(srcPath, filename);
    const dest = path.join(destPath, filename)

    fs.copyFileSync(src, dest);
});
