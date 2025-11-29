import { DTBundle } from '../../';
import { Example, getMetadata, Help, Options, rowStateReducer } from './AutoIncrement';
import { initialState } from './AutoIncrement.state';

const bundle: DTBundle = {
  initialState,
  Example,
  Options,
  Help,
  rowStateReducer,
  getMetadata
};

export default bundle;
