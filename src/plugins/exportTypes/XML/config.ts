import { ETDefinition } from '~types/exportTypes';

const definition: ETDefinition = {
	name: 'XML',
	codeMirrorModes: [
		'xml/xml'
	],
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object'
	}
};

export default definition;
