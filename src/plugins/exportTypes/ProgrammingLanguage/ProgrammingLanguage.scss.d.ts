declare namespace ProgrammingLanguageScssModule {
  export interface IProgrammingLanguageScss {
    jsExportFormat: string;
  }
}

declare const ProgrammingLanguageScssModule: ProgrammingLanguageScssModule.IProgrammingLanguageScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ProgrammingLanguageScssModule.IProgrammingLanguageScss;
};

export = ProgrammingLanguageScssModule;
