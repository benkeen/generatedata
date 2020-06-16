declare namespace XmlScssModule {
  export interface IXmlScss {
    row: string;
  }
}

declare const XmlScssModule: XmlScssModule.IXmlScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: XmlScssModule.IXmlScss;
};

export = XmlScssModule;
