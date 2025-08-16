declare namespace TextFixedScssNamespace {
  export interface ITextFixedScss {
    customText: string;
  }
}

declare const TextFixedScssModule: TextFixedScssNamespace.ITextFixedScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TextFixedScssNamespace.ITextFixedScss;
};

export = TextFixedScssModule;
