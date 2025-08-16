import { ETMessageData } from '~types/exportTypes';

export const generate = (data: ETMessageData): string => {
	const { isFirstBatch, isLastBatch, rows, columns, settings, stripWhitespace } = data;
	const newline = (stripWhitespace) ? '' : '\n';
	const tab = (stripWhitespace) ? '' : '\t';

	let content = '';
	if (isFirstBatch) {
		if (settings.jsExportFormat === 'variable') {
			content += `var data = [${newline}`;
		} else if (settings.jsExportFormat == 'es6') {
			content += `export default [${newline}`;
		} else {
			content += `module.exports = [${newline}`;
		}
	}

	rows.forEach((row: any, rowIndex: number) => {
		content += `${tab}{${newline}${tab}${tab}`;

		const pairs: string[] = [];
		columns.forEach(({ title }, colIndex) => {
			const currValue = row[colIndex];
			pairs.push(`"${title}": "${currValue}"`);
		});

		content += pairs.join(`,${newline}${tab}${tab}`);

		if (isLastBatch && rowIndex == rows.length - 1) {
			content += `${newline}${tab}}${newline}`;
		} else {
			content += `${newline}${tab}},${newline}`;
		}
	});

	if (isLastBatch) {
		content += `];${newline}`;
	}

	return content;
};

