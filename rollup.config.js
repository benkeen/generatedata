/**
 * We're using rollup to handle creating a single, small JS file containing all the resources needed for Data Type +
 * Export Type generator web worker files. This utils file can be included in the generator files via an
 * importScripts() call - the name + location of which is passed in to their onmessage() methods.
 *
 * TODO at the moment we're actually loading the utils code twice. There's no reason for this - the core script COULD load
 * this generated file & use the methods from the window object; as long as the typings were provided that'd cut down on
 * build size. But honestly it's <20KB and there are bigger fish to fry.
 */
import typescript from 'rollup-plugin-typescript2';
import { uglify } from "rollup-plugin-uglify";

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
		}),
		uglify()
	]
};
