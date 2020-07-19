declare var utils: any;

let coreUtilsLoaded = false;

const onmessage = (e: any) => {
	if (!coreUtilsLoaded) {
		importScripts(e.data.workerResources.coreUtils);
		coreUtilsLoaded = true;
	}

	const item = utils.randomUtils.getRandomArrayValue(e.data.rowState);
	postMessage({
		display: utils.randomUtils.generateRandomAlphanumericStr(item)
	});
};

// stupid TS: https://stackoverflow.com/a/41975448/1217608
export {};
