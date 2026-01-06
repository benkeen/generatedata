import type { DataTypeMap } from '@generatedata/plugins';
import type { GenerationActions } from '~core/generator/generation.types';
import type { DataTypeBatchGeneratedPayload, DataTypeWorkerInterface, WorkerInterface } from '~types/generator';
import generatorUtils from '../../utils/generatorUtils';

const context: Worker = self as any;
const workerCache: any = {};

context.onmessage = (e: GenerationActions) => {
  if (e.data.action === 'Pause') {
    generatorUtils.pause();
  } else if (e.data.action === 'Abort') {
    generatorUtils.pause();
  } else if (e.data.action === 'Continue') {
    generatorUtils.continue();
  } else if (e.data.action === 'SetSpeed') {
    generatorUtils.setSpeed(e.data.speed);
  } else if (e.data.action === 'ProcessDataTypesOnly') {
    generatorUtils.generateDataTypes({
      ...e.data,
      onBatchComplete: (data: DataTypeBatchGeneratedPayload) => {
        console.log('problem here --- ');
        // PROBLEM HERE: this isn't being picked up when first selecting a new Data Type for a row
        context.postMessage({
          event: 'DataTypesProcessed',
          data
        });
      },
      dataTypeInterface: getDataTypeWorkerInterface(e.data.dataTypeWorkerMap)
    });
  } else if (e.data.action === 'ProcessExportTypeOnly') {
    generatorUtils.generateExportTypes({
      ...e.data,
      settings: e.data.exportTypeSettings,
      onComplete: (data: string) => {
        context.postMessage({
          event: 'ExportTypeProcessed',
          data
        });
      },
      exportTypeInterface: getWorkerInterface(e.data.exportTypeWorkerUrl)
    });

    // this worker action combines the two above for easier usage. Used in the generator where it doesn't need such
    // granular control as with the preview panel
  } else if (e.data.action === 'Generate') {
    // TODO move whole chunk to generatorUtils ...
    const {
      columns,
      numResults,
      batchSize,
      i18n,
      template,
      countryNames,
      workerUtilsUrl,
      countryData,
      stripWhitespace,
      exportTypeSettings,
      exportTypeWorkerUrl,
      dataTypeWorkerMap
    } = e.data;

    const onBatchComplete = ({ completedBatchNum, numGeneratedRows, generatedData }: any): void => {
      const isLastBatch = numGeneratedRows >= numResults;
      const displayData = generatedData.map((row: any) => row.map((i: any) => i.display));

      generatorUtils.generateExportTypes({
        numResults,
        isFirstBatch: completedBatchNum === 1,
        isLastBatch,
        currentBatch: completedBatchNum,
        batchSize,
        rows: displayData,
        columns,
        stripWhitespace,
        settings: exportTypeSettings,
        workerUtilsUrl,
        onComplete: (data: string) => {
          context.postMessage({
            event: 'ExportTypeProcessed',
            numGeneratedRows,
            data
          });
        },
        exportTypeInterface: getWorkerInterface(exportTypeWorkerUrl)
      });
    };

    generatorUtils.generateDataTypes({
      numResults,
      batchSize,
      i18n,
      template,
      countryNames,
      workerUtilsUrl,
      countryData,
      onBatchComplete,
      dataTypeInterface: getDataTypeWorkerInterface(dataTypeWorkerMap)
    });
  }
};

// this standardizes the interface for communication between the workers, allowing generatorUtils to work for both
// workers + backend code
interface GetWorkerInterface {
  (workerMap: DataTypeMap): DataTypeWorkerInterface;
}

// this standardizes the interface for communication between the workers, allowing generatorUtils to work for both
// workers + backend code
const getDataTypeWorkerInterface: GetWorkerInterface = (workerMap) => {
  const workerInterface: DataTypeWorkerInterface = {};
  Object.keys(workerMap).forEach((plugin) => {
    // @ts-ignore
    workerInterface[plugin] = getWorkerInterface(workerMap[plugin]);
  });
  return workerInterface;
};

const getWorkerInterface = (workerPath: string): WorkerInterface => {
  let workerInterface: WorkerInterface;

  if (workerCache[workerPath]) {
    workerInterface = workerCache[workerPath];
  } else {
    const worker = new Worker(workerPath);

    let onSuccess: any;
    const onRegisterSuccess = (f: any) => (onSuccess = f);
    worker.onmessage = (resp: any) => {
      // TODO typings
      if (onSuccess) {
        onSuccess(resp);
      }
    };

    let onError: any;
    const onRegisterError = (f: any) => (onError = f);
    worker.onerror = (resp: any) => {
      if (onError) {
        onError(resp);
      }
    };

    workerInterface = {
      context: 'worker',
      send: worker.postMessage,
      onSuccess: onRegisterSuccess,
      onError: onRegisterError
    };

    // bind the method to this new worker, not the main generation worker (i.e. this file)
    workerInterface.send = workerInterface.send.bind(worker);

    workerCache[workerPath] = workerInterface;
  }

  return workerInterface;
};

export {};
