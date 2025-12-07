import type { WorkerUtils } from '@generatedata/utils/worker';
import { ColumnData, ETMessageData } from '../../';

let utils: WorkerUtils;
const maybeEnquote = (value: any) => {
  const isNumeric = utils.numberUtils.isNumeric(value);

  let startsWithZero = false;
  if ((value || '').toString().length > 0) {
    startsWithZero = value.toString()[0] === '0';
  }
  const isValidNumber = isNumeric && !startsWithZero;
  if (!isValidNumber && !isJavascriptBoolean(value)) {
    value = `"${value}"`;
  }

  return value;
};

export const generate = (
  { stripWhitespace, isFirstBatch, isLastBatch, settings, columns, rows }: ETMessageData,
  workerUtils: WorkerUtils
): string => {
  let content = '';
  let comma = '';
  utils = workerUtils;

  const newline = stripWhitespace ? '' : '\n';
  const tab = stripWhitespace ? '' : '\t';
  const space = stripWhitespace ? '' : ' ';

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
        value = maybeEnquote(value);
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
    let type = 'string';
    if (metadata && metadata.general) {
      if (metadata.general.dataType === 'infer') {
        type = 'number | string';
      } else if (metadata.general.dataType !== 'string') {
        type = metadata.general.dataType;
      }
    }
    typeBlock += `\t${title}: ${type};\n`;
  });

  typeBlock += '};\n\n';

  return typeBlock;
};

const isJavascriptBoolean = (n: any): boolean => n === 'true' || n === 'false' || n === true || n === false;
