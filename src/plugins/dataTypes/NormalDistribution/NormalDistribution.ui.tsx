import * as React from 'react';
import { DTOptionsProps } from '~types/dataTypes';

type NormalDistributionState = {
	mean: string;
	sigma: string;
	precision: number;
};

export const initialState: NormalDistributionState = {
	mean: '',
	sigma: '',
	precision: 10
};

export const Options = ({ i18n, id, data }: DTOptionsProps): JSX.Element => (
	<>
		<label htmlFor={`${id}-mean`}>{i18n.mean}</label>
		<input type="text" id={`${id}-mean`} style={{ width: 25 }} value={data.mean} />
		<label htmlFor={`${id}-sigma`}>{i18n.standard_deviation}</label>
		<input type="text" id={`${id}-sigma`} style={{ width: 25 }} value={data.sigma} />
		<label htmlFor={`${id}-precision`} title="Number of decimal places.">{i18n.precision}</label>
		<input type="text" id={`${id}-precision`} style={{ width: 25 }} value={data.precision} />
	</>
);
