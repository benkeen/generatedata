declare namespace ComputedScssNamespace {
  export interface IComputedScss {
    col1: string;
    col2: string;
    copy: string;
    copyCol: string;
    row: string;
  }
}

declare const ComputedScssModule: ComputedScssNamespace.IComputedScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ComputedScssNamespace.IComputedScss;
};

export = ComputedScssModule;
