export type DataSetListItem = {
	historyId: number;
	dataSetId: number;
	dataSetName: string;
	status: 'private' | 'public';
	dateCreated: Date;
	accountId: number;
	content: string;
	numRowsGenerated: number;
	historyDateCreated: string;
};
