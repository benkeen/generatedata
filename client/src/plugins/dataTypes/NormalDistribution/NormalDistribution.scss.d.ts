declare namespace NormalDistributionScssNamespace {
  export interface INormalDistributionScss {
    options: string;
  }
}

declare const NormalDistributionScssModule: NormalDistributionScssNamespace.INormalDistributionScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NormalDistributionScssNamespace.INormalDistributionScss;
};

export = NormalDistributionScssModule;
