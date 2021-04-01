declare namespace PreviewPanelScssNamespace {
  export interface IPreviewPanelScss {
    controls: string;
    error: string;
    loading: string;
    noResults: string;
    panelContent: string;
    preview: string;
    previewLoading: string;
    previewPanel: string;
    previewPanelContent: string;
    topRow: string;
  }
}

declare const PreviewPanelScssModule: PreviewPanelScssNamespace.IPreviewPanelScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: PreviewPanelScssNamespace.IPreviewPanelScss;
};

export = PreviewPanelScssModule;
