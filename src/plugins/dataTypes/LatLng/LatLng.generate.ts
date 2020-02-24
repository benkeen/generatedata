import { DTMetadata, DTGenerationData, DTGenerateResult } from '../../../../types/dataTypes';
import { LatLngState } from './LatLng.ui';
import { getRandomNum } from '../../../utils/randomUtils';

export const rowStateReducer = (state: LatLngState): LatLngState => state;

const DECIMAL_PLACES = 5;

// Valid ranges:
// Lat: -90 -> + 90
// Lng: -180 -> +180
const cachedMath = {
	minLat: -90 * (DECIMAL_PLACES ^ 10),
	maxLat: 90 * (DECIMAL_PLACES ^ 10),
	minLng: -180 * (DECIMAL_PLACES ^ 10),
	maxLng: 180 * (DECIMAL_PLACES ^ 10),
	divisor: (DECIMAL_PLACES ^ 10)
};

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const coords = [];
	let lat, lng;
	if (data.rowState.lat && data.rowState.lng) {
		lat = getRandomNum(cachedMath.minLat, cachedMath.maxLat) / cachedMath.divisor;
		coords.push(lat);
		lng = getRandomNum(cachedMath.minLng, cachedMath.maxLng) / cachedMath.divisor;
		coords.push(lng);
	} else if (data.rowState.lat) {
		lat = getRandomNum(cachedMath.minLat, cachedMath.maxLat) / cachedMath.divisor;
		coords.push(lat);
	} else if (data.rowState.lng) {
		lng = getRandomNum(cachedMath.minLng, cachedMath.maxLng) / cachedMath.divisor;
		coords.push(lng);
	}

	return {
		lat,
		lng,
		display: coords.join(', ')
	};
};

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(30) default NULL',
		field_Oracle: 'varchar2(30) default NULL',
		field_MSSQL: 'VARCHAR(30) NULL'
	}
});
