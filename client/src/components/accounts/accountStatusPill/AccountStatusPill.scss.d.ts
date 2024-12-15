declare namespace AccountStatusPillScssNamespace {
	export interface IAccountStatusPillScss {
		disabled: string;
		expired: string;
		live: string;
		pill: string;
	}
}

declare const AccountStatusPillScssModule: AccountStatusPillScssNamespace.IAccountStatusPillScss & {
	/** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
	locals: AccountStatusPillScssNamespace.IAccountStatusPillScss;
};

export = AccountStatusPillScssModule;
