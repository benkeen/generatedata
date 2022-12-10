import utils from '../../../utils';

let workerUtilsLoaded = false;
export const onmessage = (e: any) => {
	if (!workerUtilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		workerUtilsLoaded = true;
	}

	const item: string = utils.randomUtils.getRandomArrayValue(e.data.rowState);
	postMessage({
		display: utils.randomUtils.generateRandomAlphanumericStr(item)
	});
};
