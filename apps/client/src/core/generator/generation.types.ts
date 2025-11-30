import { CountryNamesMap, DataTypeMap, GenerationTemplate } from '@generatedata/plugins';
import { CountryDataType } from '@generatedata/types';
import { UnchangedGenerationData } from '~types/generator';

export enum GenerationWorkerActionType {
  Generate = 'GENERATE',
  ProcessDataTypesOnly = 'PROCESS_DATA_TYPES_ONLY',
  ProcessExportTypeOnly = 'PROCESS_EXPORT_TYPES_ONLY',
  Pause = 'PAUSE',
  Abort = 'ABORT',
  Continue = 'CONTINUE',
  SetSpeed = 'SET_SPEED',
  DataTypesProcessed = 'DATA_TYPES_PROCESSED',
  ExportTypeProcessed = 'EXPORT_TYPE_PROCESSED'
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

export type ProcessExportTypeOnlyAction = {
  data: {
    action: GenerationWorkerActionType.ProcessExportTypeOnly;
    rows: any; // TODO
    columns: any; // TODO
    isFirstBatch: boolean;
    isLastBatch: boolean;
    currentBatch: number;
    batchSize: number;
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
};

export type AbortAction = {
  data: {
    action: GenerationWorkerActionType.Abort;
  };
};

export type ContinueAction = {
  data: {
    action: GenerationWorkerActionType.Continue;
  };
};

export type SetSpeedAction = {
  data: {
    action: GenerationWorkerActionType.SetSpeed;
    speed: number;
  };
};

export type GenerationActions =
  | ProcessDataTypesOnlyAction
  | ProcessExportTypeOnlyAction
  | GenerateAction
  | AbortAction
  | PauseAction
  | ContinueAction
  | SetSpeedAction;
