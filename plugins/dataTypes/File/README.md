## File Data Type

This Data Type generates a random filename.


### Example API Usage

```json
{
    "numRows": 31,
    "rows": [
        {
            "type": "File",
            "title": "File"
        }
    ],
    "export": {
        "type": "JSON",
        "settings": {
            "path": "images/",
            "extensions": "jpg,png",
            "lengthMin": 10,
            "lengthMax": 15
        }
    }
}
```
 
### API help

For more information about the API, check out:
[http://benkeen.github.io/generatedata/api.html](http://benkeen.github.io/generatedata/api.html)
