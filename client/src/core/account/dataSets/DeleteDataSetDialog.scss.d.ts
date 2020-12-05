declare namespace DeleteDataSetDialogScssNamespace {
  export interface IDeleteDataSetDialogScss {
    contentPanel: string;
    dataSetName: string;
  }
}

declare const DeleteDataSetDialogScssModule: DeleteDataSetDialogScssNamespace.IDeleteDataSetDialogScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DeleteDataSetDialogScssNamespace.IDeleteDataSetDialogScss;
};

export = DeleteDataSetDialogScssModule;
