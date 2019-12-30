import { ExportTypeMetadata } from '../../../../types/exportTypes';
import { AutoIncrementState } from './AutoIncrement.ui';
import { GenerationData } from '../../../../types/dataTypes';

export const getGenerationSettings = (state: AutoIncrementState) => ({
    incrementStart: state.incrementStart,
    incrementValue: state.incrementValue,
    incrementPlaceholder: state.incrementPlaceholder
});

export const generate = (data: GenerationData) => {
    const rowNum = data.rowNum;
    const { incrementStart, incrementValue, incrementPlaceholder } = data.generationSettings;

    let value = ((rowNum-1) * incrementValue) + incrementStart;

    if (incrementPlaceholder) {
        value = value.replace(/\${INCR}/g, value);
    }
    return { display: value };
};

export const getMetadata = (): ExportTypeMetadata => ({
    general: {
        dataType: 'number'
    },
    sql: {
        field: 'mediumint',
        field_Oracle: 'number default NULL',
        field_MSSQL: 'INTEGER NULL',
        field_Postgres: 'integer NULL'
    }
});
