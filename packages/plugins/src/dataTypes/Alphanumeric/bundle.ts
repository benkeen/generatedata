import { DTBundle } from '../../';
import { Example, getMetadata, Help, Options, rowStateReducer } from './Alphanumeric';
import { initialState } from './Alphanumeric.state';

const bundle: DTBundle = {
  initialState,
  Example,
  Options,
  Help,
  rowStateReducer,
  getMetadata
};

export default bundle;
