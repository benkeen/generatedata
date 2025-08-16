declare namespace EtSharedScssNamespace {
  export interface IEtSharedScss {
    settingRow: string;
  }
}

declare const EtSharedScssModule: EtSharedScssNamespace.IEtSharedScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: EtSharedScssNamespace.IEtSharedScss;
};

export = EtSharedScssModule;
