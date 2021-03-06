declare namespace Track2ScssNamespace {
  export interface ITrack2Scss {
    buttonLabel: string;
  }
}

declare const Track2ScssModule: Track2ScssNamespace.ITrack2Scss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: Track2ScssNamespace.ITrack2Scss;
};

export = Track2ScssModule;
