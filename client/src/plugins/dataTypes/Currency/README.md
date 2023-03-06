# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; Currency

This Data Type generates a random monetary value. It's pretty versatile and can be used for many, if not all country
currencies.

## Typings

There are a lot of fields you need to enter for this field. See the examples below.

```typescript
export enum PrefixLocationEnum {
	prefix = 'prefix',
	suffix = 'suffix'
}
export type PrefixLocation = `${PrefixLocationEnum}`;

export type GenerationOptionsType = {
	from: number;
	to: number;
	currencySymbol: string;
	currencySymbolLocation: PrefixLocation;
	includeCents: boolean;
	thousandsSeparator: string;
	centsSeparator: string;
}
```

## Examples

- [US Dollars with cents between $1 and $1,000,000](#us-dollars-with-cents-between-1-and-1000000)
- [French Canadian dollars without cents](#french-canadian-dollars-without-cents)
- [€100,000 - €200,000](#100000---200000)

### US Dollars with cents between $1 and $1,000,000

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "Currency",
            title: "us-dollars",
            settings: {
                from: 1,
                to: 1000000,
                currencySymbol: "$",
                currencySymbolLocation: "prefix",
                includeCents: true,
                thousandsSeparator: ",",
                centsSeparator: "."
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
        "us-dollars": "$95,100.93"
    },
    {
        "us-dollars": "$568,419.68"
    },
    {
        "us-dollars": "$986,749.00"
    },
    {
        "us-dollars": "$477,687.42"
    },
    {
        "us-dollars": "$830,433.46"
    },
    {
        "us-dollars": "$659,647.45"
    },
    ...
]
```

### French Canadian dollars without cents

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "Currency",
            title: "french-canadian",
            settings: {
                from: 1000,
                to: 5000,
                currencySymbol: " $",
                currencySymbolLocation: "suffix",
                includeCents: true,
                thousandsSeparator: ".",
                centsSeparator: ","
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
        "french-canadian": "1.268,40 $"
    },
    {
        "french-canadian": "4.937,54 $"
    },
    {
        "french-canadian": "4.350,88 $"
    },
    {
        "french-canadian": "2.064,24 $"
    },
    {
        "french-canadian": "1.535,07 $"
    },
    ...
]
```

### €100,000 - €200,000

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "Currency",
            title: "french-canadian",
            settings: {
                from: 1000,
                to: 5000,
                currencySymbol: " $",
                currencySymbolLocation: "suffix",
                includeCents: true,
                thousandsSeparator: ".",
                centsSeparator: ","
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
        "euros-no-cents": "€124,107"
    },
    {
        "euros-no-cents": "€135,657"
    },
    {
        "euros-no-cents": "€114,426"
    },
    {
        "euros-no-cents": "€174,806"
    },
    {
        "euros-no-cents": "€139,199"
    },
    ...
]
```
