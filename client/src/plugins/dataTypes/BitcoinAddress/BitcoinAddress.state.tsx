export const enum BitcoinAddressFormat {
	Legacy = 'Legacy',
	Compatibility = 'Compatibility',
	Segwit = 'Segwit'
}

export type BitcoinAddressState = {
	[BitcoinAddressFormat.Legacy]: {
		enabled: boolean;
		weight: number;
	};
	[BitcoinAddressFormat.Compatibility]: {
		enabled: boolean;
		weight: number;
	};
	[BitcoinAddressFormat.Segwit]: {
		enabled: boolean;
		weight: number;
	};
}

export type GenerationOptionsType = BitcoinAddressState;

export const initialState: BitcoinAddressState = {
	[BitcoinAddressFormat.Legacy]: {
		enabled: true,
		weight: 1,
	},
	[BitcoinAddressFormat.Compatibility]: {
		enabled: true,
		weight: 1,
	},
	[BitcoinAddressFormat.Segwit]: {
		enabled: true,
		weight: 1,
	}
};
