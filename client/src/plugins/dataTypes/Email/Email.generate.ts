import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';
import { WorkerUtils } from '~utils/workerUtils';
import { StringSourceEnum } from './Email.state';

let utils: WorkerUtils;
const MAX_EMAIL_LENGTH = 254;

const getWords = (): string[] => {
	const { words } = utils.stringUtils.getLipsumWords();
	return words;
};

export const setUtils = (workerUtils: WorkerUtils) => utils = workerUtils;

export const cleanChars = (str: string): string => str.replace(/[^0-9a-zA-Z]/g, '').toLowerCase();
export const cleanArray = (arr: string[]): string[] => arr.map(cleanChars);

const getOneNameField = (name: string): string => {
	const parts = cleanArray(name.split(/\s+/));
	const delim = utils.randomUtils.getRandomArrayValue(['.', '_', '-', '']);
	const randomSize = utils.randomUtils.getRandomNum(1, parts.length);

	let email = utils.randomUtils.getRandomSubset(parts, randomSize).join(delim); // 5 is arbitrary - names should probably only ever have 2 or 3

	if (utils.randomUtils.getRandomBool()) {
		email += utils.randomUtils.getRandomNum(1, 9999);
	}

	return email;
};

const getTwoNameField = (data: string[]): string => {
	const pattern = utils.randomUtils.getRandomNum(0, 3);
	const delim = utils.randomUtils.getRandomArrayValue(['.', '_', '-', '']);

	let email = '';
	switch (pattern) {
		case 0:
			email = `${data[0]}${delim}${data[1]}`;
			break;
		case 1:
			email = `${data[1]}${delim}${data[0]}`;
			break;
		case 2:
			email = `${data[0].substring(0, 1)}${delim}${data[1]}`;
			break;
		case 3:
			email = `${data[1].substring(0, 1)}${delim}${data[0]}`;
			break;
	}

	if (utils.randomUtils.getRandomBool()) {
		email += utils.randomUtils.getRandomNum(1, 9999);
	}

	return email;
};

export const getEmailPrefix = (fieldData: string[]): string => {
	let prefix = '';
	if (fieldData.length === 1) {
		prefix = getOneNameField(fieldData[0]);
	} else if (fieldData.length === 2) {
		prefix = getTwoNameField(fieldData);
	}
	return prefix;
};

export const getRandomEmailPrefix = (wordsArr: string[]): string => {
	const numWords = wordsArr.length;
	const numPrefixWords = utils.randomUtils.getRandomNum(1, 3);
	const offset = utils.randomUtils.getRandomNum(0, numWords - (numPrefixWords + 1));
	const selectedWords = cleanArray(wordsArr.slice(offset, offset + numPrefixWords));
	return selectedWords.join('.');
};

export const getDomain = (domains: string[], domainSuffixes: string[]): string => {
	let domainStr = utils.randomUtils.getRandomArrayValue(domains);
	if (domainStr.indexOf('.') === -1) {
		domainStr += `.${utils.randomUtils.getRandomArrayValue(domainSuffixes)}`;
	}
	return domainStr;
};

const getFinalEmail = (prefix: string, domain: string): string => {
	// if the email exceeded 254 chars (the max valid number of chars), truncate it. This could be way
	// more elegant, but it's SUCH a fringe case I don't much mind
	let email = `${prefix}@${domain}`.toLowerCase();

	const length = email.length;
	if (length > MAX_EMAIL_LENGTH) {
		const prefixChunk = prefix.slice(0, Math.ceil(prefix.length / 2));
		email = `${prefixChunk}@${domain}`.toLowerCase();
	}

	return email;
};

export const generate = (data: DTGenerationData, workerUtils: WorkerUtils): DTGenerateResult => {
	setUtils(workerUtils);

	const { source, fieldId1, fieldId2, domains, domainSuffixes } = data.rowState;
	const { existingRowData } = data;

	if (!domains.length || !domainSuffixes.length) {
		return { display: '' };
	}

	let prefix = '';
	if (!source || source === StringSourceEnum.random) {
		const words = getWords();
		prefix = getRandomEmailPrefix(words);
	} else {
		const fieldData: any[] = [];
		existingRowData.forEach(({ id, data }) => {
			if (id === fieldId1 || id === fieldId2) {
				fieldData.push(cleanChars(data.display as string));
			}
		});

		prefix = getEmailPrefix(fieldData);
	}

	const domain = getDomain(domains, domainSuffixes);

	return {
		display: getFinalEmail(prefix, domain)
	};
};
