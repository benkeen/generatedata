declare namespace ListScssNamespace {
  export interface IListScss {
    colLabel: string;
    content: string;
    row: string;
  }
}

declare const ListScssModule: ListScssNamespace.IListScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ListScssNamespace.IListScss;
};

export = ListScssModule;
