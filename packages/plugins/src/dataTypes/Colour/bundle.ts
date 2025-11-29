import { DTBundle } from '../../';
import { Example, Help, Options, getMetadata, rowStateReducer } from './Colour';
import { initialState } from './Colour.state';

const bundle: DTBundle = {
  initialState,
  Example,
  Options,
  Help,
  getMetadata,
  rowStateReducer
};

export default bundle;
