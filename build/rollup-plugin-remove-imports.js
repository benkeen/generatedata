const RemoveImports = () => ({
	name: 'remove-imports',
	transform (code) {
		const cleanCode = code.replace(/^import\s[^;]+;/m, '');
		return cleanCode;
	}
});

export default RemoveImports;
