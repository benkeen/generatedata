declare namespace TableHeaderScssNamespace {
  export interface ITableHeaderScss {
    colHeader: string;
    header: string;
    row: string;
    sortable: string;
  }
}

declare const TableHeaderScssModule: TableHeaderScssNamespace.ITableHeaderScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TableHeaderScssNamespace.ITableHeaderScss;
};

export = TableHeaderScssModule;
