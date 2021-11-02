declare namespace NamesScssNamespace {
  export interface INamesScss {
    anyNamesIcon: string;
    col1: string;
    col2: string;
    copy: string;
    copyCol: string;
    optionsBtn: string;
    pillField: string;
    regionalNamesIcon: string;
    row: string;
  }
}

declare const NamesScssModule: NamesScssNamespace.INamesScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NamesScssNamespace.INamesScss;
};

export = NamesScssModule;
