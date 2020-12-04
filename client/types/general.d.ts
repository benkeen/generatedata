import { GeneratorState } from '~store/generator/generator.reducer';
import { MainState } from '~store/main/main.reducer';
import { PacketsState } from '~store/packets/packets.reducer';
import { AccountState } from '~store/account/account.reducer';
import { DataTypeFolder } from '../_plugins';
import { DTMetadata } from '~types/dataTypes';
import { AccountsState } from '~store/accounts/accounts.reducer';

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
	accounts: AccountsState;
};

export type AuthMethod = 'default' | 'google';

export type GDLocale = 'ar' | 'en' | 'fr' | 'de' | 'es' | 'ja' | 'nl' | 'ta' | 'zh';

export type GenEnvironment = 'API' | 'UI';

// these have special semantic meaning within the script. When the navigation includes them, things like the label
// and action are preset within the core script
export type GDPresetHeaderLinks = 'generator' | 'signup' | 'separator' | 'dataSets' | 'userAccount' | 'loginDialog' |
	'accounts' | 'loginPage' | 'logout';

// this is for custom header links
export type GDCustomHeaderLink = {
	path: string;
	labelI18nKey: string; // yup. This currently has to be baked into the applications main i18n files.
}

export type GDHeaderLink = GDPresetHeaderLinks | GDCustomHeaderLink;

export type GDRoute = {
	path: string;
	component: any;
}

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
