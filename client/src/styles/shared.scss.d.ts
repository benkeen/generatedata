declare namespace SharedScssNamespace {
  export interface ISharedScss {
    cancelLink: string;
    copyCol: string;
    emptyCol: string;
    errorField: string;
    pill: string;
    selected: string;
    tab: string;
    tip: string;
    twoColPage: string;
  }
}

declare const SharedScssModule: SharedScssNamespace.ISharedScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SharedScssNamespace.ISharedScss;
};

export = SharedScssModule;
