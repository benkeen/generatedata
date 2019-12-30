import { ExportTypeMetadata } from '../../../../types/exportTypes';
import { AutoIncrementState } from './AutoIncrement.ui';
import { GenerationData } from '../../../../types/dataTypes';

// TODO: perhaps put the parseFloat()'s here. It'll only execute once prior to generation, so it's performant - and will
// be more forgiving than on every key change on the UI
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
