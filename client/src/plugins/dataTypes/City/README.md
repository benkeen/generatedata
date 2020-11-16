## City Data Type

Generates a random city name.

### Example API Usage

POST the following JSON content to: `http://[your site]/[generate data folder]/api/v1/data`:

```javascript
{
    "numRows": 10,
    "rows": [
        {
            "type": "City",
            "title": "City name"
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
