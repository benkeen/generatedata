import { GenerationData } from '../../../../types/dataTypes';
import { ExportTypeMetadata } from '../../../../types/exportTypes';
import { LatLngState } from './LatLng.ui';
import { getRandomNum } from '../../../utils/randomUtils';

export const getGenerationSettings = (state: LatLngState) => state;

const DECIMAL_PLACES = 5;

// Valid ranges:
// Lat: -90 -> + 90
// Lng: -180 -> +180
let cachedMath = {
	minLat: -90 * (DECIMAL_PLACES^10),
	maxLat: 90 * (DECIMAL_PLACES^10),
	minLng: -180 * (DECIMAL_PLACES^10),
	maxLng: 180 * (DECIMAL_PLACES^10),
	divisor: (DECIMAL_PLACES^10)
};

export const generate = (data: GenerationData) => {
	const coords = [];
	let lat, lng;
	if (data.generationSettings.lat && data.generationSettings.lng) {
		lat = getRandomNum(cachedMath.minLat, cachedMath.maxLat) / cachedMath.divisor;
		coords.push(lat);
		lng = getRandomNum(cachedMath.minLng, cachedMath.maxLng) / cachedMath.divisor;
		coords.push(lng);
	} else if (data.generationSettings.lat) {
		lat = getRandomNum(cachedMath.minLat, cachedMath.maxLat) / cachedMath.divisor;
		coords.push(lat);
	} else if (data.generationSettings.lng) {
		lng = getRandomNum(cachedMath.minLng, cachedMath.maxLng) / cachedMath.divisor;
		coords.push(lng);
	}

	return {
		lat,
		lng,
		display: coords.join(', ')
	};
};

export const getMetadata = (): ExportTypeMetadata => ({
    sql: {
        field: 'varchar(30) default NULL',
        field_Oracle: 'varchar2(30) default NULL',
        field_MSSQL: 'VARCHAR(30) NULL'
    }
});