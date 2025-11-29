import { DTBundle } from '../../';
import { Example, getMetadata, Help, Options, rowStateReducer } from './Boolean';
import { initialState } from './Boolean.state';

const bundle: DTBundle = {
  initialState,
  Example,
  Options,
  Help,
  rowStateReducer,
  getMetadata
};

export default bundle;
