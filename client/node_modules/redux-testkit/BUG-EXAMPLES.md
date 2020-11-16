# Bug Examples

An assortment of easy to miss bugs that this library would find for you.

<br>

## Reducer

Can you spot the bug here:

```js
const initialState = {
  names: []
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case 'ADD_PERSON':
      state.names.push(action.addedName);
      return state;
    default:
      return state;
  }
}
```

Writing the following test will find it:

```js
import { Reducer } from 'redux-testkit';
import uut from '../reducer';

describe('person reducer', () => {

  it('should handle ADD_PERSON action', () => {
    const action = { type: 'ADD_PERSON', addedName: 'John' };
    const result = { names: ['John'] };
    Reducer(uut).expect(action).toReturnState(result);
  });

});
```

Answer: The reducer mutates the state.

<br>

## Selector

Can you spot the bug here:

```js
const initialState = {
  names: ['John', 'Rob']
};

export function getReverseNames(state) {
  return state.names.reverse();
}
```

Writing the following test will find it:

```js
import { Selector } from 'redux-testkit';
import * as uut from '../reducer';

describe('person selectors', () => {

  it('should return a reverse list of names', () => {
    const state = { names: ['John', 'Rob'] }
    const result = ['Rob', 'John'];
    Selector(uut.getReverseNames).expect(state).toReturn(result);
  });

});
```

Answer: The selector mutates the state.

<br>

## Thunk

Can you spot the bug here:

```js
function reversePosts() {
  return async function(dispatch, getState) {
    const state = getState();
    const reversePosts = _.reverse(state.posts);
    dispatch({ type: 'UPDATE_POSTS', posts: reversePosts });
  };
}
```

Writing the following test will find it:

```js
import { Thunk } from 'redux-testkit';
import * as uut from '../actions';

describe('posts actions', () => {

  it('should reverse the list of posts in state', () => {
    const state = { posts: ['post1', 'post2'] };
    const dispatches = await Thunk(reversePosts).withState(state).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getType()).toEqual('UPDATE_POSTS');
  });

});
```

Answer: The thunk mutates the state.
