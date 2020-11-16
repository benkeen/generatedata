# are-passive-events-supported

Check if the browser supports passive event listeners.

## Example

```js
import arePassiveEventsSupported from 'are-passive-events-supported'

window.addEventListener(
  'touchstart',
  () => {
    console.log('touchstart')
  },
  arePassiveEventsSupported() ? { passive: true } : undefined,
)
```

## Similar projects

- [detect-passive-events](https://github.com/rafrex/detect-passive-events)
