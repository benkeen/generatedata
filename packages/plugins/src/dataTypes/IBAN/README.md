# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; IBAN

This Data Type generates a random International Bank Account Number (IBAN).

## Examples

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "IBAN",
            title: "iban",
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
        "iban": "KW6507127736867163816748311366"
    },
    {
        "iban": "NO0253423327445"
    },
    {
        "iban": "TR744462537189752134298717"
    },
    {
        "iban": "SK7083803211961717418112"
    },
    {
        "iban": "KZ266045443160727663"
    },
    {
        "iban": "SM5647721660133189212975872"
    },
    ...
]
```
