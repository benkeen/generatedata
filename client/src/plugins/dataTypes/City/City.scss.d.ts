declare namespace CityScssNamespace {
  export interface ICityScss {
    buttonLabel: string;
  }
}

declare const CityScssModule: CityScssNamespace.ICityScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CityScssNamespace.ICityScss;
};

export = CityScssModule;
