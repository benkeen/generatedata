import * as React from 'react';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import Dropdown from '~components/dropdown/Dropdown';
import TextField from '~components/TextField';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import { Tooltip } from '~components/tooltips';
import * as langUtils from '~utils/langUtils';
import * as randomUtils from '~utils/randomUtils';
import * as styles from './WeightedList.scss';

export const enum WeightedListType {
	exactly = 'exactly',
	between = 'between'
}

export type WeightedListItem = {
	id: string;
	value: string;
	weight: number | string;
}

export type WeightedListState = {
	example: string;
	listType: WeightedListType;
	exactly: string;
	betweenLow: string;
	betweenHigh: string;
	delimiter: string;
	values: WeightedListItem[];
};

export const initialState: WeightedListState = {
	example: '1|3|5|7|9|11|13|15|17|19',
	listType: WeightedListType.exactly,
	exactly: '1',
	betweenLow: '',
	betweenHigh: '',
	values: [],
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
		{ value: '1|3|5|7|9|11|13|15|17|19', label: 'Example 1' },
		{ value: '2|4|6|8|10|12|14|16|18|20', label: 'Example 2' },
		{ value: '1|2|3|4|5|6|7|8|9|10', label: '1-10' },
	];

	return (
		<Dropdown
			value={data.example}
			onChange={(i: any): void => onChange(i.value)}
			options={options}
		/>
	);
};

type ListTypeProps = {
	values: WeightedListItem[];
	onChange: (id: string, field: '', value: string) => void;
	onAdd: () => void;
	onRemove: (id: string) => void;
}

const ListTable = ({ values, onChange, onAdd, onRemove }: ListTypeProps): JSX.Element => {
	return (
		<>
			<ul className={styles.listTable}>
				<li>
					<div className={styles.valueCol}>Value</div>
					<div className={styles.weightCol}>Weight</div>
					<div className={styles.delCol} />
				</li>
				{values.map(({ value, weight, id }) => (
					<li key={id}>
						<div className={styles.valueCol}>
							<input type="text" value={value} />
						</div>
						<div className={styles.weightCol}>
							<input type="number" value={weight} />
						</div>
						<div className={styles.delCol} onClick={() => onRemove(id)}>
							<HighlightOffIcon />
						</div>
					</li>
				))}
			</ul>
			<Button
				onClick={onAdd}
				variant="outlined"
				color="primary"
				size="small">
				Add Row &raquo;
			</Button>
		</>
	);
};

const WeightedListDialog = ({ visible, data, id, onClose, onUpdate, coreI18n, i18n }: any): JSX.Element => {
	const exactlyField = React.useRef<any>();
	const dtListBetweenLow = React.useRef<any>();

	const onChange = (field: string, value: any): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	const onAdd = () => {
		const guid = randomUtils.generateRandomAlphanumericStr('HHHHHHHH-HHHH-HHHH-HHHH-HHHHHHHHHHHH');
		onUpdate({
			...data,
			values: [
				...data.values,
				{ id: guid, value: '', weight: '' }
			]
		});
	};

	const onRemove = (id: string) => {
		onUpdate({
			...data,
			values: data.values.filter((row: WeightedListItem) => row.id !== id)
		});
	};

	const updateDelimiter = (e: any): void => {
		onUpdate({
			...data,
			delimiter: e.target.value
		});
	};

	const exactlyError = data.exactly ? '' : coreI18n.requiredField;

	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 500 }}>
				<DialogTitle onClose={onClose}>{i18n.weightedListSettings}</DialogTitle>
				<DialogContent dividers>
					<div className={styles.row}>
						<div className={styles.colLabel}>
							{i18n.numItemsLabel}
							<Tooltip title={i18n.numItemsLabelDesc} arrow>
								<InfoIcon />
							</Tooltip>
						</div>
						<div className={styles.content}>
							<ul>
								<li>
									<input
										type="radio"
										id={`listType1-${id}`}
										value={WeightedListType.exactly}
										checked={data.listType === WeightedListType.exactly}
										onChange={(): void => {
											onChange('listType', WeightedListType.exactly);
											exactlyField.current.focus();
										}}
									/>
									<label htmlFor={`listType1-${id}`}>{i18n.exactly}</label>
									<TextField
										error={exactlyError}
										ref={exactlyField}
										type="intOnly"
										min={1}
										id={`dtListExactly_${id}`}
										value={data.exactly}
										style={{ margin: '0 6px 0 4px', width: 50 }}
										onChange={(e: any): void => {
											onUpdate({
												...data,
												exactly: e.target.value,
												listType: WeightedListType.exactly
											});
										}}
									/>
								</li>
								<li>
									<input
										type="radio"
										id={`listType2-${id}`}
										value={WeightedListType.between}
										checked={data.listType !== WeightedListType.exactly}
										onChange={(): void => {
											onChange('listType', WeightedListType.between);
											dtListBetweenLow.current.focus();
										}}
									/>
									<label htmlFor={`listType2-${id}`}>{i18n.between}</label>
									<TextField
										ref={dtListBetweenLow}
										type="intOnly"
										min={0}
										placeholder="-"
										id={`dtListAtMost_${id}`}
										value={data.betweenLow}
										style={{ margin: '0 6px 0 4px', width: 50 }}
										onChange={(e: any): void => {
											onUpdate({
												...data,
												betweenLow: e.target.value,
												listType: WeightedListType.between
											});
										}}
									/>
									{i18n.and}
									<TextField
										type="intOnly"
										min={0}
										placeholder="-"
										id={`dtListBetweenHigh_${id}`}
										value={data.betweenHigh}
										style={{ margin: '0 6px 0 4px', width: 50 }}
										onChange={(e: any): void => {
											onUpdate({
												...data,
												betweenHigh: e.target.value,
												listType: WeightedListType.between
											});
										}}
									/>
									{i18n.items}
								</li>
							</ul>
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
					<div className={styles.row}>
						<div className={styles.colLabel}>
							Items
						</div>
						<div className={styles.content}>
							<ListTable
								values={data.values}
								onAdd={onAdd}
								onRemove={onRemove}
								onChange={onChange}
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

	const safeData = {
		...data
	};

	if (safeData.atMost) {
		safeData.betweenHigh = safeData.atMost;
		delete safeData.atMost;
	}

	if (!safeData.betweenLow) {
		safeData.betweenLow = '';
	}
	if (!safeData.betweenHigh) {
		safeData.betweenHigh = '';
	}

	let label;
	if (safeData.listType === WeightedListType.exactly) {
		if (safeData.exactly === '1') {
			label = langUtils.getI18nString(i18n.exactly1Item, [`<b>1</b>`]);
		} else {
			label = langUtils.getI18nString(i18n.exactlyNItems, [`<b>${safeData.exactly}</b>`]);
		}
	} else if (!safeData.betweenLow && !safeData.betweenHigh) {
		label = i18n.noRangeEntered;
	} else if (safeData.betweenLow && safeData.betweenHigh) {
		label = langUtils.getI18nString(i18n.betweenNumItems, [`<b>${safeData.betweenLow}</b>`, `<b>${safeData.betweenHigh}</b>`]);
	} else if (safeData.betweenLow) {
		if (safeData.betweenLow === '1') {
			label = langUtils.getI18nString(i18n.atLeast1Item, [`<b>1</b>`]);
		} else {
			label = langUtils.getI18nString(i18n.atLeastNItems, [`<b>${safeData.betweenLow}</b>`]);
		}
	} else {
		if (safeData.betweenHigh === '1') {
			label = langUtils.getI18nString(i18n.atMost1Item, [`<b>1</b>`]);
		} else {
			label = langUtils.getI18nString(i18n.atMostNItems, [`<b>${safeData.betweenHigh}</b>`]);
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
			<WeightedListDialog
				visible={dialogVisible}
				data={safeData}
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

// @ts-ignore-line
export const rowStateReducer = ({ example, delimiter, listType, exactly, betweenLow = '', atMost, betweenHigh = '', values }: ListState): any => {
	let cleanExactly: any = '';
	let cleanBetweenLow: any = '';
	let cleanBetweenHigh: any = '';

	if (atMost) {
		betweenHigh = atMost;
	}

	if (listType === WeightedListType.exactly) {
		if (exactly.trim() !== '') {
			cleanExactly = parseInt(exactly.trim(), 10);
		}
	} else {
		if (betweenLow.trim() !== '') {
			cleanBetweenLow = parseInt(betweenLow.trim(), 10);
		}
		if (betweenHigh.trim() !== '') {
			cleanBetweenHigh = parseInt(betweenHigh.trim(), 10);
		}

		// ensure that the number are sorted low to high - makes the generation code have to do less work on every
		// iteration
		if (cleanBetweenLow !== '' && cleanBetweenHigh !== '') {
			if (cleanBetweenLow > cleanBetweenHigh) {
				const oldLow = cleanBetweenLow;
				cleanBetweenLow = cleanBetweenHigh;
				cleanBetweenHigh = oldLow;
			}
		}
	}

	return {
		example,
		listType,
		exactly: cleanExactly,
		betweenLow: cleanBetweenLow,
		betweenHigh: cleanBetweenHigh,
		values,
		delimiter: delimiter ? delimiter : ', '
	};
};
