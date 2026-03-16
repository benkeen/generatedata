const fs = require('fs');
const path = require('path');

const stubContent = `/* eslint-disable */
// This file is auto-generated during the build process
export const generationWorker = ''
`;

fs.writeFileSync(path.join(__dirname, '../src/_generationWorker.ts'), stubContent, 'utf-8');
