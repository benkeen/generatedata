# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; Time

This Data Type generates a random time in a particular format. It's currently a bit of an awkward interface in that it 
requires passing the `fromTime` and `toTime` settings sin _seconds timestamp_ format. I realize this isn't the
easiest format to work with, so we have a feature request to improve the DX here: https://github.com/benkeen/generatedata/issues/825
Try using an online service such as the [epochconvertor site](https://www.epochconverter.com/) to generate those values for you.


## Examples

```typescript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: 'Time',
            title: 'time',
            settings: {
                fromTime: 1678944164,
                toTime: 1679030564,
                format: 'h:mm a'
            }
        },
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

```typescript
[
    {
        "time": "7:45 AM"
    },
    {
        "time": "7:44 AM"
    },
    {
        "time": "4:54 AM"
    },
    {
        "time": "4:06 AM"
    },
    {
        "time": "7:13 PM"
    },
    {
        "time": "9:53 PM"
    },
    ...
]
```
