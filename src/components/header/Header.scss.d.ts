declare namespace HeaderScssModule {
  export interface IHeaderScss {
    header: string;
  }
}

declare const HeaderScssModule: HeaderScssModule.IHeaderScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HeaderScssModule.IHeaderScss;
};

export = HeaderScssModule;
