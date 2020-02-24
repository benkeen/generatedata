import { BuilderLayout } from '../src/components/builder/Builder.component';

export type ETBundle = {
	initialState: any;
    generate: any;
    Settings?: React.ReactNode;
    Preview?: React.ReactNode;
}

export type ETSettings = {
	onUpdate: Function; // from container
	data: any; // from store 
	id: string;
	layout: BuilderLayout;
	i18n: any;
	coreI18n: object;
};
