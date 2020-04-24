declare namespace AlphanumericScssModule {
  export interface IAlphanumericScss {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    row: string;
  }
}

declare const AlphanumericScssModule: AlphanumericScssModule.IAlphanumericScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AlphanumericScssModule.IAlphanumericScss;
};

export = AlphanumericScssModule;
