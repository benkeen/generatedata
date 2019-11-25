## Computed Data Type

The Computed Data Type gives you access to the metadata about fields in the row to let you generate whatever output
you want based on that information. If you just need to access the generated string value from another field (i.e.
what you see in the output), see the Composite Data Type. This field type gives you much more access to each field.

*{$ROW1}*, *{$ROW2}* etc. contain everything available about that particular row. The content changes based on
the row's Data Type and what has been generated, but high-level it contains the following properties:

- *{$ROW1.OPTIONS}* - whatever options were entered in the interface/API call for the row
- *{$ROW1.COL_METADATA}* - any additional metadata returned for the Data Type
- *{$ROW1.DATA}* - the actual generated random content for this field (always in a "display" property) plus any other
information about the generated content
- *{$ROW1.DEBUG}* - a handy JSON-serialization of everything in the row, so you can see what's available. Just run it
through a JSON formatter.


### Example API Usage

This outputs the corresponding gender for a name output via the "Name" placeholder in the Names Data Type.

POST the following JSON content to: `http://[your site]/[generate data folder]/api/v1/data`:

```javascript
{
    "numRows": 10,
    "rows": [
        {
            "type": "Names",
            "title": "Random name",
            "settings": {
                "placeholder": "Name"
            }
        },
        {
            "type": "Computed",
            "title": "Gender",
            "settings": {
                "placeholder": "{$ROW1.DATA.gender}"
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
