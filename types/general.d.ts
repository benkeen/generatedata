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
