# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Export Types](../README.md) &raquo; JSON

- [Intro](#intro)
- [Example API Usage](#example-api-usage)
- [API Help](#api-help)
- [Generating complex objects](#generating-complex-objects)



### Intro
 
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

Here's an example pulled from the Alphanumeric Data Type example:

```javascript
{
    "numRows": 10,
    "rows": [
        {
            "type": "Alphanumeric",
            "title": "Random Password",
            "settings": {
                "placeholder": "LLLxxLLLxLL"
            }
        },
        {
            "type": "Alphanumeric",
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


### Generating Complex Objects

As of 3.2.5, @tohagan added a nice feature to allow the *Simple* JSON format to generate nested objects. This is how 
it works.

When field names contain "." delimiters and a JSON | Simple export is selected, nested objects will be 
generated corresponding to the structure of the fields names.  The only restriction is that fields related to the same 
object must be sequential.


#### Example 1: 2 Field Names

- name.first
- name.last
- address.0 
- address.1

##### Generates:

```javascript
	[
		{
			"name": {
				"first": "Rahim",
				"last": "Wyatt"
			},
			"address": {
				"0": "Ap #496-4933 Non, Street",
				"1": "190-7424 Malesuada Street"
			}
		},
		{
			"name": {
				"first": "Emi",
				"last": "King"
			},
			"address": {
				"0": "5331 Lacinia. Avenue",
				"1": "486-7654 Nisl Road"
			}
		}
	]
```

#### Example 2: 3-level Nested JSON 

Field names ... All "Email" type

- a
- b.c
- b.d.e
- b.d.f
- b.p.a
- b.p.b


##### Generates:

```javascript
	[
		{
			"a": "et.commodo@amet.org",
			"b": {
				"c": "vestibulum.neque.sed@nuncsedlibero.org",
				"d": {
					"e": "ac@musAeneaneget.ca",
					"f": "tellus.Suspendisse@etpedeNunc.ca"
				},
				"p": {
					"a": "est.ac@nostra.ca",
					"b": "et.tristique@rutrum.org"
				}
			}
		},
		{
			"a": "sit.amet.ante@varius.com",
			"b": {
				"c": "et@neque.net",
				"d": {
					"e": "lacus.Quisque@Nullatempor.edu",
					"f": "ac@sem.edu"
				},
				"p": {
					"a": "libero.dui.nec@sit.ca",
					"b": "nec@malesuada.com"
				}
			}
		}
	]
```


