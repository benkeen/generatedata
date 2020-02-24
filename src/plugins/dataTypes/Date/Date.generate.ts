import { format, fromUnixTime } from 'date-fns';
import { DTGenerationData, DTGenerateResult, DTMetadata } from '../../../../types/dataTypes';
import { DateState } from './Date.ui';
import { getRandomNum } from '../../../utils/randomUtils';

export const rowStateReducer = ({ fromDate, toDate, format }: DateState): Partial<DateState> => ({
	fromDate, toDate, format
});

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const { fromDate, toDate, format: displayFormat } = data.rowState;
	if (!displayFormat) {
		return { display: '' };
	}
	const date = getRandomNum(fromDate, toDate);
	return { display: format(fromUnixTime(date), displayFormat) };
};

// 	TODO: formatCode: $this->formatCode
export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'date',
	},
	sql: {
		field: 'varchar(255)',
		field_Oracle: 'varchar2(255)',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});