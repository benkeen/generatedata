declare namespace TourIntroScssNamespace {
  export interface ITourIntroScss {
    col: string;
    cols: string;
    separator: string;
    tourMask: string;
  }
}

declare const TourIntroScssModule: TourIntroScssNamespace.ITourIntroScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TourIntroScssNamespace.ITourIntroScss;
};

export = TourIntroScssModule;
