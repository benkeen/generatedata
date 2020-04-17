import React from 'react';
import { CountryType } from '../_plugins';

// this houses all Export Type code loaded async after the application starts
const loadedCountryTypes: any = {};

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
