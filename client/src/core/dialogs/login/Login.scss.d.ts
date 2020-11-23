declare namespace LoginScssNamespace {
  export interface ILoginScss {
    col: string;
    loginDialog: string;
    separator: string;
    withSecondCol: string;
  }
}

declare const LoginScssModule: LoginScssNamespace.ILoginScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LoginScssNamespace.ILoginScss;
};

export = LoginScssModule;
