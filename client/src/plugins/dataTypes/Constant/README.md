# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; Constant

This Data Type is an unusual one for the data generator, because the data it generates isn't random at all! It generates
a constant value (any string / number) for a specified number of rows (`N`), then switches to a different constant for
the next `N` rows, and so on until it exhausts all the constants you entered, and it repeats. You can control the size
of `N` and the list of constants to be inserted. See the examples.

## Examples

- [Every odd row gets a "One" value and every even gets a "Two"](#every-odd-row-gets-a-one-value-and-every-even-gets-a-two)
- [The first 2 rows get "A", the second two rows "B", the third two rows "C", then loops](#the-first-2-rows-get-a-the-second-two-rows-b-the-third-two-rows-c-then-loops)  

### Every odd row gets a "One" value and every even gets a "Two"

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "Constant",
            title: "ones-and-twos",
            settings: {
                loopCount: 1,
                values: ["One", "Two"]
            }
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
        "ones-and-twos": "One"
    },
    {
        "ones-and-twos": "Two"
    },
    {
        "ones-and-twos": "One"
    },
    {
        "ones-and-twos": "Two"
    },
    {
        "ones-and-twos": "One"
    },
    {
        "ones-and-twos": "Two"
    },
    ...
]
```

### The first 2 rows get "A", the second two rows "B", the third two rows "C", then loops

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "Constant",
            title: "ABCs",
            settings: {
                loopCount: 2,
                values: ["A", "B", "C"]
            }
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
        "ABCs": "A"
    },
    {
        "ABCs": "A"
    },
    {
        "ABCs": "B"
    },
    {
        "ABCs": "B"
    },
    {
        "ABCs": "C"
    },
    {
        "ABCs": "C"
    },
    {
        "ABCs": "A"
    },
    {
        "ABCs": "A"
    },
    {
        "ABCs": "B"
    },
    {
        "ABCs": "B"
    }
]
```
