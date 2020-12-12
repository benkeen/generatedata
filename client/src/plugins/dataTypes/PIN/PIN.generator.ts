import utils from '../../../utils';

export const onmessage = () => {
	postMessage({
		display: utils.randomUtils.getRandomNum(1111, 9999)
	});
};
