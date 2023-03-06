# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; Company

Generates a random company name. This is a very simple plugin and the same functionality can actually be achieved with 
the [Custom List](../List) Data Type. But it's a quick convenient way to have all the company names auto-generated with
no additional configuration.

### Examples

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "Company",
            title: "company-name",
            settings: {}
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
        "company-name": "Rutrum LLC"
    },
    {
        "company-name": "Orci Ltd"
    },
    {
        "company-name": "Pede Nonummy Ut LLP"
    },
    {
        "company-name": "Aliquam Adipiscing Foundation"
    },
    {
        "company-name": "Luctus Vulputate Institute"
    },
    {
        "company-name": "Morbi LLC"
    },
    ...
]
```
