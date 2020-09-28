import { ETOnMessage } from '~types/exportTypes';
import { generateCSharp } from './languages/CSharp';
import { generateJS } from './languages/Javascript';
import { generatePerl } from './languages/Perl';
import { generatePhp } from './languages/PHP';
import { generateRuby } from './languages/Ruby';

const context: Worker = self as any;

let workerUtilsLoaded = false;
context.onmessage = (e: ETOnMessage) => {
	if (!workerUtilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		workerUtilsLoaded = true;
	}
	const { language } = e.data.settings;

	let content;
	if (language === 'JavaScript') {
		content = generateJS(e.data);
	} else if (language === 'CSharp') {
		content = generateCSharp(e.data);
	} else if (language === 'Perl') {
		content = generatePerl(e.data);
	} else if (language === 'PHP') {
		content = generatePhp(e.data);
	} else if (language === 'Ruby') {
		content = generateRuby(e.data);
	}

	context.postMessage(content);
};
