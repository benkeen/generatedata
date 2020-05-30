declare namespace ClearGridScssModule {
  export interface IClearGridScss {
    contentPanel: string;
    dataTypeList: string;
    helpContent: string;
    list: string;
  }
}

declare const ClearGridScssModule: ClearGridScssModule.IClearGridScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ClearGridScssModule.IClearGridScss;
};

export = ClearGridScssModule;
