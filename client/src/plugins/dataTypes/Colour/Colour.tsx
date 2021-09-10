import * as React from 'react';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import Dropdown, { DropdownOption } from '~components/dropdown/Dropdown';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import RadioPill, { RadioPillRow } from '~components/radioPills/RadioPill';
import rc from 'randomcolor';
import styles from './Colour.scss';

export const enum ColourFormat {
	hex = 'hex',
	rgb = 'rgb',
	rgba = 'rgba'
}

export const enum LuminosityType {
	any = 'any',
	bright = 'bright',
	light = 'light',
	dark = 'dark'
}

export type ColourState = {
	example: string;
	value: string;
	luminosity: LuminosityType;
	format: ColourFormat;
	alpha: number;
};

export const initialState: ColourState = {
	example: 'Yes|No',
	value: 'any',
	luminosity: LuminosityType.any,
	format: ColourFormat.hex,
	alpha: 1
};

const getOptions = ({ i18n }: any): DropdownOption[] => ([
	{ value: 'any', label: 'Any colour' },
	{ value: 'blue', label: 'Blue' },
	{ value: 'green', label: 'Green' },
	{ value: 'red', label: 'Red' },
	{ value: 'orange', label: 'Orange' },
	{ value: 'yellows', label: 'Yellow' },
	{ value: 'purple', label: 'Purple' },
	{ value: 'pink', label: 'Pink' },
	{ value: 'monochrome', label: 'Monochrome' }
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
			options={getOptions({ i18n })}
		/>
	);
};

const ColourDialog = ({ visible, data, id, onClose, coreI18n, onUpdate, i18n }: any): JSX.Element => {
	const [randomDemoColours, setRandomDemoColours] = React.useState<string[]>([]);

	React.useEffect(() => {
		setRandomDemoColours(rc({
			count: 30,
			hue: data.value,
			luminosity: data.luminosity,
			format: data.format,
			alpha: data.format === ColourFormat.rgba ? data.alpha : 1
		}));
	}, [data]);

	const onChange = (prop: string, value: any) => {
		onUpdate({
			...data,
			[prop]: value
		});
	};

	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 500 }}>
				<DialogTitle onClose={onClose}>Choose Colours</DialogTitle>
				<DialogContent dividers>
					<table className={styles.settings}>
						<tr>
							<td className={styles.labelCol}>Colour</td>
							<td>
								<Dropdown
									value={data.value}
									onChange={(i: any): void => onChange('value', i.value)}
									options={getOptions({ i18n })}
								/>
							</td>
						</tr>
						<tr>
							<td className={styles.labelCol}>
								Luminosity
							</td>
							<td>
								<RadioPillRow>
									<RadioPill
										label="Any"
										onClick={(): void => onChange('luminosity', LuminosityType.any)}
										name={`luminosity-${id}`}
										checked={data.luminosity === LuminosityType.any}
										style={{ marginRight: 6 }}
									/>
									<RadioPill
										label="Bright"
										onClick={(): void => onChange('luminosity', LuminosityType.bright)}
										name={`luminosity-${id}`}
										checked={data.luminosity === LuminosityType.bright}
										style={{ marginRight: 6 }}
									/>
									<RadioPill
										label="Light"
										onClick={(): void => onChange('luminosity', LuminosityType.light)}
										name={`luminosity-${id}`}
										checked={data.luminosity === LuminosityType.light}
										style={{ marginRight: 6 }}
									/>
									<RadioPill
										label="Dark"
										onClick={(): void => onChange('luminosity', LuminosityType.dark)}
										name={`luminosity-${id}`}
										checked={data.luminosity === LuminosityType.dark}
									/>
								</RadioPillRow>
							</td>
						</tr>
						<tr>
							<td className={styles.labelCol}>
								Format
							</td>
							<td>
								<RadioPillRow>
									<RadioPill
										label="Hex"
										onClick={(): void => onChange('format', ColourFormat.hex)}
										name={`format-${id}`}
										checked={data.format === ColourFormat.hex}
										style={{ marginRight: 6 }}
									/>
									<RadioPill
										label="rgb"
										onClick={(): void => onChange('format', ColourFormat.rgb)}
										name={`format-${id}`}
										checked={data.format === ColourFormat.rgb}
										style={{ marginRight: 6 }}
									/>
									<RadioPill
										label="rbga"
										onClick={(): void => onChange('format', ColourFormat.rgba)}
										name={`format-${id}`}
										checked={data.format === ColourFormat.rgba}
									/>
								</RadioPillRow>
							</td>
						</tr>
						<tr>
							<td className={styles.labelCol}>
								Alpha
							</td>
							<td>
								<Slider
									value={data.alpha}
									onChange={(e: any, value) => onChange('alpha', value)}
									step={0.001}
									min={0}
									max={1}
									valueLabelDisplay="auto"
									disabled={data.format !== ColourFormat.rgba}
								/>
							</td>
						</tr>
					</table>

					<ul className={styles.demoColours}>
						{randomDemoColours.map((colour: string, index: number) => (
							<li key={`${colour}-${index}`}><span style={{ backgroundColor: colour }} /></li>
						))}
					</ul>

				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary" variant="outlined">{coreI18n.close}</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export const Options = ({ id, i18n, coreI18n, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const [dialogVisible, setDialogVisibility] = React.useState(false);

	const options = getOptions({ i18n });
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
		...
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

// TODO
export const rowStateReducer = (state: ColourState): ColourState => state;
