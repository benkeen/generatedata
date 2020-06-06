import { DatabaseTypes } from '../src/plugins/exportTypes/SQL/SQL.types';
import { AnyObject, GDLocale, Tag } from './general';
import { DataTypeFolder } from '../src/_plugins';

export type DTBundle = {
	initialState?: any;

	// optional <Example /> React component to show something in the UI for the "Example" column
	Example?: any;

	// optional <Options /> React component. This shows up in the Options column in the UI
	Options?: any;

	// optional <Help /> React component
	Help?: any;

	generate: (data: DTGenerationData) => DTGenerateResult | Promise<DTGenerateResult>;
	rowStateReducer?: (state: any) => any;
	getMetadata?: () => DTMetadata;
	customProps?: DTCustomProps;
	actionInterceptors?: DTActionInterceptors;
};

export type DTActionInterceptors = {
	[action: string]: DTActionInterceptor;
};

export interface DTActionInterceptor {
	// TODO. generics? rowState and the `any` response here is the state type of the Data Type
	(rowId: string, rowState: any, actionPayload: any): any | null;
}

export type DTInterceptorSingleAction = {
	dataType: DataTypeFolder;
	interceptor: DTActionInterceptor;
};

export type DTDefinition = {
	name: string;
	fieldGroup: DTFieldGroup;
	fieldGroupOrder: number;
	dependencies?: DataTypeFolder[];
	countryTags?: any; // TODO incomplete. Maybe map this to our Country plugins?
	tags?: Tag[];
	schema?: any;
};

export type DTFieldGroup = 'numeric' | 'geo' | 'humanData' | 'other' | 'creditCardData' | 'math' | 'text';


export type DTMetadataType = 'number' | 'string' | 'boolean' | 'date' | 'infer';

export interface GetDTMetadataType {
	(rowState: any): DTMetadataType;
}

export type GeneralMetadataTypes = {
    dataType: DTMetadataType | GetDTMetadataType;
}

export type DTMetadata = {
    general?: GeneralMetadataTypes;
    sql?: DatabaseTypes;
};

export type Dimensions = {
	width: number;
	height: number;
};

// Data Type <Options /> props
export type DTOptionsProps = {
	coreI18n: any;
	countryI18n: any;
	i18n: any;
	data: any;
	id: string;
	dimensions: Dimensions;
	onUpdate: (data: AnyObject) => void;

	// for custom props. See DTCustomProps
	[propName: string]: any;
};

// Data Type <Example /> props
export type DTExampleProps = {
    coreI18n: any;
	countryI18n: any;
    i18n: any;
    data: any;
	id: string;
	dimensions: Dimensions;
    onUpdate: (data: AnyObject) => void;
};

// Data Type <Help /> props
export type DTHelpProps = {
    coreI18n: any;
    countryI18n: any;
    i18n: any;
};

export type DTGenerationData = {
    rowNum: number;
	rowState: any;
	i18n: any;
	countryI18n: any;
    existingRowData: DTGenerationExistingRowData[];
};

export type DTGenerationExistingRowData = {
	id: string;
	colIndex: number; // bit confusing, but this is the index of the ROW in the UI.
	dataType: DataTypeFolder;

	// this contains the actual generated data from the data type
	data: DTGenerateResult;
};

export type DTGenerateResult = {
	display: string | number | boolean;
	[key: string]: any;
}

export type DTCustomProps = {
	// weird, but setting these to undefined prevents the Data Type from overriding the core prop names accidentally
	coreI18n?: undefined;
	countryI18n?: undefined;
	i18n?: undefined;
	data?: undefined;
	id?: undefined;
	dimensions?: undefined;
	onUpdate?: undefined;

	[propName: string]: any;
}
