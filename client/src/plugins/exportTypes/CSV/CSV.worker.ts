import { ETOnMessage } from '~types/exportTypes';
import { generate } from './CSV.generate';

const context: Worker = self as any;

export const onmessage = (e: ETOnMessage) => {
	context.postMessage(generate(e.data));
};
