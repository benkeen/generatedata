import { DTBundle } from '~types/dataTypes';
import { initialState, Example, Options, Help, getMetadata } from './Computed';
import { generate } from './Computed.generate';

export type GenerationOptionsType = string;

const bundle: DTBundle = {
	initialState,
	Example,
	Options,
	Help,
	getMetadata,
	generate
};

export default bundle;
