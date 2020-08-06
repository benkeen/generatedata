declare namespace RegionScssNamespace {
  export interface IRegionScss {
    buttonLabel: string;
  }
}

declare const RegionScssModule: RegionScssNamespace.IRegionScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: RegionScssNamespace.IRegionScss;
};

export = RegionScssModule;
