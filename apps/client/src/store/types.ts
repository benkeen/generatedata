import type { AccountState } from './account/account.reducer';
import type { GeneratorState } from './generator/generator.reducer';
import type { MainState } from './main/main.reducer';
import type { PacketsState } from './packets/packets.reducer';

export type ReduxStore = {
  account: AccountState;
  main: MainState;
  generator: GeneratorState;
  packetsState: PacketsState;
};
