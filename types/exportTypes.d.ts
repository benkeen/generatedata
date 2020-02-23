import { DatabaseTypes } from '../src/plugins/exportTypes/SQL/SQL.types';
import { BuilderLayout } from '../src/components/builder/Builder.component';

// dynamically construct a type? Perhaps via the build script would be best.
// export type ET = 'JSON' | 'XML' | ...

export type ETBundle = {

	initialState: any;

    // the main generation function for the Export Type
    generate: any;

    // the component used for rendering the Export Type settings
    Settings?: React.ReactNode;

    // the preview component
    Preview?: React.ReactNode;
}

export type GeneralMetadataTypes = {
    dataType: 'number' | 'string' | 'boolean' | 'date';
}

export type ExportTypeMetadata = {
    general?: GeneralMetadataTypes;
    sql?: DatabaseTypes;
};

export type ETSettings = {
	onUpdate: Function; // from container
	data: any; // from store 
	id: string;
	layout: BuilderLayout;
	i18n: any;
	coreI18n: object;
};
