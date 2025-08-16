declare namespace DateScssNamespace {
  export interface IDateScss {
    col1: string;
    col2: string;
    col3: string;
    copy: string;
    dateBtn: string;
    dateField: string;
    dateRow: string;
    formatCodeLabel: string;
    row: string;
  }
}

declare const DateScssModule: DateScssNamespace.IDateScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DateScssNamespace.IDateScss;
};

export = DateScssModule;
