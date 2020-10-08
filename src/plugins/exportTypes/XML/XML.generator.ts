import { ETOnMessage, ETMessageData } from '~types/exportTypes';
import { XMLSettings } from './XML';

const context: Worker = self as any;

let workerUtilsLoaded = false;
context.onmessage = (e: ETOnMessage) => {
	if (!workerUtilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		workerUtilsLoaded = true;
	}

	context.postMessage(generateXML(e.data));
};

export const generateXML = (data: ETMessageData): string => {
	const { isFirstBatch, isLastBatch, rows, columns, stripWhitespace } = data;
	const { rootNodeName, recordNodeName } = data.settings as XMLSettings;

	const newline = stripWhitespace ? '' : '\n';
	const tab = stripWhitespace ? '' : '\t';

	let content = "";
	if (isFirstBatch) {
		content += `<?xml version="1.0" encoding="UTF-8" ?>${newline}`;
		content += `<${rootNodeName}>${newline}`;
	}

	rows.forEach((row: any) => {
		content += `${tab}<${recordNodeName}>${newline}`;
		columns.forEach(({ title }: any, colIndex: number) => {
			content += `${tab}${tab}<${title}>${row[colIndex]}</${title}>${newline}`;
		});
		content += `${tab}</${recordNodeName}>${newline}`;
	});

	if (isLastBatch) {
		content += `</${rootNodeName}>`;
	}

	return content;
};
