export default {
	"name": "Postal / Zip",
	"fieldGroup": "geo",
	"fieldGroupOrder": 30,
	"schema": {
		"title": "PostalZip",
		"$schema": "http://json-schema.org/draft-04/schema#",
		"type": "object",
		"properties": {
			"countries": {
				"type": "array",
				"minSize": 1
			}
		},
		"required": [
			"countries"
		]
	}
}
