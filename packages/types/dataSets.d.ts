export type DataSetListItem = {
  historyId: number;
  dataSetId: number;
  dataSetName: string;
  status: 'private' | 'public';
  accountId: number;
  content: string;
  numRowsGenerated: number;
  dateCreatedUnix: string;
  historyDateCreatedUnix: string;
};
