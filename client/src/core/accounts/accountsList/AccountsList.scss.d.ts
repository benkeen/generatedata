declare namespace AccountsListScssNamespace {
  export interface IAccountsListScss {
    accountsFilter: string;
    accountsListTable: string;
    body: string;
    del: string;
    edit: string;
    expiryDate: string;
    filtersRow: string;
    firstName: string;
    lastLoggedIn: string;
    lastName: string;
    page: string;
    paginationRow: string;
    row: string;
    searchFilter: string;
    status: string;
  }
}

declare const AccountsListScssModule: AccountsListScssNamespace.IAccountsListScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AccountsListScssNamespace.IAccountsListScss;
};

export = AccountsListScssModule;
