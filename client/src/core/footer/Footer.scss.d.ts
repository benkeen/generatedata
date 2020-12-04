declare namespace FooterScssNamespace {
  export interface IFooterScss {
    controls: string;
    footer: string;
    generateButton: string;
    generatorControls: string;
    saveAsRow: string;
    saveBtnArrow: string;
    saveButton: string;
    saveButtonAs: string;
    saveButtonAsMainBtn: string;
    scriptVersion: string;
    selectLocale: string;
    selectedLocale: string;
    visible: string;
  }
}

declare const FooterScssModule: FooterScssNamespace.IFooterScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FooterScssNamespace.IFooterScss;
};

export = FooterScssModule;
