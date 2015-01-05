# generatedata REST API

The purpose of the API is to allow you to programmatically generate data sets, rather than you to create them
manually via the user interface. This would let you use the Data Generator in your automatic build tools. Useful
for some. :)

Right now it's a work in progress, but here's what I have planned.

## How it'll work

The Data Generator provides a TON of control over what you generate. The Data Types and Export Types all allow
different settings unique to themselves. Some are very basic, like the Email Data Type which offers no additional
settings at all, whereas others like the PAN Data Typs let you choose the credit card type, the possible formats and
more.

So... the API has to allow for all the same functionality offered by the UI. I figure it'll work like this:

- All Data Types and Export Types have their own unique JSON schema file. That defines what settings are available
for the plugin, what fields are required and what are optional.
- To call the API to request some data, you'll need to *POST* (no, not GET) a JSON file to a /api/v1 URL. The payload
of the POST would be a JSON file containing whatever you want, for example:

```javascript
{
  "numRows": 100,
  "countries": [],
  "rows": [
    {
      "type": "Names",
      "settings": {
        "placeholder": "Name Initial. Surname"
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

The "settings" properties in the "rows" and "export" sections would contain whatever unique settings are specific
to the Data Type / Export Type.

Because all the components (Core, Data Types & Export Types) are all schema'd out, any API call that passes invalid
or incomplete JSON will be easy to identify. I think I'll be able to provide some pretty decent error handling and
error feedback here.


### Why not keep it RESTful and use GET?

GET doesn't allow payloads. There's simply too much information needing to be passed for each API call to cram it all
into a URL, so that leaves us with POST. It's un-RESTful I know, but there are bigger sins in the world. I don't think
I'll lose any sleep over this.

