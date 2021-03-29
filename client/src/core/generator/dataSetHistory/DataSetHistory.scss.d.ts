declare namespace DataSetHistoryScssNamespace {
  export interface IDataSetHistoryScss {
    panel: string;
  }
}

declare const DataSetHistoryScssModule: DataSetHistoryScssNamespace.IDataSetHistoryScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DataSetHistoryScssNamespace.IDataSetHistoryScss;
};

export = DataSetHistoryScssModule;
