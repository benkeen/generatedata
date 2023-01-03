import { generate } from '../BitcoinAddress.generate';
import { BitcoinAddressFormat, BitcoinAddressState } from '../BitcoinAddress.state';
import { DTGenerationData } from "~types/dataTypes";

describe('generate', () => {
	it('generates', () => {
		const rowState: BitcoinAddressState = {
			[BitcoinAddressFormat.Legacy]: {
				enabled: true,
				weight: 1
			},
			[BitcoinAddressFormat.Compatibility]: {
				enabled: false,
				weight: 1
			},
			[BitcoinAddressFormat.Segwit]: {
				enabled: false,
				weight: 1
			}
		};
		const state = {
			rowState
		};
		expect(generate(state as unknown as DTGenerationData)).toEqual({ display: '' });
	});
});
