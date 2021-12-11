declare namespace BitcoinAddressScssNamespace {
  export interface IBitcoinAddressScss {
    formatHeader: string;
    labelCol: string;
    table: string;
  }
}

declare const BitcoinAddressScssModule: BitcoinAddressScssNamespace.IBitcoinAddressScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BitcoinAddressScssNamespace.IBitcoinAddressScss;
};

export = BitcoinAddressScssModule;
