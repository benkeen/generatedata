import { ExportTypeMetadata } from '../../../../types/exportTypes';
import { GenerationData } from '../../../../types/dataTypes';
import { getRandomNum } from '../../../utils/utils';
import { BooleanState } from './Boolean.ui';

export const getGenerationSettings = (state: BooleanState) => state.value;

export const generate = (data: GenerationData) => {
    const placeholderStr: string = data.generationSettings;

    // in case the user entered multiple | separated formats, pick one
    const formats = placeholderStr.split('|');
    let chosenFormat = formats[0];
    if (formats.length > 1) {
        chosenFormat = formats[getRandomNum(0, formats.length-1)];
    }

    return { display: chosenFormat.trim() };
};


export const getMetadata = (): ExportTypeMetadata => ({
    general: {
        dataType: 'boolean'
    },
    sql: {
        field: 'varchar(255) default NULL',
        field_Oracle: 'varchar2(255) default NULL',
        field_MSSQL: 'VARCHAR(255) NULL'
    }
});
