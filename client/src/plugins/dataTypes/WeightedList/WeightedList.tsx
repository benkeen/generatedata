import * as React from 'react';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import Dropdown from '~components/dropdown/Dropdown';
import TextField from '~components/TextField';
import CreatablePillField from '~components/creatablePillField/CreatablePillField';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import { Tooltip } from '~components/tooltips';
import * as langUtils from '~utils/langUtils';
import {
	presets, WeightedListType, WeightedListItem, getWeightedListLabels, getWeightedListItems,
	WeightedListState, GenerationOptionsType, convertListItemsToObj
} from './WeightedList.state';
import * as styles from './WeightedList.scss';


export const Example = ({ data, onUpdate, i18n }: DTExampleProps): JSX.Element => {
	const onChange = (example: any): void => {
		let values: WeightedListItem[] = [];
		if (example === 'even-odd') {
			values = presets.evenOdd.values;
		} else if (example === 'professions') {
			values = presets.professions.values;
		} else if (example === 'household-pets') {
			values = presets.householdPets.values;
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
		{ value: 'household-pets', label: i18n.householdPets }
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
		if (value && weight) {
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
	let betweenLowError = '';
	let betweenHighError = '';
	if (data.listType === WeightedListType.exactly) {
		if (!data.exactly) {
			exactlyError = coreI18n.requiredField;
		} else if (displayStrings.length < parseInt(data.exactly, 10)) {
			exactlyError = i18n.listTooShort;
		}
	} else {
		if (!data.betweenLow) {
			betweenLowError = coreI18n.requiredField;
		} else if (displayStrings.length < parseInt(data.betweenLow, 10)) {
			betweenLowError = i18n.listTooShort;
		}
		if (!data.betweenHigh) {
			betweenHighError = coreI18n.requiredField;
		} else if (displayStrings.length < parseInt(data.betweenHigh, 10)) {
			betweenHighError = i18n.listTooShort;
		}
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
										error={betweenLowError}
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
										error={betweenHighError}
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
							<Tooltip title={i18n.allowDuplicatesDesc} arrow>
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
							<Tooltip title={i18n.delimCharsDesc} arrow>
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
							{i18n.itemsTitle}
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
			label = langUtils.getI18nString(i18n.exactly1Item, ['<b>1</b>']);
		} else {
			label = langUtils.getI18nString(i18n.exactlyNItems, [`<b>${safeData.exactly}</b>`]);
		}
	} else if (!safeData.betweenLow && !safeData.betweenHigh) {
		label = i18n.noRangeEntered;
	} else if (safeData.betweenLow && safeData.betweenHigh) {
		label = langUtils.getI18nString(i18n.betweenNumItems, [`<b>${safeData.betweenLow}</b>`, `<b>${safeData.betweenHigh}</b>`]);
	} else if (safeData.betweenLow) {
		if (safeData.betweenLow === '1') {
			label = langUtils.getI18nString(i18n.atLeast1Item, ['<b>1</b>']);
		} else {
			label = langUtils.getI18nString(i18n.atLeastNItems, [`<b>${safeData.betweenLow}</b>`]);
		}
	} else {
		if (safeData.betweenHigh === '1') {
			label = langUtils.getI18nString(i18n.atMost1Item, ['<b>1</b>']);
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
	delimiter, listType, exactly, betweenLow = '', betweenHigh = '', values, allowDuplicates
}: WeightedListState): GenerationOptionsType => {
	let cleanExactly: any = '';
	let cleanBetweenLow: any = '';
	let cleanBetweenHigh: any = '';

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
		listType,
		exactly: cleanExactly,
		betweenLow: cleanBetweenLow,
		betweenHigh: cleanBetweenHigh,
		values: convertListItemsToObj(values),
		delimiter: delimiter ? delimiter : ', ',
		allowDuplicates
	};
};
