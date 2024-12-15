declare namespace DataSetsScssNamespace {
	export interface IDataSetsScss {
		body: string;
		dataSetName: string;
		dateCreated: string;
		del: string;
		header: string;
		history: string;
		lastModified: string;
		numRowsGenerated: string;
		open: string;
		page: string;
		paginationRow: string;
		row: string;
		status: string;
		table: string;
	}
}

declare const DataSetsScssModule: DataSetsScssNamespace.IDataSetsScss & {
	/** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
	locals: DataSetsScssNamespace.IDataSetsScss;
};

export = DataSetsScssModule;
