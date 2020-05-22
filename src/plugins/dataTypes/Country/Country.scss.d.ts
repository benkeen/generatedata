declare namespace CountryScssModule {
  export interface ICountryScss {
    buttonLabel: string;
  }
}

declare const CountryScssModule: CountryScssModule.ICountryScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CountryScssModule.ICountryScss;
};

export = CountryScssModule;
