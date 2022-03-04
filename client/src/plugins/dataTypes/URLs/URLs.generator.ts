import { DTGenerationData, DTGenerateResult, DTOnMessage } from '~types/dataTypes';

let utilsLoaded = false;
export const onmessage = (e: DTOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}
	postMessage(generate(e.data));
};

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const { panSource, targetPanRowId } = data.rowState;

	return {
		display: `%B${panWithoutSpaces}=${date}${serviceCode}${dataItem}?${lrc}`
	};
};
