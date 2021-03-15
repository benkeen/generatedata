declare namespace AccountsListScssNamespace {
  export interface IAccountsListScss {
    body: string;
    del: string;
    edit: string;
    email: string;
    firstName: string;
    header: string;
    lastName: string;
    page: string;
    row: string;
    status: string;
  }
}

declare const AccountsListScssModule: AccountsListScssNamespace.IAccountsListScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AccountsListScssNamespace.IAccountsListScss;
};

export = AccountsListScssModule;
