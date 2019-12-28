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
    generationOptions: any; // this is actually whatever the `state` structure is exported by their UI layer
};

type ExportTypeTemplate = {
    title: string;
    dataTypeRowSettings: any;
    generateFunc: Function; // DataTypeGenerateType
    metadata: () => any;
};

export type ExportTypeGenerateType = {
    numResults: number;
    template: ExportTypeTemplate[];

    // "rowNum"            => $rowNum,
    // "generationOptions" => $genInfo["generationOptions"],
    // "existingRowData"   => $currRowData

};
