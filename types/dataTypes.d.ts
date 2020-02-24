import { DatabaseTypes } from '../src/plugins/exportTypes/SQL/SQL.types';
export { DataType } from '../build/dataTypesListUI';
import { AnyObject } from './general';

// Every Data Type has a bundle file which needs to export a structure with this type
export type DTBundle = {

	// the definition of the Data type
	definition: DTDefinition;

	// the generation function
	generate: (data: DTGenerationData) => DTGenerateResult;

	// optional <Example /> React component to show something in the UI for the "Example" column
	Example?: any;

	// optional <Options /> React component. This shows up in the Options column in the UI
	Options?: any;

	// optional <Help /> React component
	Help?: any;

	rowStateReducer?: (state: any) => any;
	getMetadata?: () => DTMetadata;
};

export type DTDefinition = {
	name: string;
	fieldGroup: DTFieldGroup;
	fieldGroupOrder: number;
	processOrder?: number;
	schema?: any;
};

export type DTFieldGroup = 'numeric' | 'geo' | 'human_data' | 'other' | 'credit_card_data' | 'math' | 'text';

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
export type DTOptionsProps = {
    coreI18n: any;
    i18n: any;
    data: any;
	id: string;
	dimensions: Dimensions;
    onUpdate: (data: AnyObject) => void;
};

// Data Type <Help /> props
export type DTHelpProps = {
    coreI18n: any;
    i18n: any;
};

export type DTGenerationData = {
    rowNum: number;
	rowState: any;
	i18n: any;
    existingRowData: any[];
};

export type DTGenerateResult = {
	display: string | number | boolean;
	[key: string]: any;
}