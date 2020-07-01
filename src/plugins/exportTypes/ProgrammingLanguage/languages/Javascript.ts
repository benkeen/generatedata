import { ExportTypeGenerationData } from '~types/general';
import { ProgrammingLanguageState } from '../ProgrammingLanguage.ui';

export const generateJS = (data: ExportTypeGenerationData, exportTypeSettings: ProgrammingLanguageState): string => {
	let content = '';
	if (data.isFirstBatch) {
		if (exportTypeSettings.jsExportFormat === 'variable') {
			content += `var data = [\n`;
		} else if (exportTypeSettings.jsExportFormat == 'es6') {
			content += `export default [\n`;
		} else {
			content += `module.exports = [\n`;
		}
	}

	data.rows.forEach((row: any, rowIndex: number) => {
		content += '\t{\n\t\t';

		const pairs: string[] = [];
		data.columns.forEach(({ title }, colIndex) => {
			const currValue = row[colIndex];
			// if ($this->isNumeric($j, $currValue) || $this->isBoolean($j, $currValue)) {
			// 	$pairs[] = "\"{$data["colData"][$j]}\": {$currValue}";
			// } else {
			pairs.push(`"${title}": "${currValue}"`);
			// }
		});

		content += pairs.join(',\n\t\t');

		if (data.isLastBatch && rowIndex == data.rows.length - 1) {
			content += '\n\t}\n';
		} else {
			content += '\n\t},\n';
		}
	});

	if (data.isLastBatch) {
		content += '];\n';
	}

	return content;
};
