export default {
	"name": "Fixed Number of Words",
	"fieldGroup": "text",
	"fieldGroupOrder": 10,
	"schema": {
		"title": "TextFixed",
		"$schema": "http://json-schema.org/draft-04/schema#",
		"type": "object",
		"properties": {
			"numWords": {
				"type": "integer",
				"minimum": 1
			}
		},
		"required": [
			"numWords"
		]
	}
}
