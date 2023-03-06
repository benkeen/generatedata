# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; Boolean

This Data Type generates random Boolean strings according to whatever format you want. It's actually just a convenience
wrapper over some lower-level functions that supplies a bunch of preset boolean options via the UI, like `Yes/No`, `0/1`
and others. 

By the way, even though you'll typically enter two values to randomly choose between, there's no reason why you can't
add more - like the in the final field here.


## Typings 

The settings for this Data Type are just a single `value` property, containing an array of the values you want the script
to randomly pull from. 

```typescript
{
    value: string[];
}
```

Note that they **must be** strings - so even if you want to generate a numeric boolean value (e.g. `0` and `1`), you'll still
need to enter a string here (`["0", "1"]`). Whether or not the actual generated content will be a string, number, boolean
etc. value will depend on the Export Type you've chosen. e.g. in XML, it would just output the character as-is without 
single or double quotes around it, even if it was a string. But if it's in a programming language, it has to be
syntactically correct for that language. 

This Data Type asks the Export Types to _infer_ the type of data it us, based on the content generated. So it's up to the
Export Type to determine exactly it appears. In the examples below, you can see that the [JSON](../../exportTypes/JSON/README.md)
Export Type chose to render the genuine JS boolean and numbers as booleans and numbers, and not double quote them.


### Example

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "Boolean",
            title: "boolean1",
            settings: {
                values: ["Yes", "No"]
            }
        },
        {
            plugin: "Boolean",
            title: "boolean2",
            settings: {
                values: ["0", "1"]
            }
        },
        {
            plugin: "Boolean",
            title: "boolean3",
            settings: {
                values: ["true", "false"]
            }
        },
        {
            plugin: "Boolean",
            title: "notReallyABoolean",
            settings: {
                values: ["Yes", "No", "Maybe"]
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
        "boolean1": "No",
        "boolean2": 1,
        "boolean3": true,
        "notReallyABoolean": "Maybe"
    },
    {
        "boolean1": "Yes",
        "boolean2": 0,
        "boolean3": false,
        "notReallyABoolean": "Maybe"
    },
    {
        "boolean1": "No",
        "boolean2": 0,
        "boolean3": false,
        "notReallyABoolean": "Maybe"
    },
    {
       "boolean1": "Yes",
        "boolean2": 0,
        "boolean3": false,
        "notReallyABoolean": "No"
    },
    {
        "boolean1": "Yes",
        "boolean2": 1,
        "boolean3": true,
        "notReallyABoolean": "No"
    },
    ...
]
```
