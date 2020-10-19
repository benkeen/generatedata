declare namespace CreatablePillFieldScssNamespace {
  export interface ICreatablePillFieldScss {
    errorField: string;
  }
}

declare const CreatablePillFieldScssModule: CreatablePillFieldScssNamespace.ICreatablePillFieldScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CreatablePillFieldScssNamespace.ICreatablePillFieldScss;
};

export = CreatablePillFieldScssModule;
