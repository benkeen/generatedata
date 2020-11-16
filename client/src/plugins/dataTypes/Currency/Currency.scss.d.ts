declare namespace CurrencyScssNamespace {
  export interface ICurrencyScss {
    buttonLabel: string;
    col1: string;
    col2: string;
    currencyLine: string;
    helpDialog: string;
    radioPill: string;
    row: string;
    separatorLine: string;
  }
}

declare const CurrencyScssModule: CurrencyScssNamespace.ICurrencyScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CurrencyScssNamespace.ICurrencyScss;
};

export = CurrencyScssModule;
