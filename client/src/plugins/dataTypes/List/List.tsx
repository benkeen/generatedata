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
import { ListType, ListState, GenerationOptionsType } from './List.state';
import * as styles from './List.scss';

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
		{ value: i18n.carBrands, label: i18n.example12 },
		{ value: 'ALL|DZD|AOA|ARS|AMD|AUD|EUR|AZN|BHD|BBD|BYN|EUR|BMD|BOB|BAM|BWP|BRL|BGN|CVE|KHR|XAF|CAD|KYD|XAF|CLP|CNY|COP|CDF|XAF|CRC|HRK|EUR|\'CZK|DKK|DOP|USD|EGP|USD|XAF|EUR|FJD|EUR|EUR|XAF|GEL|EUR|GHS|GIP|\'EUR|DKK|GTQ|GBP|GYD|HNL|HKD|HUF|ISK|INR|IDR|IQD|EUR|IMP|ILS|EUR|\'XOF|JMD|JPY|GBP|JOD|KZT|KES|KRW|EUR|KWD|KGS|LAK|EUR|LBP|LYD|CHF|\'EUR|EUR|MOP|MGA|MWK|MYR|MVR|EUR|MRU|MUR|MXN|MDL|MNT|EUR|MAD|MZN|\'MMK|NAD|EUR|NZD|NIO|NGN|MKD|NOK|OMR|PKR|PGK|PYG|PEN|PHP|PLN|EUR|USD|QAR|RON|RUB|RWF|XCD|SAR|XOF|RSD|SGD|EUR|EUR|ZAR|EUR|LKR|SZL|SEK|CHF|TWD|TJS|TZS|THB|USD|TTD|TND|TRY|TMT|UGX|UAH|AED|GBP|USD|UYU|UZS|VEF|VND|ZMW|ZWD', label: i18n.currencyCode },
		{ value: 'lek|dinar|kwanza|peso|dram|dollar|euro|manat|rouble|boliviano|konvertibilna marka|pula|real|lev|escudo|riel|yuan|franc|colon|kuna|koruna|kroner|pound|lari|cedi|Danish krone|quetzal|lempira|forint|krona|rupee|rupiah|shekel|yen|tenge|shilling|won|som|kip|pound|pataca|ariary|kwacha|ringgit|rufiyaa|ouguiya|leu|tugrik|dirham|metical|kyat|cordoba oro|naira|denar|rial|kina|guarani|nuevo sol|zloty|riyal|ruble|rand|lilangeni|somoni|baht|lira|hryvnia|sterling|sum|bolivar|dong', label: i18n.currencyName }

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
	const dtListBetweenLow = React.useRef<any>();

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

	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 500 }}>
				<DialogTitle onClose={onClose}>{i18n.listSettings}</DialogTitle>
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
										type="intOnly"
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
								</li>
								<li>
									<input
										type="radio"
										id={`listType2-${id}`}
										value={ListType.between}
										checked={data.listType !== ListType.exactly}
										onChange={(): void => {
											onChange('listType', ListType.between);
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
												listType: ListType.between
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
												listType: ListType.between
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
	if (safeData.listType === ListType.exactly) {
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
			<div>
				<CreatablePillField
					value={safeData.values}
					onChange={(values: any): void => onUpdate({ ...safeData, values })}
				/>
			</div>
			<ListDialog
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

export const rowStateReducer = ({ delimiter, listType, exactly, betweenLow = '', betweenHigh = '', values }: ListState): GenerationOptionsType => {
	let cleanExactly: any = '';
	let cleanBetweenLow: any = '';
	let cleanBetweenHigh: any = '';

	if (listType === ListType.exactly) {
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
		values,
		delimiter: delimiter ? delimiter : ', '
	};
};
