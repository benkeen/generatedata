import { CountryType } from '../_plugins';

// this houses all Export Type code loaded async after the application starts
const loadedCountryTypes: any = {};

// Next project! This needs to be dumped & have rollup generate all the country plugins for use in web workers
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
