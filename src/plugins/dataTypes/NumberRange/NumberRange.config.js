export default {
	"name": "Number Range",
	"fieldGroup": "numeric",
	"fieldGroupOrder": 30,
	"schema": {
		"title": "NumberRange",
		"$schema": "http://json-schema.org/draft-04/schema#",
		"type": "object",
		"properties": {
			"rangeMin": {
				"type": "number"
			},
			"rangeMax": {
				"type": "number"
			}
		},
		"required": [
			"rangeMin",
			"rangeMax"
		]
	}
}
