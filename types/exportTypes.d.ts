import { DatabaseTypes } from '../src/plugins/exportTypes/SQL/SQL.types';

export type GeneralMetadataTypes = {
    dataType: 'number' | 'string' | 'boolean';
}

export type ExportTypeMetadata = {
    general?: GeneralMetadataTypes;
    sql?: DatabaseTypes;
};

