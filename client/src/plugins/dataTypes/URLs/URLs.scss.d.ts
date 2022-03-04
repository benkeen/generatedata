declare namespace UrLsScssNamespace {
  export interface IUrLsScss {
    buttonLabel: string;
    disabledSection: string;
    enabledSection: string;
    firstCol: string;
    optionsView: string;
    secondCol: string;
    settingsRow: string;
  }
}

declare const UrLsScssModule: UrLsScssNamespace.IUrLsScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: UrLsScssNamespace.IUrLsScss;
};

export = UrLsScssModule;
