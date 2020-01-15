import { format, fromUnixTime } from 'date-fns';
import { GenerationData } from '../../../../types/dataTypes';
import { DateState } from './Date.ui';
import { getRandomNum } from '../../../utils/randomUtils';
import { ExportTypeMetadata } from '../../../../types/exportTypes';

export const getGenerationSettings = ({ fromDate, toDate, format }: DateState) => ({
	fromDate, toDate, format
});

export const generate = (data: GenerationData) => {
	const { fromDate, toDate, format: displayFormat } = data.generationSettings;
	if (!displayFormat) {
		return { display: '' };
	}
	const date = getRandomNum(fromDate, toDate);
    return { display: format(fromUnixTime(date), displayFormat) };
};

// 			"formatCode" => $this->formatCode
export const getMetadata = (): ExportTypeMetadata => ({
	general: {
		dataType: 'date'
	},
	sql: {
	    field: 'varchar(255)',
        field_Oracle: 'varchar2(255)',
        field_MSSQL: 'VARCHAR(255) NULL'
    }
});