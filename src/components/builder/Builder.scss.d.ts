declare namespace BuilderScssModule {
  export interface IBuilderScss {
    controlRow: string;
    disabled: string;
  }
}

declare const BuilderScssModule: BuilderScssModule.IBuilderScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BuilderScssModule.IBuilderScss;
};

export = BuilderScssModule;
