declare namespace ProgrammingLanguageScssNamespace {
  export interface IProgrammingLanguageScss {
    jsExportFormat: string;
  }
}

declare const ProgrammingLanguageScssModule: ProgrammingLanguageScssNamespace.IProgrammingLanguageScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ProgrammingLanguageScssNamespace.IProgrammingLanguageScss;
};

export = ProgrammingLanguageScssModule;
