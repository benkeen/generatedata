import * as React from 'react';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import Dropdown from '~components/dropdown/Dropdown';
import TextField from '~components/TextField';
import CreatablePillField from "~components/creatablePillField/CreatablePillField";
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import { Tooltip } from '~components/tooltips';
import * as langUtils from '~utils/langUtils';
import { WeightedOptions } from "~utils/randomUtils";
import * as styles from './WeightedList.scss';

export const enum WeightedListType {
	exactly = 'exactly',
	between = 'between'
}

export type WeightedListItem = {
	value: string;
	weight: string;
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

export const getWeightedListItems = (values: string[]): WeightedListItem[] => (
	values.map((value) => {
		const match = value.match(/^(.*):\s(\d+)$/) as string[];
		return {
			value: match[1],
			weight: match[2]
		};
	})
);

export const getWeightedListLabels = (values: WeightedListItem[]): string[] => (
	values.map(({ value, weight }) => `${value}: ${weight}`)
);

export const Example = ({ data, onUpdate }: DTExampleProps): JSX.Element => { // i18n
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

const WeightedListDialog = ({ visible, data, id, onClose, onUpdate, coreI18n, i18n }: any): JSX.Element => {
	const exactlyField = React.useRef<any>();
	const dtListBetweenLow = React.useRef<any>();
	const [showErrors, setShowErrors] = React.useState(false);
	const [value, setValue] = React.useState('');
	const [weight, setWeight] = React.useState('');
	const [displayStrings, setDisplayStrings] = React.useState<string[]>([]);

	const onChangeValue = (e: any): void => setValue(e.target.value);
	const onChangeWeight = (e: any): void => setWeight(e.target.value);

	React.useEffect(() => {
		setDisplayStrings(getWeightedListLabels(data.values));
	}, [data.values]);

	const onChange = (field: string, value: any): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	const onAdd = (): void => {
		setShowErrors(true);
		if (value && weight !== undefined) {
			onUpdate({
				...data,
				values: [
					...data.values,
					{ value, weight }
				]
			});
			setShowErrors(false);
			setValue('');
			setWeight('');
		}
	};

	const updateDelimiter = (e: any): void => {
		onUpdate({
			...data,
			delimiter: e.target.value
		});
	};
	const exactlyError = data.exactly ? '' : coreI18n.requiredField;

	const onChangeList = (newValues: string[]): void => {
		onUpdate({
			...data,
			values: getWeightedListItems(newValues)
		});
	};

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
							<Tooltip title="" arrow>
								<InfoIcon />
							</Tooltip>
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
							<form onSubmit={(e): void => e.preventDefault()}>
								<div className={styles.addValueRow}>
									<div>
										<label>Value</label>
										<TextField
											value={value}
											throttle={false}
											style={{ width: 150 }}
											error={showErrors ? coreI18n.requiredField : ''}
											onChange={onChangeValue}
										/>
									</div>
									<div>
										<label>Weight</label>
										<TextField
											type="number"
											value={weight}
											throttle={false}
											style={{ width: 60 }}
											error={showErrors ? coreI18n.requiredField : ''}
											onChange={onChangeWeight}
										/>
									</div>
									<div>
										<label />
										<Button
											type="submit"
											onClick={onAdd}
											variant="outlined"
											color="primary"
											size="small">
											Add &raquo;
										</Button>
									</div>
								</div>
							</form>
							<div>
								{displayStrings.length ? (
									<CreatablePillField
										onChange={onChangeList}
										value={displayStrings}
									/>
								) : <p>Please enter some items.</p>}
							</div>
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
export const rowStateReducer = ({ example, delimiter, listType, exactly, betweenLow = '', atMost, betweenHigh = '', values }: WeightedListState): any => {
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

	const valuesObj: WeightedOptions = {};
	values.forEach(({ value, weight }: WeightedListItem) => {
		valuesObj[value] = parseInt(weight, 10);
	});

	return {
		example,
		listType,
		exactly: cleanExactly,
		betweenLow: cleanBetweenLow,
		betweenHigh: cleanBetweenHigh,
		values: valuesObj,
		delimiter: delimiter ? delimiter : ', '
	};
};
