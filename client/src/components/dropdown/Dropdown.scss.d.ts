declare namespace DropdownScssNamespace {
  export interface IDropdownScss {
    error: string;
  }
}

declare const DropdownScssModule: DropdownScssNamespace.IDropdownScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DropdownScssNamespace.IDropdownScss;
};

export = DropdownScssModule;
