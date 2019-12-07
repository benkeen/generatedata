export default {
	"name": "Latitude / Longitude",
	"fieldGroup": "geo",
	"fieldGroupOrder": 100,
	"schema": {
		"title": "LatLng",
		"$schema": "http://json-schema.org/draft-04/schema#",
		"type": "object",
		"properties": {
			"lat": {
				"type": "boolean"
			},
			"lng": {
				"type": "boolean"
			}
		},
		"required": [
			"lat",
			"lng"
		]
	}
}
