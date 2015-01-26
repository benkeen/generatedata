## Tree Data Type

The idea of this Data Type is to generate a tree structure by mapping the rows of your generated results into
a heirarchy. The way it works is that you use this in conjuction with an `AutoIncrement` field - or any Data Type 
whose generated content is unique, such as the `GUID` Data Type. You target that column, then specify the possibly
number of siblings. 

Here's an example, but it's best to try out the API usage (or generatedata UI) and play around with the values
to really understand it. 

```
Auto Inc    Parent ID (Tree)
1           0
2           1
3           2
4           1
5           3   
6           2
7           3
```


### Example API Usage

```javascript
{
    "numRows": 10,
    "rows": [
        {
            "type": "AutoIncrement",
            "title": "Simple increment",
            "settings": {
                "incrementStart": 1,
                "incrementValue": 1
            }
        },
        {
            "type": "Tree",
            "title": "Parent ID", 
            "settings": {
                "autoIncRowNum": 1,
                 "maxSiblings": 2
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
