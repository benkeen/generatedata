import { GenerationTemplate } from '~types/general';
import { UnchangedGenerationData } from '~types/generator';
import { CountryDataType, CountryNamesMap } from '~types/countries';
import { DataTypeMap } from '~types/dataTypes';
import { ExportTypeFolder } from '../../../_plugins';

export enum GenerationWorkerActionType {
	Generate = 'GENERATE',
	ProcessDataTypesOnly = 'PROCESS_DATA_TYPES_ONLY',
	ProcessExportTypesOnly = 'PROCESS_EXPORT_TYPES_ONLY',
	Pause = 'PAUSE',
	Abort = 'ABORT',
	Continue = 'CONTINUE',
	SetSpeed = 'SET_SPEED'
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
		dataTypes: DataTypeMap;
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
		exportType: ExportTypeFolder;
		numResults: number;
		exportTypeSettings: any;
		stripWhitespace: boolean;
		workerUtilsUrl: string;
		exportTypes: any; // TODO
	};
};

export type GenerateAction = {
	data: {
		action: GenerationWorkerActionType.Generate;
		numResults: number;
		batchSize: number;
		speed: number;
		i18n: any;
		template: GenerationTemplate;

		workerResources: any; // TODO
		// unchanged: data.unchanged || {},
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
