import { DTBundle } from '../../';
import { Example, getMetadata, Help, Options, rowStateReducer } from './PAN';
import { initialState } from './PAN.state';

const bundle: DTBundle = {
  initialState,
  Example,
  Options,
  Help,
  rowStateReducer,
  getMetadata
};

export default bundle;
