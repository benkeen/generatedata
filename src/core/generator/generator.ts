/**
 * Our generator. This does the work of passing off the work off to the selected plugins and piecing the
 * generated data for returning to the client.
 */
import { getStrings } from '~utils/langUtils';
import { GenerationProps, GenerationTemplate, GenerationTemplateRow } from '~types/general';
import { DTGenerateResult, DTGenerationExistingRowData } from '~types/dataTypes';

export const generate = (data: GenerationProps): string => {
	console.log(data);

	// const generationContext = {
	// 	environment: 'UI'
	// };

	// here we offload the generated data to the Export Type
	// const { content } = JSON.generate('UI', tmpExportTypeSettings, {
	// 	data,
	// 	generateExportData
	// });

	return '';
};
