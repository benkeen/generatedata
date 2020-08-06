declare namespace SiretScssNamespace {
  export interface ISiretScss {
    col1: string;
    col2: string;
    row: string;
  }
}

declare const SiretScssModule: SiretScssNamespace.ISiretScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SiretScssNamespace.ISiretScss;
};

export = SiretScssModule;
