import { DTGenerationData, DTGenerateResult } from '~types/dataTypes';

const eval2 = eval;
export const generate = (data: DTGenerationData): DTGenerateResult => {
	const rowNum = data.rowNum;
	const { incrementStart, incrementValue, incrementPlaceholder } = data.rowState;

	let value = ((rowNum - 1) * incrementValue) + incrementStart;
	if (incrementPlaceholder) {
		// value = value.replace(/\${INCR}/g, value);
		value = eval2('`' + value + '`');
	}
	return { display: value };
};

let utilsLoaded = false;

const onmessage = (e: any) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	postMessage(generate(e.data));
};

export {};
