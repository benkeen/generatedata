### PhoneRegional API Usage

Generating data for this Data Type via the API is a little fussy, compared to the UI. The idea of this data type is 
to generate phone numbers in a format that's appropriate for a particular country. In other words, it lets you generate
multiple rows of data where the random country name and phone number formats match, e.g.
 
```
United Kingdom      01552 515219
Canada              (604) 264-2551
United Kingdom      01512 215441
```

Here's an example of the JSON structure you need to pass, so you don't have to sift through the code to make sense of 
it.


```javascript
{
    
    "countries": ["united_kingdom", "united_states"] 
    "rows": [
        {
            "type": "Country",
            "title": "Country!",
            "settings": {
                "limitCountriesToSelectedPlugins": true
            }
        }
        { 
            "type": "PhoneRegional",
            "title": "Regional Phone Format",
            "settings": {
                "regions": {
                    "united_kingdom": "0xxxx xxxxxx",
                    "united_states": "1 (AAA) Xxx-xxxx"
                }
            }
        }
    ]
    ...
}
```

Notes:
- The `countries` array should contain all country slugs you're interested in. To find those out, either look at the 
database's `[prefix]countries` table, or look at the top of the Country class files:
(`/plugins/countries/[country]/[country].class.php`).
- the `regions` object property keys are also *country slugs*, not the country names. 
- Like with the UI, if you don't enter any regions it will just show any old phone number format for any region.
