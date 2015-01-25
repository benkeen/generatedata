## LatLng Data Type

This Data Type generates a latitude / longitude.


### Example API Usage

```javascript
{
    "numRows": 10,
    "rows": [
        {
            "type": "LatLng",
            "title": "Latitude",
            "settings": {
                "lat": true,
                "lng": false
            }
        },
        {
            "type": "LatLng",
            "title": "Longitude",
            "settings": {
                "lat": false,
                "lng": true
            }
        },
        {
            "type": "LatLng",
            "title": "Lat/Lng",
            "settings": {
                "lat": true,
                "lng": true
            }
        }
    ],
    "export": {
        "type": "JSON",
        "settings": {
            "stripWhitespace": false,
            "dataStructureFormat": "complex"
        }
    }
}
```
 
### API help

For more information about the API, check out:
[http://benkeen.github.io/generatedata/api.html](http://benkeen.github.io/generatedata/api.html)
