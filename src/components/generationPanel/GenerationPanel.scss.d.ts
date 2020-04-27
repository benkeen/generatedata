declare namespace GenerationPanelScssModule {
  export interface IGenerationPanelScss {
    intro: string;
    row: string;
  }
}

declare const GenerationPanelScssModule: GenerationPanelScssModule.IGenerationPanelScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: GenerationPanelScssModule.IGenerationPanelScss;
};

export = GenerationPanelScssModule;
