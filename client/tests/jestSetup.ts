// @ts-ignore-line
global.MutationObserver = class {
	constructor() {}
	disconnect() {}
	observe() {}
};

let count = 1;
jest.mock('nanoid', () => ({
	nanoid: () => `p${count++}`
}));
jest.mock('@react-hook/throttle', () => ({
	useThrottleCallback: jest.fn()
}));
