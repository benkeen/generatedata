declare namespace DataSetHistoryScssNamespace {
  export interface IDataSetHistoryScss {
    dataSetHistoryBtnClass: string;
    dateCreated: string;
    del: string;
    edit: string;
    id: string;
    panel: string;
    row: string;
    rows: string;
    selectedRow: string;
  }
}

declare const DataSetHistoryScssModule: DataSetHistoryScssNamespace.IDataSetHistoryScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DataSetHistoryScssNamespace.IDataSetHistoryScss;
};

export = DataSetHistoryScssModule;
