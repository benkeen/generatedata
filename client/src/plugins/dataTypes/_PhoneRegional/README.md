## PhoneRegional

The idea of this data type is to generate phone numbers in a format that's appropriate for a particular country. In 
other words, it lets you generate multiple rows of data where the random country name and phone number formats match, e.g.
 
```
United Kingdom      01552 515219
Canada              (604) 264-2551
United Kingdom      01512 215441
```

Generating data for this Data Type via the API is a little fussy, compared to the UI. Definitely needs some more thought.


### Example API Usage

```javascript
{
    
    "countries": ["united_kingdom", "US"], 
    "rows": [
        {
            "type": "Country",
            "title": "Country!",
            "settings": {
                "limitCountriesToSelectedPlugins": true
            }
        },
        { 
            "type": "PhoneRegional",
            "title": "Regional Phone Format",
            "settings": {
                "regions": {
                    "united_kingdom": "0xxxx xxxxxx",
                    "US": "1 (AAA) Xxx-xxxx"
                }
            }
        }
    ]
    ...
}
```

Notes:
- Normally the UI handles the generation and presentation of the actual regional phone formats and you just select 
them, but for the API you need to explictly pass those values. To find out what they are, you can either use the 
generatedata UI to see, or browse the source code of the Country plugins.
- The `countries` array should contain all country slugs you're interested in. To find those out, either look at the 
database's `[prefix]countries` table, or look at the top of the Country class files:
(`/plugins/countries/[country]/[country].class.php`).
- the `regions` object property keys are also *country slugs*, not the country names.
- Like with the UI, if you don't enter any regions it will just show any old phone number format for any region.


### API help

For more information about the API, check out:
[http://benkeen.github.io/generatedata/api.html](http://benkeen.github.io/generatedata/api.html)
