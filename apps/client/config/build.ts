import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import CleanCSS from 'clean-css';
import { localeFileMap } from '@generatedata/i18n';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distFolder = path.join(rootDir, 'dist');

// Ensure dist folder exists
const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Copy a directory recursively
const copyDir = (src: string, dest: string) => {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

// Copy specific files from a directory
const copyFiles = (src: string, dest: string, files: string[]) => {
  ensureDir(dest);
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

// Minify and combine CSS files
const minifyCss = () => {
  console.log('Minifying CSS...');
  const cssFiles = [
    'src/resources/global.css',
    'src/resources/codemirror.css',
    'src/resources/ambience.css',
    'src/resources/bespin.css',
    'src/resources/cobalt.css',
    'src/resources/darcula.css',
    'src/resources/lucario.css'
  ];

  const cssContents = cssFiles.map((file) => {
    const filePath = path.join(rootDir, file);
    return fs.readFileSync(filePath, 'utf8');
  });

  const combined = cssContents.join('\n');
  const minified = new CleanCSS().minify(combined);

  ensureDir(distFolder);
  fs.writeFileSync(path.join(distFolder, 'styles.css'), minified.styles);
  console.log('  ✓ Created dist/styles.css');
};

// Copy images
const copyImages = () => {
  console.log('Copying images...');
  const src = path.join(rootDir, 'src/images');
  const dest = path.join(distFolder, 'images');
  copyDir(src, dest);
  console.log('  ✓ Copied images to dist/images/');
};

// Copy CodeMirror modes
const copyCodeMirrorModes = () => {
  console.log('Copying CodeMirror modes...');
  const src = path.join(rootDir, 'node_modules/codemirror/mode');
  const dest = path.join(distFolder, 'codeMirrorModes');
  copyDir(src, dest);
  console.log('  ✓ Copied CodeMirror modes to dist/codeMirrorModes/');
};

// Copy plugin workers
const copyPluginWorkers = () => {
  console.log('Copying plugin workers...');
  const workersDest = path.join(distFolder, 'workers');

  // Copy from @generatedata/plugins
  const pluginsSrc = path.join(rootDir, 'node_modules/@generatedata/plugins/dist/workers');
  if (fs.existsSync(pluginsSrc)) {
    copyDir(pluginsSrc, workersDest);
    console.log('  ✓ Copied @generatedata/plugins workers');
  }

  // Copy from @generatedata/utils
  const utilsSrc = path.join(rootDir, 'node_modules/@generatedata/utils/dist/workers');
  if (fs.existsSync(utilsSrc)) {
    copyDir(utilsSrc, workersDest);
    console.log('  ✓ Copied @generatedata/utils workers');
  }
};

// Copy i18n files
const copyI18n = () => {
  console.log('Copying i18n files...');
  const src = path.join(rootDir, 'node_modules/@generatedata/i18n/dist');
  const dest = path.join(distFolder, 'i18n');
  const i18nFiles = Object.values(localeFileMap);
  copyFiles(src, dest, i18nFiles);
  console.log(`  ✓ Copied ${i18nFiles.length} i18n files to dist/i18n/`);
};

// Clean dist folder
const clean = () => {
  console.log('Cleaning dist folder...');
  if (fs.existsSync(distFolder)) {
    fs.rmSync(distFolder, { recursive: true });
  }
  console.log('  ✓ Cleaned dist/');
};

// Main build function
const build = () => {
  console.log('\n📦 Building client assets...\n');

  ensureDir(distFolder);
  minifyCss();
  copyImages();
  copyCodeMirrorModes();
  copyPluginWorkers();
  copyI18n();

  console.log('\n✅ Build complete!\n');
};

// Parse command line arguments
const args = process.argv.slice(2);

if (args.includes('clean')) {
  clean();
} else {
  build();
}
