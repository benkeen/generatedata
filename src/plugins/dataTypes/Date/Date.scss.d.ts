declare namespace DateScssModule {
  export interface IDateScss {
    dateField: string;
    dateRow: string;
    formatCodeLabel: string;
  }
}

declare const DateScssModule: DateScssModule.IDateScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DateScssModule.IDateScss;
};

export = DateScssModule;
