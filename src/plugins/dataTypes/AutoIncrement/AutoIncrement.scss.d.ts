declare namespace AutoIncrementScssNamespace {
  export interface IAutoIncrementScss {
    options: string;
  }
}

declare const AutoIncrementScssModule: AutoIncrementScssNamespace.IAutoIncrementScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AutoIncrementScssNamespace.IAutoIncrementScss;
};

export = AutoIncrementScssModule;
