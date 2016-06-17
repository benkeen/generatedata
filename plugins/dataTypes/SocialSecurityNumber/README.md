## SocialSecurityNumber Data Type

This Data Type generates a random US social security number.

### Example API Usage

```javascript
{
    "numRows": 20,
    "rows": [
        {
            "type": "SocialSecurityNumber",
            "title": "ssn"
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
