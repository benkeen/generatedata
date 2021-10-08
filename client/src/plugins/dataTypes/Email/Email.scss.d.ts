declare namespace EmailScssNamespace {
  export interface IEmailScss {
    buttonLabel: string;
  }
}

declare const EmailScssModule: EmailScssNamespace.IEmailScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: EmailScssNamespace.IEmailScss;
};

export = EmailScssModule;
