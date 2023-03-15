# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; PostalZip

This Data Type works in conjunction with the Countries plugins to generate country-specific postal/zip formats 
for consistency of data across each row. For example:


```
United Kingdom      01552 515219
Canada              (604) 264-2551
United Kingdom      01512 215441
```

## Examples 

- [Generate a postal/zip code in a random format](#generate-a-postalzip-code-in-a-random-format)
- [Generate a postal code from a set of predefined countries](#generate-a-postal-code-from-a-set-of-predefined-countries)
- [Generate a postal code that maps to a country row](#generate-a-postal-code-that-maps-to-a-country-row)
- [Generate a postal code that maps to a region row](#generate-a-postal-code-that-maps-to-a-region-row)


### Generate a postal/zip code in a random format

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: DataType.PostalZip,
            title: 'Any postal code',
            settings: {
                source: 'any'
            }
        },
    ],
        exportSettings: {
        plugin: ExportType.JSON,
            settings: {
            dataStructureFormat: 'simple'
        }
    }
}
```

Sample output:

```typescript
[
    {
        "Any postal code": 95201
    },
    {
        "Any postal code": 8322
    },
    {
        "Any postal code": 34353
    },
    {
        "Any postal code": "7933-9534"
    },
    {
        "Any postal code": "39456-26578"
    },
    {
        "Any postal code": 16580
    },
    ...
]
```

### Generate a postal code from a set of predefined countries

### Generate a postal code that maps to a country row

### Generate a postal code that maps to a region row
