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
	'XXXXXXXXXXXXXXX',
	'XXXX XXXXXX XXXXX',
	'XXXXXXXXXXXXXXXX',
	'XXXX XXXX XXXX XXXX',
	'XXXXXX XXXXXX XXXX',
	'XXX XXXXX XXXXX XXX',
	'XXXXXX XXXXXXXXXX'
];

const formatGroup4 = [
	'XXXXXXXXXXXXXXXX',
	'XXXX XXXX XXXX XXXX',
	'XXXXXX XXXXXX XXXX',
	'XXX XXXXX XXXXX XXX',
	'XXXXXX XXXXXXXXXX',
	'XXXXXXXXXXXXXXXXXX',
	'XXXXXXXXXXXXXXXXXXX',
	'XXXXXX XX XXXX XXXX XXX'
];

export const creditCardList = [
	'mastercard', 'visa', 'visaElectron', 'amex', 'discover', 'carteBlanche', 'dinersClubInt',
	'dinersClubEnRoute', 'jcb', 'maestro', 'solo', 'switch', 'laser'
];

export const creditCardFormats = {
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
		]
	},
	visaElectron: {
		prefix: [4026, 417500, 4508, 4844, 4913, 4917],
		formats: formatGroup1
	},
	mastercard: {
		prefix: [51, 52, 53, 54, 55],
		formats: formatGroup1
	},
	discover: {
		prefix: [6011, 644, 645, 646, 647, 648, 649, 65],
		formats: formatGroup1
	},
	amex: {
		prefix: [34, 37],
		formats: formatGroup2
	},
	carteBlanche: {
		prefix: [300, 301, 302, 303, 304, 305],
		formats: formatGroup2
	},
	dinersClubInt: {
		prefix: [36],
		formats: formatGroup2
	},
	dinersClubEnRoute: {
		prefix: [2014, 2149],
		formats: formatGroup2
	},
	jcb15: {
		prefix: [2131, 1800],
		formats: formatGroup3
	},
	jcb16: {
		prefix: [31, 309],
		formats: formatGroup3
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
		]
	},
	solo: {
		prefix: [6334, 6767],
		formats: formatGroup4
	},
	switch: {
		prefix: [4903, 4905, 4905, 4911, 4936, 564182, 633110, 6333, 6759],
		formats: formatGroup4
	},
	laser: {
		prefix: [6304, 6706, 6771, 6709],
		formats: [
			'XXXXXXXXXXXXXXXX',
			'XXXX XXXX XXXX XXXX',
			'XXXXXX XXXXXX XXXX',
			'XXX XXXXX XXXXX XXX',
			'XXXXXX XXXXXXXXXX',
			'XXXXXXXXXXXXXXXXX',
			'XXXXXXXXXXXXXXXXXX',
			'XXXXXXXXXXXXXXXXXXX',
			'XXXXXX XX XXXX XXXX XXX'
		]
	}
};
