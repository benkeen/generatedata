declare namespace WeightedListScssNamespace {
  export interface IWeightedListScss {
    addValueRow: string;
    allowDuplicatesCheckbox: string;
    colLabel: string;
    content: string;
    delCol: string;
    listTable: string;
    listTableBody: string;
    listTableHeader: string;
    orderCol: string;
    row: string;
    valueCol: string;
    weightCol: string;
  }
}

declare const WeightedListScssModule: WeightedListScssNamespace.IWeightedListScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: WeightedListScssNamespace.IWeightedListScss;
};

export = WeightedListScssModule;
