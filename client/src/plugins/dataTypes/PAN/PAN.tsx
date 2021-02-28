import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { DTExampleProps, DTHelpProps, DTOptionsProps } from '~types/dataTypes';
import Dropdown, { DropdownOption } from '~components/dropdown/Dropdown';
import { creditCardFormats, CreditCardType, creditCardTypes } from './formats';
import { cloneObj } from '~utils/generalUtils';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import styles from './PAN.scss';
import { toSentenceCase } from '~utils/stringUtils';
import CreatablePillField from '~components/creatablePillField/CreatablePillField';

export type PanState = {
	example: string;
	cardTypes: CreditCardType[];
	cardFormats: {
		[key in CreditCardType]?: string[];
	};
};

export const initialState: PanState = {
	example: 'any',
	cardTypes: creditCardTypes,
	cardFormats: cloneObj(creditCardFormats)
};

export const getCreditCardOptions = (formats: string[], i18n: any): DropdownOption[] => {
	return formats.map((format) => ({
		value: format,
		label: i18n[format]
	}));
};

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

const PANDialog = ({ visible, data, onClose, onUpdateSelectedCards, coreI18n, i18n }: any): JSX.Element => {
	const [selectedCard, setSelectedCard] = useState<CreditCardType | null>(null);
	const [selectedCardFormats, setSelectedCardFormats] = useState<string[]>([]);

	useEffect(() => {
		if (data.cardTypes.indexOf(selectedCard) === -1) {
			const firstCard = data.cardTypes[0] as CreditCardType;
			setSelectedCard(firstCard);
			setSelectedCardFormats(creditCardFormats[firstCard].formats);
		}
	}, [data.cardTypes.length]);

	const updateFormats = (formats: string[]) => {

	};

	const selectCreditCard = (creditCard: CreditCardType): void => {
		setSelectedCard(creditCard);
		setSelectedCardFormats(creditCardFormats[creditCard].formats);
	};

	let formatDesc = '';
	if (i18n[selectedCard as string]) {
		formatDesc = i18n[selectedCard as string];
	}

	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 500 }}>
				<DialogTitle onClose={onClose}>Select credit cards</DialogTitle>
				<DialogContent dividers>

					<div style={{ marginBottom: 16 }}>
						<h3>{toSentenceCase(i18n.creditCards)}</h3>

						<Dropdown
							isMulti
							value={data.cardTypes}
							options={getCreditCardOptions(creditCardTypes, i18n)}
							closeMenuOnSelect={false}
							onChange={(formats: any): void => {
								onUpdateSelectedCards(formats.map(({ value }: DropdownOption) => value));
							}}
						/>
					</div>

					<h3>{i18n.formats}</h3>
					<p>
						This lets you customize the <i>formats</i> of each credit card you have selected above. You
						can add your own formats, using whatever character delimiter you like - as long as the number
						of "X"s (automatically converted to numbers) you enter is valid for that credit card type.
					</p>

					<div style={{ marginBottom: 6 }}>
						<Dropdown
							value={selectedCard}
							options={getCreditCardOptions(data.cardTypes, i18n)}
							onChange={({ value }: { value: CreditCardType }) => selectCreditCard(value)}
						/>
					</div>

					{formatDesc}

					<CreatablePillField
						value={selectedCardFormats}
						onChange={(formats: string[]) => updateFormats(formats)}
						placeholder="Enter credit card formats"
						error=""
					/>

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
		onUpdate({
			...data,
			cardTypes
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
				onClose={(): void => setDialogVisibility(false)}
			/>
		</div>
	);
};

export const Help = ({ }: DTHelpProps): JSX.Element => (
	<>
		<p>
			This generates valid credit card PANs (Primary Access Numbers) for most of the major credit cards.
			By default, it'll generate credit card numbers from any supported type (Visa, Mastercard, American Express
			and others), but you have the option to limit the list to whichever you want.
		</p>

		<p>
			In addition, you can customize the format of the generated number (e.g. supply a custom character delimiter).
			For that, you would enter a string of X's in the custom format field, with whatever other characters you
			want, then click enter. The field will validate that you've entered a valid number of X's: different credit
			cards have different valid character lengths.
		</p>
	</>
);


// var _validate = function(rows) {
// 	var cardTypeProblemVisibleRows = [];
// 	var cardTypeProblemFields      = [];
// 	var cardFormatProblemVisibleRows = [];
// 	var cardFormatProblemFields      = [];
// 	var randCardSelectProblemVisibleRows = [];
// 	var randCardSelectProblemFields      = [];
//
// 	for (var i=0; i<rows.length; i++) {
//
// 		// check if the examples dropdown (card type) isn't blank
// 		var $exampleField = $("#dtExample_" + rows[i]);
// 		if ($exampleField.val() === "") {
// 			cardTypeProblemVisibleRows.push(generator.getVisibleRowOrderByRowNum(rows[i]));
// 			cardTypeProblemFields.push($exampleField);
// 		}
//
// 		// check if card format is proper
// 		var format = $("#dtOption_" + rows[i]).val();
// 		if (format.match(/[^X\s]/g)) {
// 			cardFormatProblemVisibleRows.push(generator.getVisibleRowOrderByRowNum(rows[i]));
// 			cardFormatProblemFields.push($("#dtOption_" + rows[i]));
// 		}
//
// 		// check if random card is selected then at least one type should be selected
// 		if ($exampleField.val() === "rand_card") {
// 			var selected = $("#dtOptionPAN_randomCardFormat_" + rows[i]).val();
// 			if (selected === null) {
// 				randCardSelectProblemVisibleRows.push(generator.getVisibleRowOrderByRowNum(rows[i]));
// 				randCardSelectProblemFields.push($("#dtOptionPAN_randomCardFormat_" + rows[i]));
// 			}
// 		}
// 	}
//
// 	return errors;
// };
