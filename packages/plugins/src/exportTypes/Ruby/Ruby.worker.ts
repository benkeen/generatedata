import { ETOnMessage } from '@generatedata/types';
import { generate } from './Ruby.generate';

const context: Worker = self as any;

context.onmessage = (e: ETOnMessage): void => {
  context.postMessage(generate(e.data));
};
