declare namespace DateScssModule {
  export interface IDateScss {
    col1: string;
    col2: string;
    col3: string;
    dateField: string;
    dateRow: string;
    formatCodeLabel: string;
    row: string;
  }
}

declare const DateScssModule: DateScssModule.IDateScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DateScssModule.IDateScss;
};

export = DateScssModule;
