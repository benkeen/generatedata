# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; Computed

This Data Type lets you re-use the content from other generate fields in the row and manipulate that information however
you need.


### Examples

This example generates 2 rows of random numbers, then 2 rows of Composite fields that use the random numbers.
    

```javascript
{
    "numRows": 10,
    "rows": [
        {
            "type": "NumberRange",
            "title": "Random Num 1",
            "settings": {
                "rangeMin": 1, 
                "rangeMax": 100
            }
        },
        {
            "type": "NumberRange",
            "title": "Random Num 2",
            "settings": {
                "rangeMin": 1, 
                "rangeMax": 100
            }
        },
        {
            "type": "Composite",
            "title": "Num 1 + Num 2",
            "settings": {
                "placeholder": "{$ROW1+$ROW2}"
            }
        },
        {
            "type": "Composite",
            "title": "Display the original nums",
            "settings": {
                "placeholder": "Values: {$ROW1}, {$ROW2}"
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

Notes:
- This Data Type always outputs strings.
- The `{$ROW1}` placeholders get switched out with the generated value in the `rows` array. So the first index == `{$ROW1}` 
 
### API help

For more information about the API, check out:
[http://benkeen.github.io/generatedata/api.html](http://benkeen.github.io/generatedata/api.html)
