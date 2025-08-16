declare namespace Track1ScssNamespace {
  export interface ITrack1Scss {
    buttonLabel: string;
  }
}

declare const Track1ScssModule: Track1ScssNamespace.ITrack1Scss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: Track1ScssNamespace.ITrack1Scss;
};

export = Track1ScssModule;
