declare namespace ToursScssNamespace {
  export interface IToursScss {
    mask: string;
  }
}

declare const ToursScssModule: ToursScssNamespace.IToursScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ToursScssNamespace.IToursScss;
};

export = ToursScssModule;
