import { ETOnMessage } from '~types/exportTypes';
import { generate } from './Python.generate';
const context: Worker = self as any;

context.onmessage = (e: ETOnMessage) => {
	context.postMessage(generate(e.data));
};
