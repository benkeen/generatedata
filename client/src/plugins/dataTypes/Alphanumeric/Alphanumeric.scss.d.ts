declare namespace AlphanumericScssNamespace {
  export interface IAlphanumericScss {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    copy: string;
    row: string;
  }
}

declare const AlphanumericScssModule: AlphanumericScssNamespace.IAlphanumericScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AlphanumericScssNamespace.IAlphanumericScss;
};

export = AlphanumericScssModule;
