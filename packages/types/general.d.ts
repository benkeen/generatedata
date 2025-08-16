export type AnyObject = {
  [key: string]: any;
};

export type GenerationTemplateRow = {
  id: string;
  title: string;
  dataType: DataTypeFolder;
  rowState: any;
  colIndex: number;
};

export type GenerationTemplate = {
  [processOrder: number]: GenerationTemplateRow[];
};
