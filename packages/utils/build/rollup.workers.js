import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import removeExports from 'rollup-plugin-strip-exports';
import { terser } from 'rollup-plugin-terser';

//  npx rollup -c ./build/rollup.workers.js --config-src=/Users/benkeen/dev/generatedata/packages/utils/src/worker.ts --config-target=./dist2/workers/workerUtils-9e716a90e0558b231e4f59a9cabc8639.js

export default (cmdLineArgs) => {
  // the `config-` prefix is a rollup-ism to allow custom args
  const { 'config-src': src, 'config-target': target } = cmdLineArgs;

  if (!src || !target) {
    console.error('\n*** Missing command line args. See file for usage. ***\n');
    return;
  }

  const terserCompressProps = {
    top_retain: ['utils', 'onmessage']
  };

  return {
    input: src,
    output: {
      file: target,
      format: 'es'
    },
    treeshake: false,
    // preserveSymlinks: true,
    plugins: [
      nodeResolve(),
      commonjs(), 
      typescript({
        tsconfig: './tsconfig.workers.json',
			}),
			terser({
				mangle: false,
				compress: {
					...terserCompressProps
				}
			}),
      removeExports()]
  };
};
