export default {
	"name": "Phone / Fax, Regional",
	"fieldGroup": "human_data",
	"fieldGroupOrder": 25,
	"schema": {
		"title": "PhoneRegional",
		"$schema": "http://json-schema.org/draft-04/schema#",
		"type": "object",
		"properties": {
			"regions": {
				"type": "object",
				"minSize": 1
			}
		},
		"required": [
			"regions"
		]
	}
}
