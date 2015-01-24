## AlphaNumeric API Usage

See the example below for how to use this Data Type. Note: for the placeholder values, check out the help 
documentation for this Data Type in the generatedata UI. 

### Example

POST the following JSON content to `http://[your site]/[generate data folder]/api/v2/data`:

```javascript
{
    "numRows": 10,
    "rows": [
        {
            "type": "AlphaNumeric",
            "title": "Random Password",
            "settings": {
                "placeholder": "LLLxxLLLxLL"
            }
        },
        {
            "type": "AlphaNumeric",
            "title": "US Zipcode",
            "settings": {
                "placeholder": "xxxxx"
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
