declare namespace DataSetHistoryScssNamespace {
  export interface IDataSetHistoryScss {
    currentVersionRow: string;
    dataSetHistoryBtnClass: string;
    dateCreated: string;
    del: string;
    edit: string;
    id: string;
    panel: string;
    row: string;
    rowWrapper: string;
    rows: string;
    selectedRow: string;
  }
}

declare const DataSetHistoryScssModule: DataSetHistoryScssNamespace.IDataSetHistoryScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DataSetHistoryScssNamespace.IDataSetHistoryScss;
};

export = DataSetHistoryScssModule;
