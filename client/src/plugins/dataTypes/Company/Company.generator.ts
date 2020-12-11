import utils from '../../../utils';
import { DTOnMessage } from '~types/dataTypes';

const getWords = () => {
	const { words } = utils.stringUtils.getLipsumWords();
	return words;
};

const companyTypes = [
	'Company', 'Corp.', 'Corporation', 'Inc.', 'Incorporated', 'LLC', 'LLP', 'Ltd', 'Limited',
	'PC', 'Foundation', 'Institute', 'Associates', 'Industries', 'Consulting'
];

const removePunctuation = (arr: string[]): string[] => arr.map((i: string) => i.replace(/[.,:;]/g, ''));

export const generateCompanyName = (wordsArr: string[], types = companyTypes): string => {
	const numCompanyNameWords = utils.randomUtils.getRandomNum(1, 3);
	const offset = utils.randomUtils.getRandomNum(0, wordsArr.length - (numCompanyNameWords + 1));
	const selectedWords = removePunctuation(wordsArr.slice(offset, offset + numCompanyNameWords));
	const companyType = types[utils.randomUtils.getRandomNum(0, types.length - 1)];

	return utils.stringUtils.uppercaseWords(selectedWords.join(' ')) + ' ' + companyType;
};

let utilsLoaded = false;

export const onmessage = (e: DTOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	const words = getWords();

	postMessage({
		display: generateCompanyName(words)
	});
};
