import typescript from 'rollup-plugin-typescript2';

export default {
	input: 'src/utils/index.ts',
	output: {
		file: 'dist/utils123.js',
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
