import { ETMessageData } from '~types/exportTypes';
import { DTMetadataType } from '~types/dataTypes';
import { ColumnData } from '~types/general';
import { WorkerUtils } from '~utils/workerUtils';

export const generate = ({ stripWhitespace, isFirstBatch, isLastBatch, settings, columns, rows }: ETMessageData, utils: WorkerUtils): string => {
	let content = '';
	let comma = '';

	const newline = (stripWhitespace) ? '' : '\n';
	const tab = (stripWhitespace) ? '' : '\t';
	const space = (stripWhitespace) ? '' : ' ';

	if (isFirstBatch) {
		const { typeName, varName } = settings;

		content += generateTypes(typeName, columns);
		content += `export const ${varName}: ${typeName}[] = [`;
	} else {
		comma = ',';
	}

	rows.forEach((row: any) => {
		content += `${comma}${newline}${tab}{`;
		comma = '';

		columns.forEach(({ title, metadata }: any, colIndex: number) => {
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

	if (isLastBatch) {
		content += `${newline}];`;
	}

	return content;
};

const generateTypes = (typeName: string, colData: ColumnData[]): string => {
	let typeBlock = `export type ${typeName} = {\n`;

	colData.forEach(({ title, metadata }) => {
		const type: DTMetadataType = metadata && metadata.general && metadata.general.dataType ? metadata.general.dataType : 'string';
		typeBlock += `\t${title}: ${type};\n`;
	});

	typeBlock += '};\n\n';

	return typeBlock;
};

const isJavascriptBoolean = (n: any): boolean => n === 'true' || n === 'false' || n === true || n === false;
