export const formatDuration = (duration: number) => {
	const secondsStr = Math.floor(duration % 60).toString();
	const minutes = Math.floor(duration / 60) % 60;
	const minutesStr = minutes.toString();
	const hours = Math.floor(duration / 60 / 60);

	const paddedSecondsStr = secondsStr.length < 2 ? 0 + secondsStr : secondsStr;

	if (hours) {
		// return `${hours}:`
	} else if (minutes) {
		return `${minutes}:${paddedSecondsStr}`;
	} else {
		return `0:${paddedSecondsStr}`;
	}
};
