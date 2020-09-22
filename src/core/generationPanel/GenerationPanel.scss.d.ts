declare namespace GenerationPanelScssNamespace {
  export interface IGenerationPanelScss {
    background: string;
    generateOverlay: string;
    generationRow: string;
    overlayWrapper: string;
    panel1: string;
    panel2: string;
    row: string;
  }
}

declare const GenerationPanelScssModule: GenerationPanelScssNamespace.IGenerationPanelScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: GenerationPanelScssNamespace.IGenerationPanelScss;
};

export = GenerationPanelScssModule;
