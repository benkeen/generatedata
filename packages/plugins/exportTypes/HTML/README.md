# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Export Types](../README.md) &raquo; HTML

This plugin outputs the data in HTML format. You can either choose to output the data in a `<table>`, a `<ul>` or 
`<dl>`'s, or if you're feeling really fancy, you can control the exact output via a custom Smarty template. The 
latter's intended for advanced users and requires knowledge of the PHP Smarty templating language

### Example API Usage

Try POSTing the following JSON content to the following URL:
`http://[your site]/[generate data folder]/api/v1/data`

```javascript
{
    "numRows": 10,
    "rows": [
        {
            "type": "AutoIncrement",
            "title": "Row",
            "settings": {
                "incrementStart": 1,
                "incrementValue": 1
            }
        },
        {
            "type": "Names",
            "title": "name",
            "settings": {
                "placeholder": "Name Initial. Surname"
            }
        }
    ],
    "export": {
        "type": "HTML",
        "settings": {
            "exportFormat": "table"
        }
    }
}
```

### Custom template example

Here's a second example that uses a custom Smarty template to customize the generated HTML. Note: the inconvenient 
thing about using the API for this is that you need to serialize the template into a single line. Yeah, that's a pain. 


```javascript
{
    "numRows": 10,
    "rows": [
        {
            "type": "AutoIncrement",
            "title": "Row",
            "settings": {
                "incrementStart": 1,
                "incrementValue": 1
            }
        },
        {
            "type": "Names",
            "title": "name",
            "settings": {
                "placeholder": "Name Initial. Surname"
            }
        }
    ],
    "export": {
        "type": "HTML",
        "settings": {
            "exportFormat": "custom",
            "customTemplate": "{if $isFirstBatch}<table cellspacing=\"0\" cellpadding=\"1\">\n<tr>\n{foreach $colData as $col}  <th>{$col}</th>\n{/foreach}\n</tr>\n{/if}{foreach $rowData as $row}<tr>\n{foreach $row as $r}  <td>{$r}</td>\n{/foreach}</tr>\n{/foreach}{if $isLastBatch}</table>{/if}"
        }
    }
}
```


### API help

For more information about the API, check out:
[http://benkeen.github.io/generatedata/api.html](http://benkeen.github.io/generatedata/api.html)

