declare namespace SqlScssNamespace {
  export interface ISqlScss {
    batchSize: string;
    batchSizeHyphen: string;
    block: string;
    brace: string;
    row: string;
    title: string;
    withBrace: string;
  }
}

declare const SqlScssModule: SqlScssNamespace.ISqlScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SqlScssNamespace.ISqlScss;
};

export = SqlScssModule;
