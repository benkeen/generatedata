import { isBoolean, isNumeric } from '../../../../utils/generalUtils';

// const sharpDateFormats = {
//     "m/d/Y": "MM/dd/yyyy",
//     "d/m/Y": "dd/MM/yyyy",
//     "m.d.y": "MM.dd.yy",
//     "d.m.y": "dd.MM.yy",
//     "d-m-y": "dd-MM-yy",
//     "m-d-y": "MM-dd-yy",
//     "d.m.Y": "dd.MM.yyyy"
// };

export const generateCSharp = (data: any): string => {
	let content = '';
	if (data.isFirstBatch) {
		content += `var data = new [] {\n`;
	}

	const numCols = data.colData;
	const numRows = data.rowData;

	for (let i=0; i<numRows; i++) {
		content += '\tnew { ';

		const pairs = [];
		for (let j=0; j<numCols; j++) {
			const propName = data.colData[j].replace(/ /g, '');
			const currValue = data.rowData[i][j];
			if (isNumeric(currValue) || isBoolean(currValue)) {
			    pairs.push(`${propName} = ${data.rowData[i][j]}`);
			// } else if (sharpDateFormats[dateFormats[j]])) {
			//     pairs.push(`{$propName} = DateTime.ParseExact(\"{$data["rowData"][$i][$j]}\", \"{$this->sharpDateFormats[$this->dateFormats[$j]]}\", CultureInfo.InvariantCulture)`);
			} else {
			    pairs.push(`${propName} = "${data.rowData[i][j]}"`);
			}
		}
		content += pairs.join(', ');

		if (data.isLastBatch && i == numRows - 1) {
		    content += " }\n";
		} else {
		    content += " },\n";
		}
	}

	if (data.isLastBatch) {
		content == '};\n';
	}

	return content;
};
