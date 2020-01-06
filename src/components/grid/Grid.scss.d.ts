declare namespace GridScssModule {
  export interface IGridScss {
    addRows: string;
    dataTypeCol: string;
    deleteCol: string;
    emptyCol: string;
    examplesCol: string;
    grid: string;
    gridHeader: string;
    gridHeaderWrapper: string;
    gridRow: string;
    gridRowsWrapper: string;
    gridWrapper: string;
    helpCol: string;
    optionsCol: string;
    orderCol: string;
    scrollableGridRows: string;
    titleCol: string;
  }
}

declare const GridScssModule: GridScssModule.IGridScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: GridScssModule.IGridScss;
};

export = GridScssModule;
