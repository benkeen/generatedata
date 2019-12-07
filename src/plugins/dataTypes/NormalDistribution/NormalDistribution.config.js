export default {
  "name": "Standard Normal Distribution",
  "fieldGroup": "math",
  "fieldGroupOrder": 10,
  "schema": {
    "title": "NormalDistribution",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
      "mean": {
        "type": "string"
      },
      "sigma": {
        "type": "string"
      },
      "precision": {
        "type": "string"
      }
    },
    "required": [
      "mean",
      "sigma",
      "precision"
    ]
  }
}
