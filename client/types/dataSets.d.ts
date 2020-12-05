export type DataSet = {
	dataSetId: number;
	dataSetName: string;
	status: 'private' | 'public';
	dateCreated: Date;
	accountId: number;
	numRowsGenerated: number;
};
