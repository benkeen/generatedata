# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; Alphanumeric

This Data Type generates random alphanumeric strings in a custom format. This can be used for anything you fancy. The only
limit is your imagination. (It's late, I can't believe I just typed that).

## Typings

The `settings` value for the `Alphanumeric` plugin `dataTemplate` entry contains a single `value` property, which is a 
string containing whatever placeholder characters you want. See the Examples section below to see how it all fits
together.

```typescript
{
    value: string;
}
```

## Placeholders

These are the available placeholders. Any character not specified here will be output as-is. 

```
C, c, E - any consonant (upper case, lower case, any)
V, v, F - any vowel (upper case, lower case, any)
L, l, D - any letter (upper case, lower case, any)
X       - 1-9
x       - 0-9
H       - 0-F (hexidecimal value)
```

## Misc notes / caveats

- To generate multiple different formats in a single field, just separate the `value` contents with a pipe, e.g.

```javascript
{
    plugin: "Alphanumeric",
    title: "multipleFormats",
    settings: {
        value: "Xxxxx|xxxx|CXxxx"
    }
}
```

- Currently you can't escape any of the placeholders listed above. Feature Request issue open here: https://github.com/benkeen/generatedata/issues/817
- This is an older Data Type. Most of the new ones use an array for the value/options field within settings. At some point
  we may update it for consistency.

## Examples

- [US zip code](#us-zip-code)
- [Tag numbers](#tag-numbers)


### US zip code

Note, this can actually be produced more accurately with the [Postal/Zip](../PostalZip/README.md) Data Type. This is just 
for illustration purposes.

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "Alphanumeric",
            title: "US Zip",
            settings: {
                value: "Xxxxx"
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
        "Zip": 42694
    },
    {
        "Zip": 23645
    },
    {
        "Zip": 12831
    },
    {
        "Zip": 34048
    },
    {
        "Zip": 51791
    },
    ...
]
```

### Tag numbers

This generates a fake clothing tag number of the format `C-152314-DG`.

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "Alphanumeric",
            title: "TagNumber",
            settings: {
                value: "C-xxxxxx-CC"
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
        "TagNumber": "L-670724-GG"
    },
    {
        "TagNumber": "S-371395-QY"
    },
    {
        "TagNumber": "C-861426-QF"
    },
    {
        "TagNumber": "F-750425-VY"
    },
    ...
]
```
