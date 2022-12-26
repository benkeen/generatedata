import { generate } from '../BitcoinAddress.worker';
import { BitcoinAddressFormat, BitcoinAddressState } from '../BitcoinAddress';

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
		expect(generate(state)).toEqual('123'); // won't work yet. Just testing
	});
});
