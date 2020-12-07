import { ETMessageData } from '~types/exportTypes';

export const generateRuby = (data: ETMessageData, stripWhitespace: boolean): string => {
	const newline = (stripWhitespace) ? '' : '\n';
	const tab = (stripWhitespace) ? '' : '\t';

	let content = '';
	if (data.isFirstBatch) {
		content += `data = [${newline}`;
	}

	data.rows.forEach((row: any, rowIndex: number) => {
		const pairs: string[] = [];
		data.columns.forEach(({ title }, colIndex) => {
			const currValue = row[colIndex];
			pairs.push(`'${title}': '${currValue}'`);

			// if ($this->isNumeric($j, $currValue) || $this->isBoolean($j, $currValue)) {
			// 	$pairs[] = "'{$data["colData"][$j]}': {$currValue}";
			// } else {
			// 	$pairs[] = "'{$data["colData"][$j]}': '{$currValue}'";
			// }
		});
		content += `${tab}{${newline}${tab}${tab}` + pairs.join(`,${newline}${tab}${tab}`) + `${newline}${tab}}`;

		if (data.isLastBatch && rowIndex == data.rows.length - 1) {
			content += newline;
		} else {
			content += `,${newline}`;
		}
	});

	if (data.isLastBatch) {
		content += ');';
	}

	return content;
};
