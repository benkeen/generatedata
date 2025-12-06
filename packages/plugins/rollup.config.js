/**
 * This generates es5 files for single entry-point TS files. It's used for the webworker files: core, core utils, plugins.
 *
 * TODO DEC 2025 rewrite. I'm moving this to the plugins package, since the workerUtils + plugins are here. The core utils is the outlier,
 * but I want to get clarification on exactly what's needed.
 */
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import removeExports from 'rollup-plugin-strip-exports';
import removeUtilsImport from './build/rollup-plugin-remove-utils-import';

// example usage:
//    npx rollup -c --build-src=src/plugins/dataTypes/AutoIncrement/AutoIncrement.generator.ts --build-target=dist/workers/DT-AutoIncrement.generator.js
export default (cmdLineArgs) => {
  // the `config-` prefix is a rollup-ism to allow custom args to be passed in
  const { 'config-src': src, 'config-target': target } = cmdLineArgs;

  if (!src || !target) {
    console.error('\n*** Missing command line args. See file for usage. ***\n');
    return;
  }
  return {
    input: src,
    output: {
      file: target,
      format: 'es'
    },
    treeshake: false,
    preserveSymlinks: true,
    plugins: [removeUtilsImport(), nodeResolve(), commonjs(), removeExports()]
  };
};
