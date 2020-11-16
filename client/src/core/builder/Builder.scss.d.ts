declare namespace BuilderScssNamespace {
  export interface IBuilderScss {
    controlRow: string;
    disabled: string;
  }
}

declare const BuilderScssModule: BuilderScssNamespace.IBuilderScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BuilderScssNamespace.IBuilderScss;
};

export = BuilderScssModule;
