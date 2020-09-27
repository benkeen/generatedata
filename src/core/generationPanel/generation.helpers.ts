export const getPercentageLabel = (percentage: number, numRowsToGenerate: number) => {
	let decimalPlaces = 0;
	if (numRowsToGenerate >= 10000) {
		decimalPlaces = 1;
	} else if (numRowsToGenerate >= 1000000) {
		decimalPlaces = 2;
	}
	return percentage.toFixed(decimalPlaces);
};
