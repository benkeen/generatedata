import { DTGenerationData } from '../../../';
import { generate } from '../BitcoinAddress.generate';
import { BitcoinAddressState } from '../BitcoinAddress.state';

describe('generate', () => {
  it('generates', () => {
    const rowState: BitcoinAddressState = {
      Legacy: {
        enabled: true,
        weight: 1
      },
      Compatibility: {
        enabled: false,
        weight: 1
      },
      Segwit: {
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
