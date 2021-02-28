declare namespace PanScssNamespace {
  export interface IPanScss {
    buttonLabel: string;
  }
}

declare const PanScssModule: PanScssNamespace.IPanScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: PanScssNamespace.IPanScss;
};

export = PanScssModule;
