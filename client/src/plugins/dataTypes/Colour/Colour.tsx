import * as React from 'react';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import rc from 'randomcolor';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import Dropdown, { DropdownOption } from '~components/dropdown/Dropdown';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import RadioPill, { RadioPillRow } from '~components/pills/RadioPill';
import { Tooltip } from '~components/tooltips';
import { ColourFormatEnum, ColourState, LuminosityTypeEnum, GenerationOptionsType } from './Colour.state';
import styles from './Colour.scss';

const getModalOptions = ({ i18n }: any): DropdownOption[] => ([
	{ value: 'any', label: i18n.anyColour },
	{ value: 'blue', label: i18n.blues },
	{ value: 'green', label: i18n.greens },
	{ value: 'red', label: i18n.reds },
	{ value: 'orange', label: i18n.oranges },
	{ value: 'yellow', label: i18n.yellows },
	{ value: 'purple', label: i18n.purples },
	{ value: 'pink', label: i18n.pinks },
	{ value: 'monochrome', label: i18n.monochromes }
]);

export const Example = ({ i18n, data, onUpdate }: DTExampleProps): JSX.Element => {
	const onChange = (value: any): void => {
		onUpdate({
			example: value,
			value: value
		});
	};

	return (
		<Dropdown
			value={data.example}
			onChange={(i: any): void => onChange(i.value)}
			options={getModalOptions({ i18n })}
		/>
	);
};

const ColourDialog = ({ visible, data, id, onClose, coreI18n, onUpdate, i18n }: any): JSX.Element => {
	const [randomDemoColours, setRandomDemoColours] = React.useState<string[]>([]);
	const [counter, setCounter] = React.useState(0);

	React.useEffect(() => {
		setRandomDemoColours(rc({
			count: 30,
			hue: data.value,
			luminosity: data.luminosity,
			format: data.format,
			alpha: data.format === ColourFormatEnum.rgba ? data.alpha : 1
		}));
	}, [data, counter]);

	const onChange = (prop: string, value: any): void => {
		onUpdate({
			...data,
			[prop]: value
		});
	};

	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 500 }}>
				<DialogTitle onClose={onClose}>{i18n.configureColours}</DialogTitle>
				<DialogContent dividers>
					<table className={styles.settings}>
						<tbody>
							<tr>
								<td className={styles.labelCol}>{i18n.colour}</td>
								<td>
									<Dropdown
										value={data.value}
										onChange={(i: any): void => onChange('value', i.value)}
										options={getModalOptions({ i18n })}
									/>
								</td>
							</tr>
							<tr>
								<td className={styles.labelCol}>
									{i18n.luminosity}
								</td>
								<td>
									<RadioPillRow>
										<RadioPill
											label={i18n.any}
											onClick={(): void => onChange('luminosity', LuminosityTypeEnum.any)}
											name={`luminosity-${id}`}
											checked={data.luminosity === LuminosityTypeEnum.any}
											style={{ marginRight: 6 }}
										/>
										<RadioPill
											label={i18n.bright}
											onClick={(): void => onChange('luminosity', LuminosityTypeEnum.bright)}
											name={`luminosity-${id}`}
											checked={data.luminosity === LuminosityTypeEnum.bright}
											style={{ marginRight: 6 }}
										/>
										<RadioPill
											label={i18n.light}
											onClick={(): void => onChange('luminosity', LuminosityTypeEnum.light)}
											name={`luminosity-${id}`}
											checked={data.luminosity === LuminosityTypeEnum.light}
											style={{ marginRight: 6 }}
										/>
										<RadioPill
											label={i18n.dark}
											onClick={(): void => onChange('luminosity', LuminosityTypeEnum.dark)}
											name={`luminosity-${id}`}
											checked={data.luminosity === LuminosityTypeEnum.dark}
										/>
									</RadioPillRow>
								</td>
							</tr>
							<tr>
								<td className={styles.labelCol}>{i18n.format}</td>
								<td>
									<RadioPillRow>
										<RadioPill
											label="Hex"
											onClick={(): void => onChange('format', ColourFormatEnum.hex)}
											name={`format-${id}`}
											checked={data.format === ColourFormatEnum.hex}
											style={{ marginRight: 6 }}
										/>
										<RadioPill
											label="rgb"
											onClick={(): void => onChange('format', ColourFormatEnum.rgb)}
											name={`format-${id}`}
											checked={data.format === ColourFormatEnum.rgb}
											style={{ marginRight: 6 }}
										/>
										<RadioPill
											label="rbga"
											onClick={(): void => onChange('format', ColourFormatEnum.rgba)}
											name={`format-${id}`}
											checked={data.format === ColourFormatEnum.rgba}
										/>
									</RadioPillRow>
								</td>
							</tr>
							<tr>
								<td className={styles.labelCol}>{i18n.alpha}</td>
								<td>
									<Slider
										value={data.alpha}
										onChange={(e: any, value): void => onChange('alpha', value)}
										step={0.001}
										min={0}
										max={1}
										valueLabelDisplay="auto"
										disabled={data.format !== ColourFormatEnum.rgba}
									/>
								</td>
							</tr>
						</tbody>
					</table>

					<ul className={styles.demoColours}>
						{randomDemoColours.map((colour: string, index: number): JSX.Element => (
							<li key={`${colour}-${index}`}>
								<Tooltip title={colour}>
									<span style={{ backgroundColor: colour }} />
								</Tooltip>
							</li>
						))}
					</ul>
				</DialogContent>
				<DialogActions>
					<Button onClick={(): void => setCounter(counter+1)} color="primary" variant="outlined">
						{i18n.refresh}
					</Button>
					<Button onClick={onClose} color="primary" variant="outlined">{coreI18n.close}</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export const Options = ({ id, i18n, coreI18n, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const [dialogVisible, setDialogVisibility] = React.useState(false);

	const options = getModalOptions({ i18n });
	let buttonLabel = '';

	options.forEach(({ value, label }) => {
		if (data.value === value) {
			buttonLabel = label;
		}
	});

	return (
		<div className={styles.buttonLabel}>
			<Button
				onClick={(): void => setDialogVisibility(true)}
				variant="outlined"
				color="primary"
				size="small">
				<span dangerouslySetInnerHTML={{ __html: buttonLabel }}/>
			</Button>
			<ColourDialog
				visible={dialogVisible}
				data={data}
				id={id}
				coreI18n={coreI18n}
				i18n={i18n}
				onClose={(): void => setDialogVisibility(false)}
				onUpdate={onUpdate}
			/>
		</div>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.helpDesc1}
		</p>
		<p>
			{i18n.helpDesc2}
		</p>
	</>
);

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'string'
	},
	sql: {
		field: 'string(12) default NULL',
		field_Oracle: 'varchar2(12) default NULL',
		field_MSSQL: 'VARCHAR(12) NULL'
	}
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const rowStateReducer = ({ example, ...other }: ColourState): GenerationOptionsType => other;
