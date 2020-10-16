const RemoveImports = () => ({
	name: 'remove-imports', // TODO rename to remove-gd-utils-import if this is all it ends up doing

	transform (code) {
		// replace the import utils line with a declaration. This is because utils is included once for all Data Types
		// and we don't want to be re-bundling it with each Data Type
		const cleanCode = code.replace(/\bimport\sutils[^;]+;/, 'declare var utils: any;');
		return cleanCode;
	}
});

export default RemoveImports;
