import * as React from 'react';
import { format, startOfDay, endOfDay } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Dropdown from '~components/dropdown/Dropdown';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import TextField from '@material-ui/core/TextField';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import { ErrorTooltip } from '~components/tooltips';
// import * as sharedStyles from '../../../styles/shared.scss';
import * as styles from './Time.scss';


export type DateState = {
	fromTime: number;
	toTime: number;
	example: string;
	format: string;
};

export const initialState: DateState = {
	fromTime: parseInt(format(startOfDay(new Date()), 't'), 10),
	toTime: parseInt(format(endOfDay(new Date()), 't'), 10),
	example: 'h:mm a',
	format: 'h:mm a'
};

export const rowStateReducer = ({ fromTime, toTime, format }: DateState): Partial<DateState> => ({
	fromTime, toTime, format
});

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'string'
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
		'h:mm a', // 3:35 pm
		'H:mm', // 15:35
	];
	formats.forEach((currFormat) => {
		options.push({
			label: format(new Date(now.getFullYear(), now.getMonth(), now.getDate()), currFormat),
			value: currFormat
		});
	});

	return options;
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

const useStyles = makeStyles(() => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: 1,
		marginRight: 1,
		width: 100
	},
}));


export const Options = ({ data, onUpdate, i18n, coreI18n }: DTOptionsProps): JSX.Element => {
	const classes = useStyles();
	const onChange = (field: string, value: any): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	// const onSelectDate = (btn: string, value: any): void => {
	// 	onChange(btn, value);
	// 	setOpen(false);
	// };

	// let toTimeClass = styles.dateBtn;
	let toTimeError = '';
	if (data.fromTime > data.toTime) {
		// toTimeClass += ` ${sharedStyles.errorField}`;
		toTimeError = i18n.endDateEarlierThanStartDate;
	}

	// {format(fromUnixTime(data.fromTime), C.TIME_FORMAT)}

	return (
		<div>
			<div className={styles.dateRow}>
				<TextField
					type="time"
					defaultValue="07:30"
					className={classes.textField}
					InputLabelProps={{
						shrink: true
					}}
					inputProps={{ step: 60 }}
				/>

				<ArrowRightAlt />

				<ErrorTooltip title={toTimeError} arrow disableHoverListener={!toTimeError} disableFocusListener={!toTimeError}>
					<TextField
						type="time"
						defaultValue="07:30"
						className={classes.textField}
						InputLabelProps={{
							shrink: true
						}}
						inputProps={{ step: 60 }}
					/>
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
		</div>
	);
};

// coreI18n,
export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p dangerouslySetInnerHTML={{ __html: i18n.helpIntro }} />

		...
	</>
);
