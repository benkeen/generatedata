import { CountryNamesMap, DataTypeMap, GenerationTemplate } from '@generatedata/plugins';
import { CountryDataType } from '@generatedata/types';
import { UnchangedGenerationData } from '~types/generator';

export type GenerationWorkerActionType =
  | 'Generate'
  | 'ProcessDataTypesOnly'
  | 'ProcessExportTypeOnly'
  | 'Pause'
  | 'Abort'
  | 'Continue'
  | 'SetSpeed'
  | 'DataTypesProcessed'
  | 'ExportTypeProcessed';

export type ProcessDataTypesOnlyAction = {
  data: {
    action: 'ProcessDataTypesOnly';
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
    action: 'ProcessExportTypeOnly';
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
    action: 'Generate';
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
    action: 'Pause';
  };
};

export type AbortAction = {
  data: {
    action: 'Abort';
  };
};

export type ContinueAction = {
  data: {
    action: 'Continue';
  };
};

export type SetSpeedAction = {
  data: {
    action: 'SetSpeed';
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
