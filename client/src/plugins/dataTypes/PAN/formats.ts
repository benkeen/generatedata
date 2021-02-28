const formatGroup1 = [
	'XXXXXXXXXXXXXXXX',
	'XXXX XXXX XXXX XXXX',
	'XXXXXX XXXXXX XXXX',
	'XXX XXXXX XXXXX XXX',
	'XXXXXX XXXXXXXXXX'
];

const formatGroup2 = [
	'XXXXXXXXXXXXXXX',
	'XXXX XXXXXX XXXXX'
];

const formatGroup3 = [
	'XXXXXXXXXXXXXXXX', // 16
	'XXXX XXXX XXXX XXXX',
	'XXXXXX XXXXXX XXXX',
	'XXX XXXXX XXXXX XXX',
	'XXXXXX XXXXXXXXXX',
	'XXXXXXXXXXXXXXXXXX', // 18
	'XXXXXXXXXXXXXXXXXXX', // 19
	'XXXXXX XX XXXX XXXX XXX'
];

export enum CreditCardType {
	visa = 'visa',
	visaElectron = 'visaElectron',
	mastercard = 'mastercard',
	discover = 'discover',
	amex = 'amex',
	carteBlanche = 'carteBlanche',
	dinersClubInt = 'dinersClubInt',
	dinersClubEnRoute = 'dinersClubEnRoute',
	maestro = 'maestro',
	solo = 'solo',
	switch = 'switch',
	laser = 'laser',
}

// all available credit cards in array format
export const creditCardTypes: CreditCardType[] = [];
for (const value in CreditCardType) {
	creditCardTypes.push(value as CreditCardType);
}

export type CreditCardFormatType = {
	[key in CreditCardType]: {
		prefix: number[];
		formats: string[];
		validNumChars: number[];
	};
}

export const creditCardFormats: CreditCardFormatType = {
	visa: {
		prefix: [4539, 4556, 4916, 4532, 4929, 40240071, 4485, 4716, 4],
		formats: [
			'XXXXXXXXXXXXX',
			'XXXX XXX XX XXXX',
			'XXXXXXXXXXXXXXXX',
			'XXXX XXXX XXXX XXXX',
			'XXXXXX XXXXXX XXXX',
			'XXX XXXXX XXXXX XXX',
			'XXXXXX XXXXXXXXXX'
		],
		validNumChars: [13, 16]
	},
	visaElectron: {
		prefix: [4026, 417500, 4508, 4844, 4913, 4917],
		formats: formatGroup1,
		validNumChars: [16]
	},
	mastercard: {
		prefix: [51, 52, 53, 54, 55],
		formats: formatGroup1,
		validNumChars: [16]
	},
	discover: {
		prefix: [6011, 644, 645, 646, 647, 648, 649, 65],
		formats: formatGroup1,
		validNumChars: [16]
	},
	amex: {
		prefix: [34, 37],
		formats: formatGroup2,
		validNumChars: [15]
	},
	carteBlanche: {
		prefix: [300, 301, 302, 303, 304, 305],
		formats: formatGroup2,
		validNumChars: [15]
	},
	dinersClubInt: {
		prefix: [36],
		formats: formatGroup2,
		validNumChars: [15]
	},
	dinersClubEnRoute: {
		prefix: [2014, 2149],
		formats: formatGroup2,
		validNumChars: [15]
	},
	maestro: {
		prefix: [5018, 5038, 6304, 6759, 6761, 6762, 6763, 5893, 56, 57, 58],
		formats: [
			'XXXXXXXXXXXX',
			'XXXXXXXXXXXXX',
			'XXXX XXX XX XXXX',
			'XXXXXXXXXXXXXX',
			'XXXX XXXXXX XXXX',
			'XXXXXXXXXXXXXXX',
			'XXXX XXXXXX XXXXX',
			'XXXXXXXXXXXXXXXX',
			'XXXX XXXX XXXX XXXX',
			'XXXXXX XXXXXX XXXX',
			'XXX XXXXX XXXXX XXX',
			'XXXXXX XXXXXXXXXX',
			'XXXXXXXXXXXXXXXXX',
			'XXXXXXXXXXXXXXXXXX',
			'XXXXXXXXXXXXXXXXXXX',
			'XXXXXX XX XXXX XXXX XXX'
		],
		validNumChars: [12, 13, 14, 15, 16, 17, 18, 19]
	},
	solo: {
		prefix: [6334, 6767],
		formats: formatGroup3,
		validNumChars: [16, 18, 19]
	},
	switch: {
		prefix: [4903, 4905, 4905, 4911, 4936, 564182, 633110, 6333, 6759],
		formats: formatGroup3,
		validNumChars: [16, 18, 19]
	},
	laser: {
		prefix: [6304, 6706, 6771, 6709],
		formats: [
			'XXXXXXXXXXXXXXXX', // 16
			'XXXX XXXX XXXX XXXX',
			'XXXXXX XXXXXX XXXX',
			'XXX XXXXX XXXXX XXX',
			'XXXXXX XXXXXXXXXX',
			'XXXXXXXXXXXXXXXXX', // 17
			'XXXXXXXXXXXXXXXXXX', // 18
			'XXXXXXXXXXXXXXXXXXX', // 19
			'XXXXXX XX XXXX XXXX XXX'
		],
		validNumChars: [16, 17, 18, 19]
	}
};
