declare namespace TypescriptScssNamespace {
  export interface ITypescriptScss {
    settingsBlock: string;
  }
}

declare const TypescriptScssModule: TypescriptScssNamespace.ITypescriptScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TypescriptScssNamespace.ITypescriptScss;
};

export = TypescriptScssModule;
