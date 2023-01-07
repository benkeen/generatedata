import { getConfigFile, msgs } from '../bin';

const stubExit = () => {};

describe('getConfigFile', () => {
	describe('--config param error states', () => {
		const error = console.error;

		beforeEach(() => {
			console.error = jest.fn();
		});

		afterAll(() => {
			console.error = error;
		});

		it('logs an error when --config param missing', () => {
			getConfigFile({}, stubExit);
			expect(console.error).toHaveBeenCalledWith(msgs.missingConfigArg);
		});

		it('logs an error when --config param value is not a valid JSON file', () => {
			getConfigFile({
				config: 'config.xml'
			}, stubExit);
			expect(console.error).toHaveBeenCalledWith(msgs.invalidConfigFileFormat);
		});

		it('logs an error when --config param value is set properly but file does not exist', () => {
			getConfigFile({
				config: '__tests__/invalid-config.json'
			}, stubExit);
			expect(console.error).toHaveBeenCalledWith(msgs.invalidConfigFileContent);
		});
	});

	describe('returns the config file content ', () => {
		it('logs an error when --config param missing', () => {
			const configFile = getConfigFile({
				config: '__tests__/valid-config.json'
			}, stubExit);

			expect(configFile).toEqual({ valid: true });
		});
	});
});


describe('getConfigFile', () => {

});
