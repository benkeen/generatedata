## Names Data Type

This Data Type generates a human name. You can choose to generate first names, a male first name, a female first name,
a surname and an initial. 


### Example API Usage

Here are a couple of examples. Just POST the following JSON content to 
`http://[your site]/[generate data folder]/api/v1/data`:

```javascript
{
    "numRows": 15,
    "rows": [
        {
            "type": "Names",
            "title": "Name",
            "settings": {
                "placeholder": "Name"
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
        },
        {
            "type": "Names",
            "title": "Full name",
            "settings": {
                "placeholder": "Name Surname"
            }
        },
        {
            "type": "Names",
            "title": "Full name with initial",
            "settings": {
                "placeholder": "Name Initial. Surname"
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
