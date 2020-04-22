import * as React from 'react';
import { format, subYears, addYears, fromUnixTime } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Dropdown from '../../../components/dropdown/Dropdown';
import Event from '@material-ui/icons/Event';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import { DTExampleProps, DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';
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
	example: '',
	format: 'MMM L, y'
};

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

export const Example = ({ data, onUpdate }: DTExampleProps): JSX.Element => {
	const onChange = ({ value }: { value: string }): void => {
		onUpdate({
			...data,
			example: value,
			format: value
		});
	};

	return (
		<Dropdown
			placeholder="Date format"
			value={data.example}
			options={getOptions()}
			onChange={onChange}
		/>
	);
};

export const Options = ({ data, onUpdate, i18n }: DTOptionsProps): JSX.Element => {
	const [isOpen, setOpen] = React.useState(false);
	const [selectedDatePicker, setDatePicker] = React.useState('fromDate'); // fromDate / toDate
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

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<div>
				<div className={styles.dateRow}>
					<Button onClick={(): void => onBtnClick('fromDate')} variant="outlined" disableElevation
						style={{ padding: '4px 6px' }}>
						<span style={{ marginRight: 3 }}>
							{format(fromUnixTime(data.fromDate), 'MMM d, y')}
						</span>
						<Event />
					</Button>
					<ArrowRightAlt />
					<Button onClick={(): void => onBtnClick('toDate')} variant="outlined" disableElevation
						style={{ padding: '4px 6px' }}>
						<span style={{ marginRight: 3 }}>
							{format(fromUnixTime(data.toDate), 'MMM d, y')}
						</span>
						<Event />
					</Button>
				</div>
				<div>
					<span className={styles.formatCodeLabel}>{i18n.format_code}</span>
					<input type="text" value={data.format} style={{ width: 140 }}
						onChange={(e): void => onChange('format', e.target.value)}
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

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.help_intro}
		</p>

		<h3>{i18n.day}</h3>

		<div className={styles.row}>
			<div className={styles.col1}>
				<label>d</label>
			</div>
			<div className={styles.col2}>
				{i18n.help_d}
			</div>
			<div className={styles.col3}>
				{i18n.help_d_example}
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>D</label>
			</div>
			<div className={styles.col2}>
				{i18n.help_D}
			</div>
			<div className={styles.col3}>
				{i18n.help_D_example}
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>j</label>
			</div>
			<div className={styles.col2}>
				{i18n.help_j}
			</div>
			<div className={styles.col3}>
				{i18n.help_j_example}
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>l</label>
			</div>
			<div className={styles.col2}>
				{i18n.help_l}
			</div>
			<div className={styles.col3}>
				{i18n.help_l_example}
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>S</label>
			</div>
			<div className={styles.col2}>
				{i18n.help_S}
			</div>
			<div className={styles.col3}>
				{i18n.help_S_example}
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>w</label>
			</div>
			<div className={styles.col2}>
				{i18n.help_w}
			</div>
			<div className={styles.col3}>
				{i18n.help_w_example}
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>z</label>
			</div>
			<div className={styles.col2}>
				{i18n.help_z}
			</div>
			<div className={styles.col3}>
				{i18n.help_z_example}
			</div>
		</div>

		<h3>{i18n.week}</h3>

		<div className={styles.row}>
			<div className={styles.col1}>
				<label>W</label>
			</div>
			<div className={styles.col2}>
				{i18n.help_W}
			</div>
			<div className={styles.col3}>
				{i18n.help_W_example}
			</div>
		</div>

		<h3>{i18n.month}</h3>

		<div className={styles.row}>
			<div className={styles.col1}>
				<label>F</label>
			</div>
			<div className={styles.col2}>
				{i18n.help_F}
			</div>
			<div className={styles.col3}>
				{i18n.help_F_example}
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>m</label>
			</div>
			<div className={styles.col2}>
				{i18n.help_m}
			</div>
			<div className={styles.col3}>
				{i18n.help_m_example}
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>M</label>
			</div>
			<div className={styles.col2}>
				{i18n.help_M}
			</div>
			<div className={styles.col3}>
				{i18n.help_M_example}
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>n</label>
			</div>
			<div className={styles.col2}>
				{i18n.help_n}
			</div>
			<div className={styles.col3}>
				{i18n.help_n_example}
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>t</label>
			</div>
			<div className={styles.col2}>
				{i18n.help_t}
			</div>
			<div className={styles.col3}>
				{i18n.help_t_example}
			</div>
		</div>

		<h3>{i18n.year}</h3>

		<div className={styles.row}>
			<div className={styles.col1}>
				<label>L</label>
			</div>
			<div className={styles.col2}>
				{i18n.help_L}
			</div>
			<div className={styles.col3}>
				{i18n.help_L_example}
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>Y</label>
			</div>
			<div className={styles.col2}>
				{i18n.help_Y}
			</div>
			<div className={styles.col3}>
				{i18n.help_Y_example}
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.col1}>
				<label>y</label>
			</div>
			<div className={styles.col2}>
				{i18n.help_y}
			</div>
			<div className={styles.col3}>
				{i18n.help_y_example}
			</div>
		</div>
	</>
);


// var _validate = function (rows) {
// 	var visibleProblemRows = [];
// 	var problemFields = [];
// 	for (var i = 0; i < rows.length; i++) {
// 		if ($("#dtOption_" + rows[i]).val() === "") {
// 			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
// 			visibleProblemRows.push(visibleRowNum);
// 			problemFields.push($("#dtOption_" + rows[i]));
// 		}
// 	}
// 	var errors = [];
// 	if (visibleProblemRows.length) {
// 		errors.push({
// 			els: problemFields,
// 			error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"
// 		});
// 	}
// 	return errors;
// };
