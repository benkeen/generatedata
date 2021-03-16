declare namespace SharedScssNamespace {
  export interface ISharedScss {
    blank: string;
    cancelLink: string;
    copyCol: string;
    emptyCol: string;
    emptyText: string;
    errorField: string;
    fadeIn: string;
    generatorControls: string;
    mainLogo: string;
    pill: string;
    selected: string;
    tab: string;
    tip: string;
    twoColPage: string;
    visible: string;
  }
}

declare const SharedScssModule: SharedScssNamespace.ISharedScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SharedScssNamespace.ISharedScss;
};

export = SharedScssModule;
