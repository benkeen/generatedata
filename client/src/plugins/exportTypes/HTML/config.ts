import { ETDefinition } from '~types/exportTypes';

const definition: ETDefinition = {
	name: "HTML",
	fieldGroup: 'core',
	codeMirrorModes: [
		'htmlmixed/htmlmixed',
		'javascript/javascript',
		'xml/xml',
		'css/css'
	]
};

export default definition;
