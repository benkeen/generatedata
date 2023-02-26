# [CLI](../../../../../cli/README.md) &raquo; [Plugins](../../../../../cli/PLUGINS.md) &raquo; Alphanumeric

This Data Type generates random alphanumeric strings according to whatever format you want. Note: for the 
placeholder strings, documentation for this Data Type in the generatedata UI. That provides the list of available
placeholders.

## Placeholders

```
C, c, E - any consonant (upper case, lower case, any)
V, v, F - any vowel (upper case, lower case, any)
L, l, D - any letter (upper case, lower case, any)
X       - 1-9
x       - 0-9
H       - 0-F
```

## Examples

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: 'Alphanumeric',
            title: 'Zip',
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
