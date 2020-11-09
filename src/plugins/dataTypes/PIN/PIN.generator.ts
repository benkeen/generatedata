import { getRandomNum } from '~utils/randomUtils';

onmessage = () => {
	postMessage({
		display: getRandomNum(1111, 9999)
	});
};
