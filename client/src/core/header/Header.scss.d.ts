declare namespace HeaderScssNamespace {
  export interface IHeaderScss {
    current: string;
    fadein: string;
    header: string;
    headerLinks: string;
    logoutLink: string;
    selected: string;
  }
}

declare const HeaderScssModule: HeaderScssNamespace.IHeaderScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HeaderScssNamespace.IHeaderScss;
};

export = HeaderScssModule;
