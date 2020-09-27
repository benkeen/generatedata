import { ETMessageData } from '~types/exportTypes';
import { XMLSettings } from './XML.ui';

export const generate = (): any => {
	return {
		display: ''
	};
};

export const generateXML = (generationData: ETMessageData, xmlSettings: XMLSettings): string => {
	const { rootNodeName, recordNodeName } = xmlSettings;

	let content = "";
	if (generationData.isFirstBatch) {
		content += '<?xml version="1.0" encoding="UTF-8" ?>\n';
		content += `<${rootNodeName}>\n`;
	}

	generationData.rows.forEach((row: any) => {
		content += `\t<${recordNodeName}>\n`;
		generationData.columns.forEach(({ title }: any, colIndex: number) => {
			content += `\t\t<${title}>${row[colIndex]}</${title}>\n`;
		});
		content += `\t</${recordNodeName}>\n`;
	});

	if (generationData.isLastBatch) {
		content += `</${rootNodeName}>`;
	}

	return content;
};
