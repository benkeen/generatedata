import * as React from 'react';
import { format, subYears, addYears, fromUnixTime } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Dropdown from '~components/dropdown/Dropdown';
import Event from '@material-ui/icons/Event';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import { ErrorTooltip } from '~components/tooltips';
import TextField from '~components/TextField';
import CopyToClipboard from '~components/copyToClipboard/CopyToClipboard';
import * as sharedStyles from '../../../styles/shared.scss';
import * as styles from './Date.scss';


export type DateState = {
	fromDate: number;
	toDate: number;
	example: string;
	format: string;
};

export const initialState: DateState = {
	fromDate: parseInt(format(subYears(new Date(), 1), 't'), 10),
	toDate: parseInt(format(addYears(new Date(), 1), 't'), 10),
	example: 'MMM d, y',
	format: 'MMM d, y'
};

export const rowStateReducer = ({ fromDate, toDate, format }: DateState): Partial<DateState> => ({
	fromDate, toDate, format
});

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

export const getOptions = (): any[] => {
	const now = new Date();

	const options: any = [];
	const formats = [
		'MMM d, y', // Jan 1, 2020
		'MMMM do, y',// January 1st, 2020
		'EEE, MMM dd', // Wed, Jan 01
		'EEE, MMM do, y', // Wed, Jan 1st, 2012
		'LL.dd.yy', // 03.25.20
		'LL-dd-yy', // 03-25-06
		'LL/dd/yy', // 03/25/06,
		'LL/dd/y', // 03/25/2012
		'dd.LL.yy', // 25.03.2020
		'dd-LL-yy', // 25-03-06
		'dd/LL/y' // 25/03/2012
	];
	formats.forEach((currFormat) => {
		options.push({
			label: format(new Date(now.getFullYear(), now.getMonth(), now.getDate()), currFormat),
			value: currFormat
		});
	});

	return options.concat([
		{ label: 'MySQL datetime', value: 'y-LL-dd HH:mm:ss' },
		{ label: 'Unix timestamp (secs)', value: 't' },
		{ label: 'Unix timestamp (millisecs)', value: 'T' }
	]);
};

export const Example = ({ i18n, data, onUpdate }: DTExampleProps): JSX.Element => {
	const onChange = ({ value }: { value: string }): void => {
		onUpdate({
			...data,
			example: value,
			format: value
		});
	};

	return (
		<Dropdown
			placeholder={i18n.dateFormat}
			value={data.example}
			options={getOptions()}
			onChange={onChange}
		/>
	);
};

export const Options = ({ data, onUpdate, i18n, coreI18n }: DTOptionsProps): JSX.Element => {
	const [isOpen, setOpen] = React.useState(false);
	const [selectedDatePicker, setDatePicker] = React.useState('fromDate');
	const onChange = (field: string, value: any): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	const onBtnClick = (btn: string): void => {
		setOpen(true);
		setDatePicker(btn);
	};

	const onSelectDate = (btn: string, value: any): void => {
		onChange(btn, value);
		setOpen(false);
	};

	let toDateClass = styles.dateBtn;
	let toDateError = '';
	if (data.fromDate > data.toDate) {
		toDateClass += ` ${sharedStyles.errorField}`;
		toDateError = i18n.endDateEarlierThanStartDate;
	}

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<div>
				<div className={styles.dateRow}>
					<Button onClick={(): void => onBtnClick('fromDate')} variant="outlined" disableElevation className={styles.dateBtn}>
						<span style={{ marginRight: 3 }}>
							{format(fromUnixTime(data.fromDate), 'MMM d, y')}
						</span>
						<Event />
					</Button>
					<ArrowRightAlt />
					<ErrorTooltip title={toDateError} arrow disableHoverListener={!toDateError} disableFocusListener={!toDateError}>
						<Button onClick={(): void => onBtnClick('toDate')} variant="outlined" disableElevation className={toDateClass}>
							<span style={{ marginRight: 3 }}>
								{format(fromUnixTime(data.toDate), 'MMM d, y')}
							</span>
							<Event />
						</Button>
					</ErrorTooltip>
				</div>
				<div>
					<span className={styles.formatCodeLabel}>{i18n.formatCode}</span>
					<TextField
						error={data.format ? '' : coreI18n.requiredField}
						value={data.format}
						style={{ width: 140 }}
						onChange={(e: any): void => onChange('format', e.target.value)}
					/>
				</div>
				<div style={{ display: 'none' }}>
					<DatePicker
						autoOk
						open={isOpen}
						className={styles.dateField}
						value={fromUnixTime(selectedDatePicker === 'fromDate' ? data.toDate : data.fromDate)}
						onChange={(val: any): void => onSelectDate(selectedDatePicker, format(val, 't'))}
						onClose={(): void => setOpen(false)}
					/>
				</div>
			</div>
		</MuiPickersUtilsProvider>
	);
};

const Copy = ({ content, tooltip, message }: any): JSX.Element => (
	<span className={styles.copy}>
		<CopyToClipboard
			content={content}
			message={message}
			tooltip={tooltip}
		/>
	</span>
);

const generateRows = (letters: string[], i18n: any, coreI18n: any): JSX.Element[] => letters.map((letter: string): JSX.Element => (
	<div className={styles.row} key={letter}>
		<div className={styles.col1}>
			<label>{letter}</label>
		</div>
		<div className={sharedStyles.copyCol}>
			<Copy content={letter} message={coreI18n.copiedToClipboard} tooltip={coreI18n.copyToClipboard} />
		</div>
		<div className={styles.col2}>
			{i18n[`${letter}Format`]}
		</div>
		<div className={styles.col3}>
			{i18n[`${letter}FormatExample`]}
		</div>
	</div>
));

export const Help = ({ coreI18n, i18n }: DTHelpProps): JSX.Element => (
	<>
		<p dangerouslySetInnerHTML={{ __html: i18n.helpIntro }} />

		<h3>{i18n.day}</h3>
		{generateRows(['d', 'do', 'E', 'EEEE', 'EEEEE', 'EEEEEE', 'D'], i18n, coreI18n)}

		<h3>{i18n.week}</h3>
		{generateRows(['l'], i18n, coreI18n)}

		<h3>{i18n.month}</h3>
		{generateRows(['M', 'Mo', 'MMM', 'MMMM'], i18n, coreI18n)}

		<h3>{i18n.year}</h3>
		{generateRows(['Y'], i18n, coreI18n)}
	</>
);
