# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; StreetAddress

This Data Type generates a basic, westernized street address out of lorem ipsum text and standard address formats.


## Examples

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: 'StreetAddress',
            title: 'street_address',
            settings: {}
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
        "street_address": "105-6473 Amet Avenue"
    },
    {
        "street_address": "2200 Ac Rd."
    },
    {
        "street_address": "474-7655 Dolor Rd."
    },
    {
        "street_address": "720-4330 Sit Rd."
    },
    {
        "street_address": "806 Duis Rd."
    },
    {
        "street_address": "912-1517 Egestas. Street"
    },
    ...
]
```
