import _ from 'lodash';
import {deepEqual} from './utils';

export default function(selector) {
  return {
    expect: (state, ...args) => {
      const originalState = _.cloneDeep(state);
      const result = selector(state, ...args);
      const mutated = !deepEqual(state, originalState);

      return {
        toReturn: (expected) => {
          expect(result).toEqual(expected);
          // expect(mutated).toEqual(false);
          if (mutated) {
            throw new Error('state mutated after running selector');
          }
        }
      };
    },
    execute: (state, ...args) => {
      const originalState = _.cloneDeep(state);
      const result = selector(state, ...args);
      const mutated = !deepEqual(state, originalState);
      if (mutated) {
        throw new Error('state mutated after running selector');
      }
      return result;
    }
  };
}
