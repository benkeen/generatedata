declare namespace IntroScssModule {
  export interface IIntroScss {
    contentPanel: string;
  }
}

declare const IntroScssModule: IntroScssModule.IIntroScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IntroScssModule.IIntroScss;
};

export = IntroScssModule;
