import { DTGenerationData, DTGenerateResult } from '~types/dataTypes';
import { getRandomNum } from '~utils/randomUtils';

const DECIMAL_PLACES = 5;

// Valid ranges:
// Lat: -90 -> + 90
// Lng: -180 -> +180
const pow = Math.pow(DECIMAL_PLACES, 10);
const cachedMath = {
	minLat: -90 * pow,
	maxLat: 90 * pow,
	minLng: -180 * pow,
	maxLng: 180 * pow,
	divisor: pow
};

export const generate = ({ rowState }: DTGenerationData): DTGenerateResult => {
	const coords = [];
	let lat, lng;
	if (rowState.lat && rowState.lng) {
		lat = getRandomNum(cachedMath.minLat, cachedMath.maxLat) / cachedMath.divisor;
		coords.push(lat);
		lng = getRandomNum(cachedMath.minLng, cachedMath.maxLng) / cachedMath.divisor;
		coords.push(lng);
	} else if (rowState.lat) {
		lat = getRandomNum(cachedMath.minLat, cachedMath.maxLat) / cachedMath.divisor;
		coords.push(lat);
	} else if (rowState.lng) {
		lng = getRandomNum(cachedMath.minLng, cachedMath.maxLng) / cachedMath.divisor;
		coords.push(lng);
	}

	return {
		lat,
		lng,
		display: coords.join(', ')
	};
};
