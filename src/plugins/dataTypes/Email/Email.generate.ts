import { getRandomNum, getRandomArrayValue } from '../../../utils/randomUtils';
import { getLipsumWords } from '../../../utils/stringUtils';
import { DTMetadata, DTGenerateResult } from '../../../../types/dataTypes';


const MAX_EMAIL_LENGTH = 254;
const { words } = getLipsumWords();

const removePunctuation = (arr: string[]): string[] => arr.map((i: string) => i.replace(/[.,:;]/g, ''));

export const getRandomEmail = (wordsArr = words, suffixes = ["edu", "com", "org", "ca", "net", "co.uk"]): string => {
	const numWords = wordsArr.length;
	const numPrefixWords = getRandomNum(1, 3);
	const offset = getRandomNum(0, numWords - (numPrefixWords + 1));
	const selectedWords = removePunctuation(wordsArr.slice(offset, offset + numPrefixWords));
	const prefix = selectedWords.join('.');

	// domain
	const numDomainWords = getRandomNum(1, 3);
	const domainOffset = getRandomNum(0, numWords - (numDomainWords + 1));
	const selectedDomainWords = removePunctuation(wordsArr.slice(domainOffset, domainOffset + numDomainWords));
	const domain = selectedDomainWords.join('');

	// suffix
	const suffix = getRandomArrayValue(suffixes);

	// if the email exceeded 254 chars (the max valid number of chars), truncate it. This could be way
	// more elegant, but it's SUCH a fringe case I don't much mind
	let email = `${prefix}@${domain}.${suffix}`;
	const length = email.length;
	if (length > MAX_EMAIL_LENGTH) {
		const prefixChunk = prefix.slice(0, Math.ceil(prefix.length / 2));
		const domainChunk = domain.slice(0, Math.ceil(domain.length / 2));
		email = `${prefixChunk}@${domainChunk}.${suffix}`;
	}

	return email;
};


export const generate = (): DTGenerateResult => ({ display: getRandomEmail() });

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'string'
	},
	sql: {
		field: 'varchar(255) default NULL',
		field_Oracle: 'varchar2(255) default NULL',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});
