declare namespace IntroScssNamespace {
  export interface IIntroScss {
    contentPanel: string;
  }
}

declare const IntroScssModule: IntroScssNamespace.IIntroScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IntroScssNamespace.IIntroScss;
};

export = IntroScssModule;
