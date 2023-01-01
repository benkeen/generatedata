import { BitcoinAddressFormat } from './BitcoinAddress.state';
// import { WorkerUtils } from '~utils/workerUtils';
import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';
// import { BitcoinAddressFormat, BitcoinAddressState } from './BitcoinAddress';
// import ECPairFactory from 'ecpair';
// import * as ecc from 'tiny-secp256k1';
// import { payments } from 'bitcoinjs-lib';

// const ECPair = ECPairFactory(ecc);

export const generate = ({ rowState }: DTGenerationData): DTGenerateResult => { // utils: WorkerUtils
	const formats: any = {};
	if (rowState[BitcoinAddressFormat.Legacy].enabled && rowState[BitcoinAddressFormat.Legacy].weight) {
		formats[BitcoinAddressFormat.Legacy] = rowState[BitcoinAddressFormat.Legacy].weight;
	}
	if (rowState[BitcoinAddressFormat.Compatibility].enabled && rowState[BitcoinAddressFormat.Compatibility].weight) {
		formats[BitcoinAddressFormat.Compatibility] = rowState[BitcoinAddressFormat.Compatibility].weight;
	}
	if (rowState[BitcoinAddressFormat.Segwit].enabled && rowState[BitcoinAddressFormat.Segwit].weight) {
		formats[BitcoinAddressFormat.Segwit] = rowState[BitcoinAddressFormat.Segwit].weight;
	}

	// get a random format
	// const format = utils.randomUtils.getRandomWeightedValue(formats);

	// let display;
	// switch (format) {
	// 	// Nope! actual generation needs to be better than this. Will put this on hold.
	//
	// 	// case BitcoinAddressFormat.Legacy: {
	// 	// 	const length = utils.randomUtils.getRandomNum(25, 35);
	// 	// 	display = utils.randomUtils.generateRandomAlphanumericStr('1' + ('x'.repeat(length)), placeholders);
	// 	// 	break;
	// 	// }
	// 	// case BitcoinAddressFormat.Compatibility: {
	// 	// 	const length = utils.randomUtils.getRandomNum(25, 35);
	// 	// 	display = utils.randomUtils.generateRandomAlphanumericStr('3' + ('x'.repeat(length)), placeholders);
	// 	// 	break;
	// 	// }
	// 	// case BitcoinAddressFormat.Segwit:
	// 	// 	display = utils.randomUtils.generateRandomAlphanumericStr('bc1' + ('y'.repeat(39)), placeholders);
	// 	// 	break;
	// }

	return { display: '' };
	// const keyPair = ECPair.makeRandom();
	// const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
	// return address;
};
