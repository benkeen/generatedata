import utils from '../../../utils';
import { DTOnMessage } from '~types/dataTypes';

const MAX_EMAIL_LENGTH = 254;

const getWords = () => {
	const { words } = utils.stringUtils.getLipsumWords();
	return words;
};

export const removePunctuation = (arr: string[]): string[] => arr.map((i: string) => i.replace(/[.,:;]/g, ''));

export const getRandomEmail = (wordsArr: string[], suffixes = ["edu", "com", "org", "ca", "net", "co.uk"]): string => {
	const numWords = wordsArr.length;
	const numPrefixWords = utils.randomUtils.getRandomNum(1, 3);
	const offset = utils.randomUtils.getRandomNum(0, numWords - (numPrefixWords + 1));
	const selectedWords = removePunctuation(wordsArr.slice(offset, offset + numPrefixWords));
	const prefix = selectedWords.join('.');

	// domain
	const numDomainWords = utils.randomUtils.getRandomNum(1, 3);
	const domainOffset = utils.randomUtils.getRandomNum(0, numWords - (numDomainWords + 1));
	const selectedDomainWords = removePunctuation(wordsArr.slice(domainOffset, domainOffset + numDomainWords));
	const domain = selectedDomainWords.join('');

	// suffix
	const suffix = utils.randomUtils.getRandomArrayValue(suffixes);

	// if the email exceeded 254 chars (the max valid number of chars), truncate it. This could be way
	// more elegant, but it's SUCH a fringe case I don't much mind
	let email = `${prefix}@${domain}.${suffix}`.toLowerCase();
	const length = email.length;
	if (length > MAX_EMAIL_LENGTH) {
		const prefixChunk = prefix.slice(0, Math.ceil(prefix.length / 2));
		const domainChunk = domain.slice(0, Math.ceil(domain.length / 2));
		email = `${prefixChunk}@${domainChunk}.${suffix}`.toLowerCase();
	}

	return email;
};

let utilsLoaded = false;
export const onmessage = (e: DTOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	const words = getWords();

	postMessage({
		display: getRandomEmail(words)
	});
};

