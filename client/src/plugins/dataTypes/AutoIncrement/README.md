# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; AutoIncrement

This Data Type generates auto-increment sequences in a variety of different ways.  

> Note: if you're generating a database table and are looking for a simple _auto-increment primary key_ field, that option
actually already exists in the [SQL Export Type](../../exportTypes/SQL/README.md) - you don't need a separate field for
that.

## Typings

```typescript
{
    incrementStart: number;
    incrementValue: number;
    incrementPlaceholder?: string;
}

```

## The `incrementPlaceholder` property

Providing the start value and the increment jump (plus or minus) is required via the `incrementStart` and `incrementValue`
properties. But providing a totally custom placeholder is optional. That lets you fine-tune exactly how the value is
outputted.

The `{{INCR}}` string has special meaning within that field. That string gets switched out for whatever the auto-increment
number has been calculated. That lets you use that value within the context of an entire string. 


# Examples

This example generates four separate fields with different auto-increment values, like so:
- 1, 2, 3, 4, ...
- A-10, A-20, A-30, A-40, ...
- 100B, 95B, 90B, 85B, ... 
- 10-20, 11-22, 12-24, 13-35...

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "AutoIncrement",
            title: "Simple increment",
            settings: {
                incrementStart: 1,
                incrementValue: 1
            }
        },
        {
            plugin: "AutoIncrement",
            title: "Tens with prefix",
            settings: {
                incrementStart: 10,
                incrementValue: 10,
                incrementPlaceholder: "A-{{INCR}}"
            }
        },
        {
            plugin: "AutoIncrement",
            title: "Decrement with suffix",
            settings: {
                incrementStart: 100,
                incrementValue: -5,
                incrementPlaceholder: "{{INCR}}B"
            }
        },
        {
            plugin: "AutoIncrement",
            title: "Incrementing range",
            settings: {
                incrementStart: 10,
                incrementValue: 1,
                incrementPlaceholder: "{{INCR}}-{{INCR*2}}"
            }
        }
    ],
    exportSettings: {
        type: "JSON",
        settings: {
            dataStructureFormat: "simple"
        }
    }
}
```

Sample output: 

```
[
    {
        "Simple increment": 1,
        "Tens with prefix": "A-10",
        "Decrement with suffix": "100B",
        "Incrementing range": "10-20"
    },
    {
        "Simple increment": 2,
        "Tens with prefix": "A-20",
        "Decrement with suffix": "95B",
        "Incrementing range": "11-22"
    },
    {
        "Simple increment": 3,
        "Tens with prefix": "A-30",
        "Decrement with suffix": "90B",
        "Incrementing range": "12-24"
    },
    {
        "Simple increment": 4,
        "Tens with prefix": "A-40",
        "Decrement with suffix": "85B",
        "Incrementing range": "13-26"
    },
    {
        "Simple increment": 5,
        "Tens with prefix": "A-50",
        "Decrement with suffix": "80B",
        "Incrementing range": "14-28"
    },
    {
        "Simple increment": 6,
        "Tens with prefix": "A-60",
        "Decrement with suffix": "75B",
        "Incrementing range": "15-30"
    },
    {
        "Simple increment": 7,
        "Tens with prefix": "A-70",
        "Decrement with suffix": "70B",
        "Incrementing range": "16-32"
    },
    {
        "Simple increment": 8,
        "Tens with prefix": "A-80",
        "Decrement with suffix": "65B",
        "Incrementing range": "17-34"
    },
    {
        "Simple increment": 9,
        "Tens with prefix": "A-90",
        "Decrement with suffix": "60B",
        "Incrementing range": "18-36"
    },
    {
        "Simple increment": 10,
        "Tens with prefix": "A-100",
        "Decrement with suffix": "55B",
        "Incrementing range": "19-38"
    }
]
```
