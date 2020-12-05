declare namespace DataSetsScssNamespace {
  export interface IDataSetsScss {
    body: string;
    dataSetName: string;
    dateCreated: string;
    del: string;
    header: string;
    history: string;
    lastModified: string;
    load: string;
    numRowsGenerated: string;
    page: string;
    row: string;
    status: string;
  }
}

declare const DataSetsScssModule: DataSetsScssNamespace.IDataSetsScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DataSetsScssNamespace.IDataSetsScss;
};

export = DataSetsScssModule;
