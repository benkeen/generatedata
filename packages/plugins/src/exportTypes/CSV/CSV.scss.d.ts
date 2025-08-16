declare namespace CsvScssNamespace {
  export interface ICsvScss {
    settings: string;
  }
}

declare const CsvScssModule: CsvScssNamespace.ICsvScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CsvScssNamespace.ICsvScss;
};

export = CsvScssModule;
