import { ETMessageData, ETOnMessage } from '~types/exportTypes';

const context: Worker = self as any;

let workerUtilsLoaded = false;
context.onmessage = (e: ETOnMessage) => {
	if (!workerUtilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		workerUtilsLoaded = true;
	}

	const { exportFormat } = e.data.settings;

	let content = '';
	if (exportFormat === 'table') {
		content = generateTableFormat(e.data);
	} else if (exportFormat === 'ul') {
		content = generateUlFormat(e.data);
	} else if (exportFormat === 'dl') {
		content = generateDlFormat(e.data);
	}

	context.postMessage(content);
};


export const generateTableFormat = (data: ETMessageData): string => {
	let content = "";
	if (data.isFirstBatch) {
		content += "<table>\n\t<tr>\n";
		data.columns.forEach(({ title }) => {
			content += `\t\t<th>${title}</th>\n`;
		});
		content += "\t</tr>\n";
	}

	data.rows.forEach((row) => {
		content += '\t<tr>\n';
		data.columns.forEach((col, colIndex) => {
			content += `\t\t<td>${row[colIndex]}</td>\n`;
		});
		content += "\t</tr>\n";
	});

	if (data.isLastBatch) {
		content += '</table>';
	}

	return content;
};

export const generateUlFormat = (data: ETMessageData): string => {
	let content = '';
	if (data.isFirstBatch) {
		content += '<ul class="columns">\n';
		data.columns.forEach(({ title }) => {
			content += `\t<li>${title}</li>\n`;
		});
		content += "</ul>\n";
	}

	data.rows.forEach((row) => {
		content += '<ul>\n';
		data.columns.forEach((col, colIndex) => {
			content += `\t<li>${row[colIndex]}</li>\n`;
		});
		content += "</ul>\n";
	});

	return content;
};

export const generateDlFormat = (data: ETMessageData): string => {
	let content = '';
	data.rows.forEach((row) => {
		content += '<dl>\n';
		data.columns.forEach(({ title }, colIndex) => {
			content += `\t<dt>${title}</dt>\n`;
			content += `\t<dd>${row[colIndex]}</dd>\n`;
		});
		content += "</dl>\n";
	});
	return content;
};
