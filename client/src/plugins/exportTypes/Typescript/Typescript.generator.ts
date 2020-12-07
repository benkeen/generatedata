import { ETOnMessage, ETMessageData } from '~types/exportTypes';
import { ColumnData } from '~types/general';
import { DTMetadataType } from '~types/dataTypes';

declare var utils: any;

const context: Worker = self as any;

let workerUtilsLoaded = false;
context.onmessage = (e: ETOnMessage) => {
	const { workerResources, stripWhitespace } = e.data;

	if (!workerUtilsLoaded) {
		importScripts(workerResources.workerUtils);
		workerUtilsLoaded = true;
	}

	context.postMessage(generate(e.data, stripWhitespace));
};


const generate = (generationData: ETMessageData, stripWhitespace: boolean): string => {
	let content = '';
	let comma = '';

	const newline = (stripWhitespace) ? '' : '\n';
	const tab = (stripWhitespace) ? '' : '\t';
	const space = (stripWhitespace) ? '' : ' ';

	if (generationData.isFirstBatch) {
		const { typeName, varName} = generationData.settings;

		content += generateTypes(typeName, generationData.columns);
		content += `export const ${varName}: ${typeName}[] = [`;
	} else {
		comma = ",";
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

			content += `${comma}${newline}${tab}${tab}${propName}:${space}${value}`;
			comma = ',';
		});

		content += `${newline}${tab}}`;
	});

	if (generationData.isLastBatch) {
		content += `${newline}]`;
	}

	return content;
};

const generateTypes = (typeName: string, colData: ColumnData[]) => {
	let typeBlock = `export type ${typeName} = {\n`;

	colData.forEach(({ title, metadata }) => {
		const type: DTMetadataType = metadata && metadata.general && metadata.general.dataType ? metadata.general.dataType : 'string';
		typeBlock += `\t${title}: ${type};\n`;
	});

	typeBlock += '}\n\n';

	return typeBlock;
};

const isJavascriptBoolean = (n: any): boolean => n === 'true' || n === 'false' || n === true || n === false;
