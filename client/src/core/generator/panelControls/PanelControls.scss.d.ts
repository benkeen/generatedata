declare namespace PanelControlsScssNamespace {
  export interface IPanelControlsScss {
    btnSelected: string;
    builderControls: string;
    dataTemplateControls: string;
    toggleLayoutBtn: string;
    toggleLayoutBtnDisabled: string;
  }
}

declare const PanelControlsScssModule: PanelControlsScssNamespace.IPanelControlsScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: PanelControlsScssNamespace.IPanelControlsScss;
};

export = PanelControlsScssModule;
