import { useEffect } from 'react';
import * as coreUtils from '~utils/coreUtils';
import C from '~core/constants';
import useDidUpdate from '../../hooks/useDidUpdate';
import { DataPacket } from '~store/packets/packets.reducer';
import { CountryNamesMap } from '~types/countries';
import { GenerationWorkerActionType } from '~core/generator/generator.types';

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

	const { isPaused, config, dataTypeWorkerId, exportTypeWorkerId, numGeneratedRows, speed } = packet;
	const { numRowsToGenerate, columns, template, exportType, exportTypeSettings, stripWhitespace } = config;

	const dataTypeWorker = coreUtils.getDataTypeWorker(dataTypeWorkerId);
	const exportTypeWorker = coreUtils.getExportTypeWorker(exportTypeWorkerId);

	useEffect(() => {
		if (numGeneratedRows !== 0) {
			return;
		}

		// TODO move all this to a generatorUtils helper. That'll handle farming out work to both plugin types

		// just fires once at the start of the data generation. This kicks off the whole process.
		dataTypeWorker.postMessage({
			action: 'generate',
			numResults: numRowsToGenerate,
			batchSize: C.GENERATION_BATCH_SIZE,
			speed,
			columns,
			i18n: fullI18n,
			template,
			countryNames,
			workerResources
		});

		dataTypeWorker.onmessage = ({ data }: any): void => {
			const { completedBatchNum, numGeneratedRows, generatedData } = data;
			const isLastBatch = numGeneratedRows >= numRowsToGenerate;
			const displayData = generatedData.map((row: any) => row.map((i: any) => i.display));

			exportTypeWorker.postMessage({
				rows: displayData,
				columns,
				exportType,
				exportTypeSettings,
				stripWhitespace,
				isFirstBatch: completedBatchNum === 1,
				isLastBatch,
				workerResources
			});

			exportTypeWorker.onmessage = (resp: any): void => {
				logDataBatch(numGeneratedRows, resp.data);
			};
		};
	}, [numGeneratedRows]);

	useDidUpdate(() => {
		dataTypeWorker.postMessage({
			action: isPaused ? GenerationWorkerActionType.Pause : GenerationWorkerActionType.Continue
		});
	}, [isPaused]);

	useDidUpdate(() => {
		dataTypeWorker.postMessage({
			action: GenerationWorkerActionType.SetSpeed,
			speed
		});
	}, [speed]);

	return null;
};

export default Engine;
