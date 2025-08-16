import { getProcessBatches, getAffectedDataTypes } from '../dataTypeUtils';

describe('getProcessBatches', () => {
	it('data types with no dependencies all get added to the first process batch', () => {
		const testDataTypes = {
			One: {},
			Two: {},
			Three: {},
		};
		expect(getProcessBatches(testDataTypes)).toEqual({ One: 1, Two: 1, Three: 1 });
	});

	it('data types with a dependency end up in the second batch', () => {
		const testDataTypes = {
			One: {
				dependencies: ['Two']
			},
			Two: {},
			Three: {},
		};
		expect(getProcessBatches(testDataTypes)).toEqual({ One: 2, Two: 1, Three: 1 });
	});

	it('a chain of dependencies results in separate batches for each one', () => {
		const testDataTypes = {
			One: {},
			Two: {
				dependencies: ['One']
			},
			Three: {
				dependencies: ['Two']
			},
			Four: {
				dependencies: ['Three']
			}
		};
		expect(getProcessBatches(testDataTypes)).toEqual({ One: 1, Two: 2, Three: 3, Four: 4 });
	});

	it('multiple items with fulfilled items should end up the same batch', () => {
		const testDataTypes = {
			One: {},
			Two: {
				dependencies: ['One']
			},
			Three: {
				dependencies: ['Two']
			},
			Four: {
				dependencies: ['Two']
			},
			Five: {
				dependencies: ['Three']
			},
			Six: {
				dependencies: ['Four']
			},
			Seven: {
				dependencies: ['Three']
			}
		};
		expect(getProcessBatches(testDataTypes)).toEqual({
			One: 1,
			Two: 2,
			Three: 3,
			Four: 3,
			Five: 4,
			Six: 4,
			Seven: 4
		});
	});

	it('recursive dependencies throw an error', () => {
		const testDataTypes = {
			One: {
				dependencies: ['Two']
			},
			Two: {
				dependencies: ['One']
			}
		};
		try {
			getProcessBatches(testDataTypes)
		} catch (e) {
			expect(e.name).toEqual('Recursive dependency');
		}
	});

	it('recursive dependencies triggered after first batch throw an error', () => {
		const testDataTypes = {
			One: {
				dependencies: ['Two']
			},
			Two: {
				dependencies: ['One']
			},
			Three: {}
		};
		try {
			getProcessBatches(testDataTypes)
		} catch (e) {
			expect(e.name).toEqual('Recursive dependency');
		}
	});

});


describe('getAffectedDataTypes', () => {
	it('calculates which Data Types are affected for each Data Type change #1', () => {
		const testDataTypes = {
			One: {
				dependencies: ['Four']
			},
			Two: {},
			Three: {},
			Four: {}
		};

		expect(getAffectedDataTypes(testDataTypes)).toEqual({
			One: [],
			Two: [],
			Three: [],
			Four: ['One']
		});
	});

	it('calculates which Data Types are affected for each Data Type change #2', () => {
		const testDataTypes = {
			One: {
				dependencies: ['Four', 'Two', 'Three']
			},
			Two: {
				dependencies: ['Three']
			},
			Three: {},
			Four: {}
		};

		expect(getAffectedDataTypes(testDataTypes)).toEqual({
			One: [],
			Two: ['One'],
			Three: ['One', 'Two'],
			Four: ['One']
		});
	});
});

