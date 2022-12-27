import { generate } from '../BitcoinAddress.generate';
// import utils from '../../../../utils';
import { BitcoinAddressFormat, BitcoinAddressState } from '../BitcoinAddress';
import { DTGenerationData } from "~types/dataTypes";

describe('generate', () => {
	it('generates', () => {
		const state: BitcoinAddressState = {
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
			},
		};
		expect(generate(state as unknown as DTGenerationData)).toEqual('123'); // won't work yet. Just testing
	});
});
