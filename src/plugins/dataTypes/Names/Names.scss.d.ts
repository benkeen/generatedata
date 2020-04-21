declare namespace NamesScssModule {
  export interface INamesScss {
    col1: string;
    col2: string;
    row: string;
  }
}

declare const NamesScssModule: NamesScssModule.INamesScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NamesScssModule.INamesScss;
};

export = NamesScssModule;
