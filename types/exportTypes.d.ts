import { BuilderLayout } from '../src/core/builder/Builder.component';

export type ETBundle = {
	generate: any; // TODO
	initialState: any; // TODO generics?
	Preview: any;
	Settings?: any;
	getExportTypeLabel?: (data: any) => string; // TODO generics - data is same type as initialState
};

export type ETDefinition = {
	name: string;
	schema: any;
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
	numPreviewRows: number;
	builderLayout: BuilderLayout;
	exportTypeSettings: any; // TODO
	showRowNumbers: boolean;
	enableLineWrapping: boolean;
	data: any;
	theme: string;
};
