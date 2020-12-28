declare namespace AboutScssNamespace {
  export interface IAboutScss {
    aboutDialog: string;
    actions: string;
  }
}

declare const AboutScssModule: AboutScssNamespace.IAboutScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AboutScssNamespace.IAboutScss;
};

export = AboutScssModule;
