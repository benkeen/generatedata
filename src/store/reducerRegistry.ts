// see: http://nicolasgallagher.com/redux-modules-and-code-splitting/
export class ReducerRegistry {
	constructor() {
		this.emitChange = null;
		this.reducers = {};
	}

	emitChange: any;
	reducers: any;

	getReducers(): any {
		return { ...this.reducers };
	}

	register(name: string, reducer: any): void {
		this.reducers = { ...this.reducers, [name]: reducer };
		if (this.emitChange) {
			this.emitChange(this.getReducers());
		}
	}

	setChangeListener(listener: any): void {
		this.emitChange = listener;
	}
}

const reducerRegistry = new ReducerRegistry();

export default reducerRegistry;
