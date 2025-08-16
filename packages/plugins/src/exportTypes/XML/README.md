# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Export Types](../README.md) &raquo; XML

This Export Type lets you generate your random data in XML format. You can use this plugin in one of two ways:

1. Rely on the plugin generating the XML structure by just passing in `rootNodeName` and `recordNodeName` settings, 
which govern the key node names, or
2. Pass in a `useCustomExportFormat` (true) and a `customTemplate` setting that contains a Smarty template to 
control the generated markup.
 
See below for an example of each.


### Example API Usage

Here's a simple example that uses the `rootNodeName` and `recordNodeName` setting to generate the XM content. Just 
POST the following JSON content to the following API path: 
`http://[your site]/[generate data folder]/api/v1/data`

```javascript
{
    "numRows": 15,
    "rows": [
        {
            "type": "AlphaNumeric",
            "title": "RandomPassword",
            "settings": {
                "placeholder": "LLLxxLLLxLL"
            }
        },
        {
            "type": "AlphaNumeric",
            "title": "USZipcode",
            "settings": {
                "placeholder": "xxxxx"
            }
        }
    ],
    "export": {
        "type": "XML",
        "settings": {
            "rootNodeName": "rows",
            "recordNodeName": "row"
        }
    }
}
```

Here's a second example. Like with the HTML Export Type, you can provide your own custom Smarty template to generate
the XML with. It's ungainly and a pain, since you need to serialize your template into a JSON string, but the option is
there if you want it.

```javascript
{
    "numRows": 15,
    "rows": [
        {
            "type": "AlphaNumeric",
            "title": "RandomPassword",
            "settings": {
                "placeholder": "LLLxxLLLxLL"
            }
        },
        {
            "type": "AlphaNumeric",
            "title": "USZipcode",
            "settings": {
                "placeholder": "xxxxx"
            }
        }
    ],
    "export": {
        "type": "XML",
        "settings": {
            "useCustomExportFormat": true,
            "customTemplate": "{if $isFirstBatch}<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<records>\n{/if}{foreach $rowData as $row}  <record>{foreach from=$colData item=col name=c}    <{$col}>{$row[$smarty.foreach.c.index]}</{$col}>{/foreach}  </record>{/foreach}{if $isLastBatch}</records>{/if}"
        }
    }
}
```


### API help

For more information about the API, check out:
[http://benkeen.github.io/generatedata/api.html](http://benkeen.github.io/generatedata/api.html)
