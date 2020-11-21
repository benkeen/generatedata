declare namespace HeaderScssNamespace {
  export interface IHeaderScss {
    btnSelected: string;
    current: string;
    header: string;
    headerLinks: string;
    items: string;
    toggleLayoutBtn: string;
    toggleLayoutBtnDisabled: string;
  }
}

declare const HeaderScssModule: HeaderScssNamespace.IHeaderScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HeaderScssNamespace.IHeaderScss;
};

export = HeaderScssModule;
