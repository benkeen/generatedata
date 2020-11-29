declare namespace AccountScssNamespace {
  export interface IAccountScss {
    numGeneratedRows: string;
    page: string;
    selected: string;
    tab: string;
  }
}

declare const AccountScssModule: AccountScssNamespace.IAccountScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AccountScssNamespace.IAccountScss;
};

export = AccountScssModule;
