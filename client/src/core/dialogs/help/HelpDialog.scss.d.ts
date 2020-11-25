declare namespace HelpDialogScssNamespace {
  export interface IHelpDialogScss {
    contentPanel: string;
    dataTypeList: string;
    dialog: string;
    fadeOut: string;
    helpContent: string;
    list: string;
    spinner: string;
  }
}

declare const HelpDialogScssModule: HelpDialogScssNamespace.IHelpDialogScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HelpDialogScssNamespace.IHelpDialogScss;
};

export = HelpDialogScssModule;
