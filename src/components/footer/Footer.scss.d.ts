declare namespace FooterScssModule {
  export interface IFooterScss {
    footer: string;
  }
}

declare const FooterScssModule: FooterScssModule.IFooterScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FooterScssModule.IFooterScss;
};

export = FooterScssModule;
