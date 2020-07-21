import { BuilderLayout } from '../src/core/builder/Builder.component';

export type ETBundle = {
	initialState: any; // TODO generics
	getCodeMirrorMode: (settings: any) => string; // TODO generics - data is same type as initialState
	Settings?: any;
	getExportTypeLabel?: (data: any) => string; // TODO generics - data is same type as initialState
};

export type ETDefinition = {
	name: string;
	schema: any;
	codeMirrorModes: string[];
};

export type ETSettings = {
	onUpdate: Function; // from container
	data: any; // from store
	id: string;
	layout: BuilderLayout;
	i18n: any;
	coreI18n: object;
};

export type ETPreviewProps = {
	builderLayout: BuilderLayout;
	exportTypeSettings: any; // TODO
	showRowNumbers: boolean;
	enableLineWrapping: boolean;
	data: string;
	codeMirrorMode: string;
	theme: string;
};
