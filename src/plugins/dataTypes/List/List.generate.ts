import { DTMetadata, DTGenerationData, DTGenerateResult } from '../../../../types/dataTypes';
import { ListState } from './List.ui';
import { getRandomSubset, getRandomNum } from '../../../utils/randomUtils';

export const rowStateReducer = ({ example, listType, exactly, atMost, values }: ListState): Partial<ListState> => ({
	example, listType, exactly, atMost, values
});

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const { listType, values, exactly, atMost } = data.rowState;

	let val = '';
	if (listType === 'exactly') {
		val = getRandomSubset(values, exactly).join(', ');
	} else {
		const numItems = getRandomNum(0, atMost);
		val = getRandomSubset(values, numItems).join(', ');
	}

	return { display: val };
};

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'mixed'
	},
	sql: {
		field: 'varchar(255) default NULL',
		field_Oracle: 'varchar2(255) default NULL',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});
