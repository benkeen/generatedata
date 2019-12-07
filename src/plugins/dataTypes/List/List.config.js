export default {
	"name": "Custom List",
	"fieldGroup": "other",
	"fieldGroupOrder": 40,
	"schema": {
		"title": "List",
		"$schema": "http://json-schema.org/draft-04/schema#",
		"type": "object",
		"properties": {
			"listType": {
				"enum": [
					"exactly",
					"atMost"
				]
			},
			"exactly": {
				"type": "number"
			},
			"atMost": {
				"type": "number"
			},
			"list": {
				"type": "string"
			}
		},
		"required": [
			"listType",
			"list"
		]
	}
}
