declare namespace HtmlScssModule {
  export interface IHtmlScss {
    row: string;
  }
}

declare const HtmlScssModule: HtmlScssModule.IHtmlScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HtmlScssModule.IHtmlScss;
};

export = HtmlScssModule;
