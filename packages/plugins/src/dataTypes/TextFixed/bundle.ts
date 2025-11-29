import { DTBundle } from '../../';
import { Help, Options, getMetadata, rowStateReducer } from './TextFixed';
import { initialState } from './TextFixed.state';

const bundle: DTBundle = {
  initialState,
  Options,
  Help,
  getMetadata,
  rowStateReducer
};

export default bundle;
