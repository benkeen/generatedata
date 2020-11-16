import _ from 'lodash';
import {deepEqual} from './utils';

function toChangeInStateCustomizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return srcValue;
  }
  return undefined;
}

export default function(reducer) {
  const defaultInitialState = reducer(undefined, {});

  function internalReducerCommands(initialState) {
    return {
      expect: (action) => {
        const originalState = _.cloneDeep(initialState);
        const newState = reducer(initialState, action);
        const mutated = !deepEqual(initialState, originalState);

        return {
          toReturnState: (expected) => {
            expect(newState).toEqual(expected);
            // expect(mutated).toEqual(false);
            if (mutated) {
              throw new Error('state mutated after running reducer');
            }
          },
          toChangeInState: (expectedChanges) => {
            const expected = _.mergeWith(originalState, expectedChanges, toChangeInStateCustomizer);
            expect(newState).toEqual(expected);
            // expect(mutated).toEqual(false);
            if (mutated) {
              throw new Error('state mutated after running reducer');
            }
          }
        };
      },
      execute: (action) => {
        const originalState = _.cloneDeep(initialState);
        const newState = reducer(initialState, action);
        const mutated = !deepEqual(initialState, originalState);
        if (mutated) {
          throw new Error('state mutated after running reducer');
        }
        return newState;
      }
    };
  }

  return {
    withState: (state) => {
      const initialState = state || defaultInitialState;
      return internalReducerCommands(initialState);
    },
    ...internalReducerCommands(defaultInitialState)
  };
}
