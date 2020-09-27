import { ETOnMessage, ETMessageData } from '~types/exportTypes';

declare var utils: any;

const context: Worker = self as any;

let workerUtilsLoaded = false;
context.onmessage = (e: ETOnMessage) => {
	if (!workerUtilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		workerUtilsLoaded = true;
	}

	const content = e.data.settings.dataStructureFormat === 'simple'
		? generateSimple(e.data, false)
		: generateComplex(e.data, false);

	context.postMessage(content);
};


const generateSimple = (generationData: ETMessageData, stripWhitespace: boolean): string => {
	let content = '';
	let comma = '';

	const newline = (stripWhitespace) ? '' : '\n';
	const tab = (stripWhitespace) ? '' : '\t';
	const space = (stripWhitespace) ? '' : ' ';

	if (generationData.isFirstBatch) {
		content += '[';
	} else {
		comma = ",";
	}

	generationData.rows.forEach((row: any) => {
		content += `${comma}${newline}${tab}{`;
		comma = '';

		generationData.columns.forEach(({ title }: any, colIndex: number) => {
			const propName: string = title.replace(/"/, '"');

			// TODO - add "infer" option. Encase all values in double quotes unless it's a number column, or it's a
			// boolean column and it's a valid JS boolean
			let value = row[colIndex];
			if (!utils.generalUtils.isNumeric(value) && !isJavascriptBoolean(value)) {
				value = `"${value}"`;
			}
			content += `${comma}${newline}${tab}${tab}"${propName}":${space}${value}`;
			comma = ',';
		});

		content += `${newline}${tab}}`;
	});

	if (generationData.isLastBatch) {
		content += `${newline}]`;
	}

	return content;
};


const generateComplex = (generationData: ETMessageData, stripWhitespace: boolean): string => {
	let content = '';
	const colTitles = generationData.columns.map(({ title }: any) => title);

	if (generationData.isFirstBatch) {
		if (stripWhitespace) {
			const cols = `"${colTitles.join('","')}"`;
			content += `{"cols":[${cols}],"data":[`;
		} else {
			const cols = `"${colTitles.join('",\n\t\t"')}"`;
			content += `{\n\t"cols": [\n\t\t${cols}\n\t],\n\t"data": [\n`;
		}
	}

	const numRows = generationData.rows.length;
	generationData.rows.forEach((row: any, rowIndex: number) => {
		const rowValsArr: any[] = [];
		colTitles.forEach((colTitle: string, colIndex: number) => {
			let value = row[colIndex];
			if (!utils.generalUtils.isNumeric(value) && !isJavascriptBoolean(value)) {
				value = `"${value}"`;
			}
			rowValsArr.push(value);
		});

		if (stripWhitespace) {
			const rowVals = rowValsArr.join(',');
			content += `[${rowVals}]`;
			if (rowIndex < numRows - 1) {
				content += `,`;
			}
		} else {
			const rowVals = rowValsArr.join(',\n\t\t\t');
			content += `\t\t[\n\t\t\t${rowVals}\n\t\t]`;
			if (rowIndex < numRows - 1) {
				content += ",\n";
			} else if (!generationData.isLastBatch) {
				content += ",\n";
			}
		}
	});

	if (generationData.isLastBatch) {
		if (stripWhitespace) {
			content += `]}`;
		} else {
			content += `\n\t]\n}`;
		}
	}

	return content;
};


// private function determineBooleanFields($template)
// {
// 	foreach ($template as $item) {
// 	$this->booleanFields[] = isset($item["columnMetadata"]["type"]) && $item["columnMetadata"]["type"] == "boolean";
// }
// }
//
// private function isNumeric($index, $value)
// {
// 	return $this->numericFields[$index] && is_numeric($value);
// }
//
// private function isJavascriptBoolean($index, $value)
// {
// 	return $this->booleanFields[$index] && ($value === "true" || $value === "false");
// }

// const determineNumericFields = ($template) => {
// {
//     // foreach ($template as $item){
//     //     $this->numericFields[] = isset($item["columnMetadata"]["type"]) && $item["columnMetadata"]["type"] == "numeric";
//     // }
// }


// const getDownloadFilename = () => {
// 	// $time = date("M-j-Y");
// 	// return "data{$time}.json";
// };

const isJavascriptBoolean = (n: any): boolean => n === 'true' || n === 'false' || n === true || n === false;
const isNested = (columnTitles: string[]): boolean => columnTitles.some((i: string) => /\./.test(i));
