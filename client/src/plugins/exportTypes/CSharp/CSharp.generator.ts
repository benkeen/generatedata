import { ETMessageData, ETOnMessage } from '~types/exportTypes';

declare var utils: any;

const context: Worker = self as any;

let workerUtilsLoaded = false;
context.onmessage = (e: ETOnMessage) => {
	const { stripWhitespace, workerResources } = e.data;
	if (!workerUtilsLoaded) {
		importScripts(workerResources.workerUtils);
		workerUtilsLoaded = true;
	}
	context.postMessage(generate(e.data, stripWhitespace));
};

// const sharpDateFormats = {
//     "m/d/Y": "MM/dd/yyyy",
//     "d/m/Y": "dd/MM/yyyy",
//     "m.d.y": "MM.dd.yy",
//     "d.m.y": "dd.MM.yy",
//     "d-m-y": "dd-MM-yy",
//     "m-d-y": "MM-dd-yy",
//     "d.m.Y": "dd.MM.yyyy"
// };

export const generate = (data: ETMessageData, stripWhitespace: boolean): string => {
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

			// 		if (isNumeric(currValue) || isBoolean(currValue)) {
			// 		    pairs.push(`${propName} = ${data.rowData[i][j]}`);
			// 		// } else if (sharpDateFormats[dateFormats[j]])) {
			// 		//     pairs.push(`{$propName} = DateTime.ParseExact(\"{$data["rowData"][$i][$j]}\", \"{$this->sharpDateFormats[$this->dateFormats[$j]]}\", CultureInfo.InvariantCulture)`);
			// 		} else {
			// 		    pairs.push(`${propName} = "${data.rowData[i][j]}"`);
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
