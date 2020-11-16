export function createMiddleware() {
  let pendingPromises = [];

  const middleware = () => {
    return (next) => (action) => {
      let returnValue;
      if (typeof action === 'function') {
        const actionWrapper = (...args) => {
          const result = action(...args);

          if (result && result.then && typeof result.then === 'function') {
            pendingPromises.push(result);
          }
          return result;
        };
        returnValue = next(actionWrapper);
      } else {
        returnValue = next(action);
      }

      return returnValue;
    };
  };

  middleware.flush = async () => {
    const promisesCount = pendingPromises.length;
    if (promisesCount > 0) {
      await Promise.all(pendingPromises);
      // remove resolved promises
      pendingPromises = pendingPromises.slice(promisesCount);
      await middleware.flush();
    }
  };

  middleware.reset = () => {
    pendingPromises = [];
  };

  return middleware;
}
