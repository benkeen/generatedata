import { ETOnMessage } from '@generatedata/types';
import { generate } from './Javascript.generate';

const context: Worker = self as any;

context.onmessage = (e: ETOnMessage) => {
  context.postMessage(generate(e.data));
};
