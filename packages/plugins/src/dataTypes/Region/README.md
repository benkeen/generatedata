# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; Region

This Data Type generates a random region. A region is something like a State, Province or County - whatever is 
applicable for a particular country. The region data is stored in the [Country Plugins](../../countries/README.md), so 
see that section to see what information is currently available. All country plugins provide regions.

Countries are typically subdivided geographically in numerous ways, so we choose the one that's most useful overall -
almost always whatever region is used for addresses. For the shortcodes, typically they follow the ISO-3166-2 standard.

This Data Type lets you generate regions in a number of different ways, hence the varied typings listed below. 

You can choose to generate regions from 3 different sources: 
1. `Any region` - This will generate a random region pulled from _any_ of the country plugins. 
2. `Countries` - This generates a region from whatever list of countries you supply.
3. `Country Row` - This option lets you target a Country Data Type row in your data set, and use that as the source. It'll
then generate a region in whatever random country is generated for that row. 

You can also choose whether this field outputs the full region name or a shortcode version (or either). 

## Typings

```typescript
export type RegionSource = 'anyRegion' | 'countries' | 'countryRow';
export type RegionFormat = 'full' | 'short';

export type RegionState = {
    source: RegionSource;
    targetRowId: string;
    selectedCountries: CountryType[];
    formats: RegionFormat[];
}

export type RegionStateAny = Pick<RegionState, 'source' | 'formats'>;
export type RegionStateCountryRow = Pick<RegionState, 'source' | 'targetRowId' | 'formats'>;
export type RegionStateCountries = Pick<RegionState, 'source' | 'selectedCountries' | 'formats'>;
```

## Examples 

- [Any region, with full and short names](#any-region-with-full-and-short-names)
- [Any region from two countries](#any-region-from-two-countries)
- [Any region mapped to a country row](#any-region-mapped-to-a-country-row)
- [Full Region mapped to Country Subset row](#full-region-mapped-to-country-subset-row)


### Any region, with full and short names

This example outputs three rows of region data using the `anyRegion` option as a data source. The first displays the
full region name, the second shows their shortcode, the third shows randomly short or full. 

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: 'Region',
            title: 'Full Region',
            settings: {
                source: 'anyRegion',
                formats: ['full']
            }
        },
        {
            plugin: 'Region',
            title: 'Short Region Code',
            settings: {
                source: 'anyRegion',
                formats: ['short']
            }
        },
        {
            plugin: 'Region',
            title: 'Short/Full Region Code',
            settings: {
                source: 'anyRegion',
                formats: ['short', 'full']
            }
        }
    ],
    exportSettings: {
        plugin: 'JSON',
        settings: {
            dataStructureFormat: 'simple'
        }
    }
}
```

Sample output:

```
[
    {
        "Full Region": "Moscow Oblast",
        "Short Region Code": "MP",
        "Short/Full Region Code": "SB",
    },
    {
        "Full Region": "Hidalgo",
        "Short Region Code": "DS",
        "Short/Full Region Code": "Agder",
    },
    {
        "Full Region": "Gilgit Baltistan",
        "Short Region Code": "QC",
        "Short/Full Region Code": "Extremadura",
    },
    {
        "Full Region": "Alajuela",
        "Short Region Code": "Manisa",
        "Short/Full Region Code": "Dr",
    },
    {
        "Full Region": "Punjab",
        "Short Region Code": "Adana",
        "Short/Full Region Code": "Overijssel"
    },    
    ...
]
```

### Any region from two countries

This example use the `countries` source to let you fine-tune what countries should be used as the region data source.
This generates regions from either Canada or Russia.

```javascript
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
                selectedCountries: ['Canada', 'Russia'],
                formats: ['full']
            }
        }
    ],
    exportSettings: {
        plugin: 'JSON',
        settings: {
            dataStructureFormat: 'simple'
        }
    }
}
```

Sample output:

```
[
    {
        "Region from 2 countries": "Prince Edward Island"
    },
    {
        "Region from 2 countries": "Saint Petersburg City"
    },
    {
        "Region from 2 countries": "Bryansk Oblast"
    },
    {
        "Region from 2 countries": "Ulyanovsk Oblast"
    },
    {
        "Region from 2 countries": "Newfoundland and Labrador"
    },
    ...
]
```

### Any region mapped to a country row

This example shows how you can map one or more Region fields to a Country row. When generating the group of data,
the generator will know to generate a region from the randomly generated country for that group, ensuring consistency.

Note the use of the `id` and `targetRowId` properties. You can enter _any string value_ you want for those, as long as
it's unique across the entire data template. In the website, it generates a random GUID internally for each row.

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: 'Country',
            title: 'Country',
            settings: {
                source: 'plugins',
                selectedCountries: []
            },
            id: '1'
        },
        {
            plugin: 'Region',
            title: 'Full Region mapped to Country Row #1',
            settings: {
                source: 'countryRow',
                targetRowId: '1',
                formats: ['full']
            }
        },
        {
            plugin: 'Region',
            title: 'Short Region mapped to Country Row #1',
            settings: {
                source: 'countryRow',
                targetRowId: '1',
                formats: ['short']
            }
        }
    ],
    exportSettings: {
        plugin: 'JSON',
        settings: {
            dataStructureFormat: 'simple'
        }
    }
}
```

Sample output:

```
[
    {
        "Country": "Chile",
        "Full Region mapped to Country Row #1": "Metropolitana de Santiago",
        "Short Region mapped to Country Row #1": "X"
    },
    {
        "Country": "Sweden",
        "Full Region mapped to Country Row #1": "Östergötlands län",
        "Short Region mapped to Country Row #1": "E"
    },
    {
        "Country": "Australia",
        "Full Region mapped to Country Row #1": "Tasmania",
        "Short Region mapped to Country Row #1": "NT"
    },
    {
        "Country": "New Zealand",
        "Full Region mapped to Country Row #1": "North Island",
        "Short Region mapped to Country Row #1": "NI"
    },
    {
        "Country": "Chile",
        "Full Region mapped to Country Row #1": "Valparaíso",
        "Short Region mapped to Country Row #1": "VII"
    },
    {
        "Country": "Ukraine",
        "Full Region mapped to Country Row #1": "Volyn oblast",
        "Short Region mapped to Country Row #1": "RV"
    },
    ...
]
```

### Full Region mapped to Country Subset row

This example generates a region for a subset of countries.

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: 'Country',
            title: 'country-plugin2',
            settings: {
                source: 'plugins',
                selectedCountries: ['Canada', 'US']
            },
            id: '123'
        },
        {
            plugin: 'Region',
            title: 'Full Region mapped to Country Subset row',
            settings: {
                source: 'countryRow',
                targetRowId: '123',
                formats: ['full']
            }
        }
    ],
    exportSettings: {
        plugin: 'JSON',
        settings: {
            dataStructureFormat: 'simple'
        }
    }
}
```

Sample output:

```
[
    {
        "country": "Canada",
        "region": "Nova Scotia"
    },
    {
        "country": "United States",
        "region": "California"
    },
    {
        "country": "Canada",
        "region": "Northwest Territories"
    },
    {
        "country": "Canada",
        "region": "Alberta"
    },
    {
        "country": "Canada",
        "region": "Northwest Territories"
    },
    {
        "country": "Canada",
        "region": "British Columbia"
    },
    {
        "country": "United States",
        "region": "Arkansas"
    },
    ...
]
```
