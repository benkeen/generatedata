declare namespace ExportSettingsScssModule {
  export interface IExportSettingsScss {
    bg: string;
    container: string;
    content: string;
    fade: string;
    fadeInOut: string;
  }
}

declare const ExportSettingsScssModule: ExportSettingsScssModule.IExportSettingsScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ExportSettingsScssModule.IExportSettingsScss;
};

export = ExportSettingsScssModule;
