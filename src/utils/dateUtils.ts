import { differenceInSeconds } from 'date-fns';

export const getCurrentDatetime = () => Date.now();

export const formatDuration = (start: number, finish: number) => {
	const diffTime = differenceInSeconds(finish, start);

	if (!diffTime) {
		return '0:00';
	}

	const minutes = Math.abs(Math.floor(diffTime / 60) % 60).toString();
	const hours = Math.abs(Math.floor(diffTime / 60 / 60)).toString();

	return `${hours.length < 2 ? 0 + hours : hours}:${minutes.length < 2 ? 0 + minutes : minutes}`;
};
