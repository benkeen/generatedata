import * as React from 'react';
import { format, fromUnixTime, parse } from 'date-fns';
import Dropdown from '~components/dropdown/Dropdown';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import TextField from '@material-ui/core/TextField';
import CoreTextField from '~components/TextField';
import CopyToClipboard from '~components/copyToClipboard/CopyToClipboard';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import { ErrorTooltip } from '~components/tooltips';
import { DateState, GenerationOptionsType } from './Time.state';
import * as styles from './Time.scss';
import * as sharedStyles from '../../../styles/shared.scss';

const SECS_IN_DAY = 86400;
export const rowStateReducer = ({ fromTime, toTime, format }: DateState): GenerationOptionsType => ({
	fromTime,
	toTime: fromTime > toTime ? toTime + SECS_IN_DAY : toTime,
	format
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
	const formats = [
		'h:mm aaa', // 3:35 pm
		'h:mm a', // 3:35 PM
		'h:mm aaaa', // 3:35 p.m.
		'h:mm:ss aaa', // 3:35:00 pm
		'h:mm:ss aa', // 3:35:00 PM
		'h:mm:ss aaaa', // 3:35:00 P.M.
		'H:mm', // 15:35
		'H:mm:ss' // 15:35:00
	];

	return formats.map((currFormat) => ({
		label: format(new Date(), currFormat),
		value: currFormat
	}));
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
	const onChange = (field: string, value: any): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	let toTimeError = '';
	if (data.fromTime > data.toTime) {
		toTimeError = i18n.endDateEarlierThanStartDate;
	}

	return (
		<div>
			<div className={styles.dateRow}>
				<TextField
					type="time"
					defaultValue={format(fromUnixTime(data.fromTime), 'HH:mm')}
					className={styles.field}
					InputLabelProps={{
						shrink: true
					}}
					inputProps={{ step: 60 }}
					onChange={(e: any): void => {
						const date = parse(e.target.value, 'HH:mm', new Date());
						onChange('fromTime', parseInt(format(date, 't'), 10));
					}}
				/>
				<ArrowRightAlt />
				<ErrorTooltip title={toTimeError} arrow disableHoverListener={!toTimeError} disableFocusListener={!toTimeError}>
					<TextField
						type="time"
						defaultValue={format(fromUnixTime(data.toTime), 'H:mm')}
						className={styles.field}
						InputLabelProps={{
							shrink: true
						}}
						inputProps={{ step: 60 }}
						onChange={(e: any): void => {
							const date = parse(e.target.value, 'HH:mm', new Date());
							onChange('toTime', parseInt(format(date, 't'), 10));
						}}
					/>
				</ErrorTooltip>
			</div>
			<div>
				<span className={styles.formatCodeLabel}>{i18n.formatCode}</span>
				<CoreTextField
					error={data.format ? '' : coreI18n.requiredField}
					value={data.format}
					style={{ width: 140 }}
					onChange={(e: any): void => onChange('format', e.target.value)}
					maxLength={255}
				/>
			</div>
		</div>
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

export const Help = ({ i18n, coreI18n }: DTHelpProps): JSX.Element => (
	<>
		<p dangerouslySetInnerHTML={{ __html: i18n.helpIntro }} />

		{generateRows(['h', 'H', 'mm', 'ss', 'a', 'aaa', 'aaaa'], i18n, coreI18n)}
	</>
);
