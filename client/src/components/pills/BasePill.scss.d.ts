declare namespace BasePillScssNamespace {
	export interface IBasePillScss {
		row: string;
	}
}

declare const BasePillScssModule: BasePillScssNamespace.IBasePillScss & {
	/** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
	locals: BasePillScssNamespace.IBasePillScss;
};

export = BasePillScssModule;
