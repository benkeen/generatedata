# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; CVV

CVV stands for Card Verification Value. It's that 3-digit number you see on the back of your credit card. This Data Type
generates a random CVV. All it really does is generate a random 3 digit code. Simple! 

## Examples

```typescript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "CVV",
            title: "cvv",
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
        "cvv": 454
    },
    {
        "cvv": 742
    },
    {
        "cvv": 945
    },
    {
        "cvv": 285
    },
    {
        "cvv": 907
    },
    {
        "cvv": 408
    },
    {
        "cvv": 572
    },
    ...
]
```
