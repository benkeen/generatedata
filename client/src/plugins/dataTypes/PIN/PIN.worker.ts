import utils from '../../../utils';

let workerUtilsLoaded = false;
export const onmessage = (e: any) => {
	if (!workerUtilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		workerUtilsLoaded = true;
	}
	postMessage({
		display: utils.randomUtils.getRandomNum(1111, 9999)
	});
};
