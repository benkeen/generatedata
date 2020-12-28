declare namespace FooterScssNamespace {
  export interface IFooterScss {
    aboutIconEl: string;
    controls: string;
    footer: string;
    generateButton: string;
    langIconEl: string;
    saveAsRow: string;
    saveBtnArrow: string;
    saveButton: string;
    saveButtonAs: string;
    saveButtonAsMainBtn: string;
    scriptVersion: string;
    selectLocale: string;
    selectedLocale: string;
    tourBtn: string;
  }
}

declare const FooterScssModule: FooterScssNamespace.IFooterScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FooterScssNamespace.IFooterScss;
};

export = FooterScssModule;
