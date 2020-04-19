declare namespace ExportSettingsScssModule {
  export interface IExportSettingsScss {
    exportFormatRow: string;
    field: string;
    label: string;
    panel: string;
    panelHorizontal: string;
    row: string;
    tabContent: string;
  }
}

declare const ExportSettingsScssModule: ExportSettingsScssModule.IExportSettingsScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ExportSettingsScssModule.IExportSettingsScss;
};

export = ExportSettingsScssModule;
