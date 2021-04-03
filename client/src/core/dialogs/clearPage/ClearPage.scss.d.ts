declare namespace ClearPageScssNamespace {
  export interface IClearPageScss {
    clearPageSelection: string;
    contentPanel: string;
  }
}

declare const ClearPageScssModule: ClearPageScssNamespace.IClearPageScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ClearPageScssNamespace.IClearPageScss;
};

export = ClearPageScssModule;
