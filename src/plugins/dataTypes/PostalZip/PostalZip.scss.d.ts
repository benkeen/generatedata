declare namespace PostalZipScssModule {
  export interface IPostalZipScss {
    buttonLabel: string;
  }
}

declare const PostalZipScssModule: PostalZipScssModule.IPostalZipScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: PostalZipScssModule.IPostalZipScss;
};

export = PostalZipScssModule;
