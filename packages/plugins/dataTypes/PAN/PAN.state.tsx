import { creditCardFormats, CreditCardFormatType, CreditCardType, creditCardTypes } from './formats';
import { cloneObj } from '~utils/generalUtils';

export type PanState = {
	example: string;
	cardTypes: CreditCardType[];
	cardFormats: CreditCardFormatType;
};

export type GenerationOptionsType = {
	cardFormats: CreditCardFormatType;
	ccCard: CreditCardType | 'any';
}

export const defaultGenerationOptions = {
	cardFormats: Object.values(CreditCardType),
	ccCard: 'any'
};

export const initialState: PanState = {
	example: 'any',
	cardTypes: creditCardTypes,
	cardFormats: cloneObj(creditCardFormats)
};
