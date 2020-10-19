declare namespace NamesScssNamespace {
  export interface INamesScss {
    col1: string;
    col2: string;
    copy: string;
    copyCol: string;
    row: string;
  }
}

declare const NamesScssModule: NamesScssNamespace.INamesScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NamesScssNamespace.INamesScss;
};

export = NamesScssModule;
