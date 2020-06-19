import { ExportTypeGenerationData } from '../../../../../types/general';

export const generateJS = (data: ExportTypeGenerationData): string => {
	let content = '';
	if (data.isFirstBatch) {
		content += `var data = [\n`;
	}

	// TODO obviously
	const numRows = 100000;
	console.log(data);

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

		if (data.isLastBatch && rowIndex == numRows - 1) {
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
