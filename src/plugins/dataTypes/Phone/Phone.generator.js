var coreUtilsLoaded = false;

onmessage = function (e) {
	if (!coreUtilsLoaded) {
		importScripts(e.data.workerResources.coreUtils);
		coreUtilsLoaded = true;
	}

	var item = utils.randomUtils.getRandomArrayValue(e.data.rowState);
	postMessage({
		display: utils.randomUtils.generateRandomAlphanumericStr(item)
	});
};
