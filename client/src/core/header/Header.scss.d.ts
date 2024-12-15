declare namespace HeaderScssNamespace {
	export interface IHeaderScss {
		controls: string;
		current: string;
		divider: string;
		fadein: string;
		flags: string;
		header: string;
		headerLinks: string;
		localeSelector: string;
		logoutLink: string;
		selected: string;
		selectedLocale: string;
		title: string;
		userAccount: string;
	}
}

declare const HeaderScssModule: HeaderScssNamespace.IHeaderScss & {
	/** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
	locals: HeaderScssNamespace.IHeaderScss;
};

export = HeaderScssModule;
