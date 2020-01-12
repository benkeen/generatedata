import { GenerationData } from '../../../../types/dataTypes';
import { generateRandomAlphanumericStr, getRandomArrayValue } from '../../../utils/randomUtils';
import { PhoneState } from './Phone.ui';
import { ExportTypeMetadata } from '../../../../types/exportTypes';

export const getGenerationSettings = (state: PhoneState) => state.option;

export const generate = (data: GenerationData) => {
    const phoneStr = generateRandomAlphanumericStr(data.generationSettings);

    console.log(phoneStr);

    const formats = phoneStr.split('|');
    let chosenFormat = formats[0];

    if (formats.length > 1) {
        chosenFormat = getRandomArrayValue(formats);
    }
    return { display: chosenFormat };
};

export const getMetadata = (): ExportTypeMetadata => ({
    sql: {
        field: 'varchar(100) default NULL',
        field_Oracle: 'varchar2(100) default NULL',
        field_MSSQL: 'VARCHAR(100) NULL'
    }
});
