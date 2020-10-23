declare namespace SharedScssNamespace {
  export interface ISharedScss {
    copyCol: string;
    emptyCol: string;
    errorField: string;
    pill: string;
    tip: string;
  }
}

declare const SharedScssModule: SharedScssNamespace.ISharedScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SharedScssNamespace.ISharedScss;
};

export = SharedScssModule;
