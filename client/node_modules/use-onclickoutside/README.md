# use-onclickoutside

React hook for listening for clicks outside of an element.

## Usage

```js
import * as React from 'react'
import useOnClickOutside from 'use-onclickoutside'

export default function Modal({ close }) {
  const ref = React.useRef()
  useOnClickOutside(ref, close)

  return <div ref={ref}>{'Modal content'}</div>
}
```
