import { GeneratorLayout } from '@generatedata/types/generator';
// import { ColumnData } from './general';
// import { CountryMap } from '@generatedata/types/countries'; // TODO
// import { DataTypeMap } from './dataTypes';
// import { ExportTypeFolder } from '@generatedata/plugins';

export interface ETValidateTitleField {
	(title: string, i18n: any, settings?: any): string | null;
}

export type ETBundle = {
	getCodeMirrorMode: (settings: any) => string; // TODO generics - data is same type as initialState
	getDownloadFileInfo: (downloadPacket: ETDownloadPacket) => ETDownloadPacketResponse;
	initialState?: any; // TODO generics
	Settings?: any;
	getExportTypeLabel?: (data: any) => string; // TODO generics - data is same type as initialState
	validateTitleField?: ETValidateTitleField;
	isValid?: (data: any) => boolean;
};

export type ETBrowserBundle = Omit<ETBundle, 'generate'>;

// oddity, but this is used to let the main application know when the Export Type is in an invalid state. This prevents
// it from attempting to generate anything until it's resolved
// TODO rename. Maybe ETRequiredState / ETCoreState?
export interface ETState {
	isValid: boolean;
}

export type ETFieldGroup = 'core' | 'programmingLanguage';

export type ETDefinition = {
	fieldGroup: ETFieldGroup;
	codeMirrorModes: string[];
};

export type ETSettings = {
	onUpdate: Function; // from container
	data: any; // from store
	id: string;
	layout: GeneratorLayout;
	i18n: any;
	coreI18n: any;
};

export type ETDownloadPacket = {
	packetId: string;
	settings: any;
};

export type ETDownloadPacketResponse = {
	filename: string;
	fileType: string;
};

// this is for Data Types to describe how their field should be described for the SQL DB table creation statement
export type DatabaseTypes = {
	// e.g. "varchar(50)". This is the default value used for all DB types if they're not defined in one of the custom
	// properties below
	field?: string;

	// database type-specific field descriptions
	field_Oracle?: string;
	field_MySQL?: string;
	field_MSSQL?: string;
	field_Postgres?: string;
	field_SQLite?: string;
};
