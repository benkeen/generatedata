declare namespace PasswordResetScssNamespace {
  export interface IPasswordResetScss {
    actionsRow: string;
    col: string;
    loginDialog: string;
    loginLink: string;
    separator: string;
    withSecondCol: string;
  }
}

declare const PasswordResetScssModule: PasswordResetScssNamespace.IPasswordResetScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: PasswordResetScssNamespace.IPasswordResetScss;
};

export = PasswordResetScssModule;
