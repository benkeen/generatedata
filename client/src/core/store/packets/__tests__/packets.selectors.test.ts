import { getNewPacket, initialState as initialPacketState, PacketsState } from '../packets.reducer';
import * as selectors from '../packets.selectors';
import { getInitialState } from '../../generator/generator.reducer';
import { initialState as initialMainState } from '../../main/main.reducer';
import { initialState as initialAccountState } from '../../account/account.reducer';
import { initialState as initialAccountsState } from '../../accounts/accounts.reducer';
import * as generalUtils from '~utils/generalUtils';
import { Store } from '~types/general';

describe('getCurrentPacket', () => {
	it('should return false by default', () => {
		let state: Store = {
			generator: getInitialState(),
			main: initialMainState,
			packets: initialPacketState,
			account: initialAccountState,
			accounts: initialAccountsState
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
			packets,
			account: initialAccountState,
			accounts: initialAccountsState
		};
		expect(selectors.getCurrentPacket(state)!.dataTypeWorkerId).toEqual(2);
	});

	it('getActivePacketList', () => {
		const packets: PacketsState = generalUtils.cloneObj(initialPacketState);
		packets.currentPacketId = '456';
		packets.packetIds = ['123', '456'];
		packets.packets['123'] = getNewPacket({
			dataTypeWorkerId: 1,
			numRowsToGenerate: 5
		});
		packets.packets['456'] = getNewPacket({
			dataTypeWorkerId: 2,
			numRowsToGenerate: 10
		});

		let state: Store = {
			generator: getInitialState(),
			main: initialMainState,
			packets,
			account: initialAccountState,
			accounts: initialAccountsState
		};
		expect(selectors.getActivePacketList(state)).toEqual([
			{
				isPaused: false,
				label: '5 rows',
				numRowsToGenerate: 5,
				packetId: '123',
				percentage: 0
			},
			{
				isPaused: false,
				label: '10 rows',
				numRowsToGenerate: 10,
				packetId: '456',
				percentage: 0
			}
		]);
	});
});
