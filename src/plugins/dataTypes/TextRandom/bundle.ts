import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { generate, getMetadata } from './TextRandom.generate';

/*
export default {
	"name": "Random Number of Words",
	"fieldGroup": "text",
	"fieldGroupOrder": 20,
	"schema": {
		"title": "TextRandom",
		"$schema": "http://json-schema.org/draft-04/schema#",
		"type": "object",
		"properties": {
			"startsWithLipsum": {
				"type": "boolean"
			},
			"minWords": {
				"type": "integer",
				"minimum": 1
			},
			"maxWords": {
				"type": "integer",
				"minimum": 1
			}
		},
		"required": [
			"startsWithLipsum",
			"minWords",
			"maxWords"
		]
	}
}
*/

const definition: DTDefinition = {
	name: 'Random Number of Words',
	fieldGroup: 'text',
	fieldGroupOrder: 10,
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			numWords: {
				type: 'integer',
				minimum: 1
			}
		},
		required: [
			'numWords'
		]
	}
};

export default {
	definition,
	generate,
	getMetadata
} as DTBundle;
