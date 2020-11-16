// Original author: Marco Corona <coronam@allegheny.edu>
import { ETOnMessage, ETMessageData } from '~types/exportTypes';

const context: Worker = self as any;

let workerUtilsLoaded = false;
context.onmessage = (e: ETOnMessage) => {
	const { workerResources } = e.data;

	if (!workerUtilsLoaded) {
		importScripts(workerResources.workerUtils);
		workerUtilsLoaded = true;
	}

	context.postMessage(generate(e.data));
};

const generate = (data: ETMessageData): string => {
	const { columns, rows } = data;

	let content = '';
	rows.forEach((row) => {
		columns.forEach((col, index) => {
			content += `${col.title}: ${row[index]}\n`;
		});
		content += '\n';
	});

	return content;
};
