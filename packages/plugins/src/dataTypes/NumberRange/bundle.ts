import { DTBundle } from '../../';
import { Help, Options, getMetadata, rowStateReducer } from './NumberRange';
import { initialState } from './NumberRange.state';

const bundle: DTBundle = {
  initialState,
  Options,
  Help,
  rowStateReducer,
  getMetadata
};

export default bundle;
