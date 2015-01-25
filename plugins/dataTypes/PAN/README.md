## PAN Data Type

This Data Type generates a valid Personal Access Number (PAN) for a variety of credit card types. Note: it's a bit of 
a fussy Data Type to use via the API, because it was designed mostly for the UI. 

- *brand*: the credit card name. Options: `mastercard, visa, visaElectron, amex, discover, carteBlanche, dinersClubInt,
dinersClubEnRoute, jcb, maestro, solo, switch, laser, rand_card`. The last item is special. If it's entered, you need to 
include the *random_card* setting as well: an array of these values to indicate which credit card subset you want 
to generate from.
- *separator* 
- *format*
- *length*
- *random_card*


### Example API Usage

This generates a number between 1 and 100. Just POST the following JSON content to: 
`http://[your site]/[generate data folder]/api/v1/data`

```javascript
{
    "numRows": 50,
    "rows": [
        {
            "type": "PAN",
            "title": "val",
            "settings": {
                "brand": "visa",
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
