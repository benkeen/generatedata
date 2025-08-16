declare namespace CountryScssNamespace {
  export interface ICountryScss {
    buttonLabel: string;
  }
}

declare const CountryScssModule: CountryScssNamespace.ICountryScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CountryScssNamespace.ICountryScss;
};

export = CountryScssModule;
