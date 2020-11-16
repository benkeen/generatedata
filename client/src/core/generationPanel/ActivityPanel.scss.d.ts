declare namespace ActivityPanelScssNamespace {
  export interface IActivityPanelScss {
    actionsRow: string;
    activityPanel: string;
    background: string;
    counter: string;
    dataPanel: string;
    dataRow: string;
    dataRowLabel: string;
    dataRowValue: string;
    fadeOut: string;
    generateOverlay: string;
    generationRow: string;
    overlayWrapper: string;
    panel1: string;
    panel2: string;
    pie: string;
    row: string;
  }
}

declare const ActivityPanelScssModule: ActivityPanelScssNamespace.IActivityPanelScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ActivityPanelScssNamespace.IActivityPanelScss;
};

export = ActivityPanelScssModule;
