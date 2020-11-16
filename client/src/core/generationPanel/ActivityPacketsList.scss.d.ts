declare namespace ActivityPacketsListScssNamespace {
  export interface IActivityPacketsListScss {
    chip: string;
    chipLabel: string;
  }
}

declare const ActivityPacketsListScssModule: ActivityPacketsListScssNamespace.IActivityPacketsListScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ActivityPacketsListScssNamespace.IActivityPacketsListScss;
};

export = ActivityPacketsListScssModule;
