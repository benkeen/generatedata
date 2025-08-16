declare namespace FooterScssNamespace {
	export interface IFooterScss {
		aboutIconEl: string;
		activePacketsList: string;
		controls: string;
		footer: string;
		footerControls: string;
		generateButton: string;
		saveAsRow: string;
		saveBtnArrow: string;
		saveButton: string;
		saveButtonAs: string;
		saveButtonAsMainBtn: string;
		scriptVersion: string;
		showTourLink: string;
		tourBtn: string;
		visible: string;
	}
}

declare const FooterScssModule: FooterScssNamespace.IFooterScss & {
	/** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
	locals: FooterScssNamespace.IFooterScss;
};

export = FooterScssModule;
