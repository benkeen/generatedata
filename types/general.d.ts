export type GenEnvironment = 'API' | 'UI';

export type Generator = {
    colData: any[];
    rowData: any[];
};

export type ExportTarget = 'inPage' | 'newTab' | 'promptDownload';

export type ActionType = {
    type: string;
    payload: any;
}
