declare namespace TextRandomScssNamespace {
  export interface ITextRandomScss {
    customText: string;
  }
}

declare const TextRandomScssModule: TextRandomScssNamespace.ITextRandomScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TextRandomScssNamespace.ITextRandomScss;
};

export = TextRandomScssModule;
