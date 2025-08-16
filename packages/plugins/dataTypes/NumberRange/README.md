# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; NumberRange

This Data Type generates a number.


### Examples

This example generates 2 pieces of data:
- a random number between 1 and 100.
- a random number between -10000 and -20000.

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: 'NumberRange',
            title: 'num1',
            settings: {
                min: 1,
                max: 100
            }
        },
        {
            plugin: 'NumberRange',
            title: 'num2',
            settings: {
                min: -10000,
                max: -20000
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
        "num1": 100,
        "num2": -2811
    },
    {
        "num1": 23,
        "num2": -4337
    },
    {
        "num1": 89,
        "num2": -8604
    },
    {
        "num1": 72,
        "num2": -9465
    },
    {
        "num1": 8,
        "num2": -2012
    },
    {
        "num1": 4,
        "num2": -8977
    },
    ...
]
```
