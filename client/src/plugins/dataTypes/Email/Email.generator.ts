import utils from '../../../utils';
import { DTOnMessage } from '~types/dataTypes';
import { StringSource } from './Email';

const MAX_EMAIL_LENGTH = 254;

const getWords = () => {
	const { words } = utils.stringUtils.getLipsumWords();
	return words;
};

export const cleanChars = (arr: string[]): string[] => arr.map((i: string) => i.replace(/[^0-9a-zA-Z]/g, ''));

export const getEmail = (domains: string[], domainSuffixes: string[], data = null): string => {

	/*
	[field1].[field2]
	[field2].[field1]
	[field1][field2]
	[field2][field1]
	[field1][field2][random num 1-4 chars]
	[field2][field1][random num 1-4 chars]
	[field1 [one char][field2]
	[field2 [one char]][field1]
	[field1 [one char]][field2][random num 1-4 chars]
	[field2 [one char]][field1][random num 1-4 chars]
	*/

	return '';
};

export const getRandomEmail = (wordsArr: string[], domains: string[], domainSuffixes: string[]): string => {
	// random emails
	const numWords = wordsArr.length;
	const numPrefixWords = utils.randomUtils.getRandomNum(1, 3);
	const offset = utils.randomUtils.getRandomNum(0, numWords - (numPrefixWords + 1));
	const selectedWords = cleanChars(wordsArr.slice(offset, offset + numPrefixWords));
	const prefix = selectedWords.join('.');

	// domain
	let domainStr = utils.randomUtils.getRandomArrayValue(domains);
	if (domainStr.indexOf('.') === -1) {
		domainStr += `.${utils.randomUtils.getRandomArrayValue(domainSuffixes)}`;
	}

	// if the email exceeded 254 chars (the max valid number of chars), truncate it. This could be way
	// more elegant, but it's SUCH a fringe case I don't much mind
	let email = `${prefix}@${domainStr}`.toLowerCase();
	const length = email.length;
	if (length > MAX_EMAIL_LENGTH) {
		const prefixChunk = prefix.slice(0, Math.ceil(prefix.length / 2));
		email = `${prefixChunk}@${domainStr}`.toLowerCase();
	}

	return email;
};

let utilsLoaded = false;
export const onmessage = (e: DTOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	const { source, fieldId1, fieldId2, domains, domainSuffixes } = e.data.rowState;
	const { existingRowData } = e.data;

	let email = '';
	if (!source || source === StringSource.random) {
		const words = getWords();
		email = getRandomEmail(words, domains, domainSuffixes);
	} else {
		const dataMap: any = {};
		existingRowData.forEach(({ id, data }) => {
			if (id === fieldId1 || id === fieldId2) {
				dataMap[id] = data.display;
			}
		});
		email = getEmail(domains, domainSuffixes, dataMap);
	}

	postMessage({
		display: email
	});
};


















