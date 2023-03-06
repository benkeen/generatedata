# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; City

Generates a random city name. You have the choice of generating a city name from anywhere in the world, or mapping
it to other data in the generated row, so the city is actually within a region or country from another field. This makes 
the generated data more realistic.

## Typings

```
{
    source: RegionSource; // 'any', 'countries', 'regionRow'
    selectedCountries: CountryType[];
    targetRowId: string;
}
```

## Examples

- [Random city from anywhere](#random-city-from-anywhere)
- [Random city within a specific country list](#random-city-within-a-specific-country-list)
- [Random city within a generated region row](#random-city-within-a-generated-region-row)


### Random city from anywhere

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "City",
            title: "any-city",
            settings: {
                source: "any"
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

```javascript
[
    {
        "any-city": "Changi"
    },
    {
        "any-city": "Kitzbühel"
    },
    {
        "any-city": "Glendale"
    },
    {
        "any-city": "Coevorden"
    },
    {
        "any-city": "Edam"
    },
    {
        "any-city": "Te Awamutu"
    },
    ...
]
```

### Random city within a specific country list

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "City",
            title: "city-within-country",
            settings: {
                source: "countries",
                selectedCountries: ["Australia", "Canada"]
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

```javascript
[
    {
        "city-within-country": "Greater Hobart"
    },
    {
        "city-within-country": "Palmerston"
    },
    {
        "city-within-country": "Coleville Lake"
    },
    {
        "city-within-country": "Stratford"
    },
    {
        "city-within-country": "Gjoa Haven"
    },
    {
        "city-within-country": "Mount Isa"
    },
    ...
]
```

### Random city within a generated region row

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "City",
            title: "city-within-country",
            settings: {
                source: "countries",
                selectedCountries: ["Australia", "Canada"]
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

```javascript
[
    {
        "region-source": "South Australia",
        "city-within-region": "Whyalla"
    },
    {
        "region-source": "Queensland",
        "city-within-region": "Hervey Bay"
    },
    {
        "region-source": "Bayern",
        "city-within-region": "Fürth"
    },
    {
        "region-source": "Baden Württemberg",
        "city-within-region": "Friedrichshafen"
    },
    {
        "region-source": "Baden Württemberg",
        "city-within-region": "Tübingen"
    },
    {
        "region-source": "Australian Capital Territory",
        "city-within-region": "Canberra"
    },
    ...
]
```
