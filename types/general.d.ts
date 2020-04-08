import { GeneratorState } from '../src/core/generator/generator.reducer';
import { DataTypeFolder } from '../src/_plugins';

declare global {
    interface Window {
        gd: any;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

export type Store = {
	generator: GeneratorState;
};

export type GDLocale = 'en' | 'fr' | 'de' | 'es' | 'ja' | 'nl' | 'ta' | 'zh';

export type GenEnvironment = 'API' | 'UI';

export type GenerationSettings = {
	env: GenEnvironment;
	stripWhitespace: boolean;
};

export type ExportTarget = 'inPage' | 'newTab' | 'promptDownload';

export type GDAction = {
	type: string;
	payload?: any
};

export type AnyObject = {
    [key: string]: any;
};

export type GenerationTemplateRow = {
	id: string;
    title: string;
    dataType: string;
	rowState: any;
    generateFunc: Function;
    colMetadata: () => any;
}

export type GenerationTemplate = {
    [num: number]: GenerationTemplateRow[];
};

export type ExportTypeGenerateType = {
    numResults: number;
    columns: any; // TODO string[];
    template: GenerationTemplate;

    // "rowNum"            => $rowNum,
    // "generationOptions" => $genInfo["generationOptions"],
    // "existingRowData"   => $currRowData
};

export type ColumnData = {
	title: string;
	dataType: DataTypeFolder;
};

export type ExportTypeGenerationData = {
	columns: ColumnData[];
	rows: any[]; // TODO see how this settles. Right now it's just an array of strings too: i.e. the generated values
    isFirstBatch: boolean;
    isLastBatch: boolean;
	dataTypeMetadata: any;
};

export type ExportTypePreviewData = {
	columns: any; //
	rows: any[]; // TODO see how this settles. Right now it's just an array of strings too: i.e. the generated values
};
