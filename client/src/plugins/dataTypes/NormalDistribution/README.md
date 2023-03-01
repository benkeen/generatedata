# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; NormalDistribution

This Data Type generates a random distribution based on a mean and a standard deviation.


### Example API Usage

Just POST the following JSON content to: 
`http://[your site]/[generate data folder]/api/v1/data`

```javascript
{
    "numRows": 50,
    "rows": [
        {
            "type": "NormalDistribution",
            "title": "val",
            "settings": {
                "mean": "0.7",
                "sigma": "1",
                "precision": "3"
            }
        }
    ],
    "export": {
        "type": "JSON",
        "settings": {
            "stripWhitespace": false,
            "dataStructureFormat": "simple"
        }
    }
}
```
 
### API help

For more information about the API, check out:
[http://benkeen.github.io/generatedata/api.html](http://benkeen.github.io/generatedata/api.html)
