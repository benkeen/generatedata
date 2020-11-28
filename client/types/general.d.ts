import { GeneratorState } from '~store/generator/generator.reducer';
import { MainState } from '~store/main/main.reducer';
import { PacketsState } from '~store/packets/packets.reducer';
import { AccountState } from '~store/account/account.reducer';
import { DataTypeFolder } from '../_plugins';
import { DTMetadata } from '~types/dataTypes';

declare global {
    interface Window {
        gd: any;
        CodeMirror: any;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

export type Store = {
	generator: GeneratorState;
	main: MainState;
	packets: PacketsState;
	account: AccountState;
};

export type AuthMethod = 'default' | 'google';

export type GDLocale = 'ar' | 'en' | 'fr' | 'de' | 'es' | 'ja' | 'nl' | 'ta' | 'zh';

export type GenEnvironment = 'API' | 'UI';

export type GenerationSettings = {
	env: GenEnvironment;
	stripWhitespace: boolean;
};

export type GDAction = {
	type: string;
	payload?: any
	triggeredByInterceptor?: boolean;
};

export type AnyObject = {
    [key: string]: any;
};

export type GenerationTemplateRow = {
	id: string;
    title: string;
    dataType: DataTypeFolder;
	rowState: any;
    colMetadata: () => any;
    colIndex: number;
}

export type GenerationTemplate = {
    [num: number]: GenerationTemplateRow[];
};

export type ColumnData = {
	title: string;
	dataType: DataTypeFolder;
	metadata: DTMetadata;
};
