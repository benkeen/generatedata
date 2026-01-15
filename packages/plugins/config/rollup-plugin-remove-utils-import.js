const RemoveImports = () => ({
  name: 'rollup-plugin-remove-utils-import',

  transform(code) {
    // replace the import utils line with a declaration. This is because utils is included once for all Data Types
    // and we don't want to be re-bundling it with each Data Type
    // const cleanCode = code.replace(/\bimport\sutils[^;]+;/, 'declare var utils: any;');

    const cleanCode = code.replace(/\bimport\sutils[^;]+;/, '');
    return cleanCode;
  }
});

export default RemoveImports;
