#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');

const filePath = './scripts-to-run';
const fullFilePath = path.join(__dirname, filePath);
let scripts = [];

try {
    scripts = require(filePath);
} catch (err) {
    process.exit(0);
}

if (!Array.isArray(scripts) || scripts.length === 0) {
    // Allow commit when no scripts are provided.
    process.exit(0);
}

console.log(`Running yarn scripts specified in ${fullFilePath}`);

for (let i = 0; i < scripts.length; i++) {
    const command = `yarn run ${scripts[i]}`;

    try {
        console.log(`Running "${command}"...`);
        execSync(command, { stdio: 'inherit' });
    } catch (err) {
        console.log(`The command "${command}" did not exit successfully, aborting commit.`);
        process.exit(1);
    }
}

// If we reach this point, all the scripts have passed successfully, so merely return.
process.exit(0);
