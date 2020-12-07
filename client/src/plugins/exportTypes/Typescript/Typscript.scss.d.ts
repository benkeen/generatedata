declare namespace JsonScssNamespace {
  export interface IJsonScss {
    settings: string;
    structureFormatRow: string;
  }
}

declare const JsonScssModule: JsonScssNamespace.IJsonScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: JsonScssNamespace.IJsonScss;
};

export = JsonScssModule;
