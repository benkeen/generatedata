import { ETOnMessage } from '~types/exportTypes';
import { generateCSharp } from './languages/CSharp';
import { generateJS } from './languages/Javascript';
import { generatePerl } from './languages/Perl';
import { generatePhp } from './languages/PHP';
import { generateRuby } from './languages/Ruby';
const context: Worker = self as any;

let workerUtilsLoaded = false;
context.onmessage = (e: ETOnMessage) => {
	const { settings, stripWhitespace, workerResources } = e.data;
	if (!workerUtilsLoaded) {
		importScripts(workerResources.workerUtils);
		workerUtilsLoaded = true;
	}
	const { language } = settings;

	let content;
	if (language === 'JavaScript') {
		content = generateJS(e.data, stripWhitespace);
	} else if (language === 'CSharp') {
		content = generateCSharp(e.data, stripWhitespace);
	} else if (language === 'Perl') {
		content = generatePerl(e.data, stripWhitespace);
	} else if (language === 'PHP') {
		content = generatePhp(e.data, stripWhitespace);
	} else if (language === 'Ruby') {
		content = generateRuby(e.data, stripWhitespace);
	}

	context.postMessage(content);
};
