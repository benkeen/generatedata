import { useEffect } from 'react';
import * as coreUtils from '~utils/coreUtils';
import C from '~core/constants';
import useDidUpdate from '../../hooks/useDidUpdate';
import { DataPacket } from '~store/packets/packets.reducer';
import { CountryNamesMap } from '~types/countries';
import { GenerationWorkerActionType } from '~core/generator/generation.types';

export type EngineProps = {
	fullI18n: any;
	packet: DataPacket | null;
	workerResources: any;
	logDataBatch: (numGeneratedRows: number, data: any) => void;
	countryNames: CountryNamesMap | null;
};

// this component does the actual work of generating the data and populating the store. It doesn't have a DOM presence,
// it's just done this way to utilize the lifecycle methods
const Engine = ({ packet, workerResources, logDataBatch, fullI18n, countryNames }: EngineProps): any => {
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

		// just fires once at the start of the data generation. This kicks off the whole process.
		generationWorker.postMessage({
			action: GenerationWorkerActionType.ProcessDataTypesOnly,
			numResults: numRowsToGenerate,
			batchSize: C.GENERATION_BATCH_SIZE,
			speed,
			columns,
			i18n: fullI18n,
			template,
			countryNames,
			workerResources
		});

		generationWorker.onmessage = ({ data }: any): void => {
			console.log('---> ', data);

			const { completedBatchNum, numGeneratedRows, generatedData } = data;
			const isLastBatch = numGeneratedRows >= numRowsToGenerate;
			const displayData = generatedData.map((row: any) => row.map((i: any) => i.display));

			// TODO
			// exportTypeWorker.postMessage({
			// 	rows: displayData,
			// 	columns,
			// 	exportType,
			// 	exportTypeSettings,
			// 	stripWhitespace,
			// 	isFirstBatch: completedBatchNum === 1,
			// 	isLastBatch,
			// 	workerResources
			// });
			//
			// exportTypeWorker.onmessage = (resp: any): void => {
			// 	logDataBatch(numGeneratedRows, resp.data);
			// };
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
