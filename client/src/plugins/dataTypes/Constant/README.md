## Constant Data Type

This Data Type generates a constant value (any string / number) for N rows, then switches to another constant. You can 
control the size of N and the list of constants to be inserted. Basically it lets you do things like give half your 
generated data set one value for a field, and the second half a different value. 

### Example API Usage

```javascript
{
    "numRows": 10,
    "rows": [
        {
            "type": "Constant",
            "title": "A couple o' constants",
            "settings": {
                "loopCount": 5,
                "values": "One|Two"
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
