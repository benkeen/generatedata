declare namespace GenerationPanelScssNamespace {
  export interface IGenerationPanelScss {
    generationRow: string;
    intro: string;
    row: string;
  }
}

declare const GenerationPanelScssModule: GenerationPanelScssNamespace.IGenerationPanelScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: GenerationPanelScssNamespace.IGenerationPanelScss;
};

export = GenerationPanelScssModule;
