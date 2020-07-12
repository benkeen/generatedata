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
