import * as React from 'react';
import { ExportTypeGenerationData, GenEnvironment } from '../../../../types/general';
import { JSONSettings } from './JSON.ui';
import { isNumeric } from '../../../utils/generalUtils';


// TODO will also need to pass in a whole thwack of other stuff previous assigned to $generator instance.
// maybe change first param to $generationContext & include genEnvironment & everything else
export const generate = (genEnvironment: GenEnvironment, jsonSettings: JSONSettings, generator: any) => {

	// figure out which fields are strictly numeric or JS boolean values. We don't wrap those values in double quotes
	// $this->determineNumericFields($template);
	// $this->determineBooleanFields($template);

	// if ($dataStructureFormat == "complex") {
	// 	$content = $this->generateComplex($generator, $data, $stripWhitespace);
	// } else {
	// 	$content = $this->generateSimple($generator, $data, $stripWhitespace);
	// }
    // const content = generateSimple(data);

    const generatedData = generator.generateExportData(generator.data);
    const content = generateSimple(generatedData, jsonSettings.stripWhitespace);

	return {
		success: true,
		content: content
	};
};


export const generateSimple = (generationData: ExportTypeGenerationData, stripWhitespace: boolean) => {
    let content = '';

    // generating a nested data structure is slower than just a plain JSON structure (see the README
    // for details on how the nested data structure works). So rather than slow everyone down, we pass that
    // off to a separate function
    const nested = isNested(generationData.columnTitles);

    if (nested) {
        // TODO
    } else {
        content += getNonNestedData(generationData, stripWhitespace);
    }

    return content;
};


const getNonNestedData = (generationData: ExportTypeGenerationData, stripWhitespace: boolean) => {
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

        generationData.columnTitles.forEach((columnTitle: any, colIndex: number) => {
            const propName: string = columnTitle.replace(/"/, '\"');

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


const getNestedData = () => {

};



const getColumnValue = (prop: string, value: any) => {
    const propName: string = prop.replace(/"/, '\"');

    // x.y.z field names => nested JSON
    const levels = propName.split('.');
    const fieldName = levels[levels.length-1];

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
};



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


/*
private function generateComplex($generator, $data, $stripWhitespace)
{
	$content = "";
	if ($generator->isFirstBatch()) {
		$quotedCols = Utils::enquoteArray($data["colData"]);
		if ($stripWhitespace) {
			$cols = implode(",", $quotedCols);
			$content .= "{\"cols\":[$cols],\"data\":[";
		} else {
			$cols = implode(",\n\t\t", $quotedCols);
			$content .= "{\n\t\"cols\": [\n\t\t$cols\n\t],\n\t\"data\": [\n";
		}
	}

	$numCols = count($data["colData"]);
	$numRows = count($data["rowData"]);
	for ($i = 0; $i < $numRows; $i++) {
		$rowValsArr = array();
		for ($j = 0; $j < $numCols; $j++) {
			$currValue = $data["rowData"][$i][$j];
			if ($this->isNumeric($j, $currValue) || $this->isJavascriptBoolean($j, $currValue)) {
				$rowValsArr[] = $data["rowData"][$i][$j];
			} else {
				$rowValsArr[] = "\"" . $data["rowData"][$i][$j] . "\"";
			}
		}

		if ($stripWhitespace) {
			$rowVals = implode(",", $rowValsArr);
			$content .= "[$rowVals]";
			if ($i < $numRows - 1) {
				$content .= ",";
			}
		} else {
			$rowVals = implode(",\n\t\t\t", $rowValsArr);
			$content .= "\t\t[\n\t\t\t$rowVals\n\t\t]";

			if ($i < $numRows - 1) {
				$content .= ",\n";
			} else if (!$generator->isLastBatch()) {
				$content .= ",\n";
			}
		}
	}

	if ($generator->isLastBatch()) {
		if ($stripWhitespace) {
			$content .= "]}";
		} else {
			$content .= "\n\t]\n}";
		}
	}
	return $content;
}

private function shouldStripWhitespace()
{
	$default = false;
	if ($this->genEnvironment == Constants::GEN_ENVIRONMENT_API) {
		$jsonSettings = $this->userSettings->export->settings;
		$stripWhitespace = (property_exists($jsonSettings, "stripWhitespace")) ? $jsonSettings->stripWhitespace : $default;
	} else {
		$stripWhitespace = isset($this->userSettings["etJSON_stripWhitespace"]);
	}
	return $stripWhitespace;
}

// private function getDataStructureFormat()
// {
// 	$default = "complex";
// 	if ($this->genEnvironment == Constants::GEN_ENVIRONMENT_API) {
// 		$jsonSettings = $this->userSettings->export->settings;
// 		$format = (property_exists($jsonSettings, "dataStructureFormat")) ? $jsonSettings->dataStructureFormat : $default;
// 	} else {
// 		$format = isset($this->userSettings["etJSON_dataStructureFormat"]) ? $this->userSettings["etJSON_dataStructureFormat"] : $default;
// 	}
// 	return $format;
// }
//

//
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
*/

// const determineNumericFields = ($template) => {
// {
//     // foreach ($template as $item){
//     //     $this->numericFields[] = isset($item["columnMetadata"]["type"]) && $item["columnMetadata"]["type"] == "numeric";
//     // }
// }


const getDownloadFilename = () => {
	// $time = date("M-j-Y");
	// return "data{$time}.json";
};


export const isJavascriptBoolean = (n: any) => n === 'true' || n === 'false' || n === true || n === false;
export const isNested = (columnTitles: string[]) => columnTitles.some((i: string) => /\./.test(i));
