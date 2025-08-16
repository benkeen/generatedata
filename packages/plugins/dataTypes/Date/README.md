# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; Date

This Data Type generates a random date in a particular format. 

- the `fromDate` and `toDate` settings should be a number in _seconds timestamp_ format. I realize this isn't the 
easiest format to work with, so we have a feature request to improve the DX here: https://github.com/benkeen/generatedata/issues/825
Try using an online service such as the [epochconvertor site](https://www.epochconverter.com/) to generate those values for you.
- the `placeholder` setting should define a date format as per the [datefns library formatting options](https://date-fns.org/v2.16.1/docs/format). 

## Typings

```typescript
export type GenerationOptionsType = {
	fromDate: number;
	toDate: number;
	format: string;
};
```

## Examples

### Any date from from Jan 1st 2023, to Dec 31st, 2023 in `MMM, d, Y` format.

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: 'Date',
            title: 'date1',
            settings: {
                fromDate: 1672531200,
                toDate: 1702511999,
                format: 'MMM d, y'
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
        "date1": "Jul 26, 2023"
    },
    {
        "date1": "Mar 25, 2023"
    },
    {
        "date1": "Oct 1, 2023"
    },
    {
        "date1": "Nov 27, 2023"
    },
    {
        "date1": "Aug 13, 2023"
    },
    ...
]
```
