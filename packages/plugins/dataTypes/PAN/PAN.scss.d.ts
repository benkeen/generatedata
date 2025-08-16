declare namespace PanScssNamespace {
  export interface IPanScss {
    buttonLabel: string;
    error: string;
    noCreditCards: string;
    validLengthsTip: string;
  }
}

declare const PanScssModule: PanScssNamespace.IPanScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: PanScssNamespace.IPanScss;
};

export = PanScssModule;
