declare namespace CopyToClipboardScssNamespace {
  export interface ICopyToClipboardScss {
    copyIcon: string;
  }
}

declare const CopyToClipboardScssModule: CopyToClipboardScssNamespace.ICopyToClipboardScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CopyToClipboardScssNamespace.ICopyToClipboardScss;
};

export = CopyToClipboardScssModule;
