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
					<Button onClick={(): void => onBtnClick('fromDate')} variant="outlined" disableElevation>
						{format(fromUnixTime(data.fromDate), 'MMM d, y')}
						<Event />
					</Button>
					<ArrowRightAlt />
					<Button onClick={(): void => onBtnClick('toDate')} variant="outlined" disableElevation>
						{format(fromUnixTime(data.toDate), 'MMM d, y')}
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

		<table cellPadding="0" cellSpacing="1">
			<tr>
				<td><h2>{i18n.char}</h2></td>
				<td><h2>{i18n.description}</h2></td>
				<td><h2>{i18n.example}</h2></td>
			</tr>
		</table>

		<hr />

		<h3 className="gdSubtitle">{i18n.day}</h3>
		<hr />

		<table cellPadding="0" cellSpacing="1">
			<tr>
				<td><h4>d</h4></td>
				<td>{i18n.help_d}</td>
				<td>{i18n.help_d_example}</td>
			</tr>
			<tr>
				<td><h4>D</h4></td>
				<td>{i18n.help_D}</td>
				<td>{i18n.help_D_example}</td>
			</tr>
			<tr>
				<td><h4>j</h4></td>
				<td>{i18n.help_j}</td>
				<td>{i18n.help_j_example}</td>
			</tr>
			<tr>
				<td><h4>l</h4></td>
				<td>{i18n.help_l}</td>
				<td>{i18n.help_l_example}</td>
			</tr>
			<tr>
				<td valign="top"><h4>S</h4></td>
				<td>{i18n.help_S}</td>
				<td valign="top">{i18n.help_S_example}</td>
			</tr>
			<tr>
				<td valign="top"><h4>w</h4></td>
				<td valign="top">{i18n.help_w}</td>
				<td valign="top">{i18n.help_w_example}</td>
			</tr>
			<tr>
				<td><h4>z</h4></td>
				<td>{i18n.help_z}</td>
				<td>{i18n.help_z_example}</td>
			</tr>
		</table>

		<h3 className="gdSubtitle">{i18n.week}</h3>
		<hr />

		<table cellPadding="0" cellSpacing="1">
			<tr>
				<td valign="top"><h4>W</h4></td>
				<td valign="top">{i18n.help_W}</td>
				<td valign="top">{i18n.help_W_example}</td>
			</tr>
		</table>

		<h3 className="gdSubtitle">{i18n.month}</h3>
		<hr />

		<table cellPadding="0" cellSpacing="1">
			<tr>
				<td valign="top"><h4>F</h4></td>
				<td>{i18n.help_F}</td>
				<td valign="top">{i18n.help_F_example}</td>
			</tr>
			<tr>
				<td><h4>m</h4></td>
				<td>{i18n.help_m}</td>
				<td>{i18n.help_m_example}</td>
			</tr>
			<tr>
				<td><h4>M</h4></td>
				<td>{i18n.help_M}</td>
				<td>{i18n.help_M_example}</td>
			</tr>
			<tr>
				<td valign="top"><h4>n</h4></td>
				<td>{i18n.help_n}</td>
				<td valign="top">{i18n.help_n_example}</td>
			</tr>
			<tr>
				<td><h4>t</h4></td>
				<td>{i18n.help_t}</td>
				<td>{i18n.help_t_example}</td>
			</tr>
		</table>

		<h3 className="gdSubtitle">{i18n.year}</h3>
		<hr />

		<table cellPadding="0" cellSpacing="1">
			<tr>
				<td><h4>L</h4></td>
				<td>{i18n.help_L}</td>
				<td>{i18n.help_L_example}</td>
			</tr>
			<tr>
				<td><h4>Y</h4></td>
				<td>{i18n.help_Y}</td>
				<td>{i18n.help_Y_example}</td>
			</tr>
			<tr>
				<td><h4>y</h4></td>
				<td>{i18n.help_y}</td>
				<td>{i18n.help_y_example}</td>
			</tr>
		</table>
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
