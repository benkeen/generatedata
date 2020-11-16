declare namespace ClearGridScssNamespace {
  export interface IClearGridScss {
    contentPanel: string;
  }
}

declare const ClearGridScssModule: ClearGridScssNamespace.IClearGridScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ClearGridScssNamespace.IClearGridScss;
};

export = ClearGridScssModule;
