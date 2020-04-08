import { ExportTypeGenerationData, GenerationSettings } from '../../../../types/general';
import { JSONSettings } from './JSON.ui';
import { isNumeric } from '../../../utils/generalUtils';


// VALIDATION: needs to validate for invalid nested JSON (a.b.c, a.b)

export const generate = (generationSettings: GenerationSettings, jsonSettings: JSONSettings): any => {
	// figure out which fields are strictly numeric or JS boolean values. We don't wrap those values in double quotes
	// $this->determineNumericFields($template);
	// $this->determineBooleanFields($template);

	// const generatedData = generator.generateExportData(generationSettings.generationData);
	// let content = '';
	// if (jsonSettings.dataStructureFormat === 'simple') {
	// 	content = generateSimple(generatedData, generationSettings.stripWhitespace);
	// } else {
	// 	content = generateComplex(generatedData, generationSettings.stripWhitespace);
	// }

	return {
		success: true,
		content: '' // content
	};
};


export const generateSimple = (generationData: ExportTypeGenerationData, stripWhitespace: boolean): string => {
	let content = '';

	// generating a nested data structure is slower than just a plain JSON structure (see the README
	// for details on how the nested data structure works). So rather than slow everyone down, we pass that
	// off to a separate function
	const nested = isNested(generationData.columns.map((i: any) => i.title));

	if (nested) {
		// TODO
	} else {
		content += getNonNestedData(generationData, stripWhitespace);
	}

	return content;
};


const getNonNestedData = (generationData: ExportTypeGenerationData, stripWhitespace: boolean): string => {
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

		generationData.columns.forEach(({ title, dataType }: any, colIndex: number) => {
			const propName: string = title.replace(/"/, '"');

			// encase all values in double quotes unless it's a number column, or it's a boolean column and it's a
			// valid JS boolean
			let value = row[colIndex];
			if (!isNumeric(value) && !isJavascriptBoolean(value)) {
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


export const generateComplex = (generationData: ExportTypeGenerationData, stripWhitespace: boolean): string => {
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
			if (!isNumeric(value) && !isJavascriptBoolean(value)) {
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

export const isJavascriptBoolean = (n: any): boolean => n === 'true' || n === 'false' || n === true || n === false;
export const isNested = (columnTitles: string[]): boolean => columnTitles.some((i: string) => /\./.test(i));


// const getColumnValue = (prop: string, value: any) => {
// 	const propName: string = prop.replace(/"/, '\"');

// 	// x.y.z field names => nested JSON
// 	const levels = propName.split('.');
// 	const fieldName = levels[levels.length - 1];

// // How many nested levels match the previous column?
// for ($k = 0; $k < count($levels) && $k < count($nested) && $nested[$k] === $levels[$k]; $k++) {
// }
//
// // Pop closing levels
// while (count($nested) > $k) {
//     $content .= $newline . str_repeat($tab, count($nested) + 1) . "}";
//     array_pop($nested);
//     $comma = ",";
// }
//
// // Push new nested levels
// for ($l = $k; $l < count($levels); $l++) {
//     $lev = $levels[$l];
//     array_push($nested, $lev);
//     $content .= "{$comma}{$newline}" . str_repeat($tab, $l + 2) . "\"{$lev}\":{$space}{";
//     $comma = "";
// }
// };

/*
[
    {
        prop: 'a',
        value: 'whatever',
        children: []
    },
    {
        prop: 'b',
        children: [
            {
                prop: 'c':
                value: 'whatever',
            },
            {
                prop: 'd',
                children: [

                ]
            }
        ]
    },
]
*/


/*
- a
- b.c
- b.d.e
- b.d.f
- b.p.a
- b.p.b

	[
		{
			"a": "et.commodo@amet.org",
			"b": {
				"c": "vestibulum.neque.sed@nuncsedlibero.org",
				"d": {
					"e": "ac@musAeneaneget.ca",
					"f": "tellus.Suspendisse@etpedeNunc.ca"
				},
				"p": {
					"a": "est.ac@nostra.ca",
					"b": "et.tristique@rutrum.org"
				}
			}
		}
    */
