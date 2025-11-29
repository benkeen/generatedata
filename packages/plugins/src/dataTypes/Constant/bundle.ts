import { DTBundle } from '../../';
import { Example, Help, Options, getMetadata, rowStateReducer } from './Constant';
import { initialState } from './Constant.state';

const bundle: DTBundle = {
  initialState,
  Example,
  Options,
  Help,
  rowStateReducer,
  getMetadata
};

export default bundle;
