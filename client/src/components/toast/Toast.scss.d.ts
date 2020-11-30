declare namespace ToastScssNamespace {
  export interface IToastScss {
    toast: string;
  }
}

declare const ToastScssModule: ToastScssNamespace.IToastScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ToastScssNamespace.IToastScss;
};

export = ToastScssModule;
