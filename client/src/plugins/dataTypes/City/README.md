# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; City

Generates a random city name. You have the choice of generating a simple city name from anywhere in the world, to mapping
it to other data in the generated row, so the city is actually within a region or country from another field.

## Typings

`
{
    source: RegionSource; // 'any', 'countries', 'regionRow'
    selectedCountries: CountryType[];
    targetRowId: string;
}
`



### Example

POST the following JSON content to: `http://[your site]/[generate data folder]/api/v1/data`:

```javascript
{
    "numRows": 10,
    "rows": [
        {
            "type": "City",
            "title": "City name"
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
