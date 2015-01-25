## Currency Data Type

This Data Type generates a random monetary amount. It's pretty versatile and can be used for many, if not all country
currencies. 

### Example API Usage

```javascript
{
    "numRows": 20,
    "rows": [
        {
            "type": "Currency",
            "title": "Currency",
            "settings": {
                "format": "XX,XXX",
                "rangeFrom": "5000",
                "rangeTo": "10000",
                "symbol": "$",
                "symbolLocation": "prefix"
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
