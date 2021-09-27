declare namespace AccountScssNamespace {
  export interface IAccountScss {
    hidden: string;
    rightBlock: string;
    rightCol: string;
    shown: string;
    yourAccountPage: string;
    yourAccountRightCol: string;
  }
}

declare const AccountScssModule: AccountScssNamespace.IAccountScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AccountScssNamespace.IAccountScss;
};

export = AccountScssModule;
