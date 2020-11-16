## Region Data Type

This Data Type generates a random region. A region is something like a State, Province or County - whatever is 
applicable for a particular country.

This works by parsing all Country plugins in the system and using the region information there as the pool of region 
names to pull from.


### Example API Usage

This shows how to generate a region in a particular format for a particular country.

```javascript
{
    "numRows": 100,
    "countries": ["CA", "US", "united_kingdom"],
    "rows": [
        {
            "type": "Region",
            "title": "Canadian Province (full)",
            "settings": {
                "countries": {
                    "CA": { "full": true, "short": false }
                }
            }
        },
        {
            "type": "Region",
            "title": "Canadian Province (short)",
            "settings": {
                "countries": {
                    "CA": { "full": false, "short": true }
                }
            }
        },
        {
            "type": "Region",
            "title": "UK County",
            "settings": {
                "countries": {
                    "united_kingdom": { "full": true, "short": true }
                }
            }
        },
        {
            "type": "Region",
            "title": "US State or Canadian Province",
            "settings": {
                "countries": {
                    "CA": { "full": true, "short": true },
                    "US": { "full": true, "short": true }
                }
            }
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

This second example shows you how to generate a Country and a Region, where the two are correctly mapped. Only Provinces 
appear for Belgium, and only States for Nigeria.

Basically the `settings` values for the Region row define the formats of what you want; the generator does the work 
of matching them up.

```javascript
{
    "numRows": 10,
    "countries": ["nigeria", "belgium"],
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
                    "nigeria": { "full": true, "short": false },
                    "belgium": { "full": true, "short": false }
                }
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
