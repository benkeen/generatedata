declare namespace SaveDataSetScssNamespace {
  export interface ISaveDataSetScss {
    contentPanel: string;
    existingDataSet: string;
    newDataSet: string;
    notLoggedIn: string;
  }
}

declare const SaveDataSetScssModule: SaveDataSetScssNamespace.ISaveDataSetScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SaveDataSetScssNamespace.ISaveDataSetScss;
};

export = SaveDataSetScssModule;
