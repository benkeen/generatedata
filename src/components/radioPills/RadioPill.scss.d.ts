declare namespace RadioPillScssModule {
  export interface IRadioPillScss {
    row: string;
  }
}

declare const RadioPillScssModule: RadioPillScssModule.IRadioPillScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: RadioPillScssModule.IRadioPillScss;
};

export = RadioPillScssModule;
