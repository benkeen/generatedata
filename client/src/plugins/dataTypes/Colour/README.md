# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; Colour

The Colour Data Type generates colours in different formats (hex, rgb, rgba), luminosities (bright, light, dark) and
alphas. Under the hood it uses the [randomColor package](https://github.com/davidmerfield/randomColor).


## Typings

```typescript
export const enum ColourFormatEnum {
	hex = 'hex',
	rgb = 'rgb',
	rgba = 'rgba'
}
export type ColourFormat = `${ColourFormatEnum}`;

export const enum LuminosityTypeEnum {
	any = 'any',
	bright = 'bright',
	light = 'light',
	dark = 'dark'
}
export type LuminosityType = `${LuminosityTypeEnum}`;

export type ColourState = {
	example: string;
	value: string;
	luminosity: LuminosityType;
	format: ColourFormat;
	alpha: number;
};
```

Note: `value` maps to the `hue` setting in the [randomColor package](https://github.com/davidmerfield/randomColor). It can 
either be a hex code or one of the predefined constants: `red, orange, yellow, green, blue, purple, pink, monochrome`.


## Examples

When it comes to actually illustrating the colours generated, markdown isn't exacty great! But these examples are here
anyway, just so you can see how they work. 

- [Any random color in hex mode](#any-random-color-in-hex-mode)
- [Any bright red](#any-bright-red) 
- [Any green with 0.5% alpha in rgba](#any-green-with-05-alpha-in-rgba)

### Any random color in hex mode

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "Colour",
            title: "colour",
            settings: {
                value: "",
                format: "hex"
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

```
[
    {
        "colour": "#fcbebd"
    },
    {
        "colour": "#21d147"
    },
    {
        "colour": "#70e26a"
    },
    {
        "colour": "#bbd852"
    },
    {
        "colour": "#39b513"
    },
    {
        "colour": "#60acc4"
    },
    ...
]
```
### Any bright red

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "Colour",
            title: "bright-red",
            settings: {
                value: "#EE4B2B",
                format: "hex",
                luminosity: "bright"
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
        "bright-red": "#e84c80"
    },
    {
        "bright-red": "#a3033d"
    },
    {
        "bright-red": "#f7270c"
    },
    {
        "bright-red": "#ea697f"
    },
    {
        "bright-red": "#f9653b"
    },
    {
        "bright-red": "#b71a17"
    },
    ...
]
```

### Any green with 0.5% alpha in RGBA

```javascript
{
    generationSettings: {
        numResults: 10
    },
    dataTemplate: [
        {
            plugin: "Colour",
            title: "green-with-alpha",
            settings: {
                value: "green",
                format: "rgba",
                alpha: 0.5
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
        "green-with-alpha": "rgba(65, 224, 208, 0.5)"
    },
    {
        "green-with-alpha": "rgba(130, 229, 134, 0.5)"
    },
    {
        "green-with-alpha": "rgba(105, 229, 169, 0.5)"
    },
    {
        "green-with-alpha": "rgba(164, 252, 193, 0.5)"
    },
    {
        "green-with-alpha": "rgba(7, 163, 1, 0.5)"
    },
    {
        "green-with-alpha": "rgba(119, 244, 130, 0.5)"
    },
    ...
]
```
