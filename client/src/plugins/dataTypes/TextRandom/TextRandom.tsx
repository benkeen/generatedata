import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '~components/TextField';
import { DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import { getLipsumWords } from '~utils/stringUtils';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import RadioPill, { RadioPillRow } from '~components/pills/RadioPill';
import { TextSource, TextRandomState, GenerationOptionsType } from './TextRandom.state';
import styles from './TextRandom.scss';

const TextRandomDialog = ({
	 visible, data, id, onClose, onChangeFromStart, onUpdateSource, onUpdateCustomText, coreI18n, i18n
}: any): JSX.Element => {

	const getCustomTextField = (): JSX.Element | null => {
		if (data.textSource !== 'custom') {
			return null;
		}

		return (
			<textarea
				value={data.customText}
				placeholder={i18n.enterCustomText}
				className={styles.customText}
				onChange={onUpdateCustomText}
			/>
		);
	};

	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 500 }}>
				<DialogTitle onClose={onClose}>{i18n.selectTextSource}</DialogTitle>
				<DialogContent dividers>
					<div>
						{i18n.explanation}
					</div>

					<h3>{i18n.source}</h3>

					<RadioPillRow>
						<RadioPill
							label="Lorem ipsum"
							onClick={(): void => onUpdateSource('lipsum')}
							name={`${id}-source`}
							checked={data.textSource === 'lipsum'}
							tooltip={i18n.lipsumDesc}
						/>
						<RadioPill
							label={i18n.custom}
							onClick={(): void => onUpdateSource('custom')}
							name={`${id}-source`}
							checked={data.textSource === 'custom'}
							tooltip={i18n.customTextDesc}
						/>
					</RadioPillRow>
					{getCustomTextField()}
					<div>
						<input
							type="checkbox"
							id={`${id}-fromStart`}
							checked={data.fromStart}
							onChange={(e: any): void => onChangeFromStart(e.target.checked)}
						/>
						<label htmlFor={`${id}-fromStart`}>{i18n.fromStart}</label>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary" variant="outlined">{coreI18n.close}</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};


export const Options = ({ coreI18n, i18n, id, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const [dialogVisible, setDialogVisibility] = React.useState(false);

	const onChange = (field: string, value: string | boolean): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	const onUpdateSource = (textSource: TextSource): void => {
		onUpdate({
			...data,
			textSource
		});
	};

	const onUpdateCustomText = (e: React.FormEvent<HTMLTextAreaElement>): void => {
		onUpdate({
			...data,
			customText: e.currentTarget.value
		});
	};

	return (
		<>
			{i18n.generate}
			<TextField
				type="number"
				min="0"
				error={data.minWords ? '' : coreI18n.requiredField}
				id={`${id}-minWords`}
				style={{ width: 50, margin: '0 2px' }}
				value={data.minWords}
				onChange={(e: any): void => onChange('minWords', e.target.value)}
			/>
			{i18n.to}
			<TextField
				type="number"
				min="0"
				error={data.maxWords ? '' : coreI18n.requiredField}
				id={`${id}-maxWords`}
				style={{ width: 50, margin: '0 2px' }}
				value={data.maxWords}
				onChange={(e: any): void => onChange('maxWords', e.target.value)}
			/>
			<Button
				onClick={(): void => setDialogVisibility(true)}
				variant="outlined"
				color="primary"
				size="small">
				{i18n.words}
			</Button>
			<TextRandomDialog
				visible={dialogVisible}
				data={data}
				id={id}
				coreI18n={coreI18n}
				i18n={i18n}
				customText={data.customText}
				source={data.textSource}
				onChangeFromStart={(isChecked: boolean): void => onChange('fromStart', isChecked)}
				onUpdateSource={onUpdateSource}
				onUpdateCustomText={onUpdateCustomText}
				onClose={(): void => setDialogVisibility(false)}
			/>
		</>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => <p>{i18n.help}</p>;

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'string'
	},
	sql: {
		field: 'TEXT default NULL',
		field_Oracle: 'BLOB default NULL',
		field_MSSQL: 'VARCHAR(MAX) NULL'
	}
});

export const rowStateReducer = ({ fromStart, customText, textSource, minWords, maxWords }: TextRandomState): GenerationOptionsType => {
	const { words } = getLipsumWords();
	return {
		fromStart,
		minWords,
		maxWords,
		words: textSource === 'lipsum' ? words : customText.split(/\s+/)
	};
};
