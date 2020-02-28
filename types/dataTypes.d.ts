import { DatabaseTypes } from '../src/plugins/exportTypes/SQL/SQL.types';
import { GDLocale, AnyObject } from './general';

export type DTExportTypeExports = 'Options' | 'Help' |  'Example' |  'rowStateReducer' |  'getMetadata';

export type DTDefinition = {
	name: string;
	fieldGroup: DTFieldGroup;
	fieldGroupOrder: number;
	processOrder?: number;
	localeFiles: GDLocale[];
	exports?: DTExportTypeExports[];
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