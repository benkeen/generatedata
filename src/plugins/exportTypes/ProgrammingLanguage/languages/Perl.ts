import { ETMessageData } from '~types/exportTypes';

export const generatePerl = (data: ETMessageData): string => {
	let content = '';
	const { isFirstBatch, isLastBatch, rows, columns } = data;
	if (isFirstBatch) {
		content += "@data = (\n";
	}

	rows.forEach((row: any, rowIndex: number) => {
		const pairs: string[] = [];
		columns.forEach(({ title }, colIndex) => {
			const currValue = row[colIndex];
			pairs.push(`"${title}" => "${currValue}"`);

			// 		if ($this->isNumeric($j, $currValue) || $this->isBoolean($j, $currValue)) {
			// 			$pairs[] = "\"$varName\" => {$currValue}";
			// 		} else {
			// 			$pairs[] = "\"$varName\" => \"{$currValue}\"";
			// 		}
		});

		content += '\t{\n\t\t' + pairs.join(',\n\t\t') + '\n\t}';

		if (isLastBatch && rowIndex == rows.length - 1) {
			content += '\n';
		} else {
			content += ',\n';
		}
	});

	if (isLastBatch) {
		content += ');';
	}

	return content;
};

