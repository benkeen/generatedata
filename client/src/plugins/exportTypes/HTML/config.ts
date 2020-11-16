import { ETDefinition } from '~types/exportTypes';

const definition: ETDefinition = {
	name: "HTML",
	codeMirrorModes: [
		'htmlmixed/htmlmixed',
		'javascript/javascript',
		'xml/xml',
		'css/css'
	],
	schema: {
		"title": "HTML",
		"$schema": "http://json-schema.org/draft-04/schema#",
		"type": "object",
		"properties": {
			"exportFormat": {
				"enum": ["table", "ul", "dl", "custom"]
			},
			"customTemplate": {
				"type": "string"
			}
		},
		"required": ["exportFormat"]
	}
};

export default definition;
