export type BitcoinAddressFormat = 'Legacy' | 'Compatibility' | 'Segwit';

export type BitcoinAddressState = {
  [key in BitcoinAddressFormat]: {
    enabled: boolean;
    weight: number;
  };
};

export type GenerationOptionsType = BitcoinAddressState;

export const initialState: BitcoinAddressState = {
  Legacy: {
    enabled: true,
    weight: 1
  },
  Compatibility: {
    enabled: true,
    weight: 1
  },
  Segwit: {
    enabled: true,
    weight: 1
  }
};
