export const getPercentageLabel = (percentage: number, numRowsToGenerate: number): string => {
	let decimalPlaces = 0;
	if (numRowsToGenerate >= 10000) {
		decimalPlaces = 1;
	} else if (numRowsToGenerate >= 1000000) {
		decimalPlaces = 2;
	}
	return percentage.toFixed(decimalPlaces);
};

export const getByteSize = (str: string) => encodeURI(str).split(/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1;

export const downloadFile = (filename: string, data: any, type: string): void => {
	const file = new Blob([data], { type: type });
	const a = document.createElement('a');
	const url = URL.createObjectURL(file);
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();

	setTimeout(() => {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	}, 0);
};
