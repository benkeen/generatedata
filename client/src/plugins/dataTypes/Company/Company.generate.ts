import { WorkerUtils } from '~utils/workerUtils';
import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';

let utils: WorkerUtils;

const getWords = (): string[] => {
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

export const setUtils = (workerUtils: WorkerUtils) => utils = workerUtils;

export const generate = (data: DTGenerationData, workerUtils: WorkerUtils): DTGenerateResult => {
	setUtils(workerUtils);

	const words = getWords();
	return {
		display: generateCompanyName(words)
	};
};
