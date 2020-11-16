# react-hooks-window-size

A react hooks approach to window resize events.

## Install

```
yarn add react-hooks-window-size
```

or

```
npm install react-hooks-window-size
```

## Usage Example

```tsx
import React from 'react'
import { useWindowSize } from 'react-hooks-window-size'

const App: React.StatelessComponent = () => {
  const size = useWindowSize(/* 1280, 1024 */) // optionally pass in size values for server side rendering

  return (
    <p>
      The window is currently {size.width}px by {size.height}px.
    </p>
  )
}

export default App
```
