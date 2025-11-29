import { DTBundle } from '../../';
import { Example, Help, Options, getMetadata, rowStateReducer } from './Names';
import { initialState } from './Names.state';

const bundle: DTBundle = {
  initialState,
  Example,
  Options,
  Help,
  getMetadata,
  rowStateReducer
};

export default bundle;
