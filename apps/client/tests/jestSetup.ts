import { TextEncoder, TextDecoder } from 'util';

// @ts-ignore
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

// @ts-ignore-line
global.MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

// @ts-ignore-line
global.ResizeObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

let count = 1;
jest.mock('nanoid', () => ({
  nanoid: () => `p${count++}`
}));
jest.mock('@react-hook/throttle', () => ({
  useThrottleCallback: jest.fn()
}));
