import { ETMessageData } from '~types/exportTypes';

export const generate = (data: any): string => {
	const { exportFormat } = data.settings;

	let content = '';
	if (exportFormat === 'table') {
		content = generateTableFormat(data);
	} else if (exportFormat === 'ul') {
		content = generateUlFormat(data);
	} else if (exportFormat === 'dl') {
		content = generateDlFormat(data);
	}

	return content;
};

export const generateTableFormat = (data: ETMessageData): string => {
	const stripWhitespace = data.stripWhitespace;
	const newline = stripWhitespace ? '' : '\n';
	const tab = stripWhitespace ? '' : '\t';

	let content = '';
	if (data.isFirstBatch) {
		content += `<table>${newline}${tab}<tr>${newline}`;
		data.columns.forEach(({ title }) => {
			content += `${tab}${tab}<th>${title}</th>${newline}`;
		});
		content += `${tab}</tr>${newline}`;
	}

	data.rows.forEach((row) => {
		content += `${tab}<tr>${newline}`;
		data.columns.forEach((col, colIndex) => {
			content += `${tab}${tab}<td>${row[colIndex]}</td>${newline}`;
		});
		content += `${tab}</tr>${newline}`;
	});

	if (data.isLastBatch) {
		content += '</table>';
	}

	return content;
};

export const generateUlFormat = (data: ETMessageData): string => {
	const stripWhitespace = data.stripWhitespace;
	const newline = stripWhitespace ? '' : '\n';
	const tab = stripWhitespace ? '' : '\t';

	let content = '';
	if (data.isFirstBatch) {
		content += `<ul class="columns">${newline}`;
		data.columns.forEach(({ title }) => {
			content += `${tab}<li>${title}</li>${newline}`;
		});
		content += `</ul>${newline}`;
	}

	data.rows.forEach((row) => {
		content += `<ul>${newline}`;
		data.columns.forEach((col, colIndex) => {
			content += `${tab}<li>${row[colIndex]}</li>${newline}`;
		});
		content += `</ul>${newline}`;
	});

	return content;
};

export const generateDlFormat = (data: ETMessageData): string => {
	const stripWhitespace = data.stripWhitespace;
	const newline = stripWhitespace ? '' : '\n';
	const tab = stripWhitespace ? '' : '\t';

	let content = '';
	data.rows.forEach((row) => {
		content += `<dl>${newline}`;
		data.columns.forEach(({ title }, colIndex) => {
			content += `${tab}<dt>${title}</dt>${newline}`;
			content += `${tab}<dd>${row[colIndex]}</dd>${newline}`;
		});
		content += `</dl>${newline}`;
	});
	return content;
};
