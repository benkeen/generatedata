declare namespace SchemaScssNamespace {
  export interface ISchemaScss {
    actions: string;
    schemaDialog: string;
  }
}

declare const SchemaScssModule: SchemaScssNamespace.ISchemaScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SchemaScssNamespace.ISchemaScss;
};

export = SchemaScssModule;
