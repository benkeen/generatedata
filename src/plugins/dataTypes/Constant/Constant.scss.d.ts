declare namespace ConstantScssModule {
  export interface IConstantScss {
    options: string;
    values: string;
  }
}

declare const ConstantScssModule: ConstantScssModule.IConstantScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ConstantScssModule.IConstantScss;
};

export = ConstantScssModule;
