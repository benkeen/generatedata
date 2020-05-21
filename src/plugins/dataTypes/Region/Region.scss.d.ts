declare namespace RegionScssModule {
  export interface IRegionScss {
    buttonLabel: string;
  }
}

declare const RegionScssModule: RegionScssModule.IRegionScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: RegionScssModule.IRegionScss;
};

export = RegionScssModule;
