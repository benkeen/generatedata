# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; Colour

The Colour Data Type generates colours in different formats (hex, rgb, rgba), luminosities (bright, light, dark) and
alphas. Under the hood it uses the [randomColor package](https://github.com/davidmerfield/randomColor).


## Typings

```typescript
export const enum ColourFormat {
	hex = 'hex',
	rgb = 'rgb',
	rgba = 'rgba'
}

export const enum LuminosityType {
	any = 'any',
	bright = 'bright',
	light = 'light',
	dark = 'dark'
}

export type ColourState = {
	example: string;
	value: string;
	luminosity: LuminosityType;
	format: ColourFormat;
	alpha: number;
};
```

Note: `value` maps to the `hue` in the [randomColor package](https://github.com/davidmerfield/randomColor). It can either
be a hex code or one of the predefined constants: `red, orange, yellow, green, blue, purple, pink, monochrome`.

## Examples

- [Any random color in hex mode](#any-random-color-in-hex-mode)
- [Any bright red](#any-bright-red) 
- [Any light green with 0.5% alpha](#any-light-green-with-05-alpha)

### Any random color in hex mode


### Any bright red

### Any light green with 0.5% alpha
