# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; Country

This Data Type generates a random country name. It can be used in two ways:
1. Generates a random country name from the ~250 countries in the world. 
2. Generates a random country name from the list of Country plugins (~35 countries). 
 
_Wait, why would you choose the plugin option? It has way fewer countries!_

The Country plugins provide a much richer set of data for use by the Data Generator. Each plugin contains regions, cities, 
postal/zip formats and phone numbers - anything specific to the country. These let you tie multiple rows together in your 
data set, like `Country`, `Region` and `City`: it ensures that the data looks realistic for a single row of data, i.e. 
a random city name is within a random region within the randomly selected country. 

## Examples

This generates three rows of data:
1. Any country from the full list of ~250 countries in the world.
2. Any country from the full list of plugins (pass empty array for `selectedCountries`)
3. One of the selected country plugins (Canada, Nigeria, Spain, Norway)

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "Country",
            title: "any-country",
            settings: {
                source: "all"
            }
        },
        {
            plugin: "Country",
            title: "country-plugin",
            settings: {
                source: "plugins",
                selectedCountries: []
            }
        },
        {
            plugin: "Country",
            title: "country-plugin",
            settings: {
                source: "plugins",
                selectedCountries: [
                    "Canada",
                    "Nigeria",
                    "Spain",
                    "Norway"
                ]
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

```
[
    {
        "any-country": "Armenia",
        "country-plugin": "Germany",
        "country-plugins-subset": "Norway"
    },
    {
        "any-country": "Argentina",
        "country-plugin": "Colombia",
        "country-plugins-subset": "Norway"
    },
    {
        "any-country": "Micronesia",
        "country-plugin": "Poland",
        "country-plugins-subset": "Nigeria"
    },
    {
        "any-country": "Estonia",
        "country-plugin": "Costa Rica",
        "country-plugins-subset": "Spain"
    },
    {
        "any-country": "Mongolia",
        "country-plugin": "Ireland",
        "country-plugins-subset": "Spain"
    },
    {
        "any-country": "Bouvet Island",
        "country-plugin": "Australia",
        "country-plugins-subset": "Canada"
    },
    ...
}
```
