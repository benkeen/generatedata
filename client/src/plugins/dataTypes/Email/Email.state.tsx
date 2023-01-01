export const enum StringSource {
	random = 'random',
	fields = 'fields'
}

export type EmailState = {
	source: StringSource;
	fieldId1: string;
	fieldId2: string;
	domains: string;
	domainSuffixes: string;
}

export const defaultDomains = 'google,hotmail,aol,icloud,outlook,yahoo,protonmail';
export const defaultDomainSuffixes = 'com,org,ca,net,co.uk,edu';

export const initialState: EmailState = {
	source: StringSource.random,
	fieldId1: '',
	fieldId2: '',
	domains: defaultDomains,
	domainSuffixes: defaultDomainSuffixes
};

export type GenerationOptionsType = {
	source: StringSource;
	fieldId1: string;
	fieldId2: string;
	domains: string[];
	domainSuffixes: string[];
};

export const defaultGenerationOptions = initialState;
