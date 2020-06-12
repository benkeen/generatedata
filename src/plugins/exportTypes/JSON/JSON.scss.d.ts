declare namespace JsonScssModule {
  export interface IJsonScss {
    settings: string;
    structureFormatRow: string;
  }
}

declare const JsonScssModule: JsonScssModule.IJsonScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: JsonScssModule.IJsonScss;
};

export = JsonScssModule;
