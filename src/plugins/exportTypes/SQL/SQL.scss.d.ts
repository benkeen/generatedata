declare namespace SqlScssModule {
  export interface ISqlScss {
    row: string;
  }
}

declare const SqlScssModule: SqlScssModule.ISqlScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SqlScssModule.ISqlScss;
};

export = SqlScssModule;
