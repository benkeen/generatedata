declare namespace ManageAccountScssNamespace {
  export interface IManageAccountScss {
    disabledFieldRow: string;
    rightCol: string;
    root: string;
  }
}

declare const ManageAccountScssModule: ManageAccountScssNamespace.IManageAccountScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ManageAccountScssNamespace.IManageAccountScss;
};

export = ManageAccountScssModule;
