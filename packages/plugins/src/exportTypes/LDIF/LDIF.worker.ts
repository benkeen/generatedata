// Original author: Marco Corona <coronam@allegheny.edu>
import { ETOnMessage } from '@generatedata/types';
import { generate } from './LDIF.generate';

const context: Worker = self as any;

context.onmessage = (e: ETOnMessage) => {
  context.postMessage(generate(e.data));
};
