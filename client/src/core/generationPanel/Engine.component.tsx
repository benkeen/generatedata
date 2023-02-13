import { useEffect } from 'react';
import * as coreUtils from '~utils/coreUtils';
import C from '~core/constants';
import useDidUpdate from '../../hooks/useDidUpdate';
import { DataPacket } from '~store/packets/packets.reducer';
import { CountryDataType, CountryNamesMap } from '~types/countries';
import { GenerationWorkerActionType } from '~core/generator/generation.types';
import { ExportTypeMap } from '~types/exportTypes';
import { DataTypeMap } from '~types/dataTypes';

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
const Engine = ({ packet, fullI18n, logDataBatch, countryNames, countryData, dataTypeWorkerMap, exportTypeWorkerMap, workerUtilsUrl }: EngineProps): any => {
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
			action: GenerationWorkerActionType.Generate,
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
			action: isPaused ? GenerationWorkerActionType.Pause : GenerationWorkerActionType.Continue
		});
	}, [isPaused]);

	useDidUpdate(() => {
		generationWorker.postMessage({
			action: GenerationWorkerActionType.SetSpeed,
			speed
		});
	}, [speed]);

	return null;
};

export default Engine;
