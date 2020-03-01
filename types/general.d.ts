import { InitState } from '../src/core/init/init.reducer';
import { GeneratorState } from '../src/core/generator/generator.reducer';

declare global {
    interface Window {
        gd: any;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

export type Store = {
	init: InitState;
	generator: GeneratorState;
};

export type GDLocale = 'en' | 'fr' | 'de' | 'es' | 'ja' | 'nl' | 'ta' | 'zh';

export type GenEnvironment = 'API' | 'UI';

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
    [n: number]: GenerationTemplateRow[];
};

export type ExportTypeGenerateType = {
    numResults: number;
    columnTitles: string[];
    template: GenerationTemplate;

    // "rowNum"            => $rowNum,
    // "generationOptions" => $genInfo["generationOptions"],
    // "existingRowData"   => $currRowData
};

export type ExportTypeGenerationData = {
    columnTitles: string[];
    rows: any[]; // TODO see how this settles. Right now it's just an array of strings too: i.e. the generated values
    isFirstBatch: boolean;
    isLastBatch: boolean;
}
