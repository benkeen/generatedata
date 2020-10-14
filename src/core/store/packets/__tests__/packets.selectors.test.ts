import { getNewPacket, initialState as initialPacketState, PacketsState } from '../packets.reducer';
import * as selectors from '../packets.selectors';
import { getInitialState } from '../../generator/generator.reducer';
import { initialState as initialMainState } from '../../main/main.reducer';
import * as generalUtils from '~utils/generalUtils';
import { Store } from '~types/general';

describe('getCurrentPacket', () => {
	it('should return false by default', () => {
		let state: Store = {
			generator: getInitialState(),
			main: initialMainState,
			packets: initialPacketState
		};
		expect(selectors.getCurrentPacket(state)).toEqual(null);
	});

	it('should return the selected packet', () => {
		const packets: PacketsState = generalUtils.cloneObj(initialPacketState);
		packets.currentPacketId = '456';
		packets.packetIds = ['123', '456'];
		packets.packets['123'] = getNewPacket({ dataTypeWorkerId: 1 });
		packets.packets['456'] = getNewPacket({ dataTypeWorkerId: 2 });

		let state: Store = {
			generator: getInitialState(),
			main: initialMainState,
			packets
		};
		expect(selectors.getCurrentPacket(state)!.dataTypeWorkerId).toEqual(2);
	});

});
