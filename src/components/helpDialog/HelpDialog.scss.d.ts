declare namespace HelpDialogScssModule {
  export interface IHelpDialogScss {
    contentPanel: string;
    dataTypeList: string;
    helpContent: string;
    list: string;
  }
}

declare const HelpDialogScssModule: HelpDialogScssModule.IHelpDialogScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HelpDialogScssModule.IHelpDialogScss;
};

export = HelpDialogScssModule;
