## ProgrammingLanguage Export Type

This plugin generates data in a variable in a variety of programming languages. It's super easy to add more, so 
please go right ahead and add one!

There's only a single setting: `language`, which should be a string containing one of the following options:
- `PHP`
- `Perl`
- `JavaScript` (note that this and the other options are case-sensitive!)
- `Ruby`
- `CSharp`

### Example API Usage

Post the following JSON content to the following API path: 
`http://[your site]/[generate data folder]/api/v1/data`

```javascript
{
    "numRows": 15,
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
        "type": "ProgrammingLanguage",
        "settings" {
            "language": "Perl"
        }
    }
}
```

### API help

For more information about the API, check out:
[http://benkeen.github.io/generatedata/api.html](http://benkeen.github.io/generatedata/api.html)
