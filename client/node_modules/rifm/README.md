# RIFM - React Input Format & Mask

Is a tiny (≈ 800b) component to transform any input component
into formatted or masked input.

[Demo](https://istarkov.github.io/rifm/docs-readme)

## Highlights

- Requires React 16.4+
- Dependency free
- Tiny (≈ 800b)
- Supports any [input](https://istarkov.github.io/rifm/docs-readme#material-ui).
- Can mask input and format

## Example

```javascript
import { Rifm } from 'rifm';
import { Value } from 'react-powerplug';
import TextField from '@material-ui/core/TextField';
import { css } from 'emotion';

const numberFormat = (str: string) => {
  const r = parseInt(str.replace(/[^\d]+/gi, ''), 10);
  return r ? r.toLocaleString('en') : '';
}

...

  <Value initial={''}>
    {text => (
      <Rifm
        value={text.value}
        onChange={text.set}
        format={numberFormat}
      >
        {({ value, onChange }) => (
          <TextField
            value={value}
            label={'Float'}
            onChange={onChange}
            className={css({input: {textAlign:"right"}})}
            type="tel"
          />
        )}
      </Rifm>
    )}
  </Value>

...
```

[Demo](https://istarkov.github.io/rifm/docs-readme)

[Demo source](https://github.com/istarkov/rifm/blob/master/docs/readme.mdx)

## Install

```shell
  yarn add rifm
```

```shell
  npm -i rifm
```

## Thanks

[@TrySound](https://github.com/TrySound) for incredible help and support on this
