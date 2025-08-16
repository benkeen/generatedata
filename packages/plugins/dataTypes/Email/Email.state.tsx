export const enum StringSourceEnum {
	random = 'random',
	fields = 'fields'
}
export type StringSource = `${StringSourceEnum}`;

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
	source: StringSourceEnum.random,
	fieldId1: '',
	fieldId2: '',
	domains: defaultDomains,
	domainSuffixes: defaultDomainSuffixes
};

export type GenerationOptionsType = {
	source: StringSource;
	domains?: string[];
	domainSuffixes?: string[];
	fieldId1?: string;
	fieldId2?: string;
};

export const defaultGenerationOptions = initialState;
