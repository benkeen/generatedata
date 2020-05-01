declare namespace PreviewPanelScssModule {
  export interface IPreviewPanelScss {
    controls: string;
    loading: string;
    noResults: string;
    panelContent: string;
    preview: string;
    previewPanel: string;
    previewPanelContent: string;
    topRow: string;
  }
}

declare const PreviewPanelScssModule: PreviewPanelScssModule.IPreviewPanelScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: PreviewPanelScssModule.IPreviewPanelScss;
};

export = PreviewPanelScssModule;
