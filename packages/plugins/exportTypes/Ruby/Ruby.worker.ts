import { ETOnMessage } from '~types/exportTypes';
import { generate } from './Ruby.generate'

const context: Worker = self as any;

context.onmessage = (e: ETOnMessage): void => {
	context.postMessage(generate(e.data));
};
