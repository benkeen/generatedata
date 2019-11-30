## Excel Export Type

This Export Type generates the random data in Excel format. It uses the `PHPExcel` library to handle the 
actual file generation.

It's super-simple, and doesn't offer any additional settings to control any aspects of the generated Excel file.

### Example API Usage

Try POSTing the following JSON content to the following URL:
`http://[your site]/[generate data folder]/api/v1/data`

Please note: this Export Type prompts for a download. I'm not 100% sure that will work with a REST call - if the result
can be easily extracted and created, so let me know if not and I'll figure out a way to remove the `attachment` headers
if called via the API.

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
        "type": "Excel"
    }
}
```

### API help

For more information about the API, check out:
[http://benkeen.github.io/generatedata/api.html](http://benkeen.github.io/generatedata/api.html)
