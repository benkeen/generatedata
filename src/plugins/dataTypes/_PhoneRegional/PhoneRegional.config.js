export default {
	"name": "Phone / Fax, Regional",
	"fieldGroup": "humanData",
	"fieldGroupOrder": 25,
	processOrder: 3,
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
