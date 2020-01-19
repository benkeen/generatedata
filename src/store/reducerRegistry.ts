// see: http://nicolasgallagher.com/redux-modules-and-code-splitting/
export class ReducerRegistry {
	constructor() {
		this.emitChange = null;
		this.reducers = {};
	}

	emitChange: any;
	reducers: any;

	getReducers() {
		return { ...this.reducers };
	}

	register(name: string, reducer: any) {
		this.reducers = { ...this.reducers, [name]: reducer };
		if (this.emitChange) {
			this.emitChange(this.getReducers());
		}
	}

	setChangeListener(listener: any) {
		this.emitChange = listener;
	}
}

const reducerRegistry = new ReducerRegistry();

export default reducerRegistry;
