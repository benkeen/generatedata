# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; Phone

This Data Type generates a phone number with a simple search-replace algorithm. Any `X`'s in the placeholder
string are replaced with 1-9; any `x`'s (lowercase) are replaced with 0-9. 


## Examples

- [Generate a random phone number in a single format](#generate-a-random-phone-number-in-a-single-format) 
- [Generate a random phone number in multiple formats](#generate-a-random-phone-number-in-multiple-formats)

### Generate a random phone number in a single format

```typescript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: 'Phone',
            title: 'phoneNum',
            settings: {
                option: ['(Xxx) Xxx-xxxx']
            }
        }
    ],
    exportSettings: {
        plugin: ExportType.JSON,
        settings: {
            dataStructureFormat
        }
    }
}
```

Sample output:

```javascript
[
    {
        "phoneNum": "(143) 454-2481"
    },
    {
        "phoneNum": "(988) 411-7252"
    },
    {
        "phoneNum": "(340) 460-3834"
    },
    {
        "phoneNum": "(380) 685-3692"
    },
    {
        "phoneNum": "(337) 643-8780"
    },
    {
        "phoneNum": "(344) 746-2939"
    },
    ...
]
```

### Generate a random phone number in multiple formats

```typescript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: 'Phone',
            title: 'phoneNum',
            settings: {
                option: [
					'(Xxx) Xxx-xxxx',
                    '1 (Xxx) Xxx-xxxx',
					'Xxx Xxx-xxxx'
                ]
            }
        }
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

```javascript
[
    {
        "phoneNum": "882 579-5511"
    },
    {
        "phoneNum": "(237) 433-6484"
    },
    {
        "phoneNum": "(244) 278-9347"
    },
    {
        "phoneNum": "1 (927) 607-4334"
    },
    {
        "phoneNum": "553 957-8737"
    },
    {
        "phoneNum": "302 923-7126"
    },
    ...
]
```
