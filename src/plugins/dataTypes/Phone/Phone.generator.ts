import utils from '../../../utils';

let coreUtilsLoaded = false;
onmessage = (e: any) => {
	if (!coreUtilsLoaded) {
		importScripts(e.data.workerResources.coreUtils);
		coreUtilsLoaded = true;
	}

	const item: string = utils.randomUtils.getRandomArrayValue(e.data.rowState);
	postMessage({
		display: utils.randomUtils.generateRandomAlphanumericStr(item)
	});
};
