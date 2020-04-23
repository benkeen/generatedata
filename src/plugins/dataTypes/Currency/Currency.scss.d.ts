declare namespace CurrencyScssModule {
  export interface ICurrencyScss {
    col1: string;
    col2: string;
    row: string;
  }
}

declare const CurrencyScssModule: CurrencyScssModule.ICurrencyScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CurrencyScssModule.ICurrencyScss;
};

export = CurrencyScssModule;
