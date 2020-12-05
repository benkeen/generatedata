declare namespace AccountScssNamespace {
  export interface IAccountScss {
    accountPage: string;
    hidden: string;
    numGeneratedRows: string;
    shown: string;
  }
}

declare const AccountScssModule: AccountScssNamespace.IAccountScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AccountScssNamespace.IAccountScss;
};

export = AccountScssModule;
