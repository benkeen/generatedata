## IBAN Data Type

This Data Type generates a random International Bank Account Number (IBAN).


### Example API Usage

```javascript
{
    "numRows": 10,
    "rows": [
        {
            "type": "IBAN",
            "title": "IBAN"
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
