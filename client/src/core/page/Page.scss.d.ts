declare namespace PageScssNamespace {
  export interface IPageScss {
    content: string;
    page: string;
  }
}

declare const PageScssModule: PageScssNamespace.IPageScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: PageScssNamespace.IPageScss;
};

export = PageScssModule;
