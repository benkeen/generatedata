import { DatabaseTypes } from '../src/plugins/exportTypes/SQL/SQL.types';
import { AnyObject } from './general';
import { DataTypeFolder } from '../_plugins';
import { CountryType } from '~types/countries';
import { ETMessageData } from '~types/exportTypes';

export type DataTypeMap = {
	[dataType in DataTypeFolder]?: string;
};

export type DTBundle = {
	initialState?: any;

	// optional <Example /> React component to show something in the UI for the "Example" column
	Example?: any;

	// optional <Options /> React component. This shows up in the Options column in the UI
	Options?: any;

	// optional <Help /> React component
	Help?: any;

	rowStateReducer?: (state: any) => any;
	getMetadata?: (data: any) => DTMetadata;
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
	fieldGroup: DTFieldGroup;
	fieldGroupOrder: number;
	dependencies?: DataTypeFolder[];
	schema?: any;
};

export type DTFieldGroup = 'numeric' | 'geo' | 'humanData' | 'other' | 'financial' | 'text' | 'countrySpecific';

export type DTMetadataType = 'number' | 'string' | 'boolean' | 'date' | 'infer';

export type GeneralMetadataTypes = {
    dataType: DTMetadataType;
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
	gridPanelDimensions: Dimensions;
	onUpdate: (data: AnyObject) => void;

	// for custom props. See DTCustomProps
	[propName: string]: any;
};

// Data Type <Example /> props
export type DTExampleProps = {
    data: any;
	id: string;
	gridPanelDimensions: Dimensions;
    onUpdate: (data: AnyObject) => void;
	coreI18n: any;
	countryI18n: any;
	i18n: any;
};

// Data Type <Settings /> props
export type DTSettingsProps = {
	data: any;
	id: string;
	onUpdate: (data: AnyObject) => void;
	coreI18n: any;
	countryI18n: any;
	i18n: any;
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
	countryData: {
		[key in CountryType]?: any;
	},
	workerResources: {
		workerUtils: string;
	}
}

interface DTOnMessage extends MessageEvent {
	data: DTGenerationData
}

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
	gridPanelDimensions?: undefined;
	onUpdate?: undefined;
	[propName: string]: any;
}
