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
	weight: string; // for convenience this is stored as a string, but when passed to
}

export type WeightedListState = {
	example: string;
	listType: WeightedListType;
	exactly: string;
	betweenLow: string;
	betweenHigh: string;
	allowDuplicates: boolean;
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
	delimiter: ', ',
	allowDuplicates: true
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

export const Example = ({ data, onUpdate, i18n }: DTExampleProps): JSX.Element => {
	const onChange = (example: any): void => {
		let values: WeightedListItem[] = [];
		if (example === 'even-odd') {
			values = [
				{ value: '1', weight: '1' },
				{ value: '2', weight: '2' },
				{ value: '3', weight: '1' },
				{ value: '4', weight: '2' },
				{ value: '5', weight: '1' },
				{ value: '6', weight: '2' },
				{ value: '7', weight: '1' },
				{ value: '8', weight: '2' },
				{ value: '9', weight: '1' },
				{ value: '10', weight: '2' }
			];
		} else if (example === 'professions') {
			values = [
				{ value: 'Astronaut', weight: '1' },
				{ value: 'Banker', weight: '5000' },
				{ value: 'Brain surgeon', weight: '1' },
				{ value: 'Cook', weight: '8000' },
				{ value: 'Fast food/counter worker', weight: '90000' },
				{ value: 'Musician', weight: '5000' },
				{ value: 'Retail salesperson', weight: '100000' },
				{ value: 'Software Developer', weight: '10000' },
				{ value: 'Surgeon', weight: '200' },
			];
		} else if (example === 'household-pets') {
			values = [
				{ value: 'Dog', weight: '50000' },
				{ value: 'Cat', weight: '35000' },
				{ value: 'Fish', weight: '10000' },
				{ value: 'Reptile', weight: '3700' },
				{ value: 'Bird', weight: '3500' },
				{ value: 'Rabbit', weight: '1500' },
				{ value: 'Capybara', weight: '1' },
				{ value: 'Sugar glider', weight: '1' },
				{ value: 'Prairie dog', weight: '1' },
				{ value: 'Pot-bellied pig', weight: '1' },
			];
		}
		onUpdate({
			...data,
			example: example,
			values
		});
	};

	const options = [
		{ value: 'even-odd', label: i18n.mostlyEvenNumbers },
		{ value: 'professions', label: i18n.professions },
		{ value: 'household-pets', label: i18n.householdPets },
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

	let exactlyError = '';
	if (!data.exactly) {
		exactlyError = coreI18n.requiredField;
	} else if (displayStrings.length < parseInt(data.exactly, 10)) {
		exactlyError = i18n.listTooShort;
	}

	const onChangeList = (newValues: string[]): void => {
		onUpdate({
			...data,
			values: getWeightedListItems(newValues)
		});
	};

	const updateAllowDuplicates = (e: any): void => {
		onUpdate({
			...data,
			allowDuplicates: e.target.checked
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
										id={`dtListBetweenLow${id}`}
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
							{i18n.allowDuplicates}
							<Tooltip title="" arrow>
								<InfoIcon />
							</Tooltip>
						</div>
						<div className={styles.content}>
							<input
								type="checkbox"
								checked={data.allowDuplicates}
								onChange={updateAllowDuplicates}
								className={styles.allowDuplicatesCheckbox}
							/>
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
							{i18n.items}
						</div>
						<div className={styles.content}>
							<form onSubmit={(e): void => e.preventDefault()}>
								<div className={styles.addValueRow}>
									<div>
										<label>{i18n.value}</label>
										<TextField
											value={value}
											throttle={false}
											style={{ width: 150 }}
											error={showErrors ? coreI18n.requiredField : ''}
											onChange={onChangeValue}
										/>
									</div>
									<div>
										<label>{i18n.weight}</label>
										<TextField
											type="number"
											value={weight}
											min={1}
											throttle={false}
											style={{ width: 80 }}
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
											<span dangerouslySetInnerHTML={{ __html: i18n.addBtnLabel }} />
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
								) : <p>{i18n.pleaseAddItems}</p>}
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

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p dangerouslySetInnerHTML={{ __html: i18n.helpIntro }} />

		<ul>
			<li><b>{i18n.helpValueWeight}</b></li>
			<li>{i18n.helpBrainSurgeon}</li>
			<li>{i18n.helpAstronaut}</li>
			<li>{i18n.helpBanker}</li>
			<li>{i18n.helpSoftwareDeveloper}</li>
			<li>{i18n.helpEtc}</li>
		</ul>
		<p>
			{i18n.helpOtherOptions}
		</p>
		<ul>
			<li>{i18n.helpOption1}</li>
			<li>{i18n.helpOption2}</li>
			<li>{i18n.helpOption3}</li>
		</ul>
	</>
);

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

export const rowStateReducer = ({
	example, delimiter, listType, exactly, betweenLow = '', betweenHigh = '', values, allowDuplicates // atMost
}: WeightedListState): any => {
	let cleanExactly: any = '';
	let cleanBetweenLow: any = '';
	let cleanBetweenHigh: any = '';

	// if (atMost) {
	// 	betweenHigh = atMost;
	// }

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
		delimiter: delimiter ? delimiter : ', ',
		allowDuplicates
	};
};
