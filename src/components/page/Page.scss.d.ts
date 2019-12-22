declare namespace PageScssModule {
  export interface IPageScss {
    content: string;
    page: string;
  }
}

declare const PageScssModule: PageScssModule.IPageScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: PageScssModule.IPageScss;
};

export = PageScssModule;
