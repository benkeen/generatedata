import React from 'react';
import { CountryType } from '../_plugins';
import { DTBundle } from '../../types/dataTypes';

type LoadedCountries = {
	[name in CountryType]: DTBundle;
};

// this houses all Export Type code loaded async after the application starts
const loadedCountryTypes: Partial<CountryType> = {};

export const loadCountryBundle = (country: CountryType): any => {
	return new Promise((resolve, reject) => {
		import(
			/* webpackChunkName: "country-[request]" */
			/* webpackMode: "lazy" */
			`../plugins/countries/${country}/bundle`
		)
			.then((definition: any) => {
				loadedCountryTypes[country] = definition.default;
				resolve(definition.default);
			})
			.catch((e) => {
				reject(e);
			});
	});
};
