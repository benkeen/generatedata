declare namespace HelpDialogScssNamespace {
  export interface IHelpDialogScss {
    contentPanel: string;
    dataTypeList: string;
    helpContent: string;
    list: string;
  }
}

declare const HelpDialogScssModule: HelpDialogScssNamespace.IHelpDialogScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HelpDialogScssNamespace.IHelpDialogScss;
};

export = HelpDialogScssModule;
