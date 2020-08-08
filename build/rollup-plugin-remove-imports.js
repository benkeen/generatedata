const RemoveImports = () => ({
	name: 'remove-imports',

	transform (code) {
		// replace the import utils line with a declaration
		const cleanCode = code.replace(/\bimport\sutils[^;]+;/, 'declare var utils: any;');
		return cleanCode;
	}
});

export default RemoveImports;
