# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; PAN

This Data Type generates a *valid* Personal Access Number (PAN) for a variety of credit card types.  

- *brand*: the credit card name. Options: `mastercard, visa, visaElectron, amex, discover, carteBlanche, dinersClubInt,
dinersClubEnRoute, jcb, maestro, solo, switch, laser, rand_card`. The last item is special. If it's entered, you need to 
include the *random_card* setting as well. 
to generate from.
- *separator*: defaults to space ` `. The separator character 
- *format*: an array of possible formats to output the CC number.
- *length*: this one's a bit confusing, honestly. You need to pass in a list of comma-delimited lengths of possible
credit card lengths. [But aren't they defined in the format list?]
- *random_card*: an array of credit card names to indicate the subset of credit card types to generate.


### Example API Usage

This generates a Visa number. Just POST the following JSON content to: 
`http://[your site]/[generate data folder]/api/v1/data`

```javascript
{
    "numRows": 50,
    "rows": [
        {
            "type": "PAN",
            "title": "cc_num",
            "settings": {
                "brand": "visa",
                "format": ["XXXX XXXX XXXX XXXX", "XXX XXXXX XXXXX XXX"],
                "length": "16"
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
