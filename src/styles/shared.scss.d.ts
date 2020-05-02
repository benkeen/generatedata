declare namespace SharedScssModule {
  export interface ISharedScss {
    tip: string;
  }
}

declare const SharedScssModule: SharedScssModule.ISharedScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SharedScssModule.ISharedScss;
};

export = SharedScssModule;
