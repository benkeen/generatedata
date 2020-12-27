declare namespace TourIntroScssNamespace {
  export interface ITourIntroScss {
    buttonCol: string;
    col: string;
    cols: string;
    introDialog: string;
    separator: string;
    tourMask: string;
    tourPage: string;
  }
}

declare const TourIntroScssModule: TourIntroScssNamespace.ITourIntroScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TourIntroScssNamespace.ITourIntroScss;
};

export = TourIntroScssModule;
