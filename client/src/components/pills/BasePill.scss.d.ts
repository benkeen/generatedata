declare namespace RadioPillScssNamespace {
  export interface IRadioPillScss {
    row: string;
  }
}

declare const RadioPillScssModule: RadioPillScssNamespace.IRadioPillScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: RadioPillScssNamespace.IRadioPillScss;
};

export = RadioPillScssModule;
