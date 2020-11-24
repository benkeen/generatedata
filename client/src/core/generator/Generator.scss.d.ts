declare namespace GeneratorScssNamespace {
  export interface IGeneratorScss {
    controlRow: string;
    disabled: string;
  }
}

declare const GeneratorScssModule: GeneratorScssNamespace.IGeneratorScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: GeneratorScssNamespace.IGeneratorScss;
};

export = GeneratorScssModule;
