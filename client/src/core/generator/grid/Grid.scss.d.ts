declare namespace GridScssNamespace {
  export interface IGridScss {
    addRows: string;
    dataTypeCol: string;
    dataTypeColDropdown: string;
    dataTypeHelp: string;
    deleteCol: string;
    disabledBtn: string;
    examplesCol: string;
    grid: string;
    gridHeader: string;
    gridHeaderWrapper: string;
    gridMedium: string;
    gridRow: string;
    gridRowsWrapper: string;
    gridSmall: string;
    gridWrapper: string;
    optionsCol: string;
    orderCol: string;
    scrollableGridRows: string;
    settingsIconCol: string;
    smallScreenMode: string;
    smallScreenSettingsTooltip: string;
    smallScreenSpinner: string;
    titleCol: string;
  }
}

declare const GridScssModule: GridScssNamespace.IGridScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: GridScssNamespace.IGridScss;
};

export = GridScssModule;
