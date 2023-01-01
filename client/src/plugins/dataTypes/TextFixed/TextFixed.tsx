import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '~components/TextField';
import { getLipsumWords } from '~utils/stringUtils';
import { DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import RadioPill, { RadioPillRow } from '~components/pills/RadioPill';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import { TextSource, TextFixedState, GenerationOptionsType } from './TextFixed.state';
import styles from './TextFixed.scss';

const TextFieldDialog = ({
	visible, data, id, onClose, onUpdateSource, onUpdateCustomText, coreI18n, i18n
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

	const onUpdateSource = (textSource: TextSource): void => {
		onUpdate({
			...data,
			textSource
		});
	};

	const onUpdateNumWords = (e: React.ChangeEvent<HTMLInputElement>): void => {
		onUpdate({
			...data,
			numWords: parseInt(e.target.value, 10)
		});
	};

	const onUpdateCustomText = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		onUpdate({
			...data,
			customText: e.target.value
		});
	};

	return (
		<>
			{i18n.TextFixed_generate}
			<TextField
				error={data.numWords ? '' : coreI18n.requiredField}
				type="number"
				min="0"
				style={{ width: 50, margin: '0 2px' }}
				value={data.numWords}
				onChange={onUpdateNumWords}
			/>
			<Button
				onClick={(): void => setDialogVisibility(true)}
				variant="outlined"
				color="primary"
				size="small">
				{i18n.TextFixed_words}
			</Button>
			<TextFieldDialog
				visible={dialogVisible}
				data={data}
				id={id}
				coreI18n={coreI18n}
				i18n={i18n}
				onUpdateSource={onUpdateSource}
				onUpdateCustomText={onUpdateCustomText}
				onClose={(): void => setDialogVisibility(false)}
			/>
		</>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => <p>{i18n.TextFixed_help}</p>;

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

export const rowStateReducer = ({ customText, textSource, numWords }: TextFixedState): GenerationOptionsType => {
	const { words } = getLipsumWords();
	return {
		words: textSource === 'lipsum' ? words : customText.split(/\s+/),
		numWordsToGenerate: numWords
	};
};
