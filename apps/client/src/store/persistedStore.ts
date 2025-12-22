// https://stackoverflow.com/questions/37195590/how-can-i-persist-redux-state-tree-on-refresh
// import {
//   createStore
// } from "redux";

// import rootReducer from './RootReducer'

// const LOCAL_STORAGE_NAME = "localData";

// class PersistedStore

//   // Singleton property
//   static DefaultStore = null;

//   // Accessor to the default instance of this class
//   static getDefaultStore() {
//     if (PersistedStore.DefaultStore === null) {
//       PersistedStore.DefaultStore = new PersistedStore();
//     }

//     return PersistedStore.DefaultStore;
//   }

//   // Redux store
//   _store = null;

//   // When class instance is used, initialize the store
//   constructor() {
//     this.initStore()
//   }

//   // Initialization of Redux Store
//   initStore() {
//     this._store = createStore(rootReducer, PersistedStore.loadState());
//     this._store.subscribe(() => {
//       PersistedStore.saveState(this._store.getState());
//     });
//   }

//   // Getter to access the Redux store
//   get store() {
//     return this._store;
//   }

//   // Loading persisted state from localStorage, no need to access
//   // this method from the outside
//   static loadState() {
//     try {
//       let serializedState = localStorage.getItem(LOCAL_STORAGE_NAME);

//       if (serializedState === null) {
//         return PersistedStore.initialState();
//       }

//       return JSON.parse(serializedState);
//     } catch (err) {
//       return PersistedStore.initialState();
//     }
//   }

//   // Saving persisted state to localStorage every time something
//   // changes in the Redux Store (This happens because of the subscribe()
//   // in the initStore-method). No need to access this method from the outside
//   static saveState(state) {
//     try {
//       let serializedState = JSON.stringify(state);
//       localStorage.setItem(LOCAL_STORAGE_NAME, serializedState);
//     } catch (err) {}
//   }

//   // Return whatever you want your initial state to be
//   static initialState() {
//     return {};
//   }
// }

// export default PersistedStore;
