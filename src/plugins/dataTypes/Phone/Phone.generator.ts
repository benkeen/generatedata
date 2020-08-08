import utils from '../../../utils';

let workerUtilsLoaded = false;
onmessage = (e: any) => {
	if (!workerUtilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		workerUtilsLoaded = true;
	}

	const item: string = utils.randomUtils.getRandomArrayValue(e.data.rowState);
	postMessage({
		display: utils.randomUtils.generateRandomAlphanumericStr(item)
	});
};
