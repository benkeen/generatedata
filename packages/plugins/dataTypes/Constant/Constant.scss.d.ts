declare namespace ConstantScssNamespace {
  export interface IConstantScss {
    options: string;
    values: string;
  }
}

declare const ConstantScssModule: ConstantScssNamespace.IConstantScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ConstantScssNamespace.IConstantScss;
};

export = ConstantScssModule;
