import * as React from 'react';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import Dropdown from '~components/dropdown/Dropdown';
import CreatablePillField from '~components/creatablePillField/CreatablePillField';
import TextField from '~components/TextField';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import { Tooltip } from '~components/tooltips';
import * as langUtils from '~utils/langUtils';
import * as styles from './List.scss';

export const enum ListType {
	exactly = 'exactly',
	atMost = 'atMost'
}

export type ListState = {
	example: string;
	listType: ListType;
	exactly: string;
	atMost: string;
	values: string[];
	delimiter: string;
};

export const initialState: ListState = {
	example: '1|3|5|7|9|11|13|15|17|19',
	listType: ListType.exactly,
	exactly: '1',
	atMost: '1',
	values: ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19'],
	delimiter: ', '
};

export const Example = ({ data, onUpdate, i18n }: DTExampleProps): JSX.Element => {
	const onChange = (example: any): void => {
		onUpdate({
			...data,
			example: example,
			values: example.split('|')
		});
	};

	const options = [
		{ value: '1|3|5|7|9|11|13|15|17|19', label: i18n.example1 },
		{ value: '2|4|6|8|10|12|14|16|18|20', label: i18n.example2 },
		{ value: '1|2|3|4|5|6|7|8|9|10', label: '1-10' },
		{ value: i18n.oneToTen, label: i18n.example3 },
		{ value: '1|2|3|5|7|11|13|17|19|23|29|31|37|41|43|47|53|59|61|67|71|73|79|83|89|97', label: i18n.example4 },
		{ value: i18n.colours, label: i18n.example5 },
		{ value: i18n.relationshipStates, label: i18n.example6 },
		{ value: i18n.prefix, label: i18n.example7 },
		{ value: i18n.departmentNames, label: i18n.example8 },
		{ value: i18n.companies, label: i18n.example9 },
		{ value: i18n.drugNames, label: i18n.example10 },
		{ value: i18n.foodTypes, label: i18n.example11 },
		{ value: i18n.carBrands, label: i18n.example12 }
	];

	return (
		<Dropdown
			value={data.example}
			onChange={(i: any): void => onChange(i.value)}
			options={options}
		/>
	);
};

const ListDialog = ({ visible, data, id, onClose, onUpdate, coreI18n, i18n }: any): JSX.Element => {
	const exactlyField = React.useRef<any>();
	const atMostField = React.useRef<any>();

	const onChange = (field: string, value: any): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	const updateDelimiter = (e: any): void => {
		onUpdate({
			...data,
			delimiter: e.target.value
		});
	};

	const exactlyError = data.exactly ? '' : coreI18n.requiredField;
	const atMostError = data.atMost ? '' : coreI18n.requiredField;

	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 500 }}>
				<DialogTitle onClose={onClose}>{i18n.listSettings}</DialogTitle>
				<DialogContent dividers>
					<div className={styles.row}>
						<div className={styles.colLabel}>{i18n.source}</div>
						<div className={styles.content}>
							<input
								type="radio"
								id={`listType1-${id}`}
								value={ListType.exactly}
								checked={data.listType === ListType.exactly}
								onChange={(): void => {
									onChange('listType', ListType.exactly);
									exactlyField.current.focus();
								}}
							/>
							<label htmlFor={`listType1-${id}`}>{i18n.exactly}</label>
							<TextField
								error={exactlyError}
								ref={exactlyField}
								type="number"
								min={1}
								id={`dtListExactly_${id}`}
								value={data.exactly}
								style={{ margin: '0 6px 0 4px', width: 50 }}
								onChange={(e: any): void => {
									onUpdate({
										...data,
										exactly: e.target.value,
										listType: ListType.exactly
									});
								}}
							/>
							<input
								type="radio"
								id={`listType2-${id}`}
								value={ListType.atMost}
								checked={data.listType === ListType.atMost}
								onChange={(): void => {
									onChange('listType', ListType.atMost);
									atMostField.current.focus();
								}}
							/>
							<label htmlFor={`listType2-${id}`}>{i18n.atMost}</label>
							<TextField
								error={atMostError}
								ref={atMostField}
								type="number"
								min={1}
								id={`dtListAtMost_${id}`}
								value={data.atMost}
								style={{ margin: '0 6px 0 4px', width: 50 }}
								onChange={(e: any): void => {
									onUpdate({
										...data,
										atMost: e.target.value,
										listType: ListType.atMost
									});
								}}
							/>
							<Tooltip title={i18n.sourceDesc} arrow>
								<InfoIcon />
							</Tooltip>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.colLabel}>
							{i18n.delimChars}
						</div>
						<div className={styles.content}>
							<input
								type="text"
								style={{ width: 40 }}
								value={data.delimiter}
								onChange={updateDelimiter}
							/>
						</div>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary" variant="outlined">{coreI18n.close}</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};


export const Options = ({ coreI18n, i18n, data, id, onUpdate }: DTOptionsProps): JSX.Element => {
	const [dialogVisible, setDialogVisibility] = React.useState(false);

	let label;
	if (data.listType === ListType.exactly) {
		if (data.exactly === '1') {
			label = langUtils.getI18nString(i18n.exactly1Item, [`<b>1</b>`]);
		} else {
			label = langUtils.getI18nString(i18n.exactlyNItems, [`<b>${data.exactly}</b>`]);
		}
	} else {
		if (data.atMost === '1') {
			label = langUtils.getI18nString(i18n.atMost1Item, [`<b>1</b>`]);
		} else {
			label = langUtils.getI18nString(i18n.atMostNItems, [`<b>${data.atMost}</b>`]);
		}
	}

	return (
		<>
			<div style={{ margin: 4 }}>
				<span dangerouslySetInnerHTML={{ __html: label }} />
				<Button
					onClick={(): void => setDialogVisibility(true)}
					variant="outlined"
					color="primary"
					size="small"
					style={{ marginLeft: 6 }}>
					{i18n.customize}
				</Button>
			</div>
			<div>
				<CreatablePillField
					value={data.values}
					onChange={(values: any): void => onUpdate({ ...data, values })}
				/>
			</div>
			<ListDialog
				visible={dialogVisible}
				data={data}
				id={id}
				coreI18n={coreI18n}
				i18n={i18n}
				onUpdate={onUpdate}
				onClose={(): void => setDialogVisibility(false)}
			/>
		</>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => <p dangerouslySetInnerHTML={{ __html: i18n.help }} />;

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'infer'
	},
	sql: {
		field: 'varchar(255) default NULL',
		field_Oracle: 'varchar2(255) default NULL',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});

export const rowStateReducer = ({ example, listType, exactly, atMost, values }: ListState): any => {
	const cleanExactly = (listType === 'exactly' && listType.trim() === '') ? 1 : parseInt(exactly, 10);
	const cleanAtMost = (listType === 'atMost' && listType.trim() === '') ? 1 : parseInt(atMost, 10);

	return {
		example,
		listType,
		exactly: cleanExactly,
		atMost: cleanAtMost,
		values
	};
};
