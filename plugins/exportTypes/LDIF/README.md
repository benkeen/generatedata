## LDIF Export Type

This plugin generates data in LDIF (LDAP Data Exchange Format).


### Example API Usage

Post the following JSON content to the following API path: 
`http://[your site]/[generate data folder]/api/v1/data`

Here's an example pulled from the AlphaNumeric Data Type example:

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
        "type": "LDIF"
    }
}
```

### API help

For more information about the API, check out:
[http://benkeen.github.io/generatedata/api.html](http://benkeen.github.io/generatedata/api.html)
