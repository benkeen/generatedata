let startTime: Date, endTime: Date;

export const startTimer = () => {
	startTime = new Date();
};

export const stopTimer = () => {
	endTime = new Date();

	// @ts-ignore
	let timeDiff = endTime - startTime;

	timeDiff /= 1000;

	return timeDiff;
};
