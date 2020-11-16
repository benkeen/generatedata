export default {
	"name": "Names, Regional",
	"fieldGroup": "humanData",
	"fieldGroupOrder": 15,
	dependencies: ["Country"],
	"schema": {
		"title": "NamesRegional",
		"$schema": "http://json-schema.org/draft-04/schema#",
		"type": "object",
		"properties": {
			"placeholder": {
				"type": "string"
			}
		},
		"required": [
			"placeholder"
		]
	}
}
