declare namespace GridScssModule {
  export interface IGridScss {
    addRows: string;
    dataTypeCol: string;
    deleteCol: string;
    examplesCol: string;
    grid: string;
    gridRow: string;
    helpCol: string;
    optionsCol: string;
    orderCol: string;
    titleCol: string;
  }
}

declare const GridScssModule: GridScssModule.IGridScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: GridScssModule.IGridScss;
};

export = GridScssModule;
