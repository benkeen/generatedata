import { ETDefinition } from '../../../../types/exportTypes';

export { generate } from './JSON.generator';
export { Settings, initialState } from './JSON.ui';
export { default as Preview } from './JSON.preview';

const definition: ETDefinition = {
	name: 'JSON',
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	]
};

export default definition;
