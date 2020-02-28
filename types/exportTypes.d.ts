import { GDLocale } from './general';
import { BuilderLayout } from '../src/components/builder/Builder.component';

export type ETDefinition = {
	name: string; 
	localeFiles: GDLocale[];
};

export type ETSettings = {
	onUpdate: Function; // from container
	data: any; // from store 
	id: string;
	layout: BuilderLayout;
	i18n: any;
	coreI18n: object;
};
