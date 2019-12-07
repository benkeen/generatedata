export default {
	"name": "PAN",
	"fieldGroup": "credit_card_data",
	"fieldGroupOrder": 10,
	"schema": {
		"title": "PAN",
		"$schema": "http://json-schema.org/draft-04/schema#",
		"type": "object",
		"properties": {
			"brand": {
				"type": "string"
			},
			"separator": {
				"type": "string"
			},
			"format": {
				"type": "array"
			},
			"length": {
				"type": "string"
			},
			"random_card": {
				"type": "array"
			}
		},
		"required": [
			"brand",
			"length"
		]
	}
}
