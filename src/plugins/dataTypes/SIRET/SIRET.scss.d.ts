declare namespace SiretScssModule {
  export interface ISiretScss {
    col1: string;
    col2: string;
    row: string;
  }
}

declare const SiretScssModule: SiretScssModule.ISiretScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SiretScssModule.ISiretScss;
};

export = SiretScssModule;
