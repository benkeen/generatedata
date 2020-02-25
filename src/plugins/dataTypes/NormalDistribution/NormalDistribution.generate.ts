import { DTMetadata, DTGenerateResult, DTGenerationData } from '../../../../types/dataTypes';

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const { mean, stddev, precision } = data.rowState;

	return {
		display: Math.round(gaussMs(mean, stddev)).toFixed(precision)
	};
};

//  Adjust our gaussian random to fit the mean and standard deviation
//  The division by 4 is an arbitrary value to help fit the distribution
//      within our required range, and gives a best fit for $stddev = 1.0
const gaussMs = (mean: number, stddev: number): number => {
	return gauss() * (stddev / 4) + mean;
};

let useExists = false;
let useValue: number;
const gauss = (): number => {
	if (useExists) {
		//  Use value from a previous call to this function
		useExists = false;
		return useValue;
	} else {
		//  Polar form of the Box-Muller transformation
		let w = 2.0;
		let x = 0;
		let y = 0;
		while (w >= 1 || w === 0.0) {
			x = randomPN();
			y = randomPN();
			w = (x * x) + (y * y);
		}
		w = Math.sqrt((-2.0 * Math.log(w)) / w);

		//  Set value for next call to this function
		useValue = y * w;
		useExists = true;
		
		return x * w;
	}
};

//  returns random number using mt_rand() with a flat distribution from -1 to 1 inclusive
const randomPN = (): number => (2.0 * random0to1()) - 1.0;

const random0to1 = (): number => {
	// return (float) mt_rand() / (float) mt_getrandmax() ;
	return -1; // temp
};

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(100)'
	}
});
