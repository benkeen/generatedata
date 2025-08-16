import { ETOnMessage } from '@generatedata/types';
import { generate } from './HTML.generate';

const context: Worker = self as any;

context.onmessage = (e: ETOnMessage) => {
  context.postMessage(generate(e.data));
};
