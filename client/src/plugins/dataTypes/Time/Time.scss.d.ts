declare namespace TimeScssNamespace {
  export interface ITimeScss {
    col1: string;
    col2: string;
    col3: string;
    copy: string;
    dateBtn: string;
    dateField: string;
    dateRow: string;
    field: string;
    formatCodeLabel: string;
    row: string;
  }
}

declare const TimeScssModule: TimeScssNamespace.ITimeScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TimeScssNamespace.ITimeScss;
};

export = TimeScssModule;
