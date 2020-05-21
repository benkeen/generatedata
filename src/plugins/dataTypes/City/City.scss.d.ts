declare namespace CityScssModule {
  export interface ICityScss {
    buttonLabel: string;
  }
}

declare const CityScssModule: CityScssModule.ICityScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CityScssModule.ICityScss;
};

export = CityScssModule;
