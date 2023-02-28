# [CLI](../../../../../cli/README.md) &raquo; [Plugins](../../../../../cli/PLUGINS.md) &raquo; Country

This Data Type generates a random country name. It can be used in two ways:
1. Generates a random country name from the ~250 countries in the world. 
2. Generates a random country name from the list of Country plugins. 
 
The Country plugins provide a much richer set of data for use by the Data Generator. Each plugin contains regions, cities, 
postal/zip formats and phone numbers - anything specific to the country. The benefit to using the country plugins is when you 
use multiple, related data types like `Region` and `City`: it ensures that each row of data is consistent 
and that the city names belong to the region, which belongs to the country. 

## Examples

This generates two rows of data:
1. Any country from the full list of `250 countries in the world.
2. Any country from the list of plugins.
3. One of the selected country plugins (Canada, Nigeria, Spain, Norway)

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: 'Country',
            title: 'any-country',
            settings: {
                source: 'all'
            }
        },
        {
            plugin: 'Country',
            title: 'country-plugin',
            settings: {
                source: 'plugins'
            }
        },
        {
            plugin: 'Country',
            title: 'country-plugin',
            settings: {
                source: 'plugins',
                selectedCountries: [
                    'Canada',
                    'Nigeria',
                    'Spain',
                    'Norway'
                ]
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
