import { ETMessageData } from '~types/exportTypes';
import { WorkerUtils } from '~utils/workerUtils';

export const generate = (data: ETMessageData, utils: WorkerUtils): string => {
	const { stripWhitespace } = data;

	const newline = (stripWhitespace) ? '' : '\n';
	const tab = (stripWhitespace) ? '' : '\t';

	let content = '';
	if (data.isFirstBatch) {
		content += `var data = new [] {${newline}`;
	}

	data.rows.forEach((row: any, rowIndex: number) => {
		content += `${tab}new {${newline}${tab}${tab}`;
		const pairs: string[] = [];

		data.columns.forEach(({ title, metadata }, colIndex) => {
			let value = row[colIndex];

			// if a DT has explicitly said it's a number, use a number
			if (metadata && metadata.general && metadata.general.dataType && metadata.general.dataType === 'number'
				&& utils.numberUtils.isNumeric(value)) {
				// do nothin'!
			} else {
				value = `"${value}"`;
			}

			pairs.push(`${title} = ${value}`);
		});
		content += pairs.join(`,${newline}${tab}${tab}`);

		if (data.isLastBatch && rowIndex === data.rows.length-1) {
			content += `${newline}${tab}}${newline}};`;
		} else {
			content += `${newline}${tab}},${newline}`;
		}
	});

	return content;
};
