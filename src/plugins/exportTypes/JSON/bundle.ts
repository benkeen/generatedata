import { ETBundle } from '../../../../types/exportTypes';
import { generate } from './JSON.generator';
import { Settings, initialState } from './JSON.ui';
import Preview from './JSON.preview';

export const exportType: ETBundle = {
	initialState,
	generate,
	Settings,
	Preview
};
