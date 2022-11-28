import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, getMetadata } from './Computed';

export type GenerationOptionsType = string;

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata
};

export default bundle;
