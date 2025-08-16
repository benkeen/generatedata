declare namespace ColourScssNamespace {
	export interface IColourScss {
		buttonLabel: string;
		colourDropdown: string;
		demoColours: string;
		labelCol: string;
		settings: string;
	}
}

declare const ColourScssModule: ColourScssNamespace.IColourScss & {
	/** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
	locals: ColourScssNamespace.IColourScss;
};

export = ColourScssModule;
