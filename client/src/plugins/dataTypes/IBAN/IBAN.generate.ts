/**
 * Original author (PHP): Joeri Noort <joert@joert.net>
 */
import { DTGenerateResult } from '~types/dataTypes';
import { WorkerUtils } from '~utils/workerUtils';

let utils: WorkerUtils;

// Template definition
// 	b :	NATIONAL_BANK_CODE
// 	i :	BIC_CODE
// 	d :	BRANCH_ID
// 	c :	ACCOUNT_NUMBER
// 	k :	IBAN_CHECKSUM
// 	x :	NATIONAL_CHECKSUM
// 	m :	MOD11_CHECKSUM
// 	t :	ACCOUNT_TYPE
// 	p :	PERSONAL_NUMBER
// 	n :	COUNTRY_CODE
//
//  Based on http://en.wikipedia.org/wiki/International_Bank_Account_Number#IBAN_formats_by_country
//  Corrected using various sources
const countryCodes = [
	{ code: 'AL', sepa: false, template: 'ALkkbbbddddxcccccccccccccccc', name: 'Albania' },
	{ code: 'AD', sepa: false, template: 'ADkkbbbbddddcccccccccccc', name: 'Andorra' },
	{ code: 'AT', sepa: true, template: 'ATkkbbbbbccccccccccc', name: 'Austria' },
	{ code: 'AZ', sepa: false, template: 'AZkkbbbbcccccccccccccccccccc', name: 'Azerbaijan' },
	{ code: 'BE', sepa: true, template: 'BEkkbbbcccccccxx', name: 'Belgium' },
	{ code: 'BH', sepa: false, template: 'BHkkbbbbcccccccccccccc', name: 'Bahrain' },
	{ code: 'BA', sepa: false, template: 'BAkkbbbdddccccccccxx', name: 'Bosnia and Herzegovina' },
	{ code: 'BG', sepa: true, template: 'BGkkiiiiddddttcccccccc', name: 'Bulgaria' },
	{ code: 'CR', sepa: false, template: 'CRkkbbbcccccccccccccc', name: 'Costa Rica' },
	{ code: 'HR', sepa: false, template: 'HRkkbbbbbbbcccccccccc', name: 'Croatia' },
	{ code: 'CY', sepa: true, template: 'CYkkbbbdddddcccccccccccccccc', name: 'Cyprus' },
	{ code: 'CZ', sepa: true, template: 'CZkkbbbbddddddcccccccccc', name: 'Czech Republic' },
	{ code: 'DK', sepa: true, template: 'DKkkbbbbcccccccccc',name: 'Denmark' },
	{ code: 'DO', sepa: false, template: 'DOkkbbbbcccccccccccccccccccc', name: 'Dominican Republic' },
	{ code: 'EE', sepa: true, template: 'EEkkbbddcccccccccccx', name: 'Estonia' },
	{ code: 'FO', sepa: false, template: 'FOkkbbbbcccccccccx', name: 'Faroe Islands' },
	{ code: 'FI', sepa: true, template: 'FIkkbbbbbbcccccccx', name: 'Finland' },
	{ code: 'FR', sepa: true, template: 'FRkkbbbbbdddddcccccccccccxx', name: 'France' },
	{ code: 'GE', sepa: false, template: 'GEkkbbcccccccccccccccc', name: 'Georgia' },
	{ code: 'DE', sepa: true, template: 'DEkkbbbbbbbbcccccccccc', name: 'Germany' },
	{ code: 'GI', sepa: false, template: 'GIkkiiiiccccccccccccccc', name: 'Gibraltar' },
	{ code: 'GR', sepa: true, template: 'GRkkbbbddddcccccccccccccccc', name: 'Greece' },
	{ code: 'GL', sepa: false, template: 'GLkkbbbbcccccccccc', name: 'Greenland' },
	{ code: 'GT', sepa: false, template: 'GTkkbbbbcccccccccccccccccccc', name: 'Guatemala' },
	{ code: 'HU', sepa: true, template: 'HUkkbbbddddxcccccccccccccccx', name: 'Hungary' },
	{ code: 'IS', sepa: true, template: 'ISkkbbbbddccccccpppppppppp', name: 'Iceland' },
	{ code: 'IE', sepa: true, template: 'IEkkiiiibbbbbbcccccccc', name: 'Ireland' },
	{ code: 'IL', sepa: false, template: 'ILkkbbbnnnccccccccccccc', name: 'Israel' },
	{ code: 'IT', sepa: true, template: 'ITkkxiiiiibbbbbcccccccccccc', name: 'Italy' },
	{ code: 'KZ', sepa: false, template: 'KZkkbbbccccccccccccc', name: 'Kazakhstan' },
	{ code: 'KW', sepa: false, template: 'KWkkbbbbcccccccccccccccccccccc', name: 'Kuwait' },
	{ code: 'LV', sepa: true, template: 'LVkkiiiiccccccccccccc', name: 'Latvia' },
	{ code: 'LB', sepa: false, template: 'LBkkbbbbcccccccccccccccccccc', name: 'Lebanon' },
	{ code: 'LI', sepa: true, template: 'LIkkbbbbbcccccccccccc', name: 'Liechtenstein' },
	{ code: 'LT', sepa: true, template: 'LTkkbbbbbccccccccccc', name: 'Lithuania' },
	{ code: 'LU', sepa: true, template: 'LUkkbbbccccccccccccc', name: 'Luxembourg' },
	{ code: 'MK', sepa: false, template: 'MKkkbbbccccccccccxx', name: 'Macedonia' },
	{ code: 'MT', sepa: true, template: 'MTkkiiiidddddcccccccccccccccccc', name: 'Malta' },
	{ code: 'MR', sepa: false, template: 'MRkkbbbbbdddddcccccccccccxx', name: 'Mauritania' },
	{ code: 'MU', sepa: false, template: 'MUkkbbbbbbddcccccccccccccccccc', name: 'Mauritius' },
	{ code: 'MC', sepa: true, template: 'MCkkbbbbbdddddcccccccccccxx', name: 'Monaco' },
	{ code: 'MD', sepa: false, template: 'MDkkbbcccccccccccccccccc', name: 'Moldova' },
	{ code: 'ME', sepa: false, template: 'MEkkbbbcccccccccccccxx', name: 'Montenegro' },
	{ code: 'NL', sepa: true, template: 'NLkkiiiicccccccccc', name: 'Netherlands' },
	{ code: 'NO', sepa: true, template: 'NOkkbbbbccccccx', name: 'Norway' },
	{ code: 'PK', sepa: false, template: 'PKkkbbbbcccccccccccccccc', name: 'Pakistan' },
	{ code: 'PS', sepa: false, template: 'PSkkbbbbxxxxxxxxxcccccccccccc', name: 'Palestinian Territory, Occupied' },
	{ code: 'PL', sepa: true, template: 'PLkkbbbddddxcccccccccccccccc', name: 'Poland' },
	{ code: 'PT', sepa: true, template: 'PTkkbbbbddddcccccccccccxx', name: 'Portugal' },
	{ code: 'RO', sepa: true, template: 'ROkkiiiicccccccccccccccc', name: 'Romania' },
	{ code: 'SM', sepa: false, template: 'SMkkxbbbbbdddddcccccccccccc', name: 'San Marino' },
	{ code: 'SA', sepa: false, template: 'SAkkbbcccccccccccccccccc', name: 'Saudi Arabia' },
	{ code: 'RS', sepa: false, template: 'RSkkbbbcccccccccccccxx', name: 'Serbia' },
	{ code: 'SK', sepa: true, template: 'SKkkbbbbddddddcccccccccc', name: 'Slovakia' },
	{ code: 'SI', sepa: true, template: 'SIkkbbdddccccccccxx', name: 'Slovenia' },
	{ code: 'ES', sepa: true, template: 'ESkkbbbbddddxxcccccccccc', name: 'Spain' },
	{ code: 'SE', sepa: true, template: 'SEkkbbbccccccccccccccccx', name: 'Sweden' },
	{ code: 'CH', sepa: true, template: 'CHkkbbbbbcccccccccccc', name: 'Switzerland' },
	{ code: 'TN', sepa: false, template: 'TNkkbbdddccccccccccccccc', name: 'Tunisia' },
	{ code: 'TR', sepa: false, template: 'TRkkbbbbbxcccccccccccccccc', name: 'Turkey' },
	{ code: 'AE', sepa: false, template: 'AEkkbbbcccccccccccccccc', name: 'United Arab Emirates' },
	{ code: 'GB', sepa: true, template: 'GBkkiiiiddddddcccccccc', name: 'United Kingdom' },
	{ code: 'VG', sepa: false, template: 'VGkkbbbbcccccccccccccccc', name: 'Virgin Islands, British' }
];

const generateBic = (countryCode: string): string => {
	const withBranchCode = utils.randomUtils.getRandomBool();
	const branchCode = withBranchCode ? 'xxX' : '';
	const format = `LLLL${countryCode}LL${branchCode}`;
	return utils.randomUtils.generateRandomAlphanumericStr(format);
};

const fillTemplate = (template: string, countryCode: string): string => {
	const bic = generateBic(countryCode);
	let bicPos = 0;
	let unsigned = '';

	const uppercaseTemplate = template.toUpperCase();
	for (let i=0; i<template.length; i++) {
		const c = template[i];
		if (uppercaseTemplate[i] === c) {
			unsigned += c;
			continue;
		}
		if (c === 'i') {
			unsigned += bic[bicPos++];
			continue;
		}
		if (c === 'k') {
			unsigned += '_';
			continue;
		}
		unsigned += utils.randomUtils.generateRandomAlphanumericStr('x');
	}

	return recalculateChecksum(unsigned);
};


// removes the current checksum digit from an IBAN string, and replaces it with what it should have been
const recalculateChecksum = (ibanString: string): string => {
	if (ibanString.length < 6) {
		return ibanString;
	}

	const reordered = ibanString.substring(4) + ibanString.substring(0, 2);
	let numerical = '';

	const reorderedLength = reordered.length;
	for (let i=0; i<reorderedLength; i++) {
		numerical += chr2Int(reordered[i]);
	}
	numerical += '00';
	const checksum = 98 - bigMod(numerical, 97);

	return ibanString.substring(0, 2) + checksum.toString().padStart(2, '0') + ibanString.substring(4);
};


const bigMod = (x: string, y: number): number => {
	// how many numbers to take at once? careful not to exceed (int)
	const take = 5;
	let mod = '';

	while (x.length > 0) {
		const a = parseInt(mod + x.substring(0, take));
		x = x.substring(take);
		mod = (a % y).toString();
	}

	return parseInt(mod, 10);
};

const chr2Int = (chr: string): number => {
	const ord = getOrd(chr);

	if (ord <=57 && ord >= 48) { //48 = '0', 57 = '9'
		return ord - 48;
	}
	if (ord <= 90 && ord >= 65) { //90 = 'Z', 65 = 'A'
		return 10 + (ord - 65);
	}

	// throw new Exception("Input character {$chr}({$ord}) does not map to an integer");
	return 0;
};

const getOrd = (str: string): number => str.charCodeAt(0);

export const generate = (_data: any, workerUtils: WorkerUtils): DTGenerateResult => {
	utils = workerUtils;

	const countryCode = utils.randomUtils.getRandomArrayValue(countryCodes);
	const iban = fillTemplate(countryCode.template, countryCode.code);

	return { display: iban };
};
