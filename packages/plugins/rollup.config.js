/**
 * This generates es5 files for single entry-point TS files. It's used for the webworker files: core, core utils, plugins.
 *
 * TODO at the moment we're actually loading the utils code twice: once for the web workers, one in the code bundle.
 * The core script COULD load this generated file & use the methods from the window object; as long as the typings were
 * provided that'd cut down on build size. But honestly it's <20KB and there are bigger fish to fry.
 *
 * ---------------
 *
 * TODO DEC 2025 rewrite. I'm moving this to the plugins package, since the workerUtils + plugins are here. The core utils is the outlier,
 * but I want to get clarification on exactly what's needed.
 */
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import removeExports from 'rollup-plugin-strip-exports';
import removeUtilsImport from './build/rollup-plugin-remove-utils-import';
import workerHash from './build/rollup-plugin-worker-hash';

// example usage:

// --> in core
//    npx rollup -c --config-src=src/utils/coreUtils.ts --config-target=dist/workers/coreUtils.js

// --> in plugins
//    npx rollup -c --config-src=src/utils/workerUtils.ts --config-target=dist/debug.js
//    npx rollup -c --config-src=src/plugins/countries/Australia/bundle.ts --config-target=dist/australia.js
//    npx rollup -c --config-src=src/plugins/dataTypes/AutoIncrement/AutoIncrement.generator.ts --config-target=dist/workers/DT-AutoIncrement.generator.js
export default (cmdLineArgs) => {
  const { 'config-src': src, 'config-target': target } = cmdLineArgs;

  if (!src || !target) {
    console.error('\n*** Missing command line args. See file for usage. ***\n');
    return;
  }

  // const terserCompressProps = {};

  // // the point of the workerUtils file is to expose all utility methods in a single `utils` object
  // // for use by plugin web workers. This is available on the global scope within a web worker
  // if (src === 'src/utils/workerUtils.ts') {
  //   terserCompressProps.top_retain = ['utils', 'onmessage'];
  // } else if (/src\/plugins\/countries/.test(src)) {
  //   const folder = path.dirname(src).split(path.sep);
  //   terserCompressProps.top_retain = [folder[folder.length - 1]];
  // } else {
  //   terserCompressProps.unused = true;
  //   terserCompressProps.top_retain = ['utils', 'randomUtils', 'onmessage'];
  // }

  return {
    input: src,
    output: {
      file: target,
      format: 'es'
    },
    treeshake: false,
    preserveSymlinks: true,
    plugins: [
      removeUtilsImport(),
      nodeResolve({
        // include: ['node_modules/**', '../utils/node_modules/**'],
        // modulePaths: [path.resolve(__dirname, '../')]
      }),
      commonjs(),
      // typescript({
      //   tsconfigOverride: {
      //     compilerOptions: {
      //       target: 'es5'
      //     }
      //   }
      // }),
      // terser({
      //   mangle: false,
      //   compress: {
      //     ...terserCompressProps
      //   }
      // }),
      removeExports(),
      workerHash()
    ]
  };
};
