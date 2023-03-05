# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; Date

This Data Type generates a random date in a particular format. 

- the `fromDate` and `toDate` settings should be a number in _seconds timestamp_ format. I realize this isn't the 
easiest format to work with, so expanding this 
- the `placeholder` setting should define a date format as per the [datefns library formatting options](https://date-fns.org/v2.16.1/docs/format). 

## Typings

```typescript
export type GenerationOptionsType = {
	fromDate: number;
	toDate: number;
	format: string;
};
```

### Example API Usage

```javascript
{
    "numRows": 20,
    "rows": [
        {
            "type": "Date",
            "title": "Date",
            "settings": {
                "fromDate": "01/01/2015",
                "toDate": "01/01/2020",
                "placeholder": "F jS, Y"
            }
        }
    ],
    "export": {
        "type": "JSON",
        "settings": {
            "stripWhitespace": false,
            "dataStructureFormat": "complex"
        }
    }
}
```
 
### API help

For more information about the API, check out:
[http://benkeen.github.io/generatedata/api.html](http://benkeen.github.io/generatedata/api.html)
