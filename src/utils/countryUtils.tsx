import { CountryType, countryList } from '../_plugins';

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

export const loadAllCountryBundles = () => {
	const promises: any = [];
	countryList.forEach((country) => {
		promises.push(loadCountryBundle(country as CountryType));
	});
	return Promise.all(promises);
};

// for scenarios where the consumer KNOWS the Country plugin has been loaded
export const getCountryType = (countryType: CountryType) => loadedCountryTypes[countryType];
