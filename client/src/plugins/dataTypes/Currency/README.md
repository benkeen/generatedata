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
            plugin: 'Currency',
            title: 'us-dollars',
            settings: {
                from: 1,
                to: 1000000,
                currencySymbol: '$',
                currencySymbolLocation: 'prefix',
                includeCents: true,
                thousandsSeparator: ',',
                centsSeparator: '.'
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

```

Sample output:

```javascript

```

### €100,000 - €200,000

```javascript

```

Sample output:

```javascript

```
