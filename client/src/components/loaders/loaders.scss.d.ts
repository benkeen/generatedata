declare namespace LoadersScssNamespace {
  export interface ILoadersScss {
    dialogLoadingSpinner: string;
  }
}

declare const LoadersScssModule: LoadersScssNamespace.ILoadersScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LoadersScssNamespace.ILoadersScss;
};

export = LoadersScssModule;
