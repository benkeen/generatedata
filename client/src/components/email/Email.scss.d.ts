declare namespace Email2ScssNamespace {
  export interface IEmail2Scss {
    copy: string;
  }
}

declare const Email2ScssModule: Email2ScssNamespace.IEmail2Scss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: Email2ScssNamespace.IEmail2Scss;
};

export = Email2ScssModule;
