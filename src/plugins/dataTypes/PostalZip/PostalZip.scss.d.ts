declare namespace PostalZipScssNamespace {
  export interface IPostalZipScss {
    buttonLabel: string;
  }
}

declare const PostalZipScssModule: PostalZipScssNamespace.IPostalZipScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: PostalZipScssNamespace.IPostalZipScss;
};

export = PostalZipScssModule;
