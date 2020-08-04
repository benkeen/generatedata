const RemoveImports = () => ({
	name: 'remove-imports',
	transform (code) {
		// console.log("BEFORE _______________________________________________________");
		// console.log(code);

		const cleanCode = code.replace(/^import\sutils[^;]+;/m, '');

		// console.log("______________________ AFTER ___________________________ \n");
		// console.log(cleanCode);

		return cleanCode;
	}
});

export default RemoveImports;
