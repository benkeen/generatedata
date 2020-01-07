declare namespace PreviewPanelScssModule {
  export interface IPreviewPanelScss {
    closePanel: string;
    previewPanel: string;
    topRow: string;
  }
}

declare const PreviewPanelScssModule: PreviewPanelScssModule.IPreviewPanelScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: PreviewPanelScssModule.IPreviewPanelScss;
};

export = PreviewPanelScssModule;
