import _ from 'lodash';
import * as utils from './utils';

function createDispatchedObject(action) {
  return {
    isFunction: () => _.isFunction(action),
    isPlainObject: () => _.isPlainObject(action),
    getType: () => _.get(action, 'type'),
    getAction: () => action,
    getName: () => _.get(action, 'name')
  };
}

export default function(thunkFunction) {
  const dispatches = [];
  let state;
  let originalState;
  let error;

  function getState() {
    return state;
  }

  async function dispatch(action) {
    if (!_.isFunction(action) && !_.isPlainObject(action)) {
      error = new Error(`unsupported ${action} action type sent to dispatch`);
    }
    dispatches.push(createDispatchedObject(action));
  }

  function executeDispatch(action) {
    if (_.isFunction(action)) {
      return action(dispatch, getState);
    }
    error = new Error('provided action is not a thunk function');
    return null;
  }

  function checkForStateMutation() {
    const mutated = !utils.deepEqual(state, originalState);
    if (mutated) {
      error = new Error('state mutated after running the thunk');
    }
  }

  function internalThunkCommands() {
    return {
      execute: (...args) => {
        if (_.isFunction(thunkFunction)) {
          const dispatchResult = executeDispatch(thunkFunction(...args));
          if (!utils.isPromise(dispatchResult)) {
            checkForStateMutation();
            if (error) {
              throw error;
            }
            return dispatches;
          } else {
            return dispatchResult.then(() => {
              checkForStateMutation();
              if (error) {
                throw error;
              }
              return dispatches;
            });
          }
        }
        throw new Error('you must pass a thunk function to Thunk()');
      }
    };
  }

  return {
    withState(storeState) {
      state = storeState;
      originalState = _.cloneDeep(storeState);
      return internalThunkCommands();
    },
    ...internalThunkCommands()
  };
}
