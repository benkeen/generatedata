// Original author: Marco Corona <coronam@allegheny.edu>
import { ETMessageData } from '~types/exportTypes';

export const generate = (data: ETMessageData): string => {
	const { columns, rows } = data;

	let content = '';
	rows.forEach((row) => {
		columns.forEach((col, index) => {
			content += `${col.title}: ${row[index]}\n`;
		});
		content += '\n';
	});

	return content;
};
