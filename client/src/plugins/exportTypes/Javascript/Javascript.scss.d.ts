declare namespace JavascriptScssNamespace {
  export interface IJavascriptScss {
    jsExportFormat: string;
  }
}

declare const JavascriptScssModule: JavascriptScssNamespace.IJavascriptScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: JavascriptScssNamespace.IJavascriptScss;
};

export = JavascriptScssModule;
