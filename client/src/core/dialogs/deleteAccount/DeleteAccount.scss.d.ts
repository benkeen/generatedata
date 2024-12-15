declare namespace DeleteAccountScssNamespace {
	export interface IDeleteAccountScss {
		accountName: string;
		contentPanel: string;
	}
}

declare const DeleteAccountScssModule: DeleteAccountScssNamespace.IDeleteAccountScss & {
	/** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
	locals: DeleteAccountScssNamespace.IDeleteAccountScss;
};

export = DeleteAccountScssModule;
