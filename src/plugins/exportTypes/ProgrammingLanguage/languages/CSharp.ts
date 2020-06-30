import { isBoolean, isNumeric } from '~utils/generalUtils';
import { ExportTypeGenerationData } from '~types/general';

// const sharpDateFormats = {
//     "m/d/Y": "MM/dd/yyyy",
//     "d/m/Y": "dd/MM/yyyy",
//     "m.d.y": "MM.dd.yy",
//     "d.m.y": "dd.MM.yy",
//     "d-m-y": "dd-MM-yy",
//     "m-d-y": "MM-dd-yy",
//     "d.m.Y": "dd.MM.yyyy"
// };

export const generateCSharp = (data: ExportTypeGenerationData): string => {
	let content = '';
	if (data.isFirstBatch) {
		content += `var data = new [] {\n`;
	}

	data.rows.forEach((row: any, rowIndex: number) => {
		content += '\tnew { ';
		const pairs: string[] = [];
		data.columns.forEach(({ title }, colIndex) => {
			const currValue = row[colIndex];
			pairs.push(`${title} = "${currValue}"`);

			// 		if (isNumeric(currValue) || isBoolean(currValue)) {
			// 		    pairs.push(`${propName} = ${data.rowData[i][j]}`);
			// 		// } else if (sharpDateFormats[dateFormats[j]])) {
			// 		//     pairs.push(`{$propName} = DateTime.ParseExact(\"{$data["rowData"][$i][$j]}\", \"{$this->sharpDateFormats[$this->dateFormats[$j]]}\", CultureInfo.InvariantCulture)`);
			// 		} else {
			// 		    pairs.push(`${propName} = "${data.rowData[i][j]}"`);

		});
		content += pairs.join(', ');

		if (data.isLastBatch && rowIndex === data.rows.length-1) {
			content += ' }\n};';
		} else {
			content += ' },\n';
		}
	});

	return content;
};
