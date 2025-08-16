# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; GUID

This Data Type generates a random GUID of the form: **HHHHHHHH-HHHH-HHHH-HHHH-HHHHHHHHHHHH**  


### Examples

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "GUID",
            title: "guid",
            settings: {}
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

```
[
    {
        "guid": "C18F6297-C66D-CBBE-A989-87C96D9622A9"
    },
    {
        "guid": "73666931-A5C4-C95A-A695-D5C16DA44B52"
    },
    {
        "guid": "6B143394-30D2-ED74-E84B-79624967B3B4"
    },
    {
        "guid": "6991BE69-164A-6B79-8034-FE6A252BA645"
    },
    {
        "guid": "4B873844-3297-0BB9-3FA8-11E99B5BCBE8"
    },
    {
        "guid": "C363AB2E-7B16-46BD-BADD-CBCA58EEE404"
    },
    ...
]
```
