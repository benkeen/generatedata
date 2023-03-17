# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; PostalZip

This Data Type works in conjunction with the Countries plugins to generate country-specific postal/zip formats 
for consistency of data across each row.

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
            plugin: "PostalZip",
            title: "Any postal code",
            settings: {
                source: "any"
            }
        },
    ],
    exportSettings: {
        plugin: "JSON",
        settings: {
            dataStructureFormat: "simple"
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

This example outputs a random postal code from either Canada or the US. 

```typescript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "PostalZip",
            title: "two-countries",
            settings: {
                source: "countries",
                selectedCountries: ["Canada", "US"]
            }
        }
    ],
    exportSettings: {
        plugin: "JSON",
        settings: {
            dataStructureFormat: "simple"
        }
    }
}
```

Sample output:

```typescript
[
    {
        "two-countries": "L4S 7S6"
    },
    {
        "two-countries": "H1P 6R6"
    },
    {
        "two-countries": 37488
    },
    {
        "two-countries": 84824
    },
    {
        "two-countries": 47702
    },
    {
        "two-countries": "B7G 6Z7"
    },
    ...
]
```

### Generate a postal code that maps to a country row

This generates a random country from a short list, then generates a postal code in the format of each country.

```typescript
{
	generationSettings: {
		numResults: 10
	},
	dataTemplate: [
		{
			plugin: 'Country',
			title: 'country-plugins-subset',
			settings: {
				source: 'plugins',
				selectedCountries: [
					'Canada',
					'US',
					'Norway'
				]
			},
			id: '123'
		},
		{
			plugin: 'PostalZip',
			title: 'zip',
			settings: {
				source: 'countryRow',
				targetRowId: '123'
			}
		}
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
        "country-plugins-subset": "United States",
        "zip": 71534
    },
    {
        "country-plugins-subset": "Norway",
        "zip": 6225
    },
    {
        "country-plugins-subset": "Norway",
        "zip": 1466
    },
    {
        "country-plugins-subset": "Canada",
        "zip": "J1N 8M4"
    },
    {
        "country-plugins-subset": "Canada",
        "zip": "B4X 8E8"
    },
	{
		"country-plugins-subset": "United States",
		"zip": 38648
	},
    {
        "country-plugins-subset": "Norway",
        "zip": 7797
    },
    {
        "country-plugins-subset": "Norway",
        "zip": 7802
    },
    ...
]
```

### Generate a postal code that maps to a region row

```
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: 'Region',
            title: 'Region from 2 countries',
            settings: {
                source: 'countries',
                selectedCountries: ['Canada', 'US'],
                formats: ['full']
            },
            id: '555'
        },
        {
            plugin: 'PostalZip',
            title: 'zip',
            settings: {
                source: 'regionRow',
                targetRowId: '555'
            }
        }
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
        "Region from 2 countries": "Connecticut",
        "zip": 79839
    },
    {
        "Region from 2 countries": "Northwest Territories",
        "zip": "35H 2C5"
    },
    {
        "Region from 2 countries": "Louisiana",
        "zip": 67174
    },
    {
        "Region from 2 countries": "Prince Edward Island",
        "zip": "F1V 2H3"
    },
    {
        "Region from 2 countries": "Ontario",
        "zip": "N0Z 1L0"
    },
    {
        "Region from 2 countries": "Nevada",
        "zip": 72129
    },
    {
        "Region from 2 countries": "Ohio",
        "zip": 28624
    },
    {
        "Region from 2 countries": "Arizona",
        "zip": 85129
    },
    {
        "Region from 2 countries": "Yukon",
        "zip": "Y7R 9N2"
    },
    {
        "Region from 2 countries": "Tennessee",
        "zip": 60459
    }
  ]
```
