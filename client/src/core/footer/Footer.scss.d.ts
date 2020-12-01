declare namespace FooterScssNamespace {
  export interface IFooterScss {
    controls: string;
    footer: string;
    saveButton: string;
    scriptVersion: string;
    selectLocale: string;
    selectedLocale: string;
  }
}

declare const FooterScssModule: FooterScssNamespace.IFooterScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FooterScssNamespace.IFooterScss;
};

export = FooterScssModule;
