## JSON Export Type

The JSON Export Type generates the random data in JSON format. It provides a couple of simple options:

- `stripWhitespace` to keep file size down 
- `dataStructureFormat`: this should be set to a string, and can be `simple` or `complex` - `simple` means that it 
outputs a simple array of objects, with each object being grouped in key-value pairs based on whatever title you entered
for the row; `complex` arranges the generated content differently: it groups the generated data into two top level 
properties, like this:

```javascript
{
	"cols": [
		"name",
		"email"
	],
	"data": [
		[
		    "Tom Filkin",
			"eu.odio.Phasellus@utodio.net"
		],
		[
		    "Ed Phillips",
			"vulputate.velit.eu@metus.edu"
		],
		[
		    "Sally Etkins",
			"ut@et.net"
		]
	]
}
```


### Example API Usage

To generate JSON data using the API, you need to specify the JSON Export Type in the `export` setting and post the 
JSON content to here: 
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
