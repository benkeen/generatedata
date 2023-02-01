import { GeneratorState } from '~store/generator/generator.reducer';
import { MainState } from '~store/main/main.reducer';
import { PacketsState } from '~store/packets/packets.reducer';
import { AccountState } from '~store/account/account.reducer';
import { DataTypeFolder } from '../_plugins';
import { availableLocales } from '../_env';
import { DTMetadata } from '~types/dataTypes';

declare global {
    interface Window {
        gd: any;
        CodeMirror: any;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
		clipboardData: any;
		google: any;
    }
}

export type Store = {
	generator: GeneratorState;
	main: MainState;
	packets: PacketsState;
	account: AccountState;
};

export const enum AuthMethod {
	default = 'default',
	google = 'google'
}

export type GDLocale = typeof availableLocales[number];

export type GDLocaleMap = {
	[locale in GDLocale]: string;
}

// these have special semantic meaning within the script. When the navigation includes them, things like the label
// and action are preset within the core script
export type GDPresetHeaderLinks = 'generator' | 'register' | 'separator' | 'dataSets' | 'userAccount' | 'loginDialog' |
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

export type GDAction = {
	type: string;
	payload?: any;
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
    colIndex: number;
}

export type GenerationTemplate = {
    [processOrder: number]: GenerationTemplateRow[];
};

export type ColumnData = {
	title: string;
	dataType: DataTypeFolder;
	metadata: DTMetadata;
};

export type TourProps = {
	isOpen: boolean;
	onClose: () => void;
	maskClassName: string;
	closeWithMask: boolean;
	disableInteraction: boolean;
	accentColor: string;
	className: string;
};

export const enum GenerationActivityPanel {
	small = 'small',
	large = 'large'
}

export const enum GeneratorPanel {
	grid = 'grid',
	preview = 'preview'
}

export const enum LoadTimeGraphDuration {
	all = 'all',
	s15 = '15seconds',
	s30 = '30seconds',
	m1 = '1minute'
}

export const enum AccountStatusFilter {
	all = 'all',
	live = 'live',
	expired = 'expired',
	disabled = 'disabled'
}
