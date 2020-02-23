import { BuilderLayout } from '../src/components/builder/Builder.component';

export type ETBundle = {

	initialState: any;

    // the main generation function for the Export Type
    generate: any;

    // the component used for rendering the Export Type settings
    Settings?: React.ReactNode;

    // the preview component
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
