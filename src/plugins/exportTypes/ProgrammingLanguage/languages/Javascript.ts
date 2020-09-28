import { ETMessageData } from '~types/exportTypes';

export const generateJS = (data: ETMessageData): string => {
	const { isFirstBatch, isLastBatch, rows, columns, settings } = data;

	let content = '';
	if (isFirstBatch) {
		if (settings.jsExportFormat === 'variable') {
			content += `var data = [\n`;
		} else if (settings.jsExportFormat == 'es6') {
			content += `export default [\n`;
		} else {
			content += `module.exports = [\n`;
		}
	}

	rows.forEach((row: any, rowIndex: number) => {
		content += '\t{\n\t\t';

		const pairs: string[] = [];
		columns.forEach(({ title }, colIndex) => {
			const currValue = row[colIndex];
			// if ($this->isNumeric($j, $currValue) || $this->isBoolean($j, $currValue)) {
			// 	$pairs[] = "\"{$data["colData"][$j]}\": {$currValue}";
			// } else {
			pairs.push(`"${title}": "${currValue}"`);
			// }
		});

		content += pairs.join(',\n\t\t');

		if (isLastBatch && rowIndex == rows.length - 1) {
			content += '\n\t}\n';
		} else {
			content += '\n\t},\n';
		}
	});

	if (isLastBatch) {
		content += '];\n';
	}

	return content;
};
