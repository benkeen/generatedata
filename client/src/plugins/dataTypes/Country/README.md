## Country Data Type

This Data Type generates a random country name. It can be used in two ways:
1. Generates a random country name from the ~250 countries in the world. 
2. Generates a random country name from the list of Country plugins. 
 
The Country plugins provide a much richer set of data for use by the Data Generator. Each plugin defines not just the 
country name, but a list of its regions and cities. It can also define things like postal/zip formats, phone number 
formats and more - anything specific to the country. The benefit to using the country plugins is when you 
use multiple, related data types like `Country`, `Region` and `City`: it ensures that each row of data is consistent 
and that the city names belong to the region, which belongs to the country. 


### Example API Usage

```javascript
{
    "numRows": 20,
    "countries": ["CA", "US", "united_kingdom"],
    "rows": [
        {
            "type": "Country",
            "title": "Country",
            "settings": {
                "limitCountriesToSelectedPlugins": true
            }
        },
        {
            "type": "Region",
            "title": "Region",
            "settings": {
                "countries": {
                    "CA": { "full": true, "short": false },
                    "US": { "full": true, "short": false },
                    "united_kingdom": { "full": true, "short": false }
                }
            }
        },
        {
            "type": "City",
            "title": "City"
        }
    ],
    "export": {
        "type": "JSON",
        "settings": {
            "stripWhitespace": false,
            "dataStructureFormat": "simple"
        }
    }
}
```
 
### API help

For more information about the API, check out:
[http://benkeen.github.io/generatedata/api.html](http://benkeen.github.io/generatedata/api.html)
