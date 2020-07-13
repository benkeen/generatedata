/**
 * We're using rollup to handle creating a single, small JS file containing all the resources needed for Data Type +
 * Export Type generator web worker files. This utils file can be included in the generator files via an
 * importScripts() call - the name + location of which is passed in to their onmessage() methods.
 */
import typescript from 'rollup-plugin-typescript2';

export default {
	input: 'src/utils/webWorkerUtils.ts',
	output: {
		file: 'dist/webWorkerUtils.js',
		format: 'es'
	},
	plugins: [
		typescript({
			tsconfigOverride: {
				compilerOptions: {
					target: "es5"
				}
			}
		})
	]
};
