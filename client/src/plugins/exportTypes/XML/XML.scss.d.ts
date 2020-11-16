declare namespace XmlScssNamespace {
  export interface IXmlScss {
    row: string;
  }
}

declare const XmlScssModule: XmlScssNamespace.IXmlScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: XmlScssNamespace.IXmlScss;
};

export = XmlScssModule;
