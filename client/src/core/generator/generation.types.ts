import { GenerationTemplate } from '~types/general';
import { UnchangedGenerationData } from '~types/generator';
import { CountryDataType, CountryNamesMap } from '~types/countries';
import { DataTypeMap } from '~types/dataTypes';

export enum GenerationWorkerActionType {
	Generate = 'GENERATE',
	ProcessDataTypesOnly = 'PROCESS_DATA_TYPES_ONLY',
	ProcessExportTypesOnly = 'PROCESS_EXPORT_TYPES_ONLY',
	Pause = 'PAUSE',
	Abort = 'ABORT',
	Continue = 'CONTINUE',
	SetSpeed = 'SET_SPEED',
	DataTypesProcessed = 'DATA_TYPES_PROCESSED',
	ExportTypeProcessed = 'EXPORT_TYPES_PROCESSED'
}

export type ProcessDataTypesOnlyAction = {
	data: {
		action: GenerationWorkerActionType.ProcessDataTypesOnly;
		numResults: number;
		batchSize: number;
		unchanged: UnchangedGenerationData;
		columns: any; // TODO
		i18n: any;
		template: GenerationTemplate;
		countryNames: CountryNamesMap;
		workerUtilsUrl: string;
		dataTypeWorkerMap: DataTypeMap;
		countryData: CountryDataType;
	};
};

export type ProcessExportTypesOnlyAction = {
	data: {
		action: GenerationWorkerActionType.ProcessExportTypesOnly;
		rows: any; // TODO
		columns: any; // TODO
		isFirstBatch: boolean;
		isLastBatch: boolean;
		numResults: number;
		exportTypeSettings: any;
		stripWhitespace: boolean;
		workerUtilsUrl: string;
		exportTypeWorkerUrl: string;
	};
};

export type GenerateAction = {
	data: {
		action: GenerationWorkerActionType.Generate;
		numResults: number;
		batchSize: number;
		speed: number;
		columns: any; // TODO
		i18n: any;
		template: GenerationTemplate;
		countryData: CountryDataType;
		countryNames: CountryNamesMap;
		workerUtilsUrl: string;
		exportTypeWorkerUrl: string;
		dataTypeWorkerMap: DataTypeMap;
		exportTypeSettings: any;
		stripWhitespace: boolean;
		logDataBatch: () => void; // TODO
	};
};

export type PauseAction = {
	data: {
		action: GenerationWorkerActionType.Pause;
	};
}

export type AbortAction = {
	data: {
		action: GenerationWorkerActionType.Abort;
	};
}

export type ContinueAction = {
	data: {
		action: GenerationWorkerActionType.Continue;
	};
}

export type SetSpeedAction = {
	data: {
		action: GenerationWorkerActionType.SetSpeed;
		speed: number;
	};
};

export type GenerationActions = ProcessDataTypesOnlyAction | ProcessExportTypesOnlyAction | GenerateAction |
	AbortAction | PauseAction | ContinueAction | SetSpeedAction;
