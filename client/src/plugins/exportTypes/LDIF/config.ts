import { ETDefinition } from '~types/exportTypes';

const definition: ETDefinition = {
	name: "LDIF",
	codeMirrorModes: [
		'yaml/yaml'
	],
	schema: {
		"$schema": "http://json-schema.org/draft-04/schema#",
		"type": "object",
		"properties": {
			"delimiter": {
				"type": "string"
			},
			"eol": {
				"enum": ["Windows", "Unix", "Mac"]
			}
		},
		"required": ["delimiter"]
	}
};

export default definition;
