import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import Dropdown, { DropdownOption } from '~components/dropdown/Dropdown';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import CreatablePillField from '~components/creatablePillField/CreatablePillField';
import { cloneObj } from '~utils/generalUtils';
import { toSentenceCase } from '~utils/stringUtils';
import { getI18nString } from '~utils/langUtils';
import { PanState, GenerationOptionsType } from './PAN.state';
import { creditCardFormats, CreditCardFormatType, CreditCardType, creditCardTypes } from './formats';
import styles from './PAN.scss';

export const getCreditCardOptions = (formats: string[], i18n: any): DropdownOption[] => (
	formats.map((format) => ({
		value: format,
		label: i18n[format]
	}))
);

export const Example = ({ i18n, data, onUpdate }: DTExampleProps): React.ReactNode => {
	const onChange = (value: string): void => {
		const newData: Partial<PanState> = {
			...data,
			example: value
		};

		if (value === 'any') {
			newData.cardTypes = creditCardTypes;
			newData.cardFormats = cloneObj(creditCardFormats);
		} else if (value === 'visa_mastercard') {
			newData.cardTypes = [CreditCardType.visa, CreditCardType.mastercard];
			newData.cardFormats = {
				[CreditCardType.visa as string]: creditCardFormats[CreditCardType.visa],
				[CreditCardType.mastercard as string]: creditCardFormats[CreditCardType.mastercard]
			};
		} else if (value === 'visa_mastercard_amex') {
			newData.cardTypes = [CreditCardType.visa, CreditCardType.mastercard, CreditCardType.amex];
			newData.cardFormats = {
				[CreditCardType.visa as string]: creditCardFormats[CreditCardType.visa],
				[CreditCardType.mastercard as string]: creditCardFormats[CreditCardType.mastercard],
				[CreditCardType.amex as string]: creditCardFormats[CreditCardType.amex]
			};
		} else {
			newData.cardTypes = [value as CreditCardType];
			newData.cardFormats = {
				[value]: creditCardFormats[value as CreditCardType]
			};
		}
		onUpdate(newData);
	};

	const options = [
		{
			label: i18n.multipleCards,
			options: [
				{ value: 'any', label: i18n.anyCard },
				{ value: 'visa_mastercard', label: i18n.visaMastercard },
				{ value: 'visa_mastercard_amex', label: i18n.visaMastercardAmex },
			]
		},
		{
			label: i18n.specificCards,
			options: getCreditCardOptions(creditCardTypes, i18n)
		}
	];

	return (
		<Dropdown
			isGrouped={true}
			value={data.example}
			onChange={(i: any): void => onChange(i.value)}
			options={options}
		/>
	);
};

const validFormat = (cardType: CreditCardType, format: string, allFormats: CreditCardFormatType): boolean => {
	const validNumChars = allFormats[cardType]!.validNumChars;
	const numChars = format.replace(/[^X]/gi, '').length;
	return validNumChars.indexOf(numChars) !== -1;
};

const PANDialog = ({ visible, data, onClose, onUpdateSelectedCards, onUpdateCardFormats, coreI18n, i18n }: any): JSX.Element => {
	const [selectedCard, setSelectedCard] = useState<CreditCardType | null>(null);
	const [formatError, setFormatError] = useState('');

	useEffect(() => {
		if (data.cardTypes.indexOf(selectedCard) === -1) {
			const firstCard = data.cardTypes[0] as CreditCardType;
			setSelectedCard(firstCard);
		}
	}, [data.cardTypes.length]);

	const updateFormats = (formats: string[]): void => {
		setFormatError('');
		const uppercaseFormats = formats.map((format) => format.replace(/x/g, 'X'));
		onUpdateCardFormats(selectedCard, uppercaseFormats);
	};

	const validateFormat = (format: string): boolean => {
		const isValid = validFormat(selectedCard as CreditCardType, format, creditCardFormats);
		if (!isValid) {
			setFormatError(i18n.invalidNewFormat);
		}
		return isValid;
	};

	const selectCreditCard = (creditCard: CreditCardType): void => {
		setSelectedCard(creditCard);
	};

	const getFormatDesc = (creditCard: CreditCardType | null): JSX.Element | null => {
		if (!creditCard) {
			return null;
		}

		const validLengths = creditCardFormats[creditCard]!.validNumChars;
		const i18nKey = (validLengths.length === 1) ? i18n.validCardNumberSingleLength : i18n.validCardNumberMultipleLengths;

		const text = getI18nString(i18nKey, [
			`<b>${i18n[creditCard]}</b>`,
			validLengths.map((length, index) => `<b key=${index}>${length}</b>`).join(', ')
		]);

		return (
			<div className={styles.validLengthsTip} dangerouslySetInnerHTML={{ __html: text }} />
		);
	};

	const getFormatError = (): JSX.Element | null => {
		if (!formatError) {
			return null;
		}
		return (
			<div className={styles.error}>{formatError}</div>
		);
	};

	const getFormatsSection = (): JSX.Element => {
		if (!data.cardTypes.length) {
			return (
				<div className={styles.noCreditCards}>{i18n.noCreditCards}</div>
			);
		}

		return (
			<>
				<div style={{ marginBottom: 6 }}>
					<Dropdown
						value={selectedCard}
						options={getCreditCardOptions(data.cardTypes, i18n)}
						onChange={({ value }: { value: CreditCardType }): void => selectCreditCard(value)}
					/>
				</div>

				{getFormatDesc(selectedCard)}
				{getFormatError()}

				<CreatablePillField
					value={selectedCard && data.cardFormats[selectedCard] ? data.cardFormats[selectedCard].formats : []}
					onChange={(formats: string[]): void => updateFormats(formats)}
					placeholder={i18n.enterFormats}
					onValidateNewItem={(newFormat: string): boolean => validateFormat(newFormat)}
				/>
			</>
		);
	};

	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 500 }}>
				<DialogTitle onClose={onClose}>{i18n.selectCreditCards}</DialogTitle>
				<DialogContent dividers>
					<div style={{ marginBottom: 16 }}>
						<h3>{toSentenceCase(i18n.creditCards)}</h3>
						<Dropdown
							isMulti
							value={data.cardTypes}
							options={getCreditCardOptions(creditCardTypes, i18n)}
							closeMenuOnSelect={false}
							onChange={(formats: any): void => {
								onUpdateSelectedCards(formats ? formats.map(({ value }: DropdownOption) => value) : []);
							}}
						/>
					</div>

					<h3>{i18n.formats}</h3>
					<p>
						{i18n.formatsDesc}
					</p>

					{getFormatsSection()}
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary" variant="outlined">{coreI18n.close}</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export const Options = ({ data, i18n, coreI18n, onUpdate }: DTOptionsProps): React.ReactNode => {
	const [dialogVisible, setDialogVisibility] = React.useState(false);
	const numSelected = data.cardTypes.length;

	const onUpdateSelectedCards = (cardTypes: CreditCardType[]): void => {
		const cardFormats: CreditCardFormatType = {};
		cardTypes.forEach((cardType) => {
			if (data.cardFormats[cardType]) {
				cardFormats[cardType] = data.cardFormats[cardType];
			} else {
				cardFormats[cardType] = creditCardFormats[cardType];
			}
		});

		onUpdate({
			...data,
			cardTypes,
			cardFormats
		});
	};

	const onUpdateCardFormats = (cardType: CreditCardType, formats: string[]): void => {
		onUpdate({
			...data,
			cardFormats: {
				...data.cardFormats,
				[cardType]: {
					...data.cardFormats[cardType],
					formats
				}
			}
		});
	};

	const label = `<b>${numSelected}</b> ` + ((numSelected === 1) ? i18n.creditCard : i18n.creditCards);

	return (
		<div className={styles.buttonLabel}>
			<Button
				onClick={(): void => setDialogVisibility(true)}
				variant="outlined"
				color="primary"
				size="small">
				<span dangerouslySetInnerHTML={{ __html: label }}/>
			</Button>
			<PANDialog
				visible={dialogVisible}
				data={data}
				i18n={i18n}
				coreI18n={coreI18n}
				onUpdateSelectedCards={onUpdateSelectedCards}
				onUpdateCardFormats={onUpdateCardFormats}
				onClose={(): void => setDialogVisibility(false)}
			/>
		</div>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.help1}
		</p>
		<p>
			{i18n.help2}
		</p>
	</>
);

export const rowStateReducer = ({ cardFormats, example }: PanState): GenerationOptionsType => ({
	cardFormats,
	ccCard: example as CreditCardType
});

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'string',
	},
	sql: {
		field: 'varchar(255)',
		field_Oracle: 'varchar2(255)',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});

