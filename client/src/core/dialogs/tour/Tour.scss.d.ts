declare namespace TourScssNamespace {
  export interface ITourScss {
    col: string;
    cols: string;
    separator: string;
  }
}

declare const TourScssModule: TourScssNamespace.ITourScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TourScssNamespace.ITourScss;
};

export = TourScssModule;
