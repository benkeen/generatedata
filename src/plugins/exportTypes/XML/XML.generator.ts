import { ETOnMessage, ETMessageData } from '~types/exportTypes';
import { XMLSettings } from './XML.ui';

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
	const { isFirstBatch, isLastBatch, rows, columns  } = data;
	const { rootNodeName, recordNodeName } = data.settings as XMLSettings;

	let content = "";
	if (isFirstBatch) {
		content += '<?xml version="1.0" encoding="UTF-8" ?>\n';
		content += `<${rootNodeName}>\n`;
	}

	rows.forEach((row: any) => {
		content += `\t<${recordNodeName}>\n`;
		columns.forEach(({ title }: any, colIndex: number) => {
			content += `\t\t<${title}>${row[colIndex]}</${title}>\n`;
		});
		content += `\t</${recordNodeName}>\n`;
	});

	if (isLastBatch) {
		content += `</${rootNodeName}>`;
	}

	return content;
};
