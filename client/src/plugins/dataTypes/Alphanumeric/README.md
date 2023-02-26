# [CLI](../../../../../cli/README.md) &raquo; [Plugins](../../../../../cli/PLUGINS.md) &raquo; Alphanumeric

This Data Type generates random alphanumeric strings in a custom format. This can be used for anything you fancy. The only
limit is your imagination. (It's late, I really can't believe I just typed that).

## Typings

The `settings` property for the `Alphanumeric` plugin `dataTemplate` entry contains a single `value` property, containing 
whatever placeholder characters you want. See the Examples section below to see how it all fits together.

```
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

## Examples

### US Zip codes

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: 'Alphanumeric',
            title: 'US Zip',
            settings: {
                value: 'Xxxxx'
            }
        },
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
