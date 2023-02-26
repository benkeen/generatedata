import { ETMessageData } from '~types/exportTypes';
import { WorkerUtils } from '~utils/workerUtils';

let utils: WorkerUtils;
export const generate = (data: any, workerUtils: WorkerUtils): string => {
	utils = workerUtils;

	const { settings, stripWhitespace } = data;

	return settings.dataStructureFormat === 'simple'
		? generateSimple(data, stripWhitespace)
		: generateComplex(data, stripWhitespace);
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
		comma = ',';
	}

	generationData.rows.forEach((row: any) => {
		content += `${comma}${newline}${tab}{`;
		comma = '';

		generationData.columns.forEach(({ title, metadata }: any, colIndex: number) => {
			const propName: string = title.replace(/"/, '"');

			let value = row[colIndex];

			// if a DT has explicitly said it's a string, use a string
			if (metadata && metadata.general && metadata.general.dataType && metadata.general.dataType === 'string') {
				value = `"${value}"`;

				// otherwise, do a safety check and encase it in double quote if necessary
			} else {
				if (!utils.numberUtils.isNumeric(value) && !isJavascriptBoolean(value)) {
					value = `"${value}"`;
				}
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
			if (!utils.numberUtils.isNumeric(value) && !isJavascriptBoolean(value)) {
				value = `"${value}"`;
			}
			rowValsArr.push(value);
		});

		if (stripWhitespace) {
			const rowVals = rowValsArr.join(',');
			content += `[${rowVals}]`;
			if (rowIndex < numRows - 1) {
				content += ',';
			}
		} else {
			const rowVals = rowValsArr.join(',\n\t\t\t');
			content += `\t\t[\n\t\t\t${rowVals}\n\t\t]`;
			if (rowIndex < numRows - 1) {
				content += ',\n';
			} else if (!generationData.isLastBatch) {
				content += ',\n';
			}
		}
	});

	if (generationData.isLastBatch) {
		if (stripWhitespace) {
			content += ']}';
		} else {
			content += '\n\t]\n}';
		}
	}

	return content;
};

const isJavascriptBoolean = (n: any): boolean => n === 'true' || n === 'false' || n === true || n === false;
