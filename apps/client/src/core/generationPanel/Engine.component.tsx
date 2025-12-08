import C from '@generatedata/config/constants';
import { CountryNamesMap, DataTypeMap, ExportTypeMap } from '@generatedata/plugins';
import { CountryDataType } from '@generatedata/types';
import { useEffect } from 'react';
import { DataPacket } from '~store/packets/packets.reducer';
import useDidUpdate from '../../hooks/useDidUpdate';
import * as coreUtils from '../../utils/coreUtils';

export type EngineProps = {
  fullI18n: any;
  packet: DataPacket | null;
  logDataBatch: (numGeneratedRows: number, data: any) => void;
  workerUtilsUrl: string;
  dataTypeWorkerMap: DataTypeMap;
  exportTypeWorkerMap: ExportTypeMap;
  dataTypes: DataTypeMap;
  countryNames: CountryNamesMap | null;
  countryData: CountryDataType;
};

// this component does the actual work of generating the data and populating the store. It doesn't have a DOM presence,
// it's just done this way to utilize the lifecycle methods
const Engine = ({
  packet,
  fullI18n,
  logDataBatch,
  countryNames,
  countryData,
  dataTypeWorkerMap,
  exportTypeWorkerMap,
  workerUtilsUrl
}: EngineProps): any => {
  if (packet === null || fullI18n === null) {
    return null;
  }
  const { isPaused, config, generationWorkerId, numGeneratedRows, speed } = packet;
  const { numRowsToGenerate, columns, template, exportType, exportTypeSettings, stripWhitespace } = config;
  const generationWorker = coreUtils.getGenerationWorker(generationWorkerId);

  useEffect(() => {
    if (numGeneratedRows !== 0) {
      return;
    }

    generationWorker.postMessage({
      action: 'Generate',
      numResults: numRowsToGenerate,
      batchSize: C.GENERATION_BATCH_SIZE,
      speed,
      columns,
      i18n: fullI18n,
      template,
      countryNames,
      countryData,
      workerUtilsUrl,
      dataTypeWorkerMap,
      exportTypeWorkerUrl: exportTypeWorkerMap[exportType],
      exportTypeSettings,
      stripWhitespace
    });

    generationWorker.onmessage = ({ data }): void => {
      logDataBatch(data.numGeneratedRows, data.data);
    };
  }, [numGeneratedRows]);

  useDidUpdate(() => {
    generationWorker.postMessage({
      action: isPaused ? 'Pause' : 'Continue'
    });
  }, [isPaused]);

  useDidUpdate(() => {
    generationWorker.postMessage({
      action: 'SetSpeed',
      speed
    });
  }, [speed]);

  return null;
};

export default Engine;
