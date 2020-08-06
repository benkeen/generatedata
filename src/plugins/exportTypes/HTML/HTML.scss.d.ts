declare namespace HtmlScssNamespace {
  export interface IHtmlScss {
    row: string;
  }
}

declare const HtmlScssModule: HtmlScssNamespace.IHtmlScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HtmlScssNamespace.IHtmlScss;
};

export = HtmlScssModule;
