declare namespace DataSetHistoryScssNamespace {
  export interface IDataSetHistoryScss {
    dateCreated: string;
    del: string;
    edit: string;
    id: string;
    panel: string;
    row: string;
  }
}

declare const DataSetHistoryScssModule: DataSetHistoryScssNamespace.IDataSetHistoryScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DataSetHistoryScssNamespace.IDataSetHistoryScss;
};

export = DataSetHistoryScssModule;
