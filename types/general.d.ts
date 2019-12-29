declare global {
    interface Window {
        gd: any;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

export type GDLocale = 'en' | 'fr' | 'de' | 'es' | 'ja' | 'nl' | 'ta' | 'zh';

export type GenEnvironment = 'API' | 'UI';

export type Generator = {
    colData: any[];
    rowData: any[];
};

export type ExportTarget = 'inPage' | 'newTab' | 'promptDownload';


export type AnyObject = {
    [key: string]: any;
}

// Data Type <Example /> props
export type DataTypeUIExampleProps = {
    coreI18n: any;
    i18n: any;
    data: any;
    id: string;
    onUpdate: (data: AnyObject) => void;
};

// Data Type <Options /> props
export type DataTypeUIOptionsProps = {
    coreI18n: any;
    i18n: any;
    data: any;
    id: string;
    onUpdate: (data: AnyObject) => void;
};

// Data Type <Help /> props
export type DataTypeUIHelpProps = {
    coreI18n: any;
    i18n: any;
};

export type DataTypeGenerateType = {
    rowNum: number;
    generationSettings: any;
    existingRowData: any[];
};

export type GenerationTemplateRow = {
    title: string;
    dataType: string;
    cellSettings: any;
    generateFunc: Function; // DataTypeGenerateType
    colMetadata: () => any;
}

export type GenerationTemplate = {
    [n: number]: GenerationTemplateRow[];
};


// needed?
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
