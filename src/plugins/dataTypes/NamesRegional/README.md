## NamesRegional Data Type

This Data Type tries to generate a name that's likely to occur in a particular country. Right now it only 
supports France and Italy, but can be expanded for other countries. 


### Example API Usage

Just POST the following JSON content to: 
`http://[your site]/[generate data folder]/api/v1/data`

```javascript
{
    "numRows": 50,
    "countries": ["france", "italy"],
    "rows": [
        {
            "type": "Country",
            "title": "Country",
            "settings": {
                "limitCountriesToSelectedPlugins": true
            }
        },
        {
            "type": "Names",
            "title": "Male name",
            "settings": {
                "placeholder": "MaleName"
            }
        },
        {
            "type": "Names",
            "title": "Female name",
            "settings": {
                "placeholder": "FemaleName"
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
 
### API help

For more information about the API, check out:
[http://benkeen.github.io/generatedata/api.html](http://benkeen.github.io/generatedata/api.html)
