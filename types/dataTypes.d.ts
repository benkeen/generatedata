import { DatabaseTypes } from '../src/plugins/exportTypes/SQL/SQL.types';
export { DataType } from '../build/dataTypesListUI';

export type DTDefinition = {
	name: string;
	fieldGroup: DTFieldGroup;
	fieldGroupOrder: number;
	schema: any;
};

export type DTFieldGroup = 'numeric';

export type DTBundle = {
	definition: DTDefinition;
	generate: any;
	Example?: any;
	Options?: any;
	Help?: any;
	rowStateReducer?: () => any;
	getMetadata?: () => DTMetadata;
};

export type GeneralMetadataTypes = {
    dataType: 'number' | 'string' | 'boolean' | 'date';
}

export type DTMetadata = {
    general?: GeneralMetadataTypes;
    sql?: DatabaseTypes;
};

export type Dimensions = {
	width: number;
	height: number;
};

// Data Type <Example /> props
export type DTExampleProps = {
    coreI18n: any;
    i18n: any;
    data: any;
	id: string;
	dimensions: Dimensions;
    onUpdate: (data: AnyObject) => void;
};

// Data Type <Options /> props
export type OptionsProps = {
    coreI18n: any;
    i18n: any;
    data: any;
	id: string;
	dimensions: Dimensions;
    onUpdate: (data: AnyObject) => void;
};

// Data Type <Help /> props
export type HelpProps = {
    coreI18n: any;
    i18n: any;
};

export type GenerationData = {
    rowNum: number;
	rowState: any;
	i18n: any;
    existingRowData: any[];
};

export type DTGenerateReturnType = {
	display: string | number | boolean;
	[key: string]: any;
}