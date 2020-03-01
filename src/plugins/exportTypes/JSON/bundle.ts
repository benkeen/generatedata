import { ETDefinition } from '../../../../types/exportTypes';

export { generate } from './JSON.generator';
export { Settings, initialState } from './JSON.ui';
export { default as Preview } from './JSON.preview';

const definition: ETDefinition = {
	name: 'JSON',
	schema: {
		title: 'JSON',
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			stripWhitespace: {
				type: 'boolean'
			},
			dataStructureFormat: {
				enum: ['simple', 'complex']
			}
		}
	}
};

export default definition;
