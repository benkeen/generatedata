import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import removeExports from 'rollup-plugin-strip-exports';
import removeUtilsImport from './rollup-plugin-remove-utils-import';
import terser from '@rollup/plugin-terser';

// example usage:
//    npx rollup -c ./build/rollup.workers.js --build-src=src/plugins/dataTypes/AutoIncrement/AutoIncrement.generator.ts --build-target=dist/workers/DT-AutoIncrement.generator.js
export default (cmdLineArgs) => {
  // the `config-` prefix is a rollup-ism to allow custom args
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
    plugins: [
      removeUtilsImport(),
      nodeResolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      removeExports(),

      // TODO - currently causes the workers to fail to work
      // terser()
    ]
  };
};
