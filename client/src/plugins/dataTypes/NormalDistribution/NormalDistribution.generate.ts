import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';

export const generate = ({ rowState }: DTGenerationData): DTGenerateResult => {
	const { mean, sigma, precision } = rowState;

	return {
		display: gaussMs(mean, sigma).toFixed(precision)
	};
};

// adjust our gaussian random to fit the mean and standard deviation. The division by 4 is an arbitrary value to help
// fit the distribution within our required range, and gives a best fit for stddev = 1.0
export const gaussMs = (mean: number, stddev: number): number => gauss() * (stddev / 4) + mean;

let useExists = false;
let useValue: number;

export const gauss = (): number => {
	if (useExists) {
		// use value from a previous call to this function
		useExists = false;
		return useValue;
	} else {
		// polar form of the Box-Muller transformation
		let w = 2.0;
		let x = 0;
		let y = 0;
		while (w >= 1 || w === 0.0) {
			x = randomPN();
			y = randomPN();
			w = (x * x) + (y * y);
		}
		w = Math.sqrt((-2.0 * Math.log(w)) / w);

		// set value for next call to this function
		useValue = y * w;
		useExists = true;

		return x * w;
	}
};

// returns random number with a flat distribution from -1 to 1 inclusive
export const randomPN = (): number => (2.0 * Math.random()) - 1.0;
