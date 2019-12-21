// see: http://nicolasgallagher.com/redux-modules-and-code-splitting/
export class ReducerRegistry {
	constructor () {
		this._emitChange = null;
		this._reducers = {};
	}

    _emitChange: any;
	_reducers: any;

	getReducers () {
		return { ...this._reducers };
	}

	register (name: string, reducer: any) {
		this._reducers = { ...this._reducers, [name]: reducer };
		if (this._emitChange) {
			this._emitChange(this.getReducers());
		}
	}

	setChangeListener (listener: any) {
		this._emitChange = listener;
	}
}

const reducerRegistry = new ReducerRegistry();

export default reducerRegistry;
